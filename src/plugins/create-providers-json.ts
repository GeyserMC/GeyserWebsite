import fs from 'fs';
import path from 'path';
import { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import logger from '@docusaurus/logger';
import ts from "typescript";

// Welcome to hell
const createProvidersJsonPlugin = (_context: LoadContext, _options: PluginOptions): Plugin => {
    return {
        name: 'docusaurus-plugin-create-providers-json',

        async postBuild({ outDir }) {
            const providersFilePath = path.join(__dirname, '../data/providers.ts');
            const providersFileContent = fs.readFileSync(providersFilePath, 'utf-8');
            const providersAst = ts.createSourceFile('providers.ts', providersFileContent, ts.ScriptTarget.Latest, true);

            let providersDataNode: ts.ObjectLiteralExpression | null = null;
            let descriptionTemplatesNode: ts.ObjectLiteralExpression | null = null;

            for (const statement of providersAst.statements) {
                if (ts.isVariableStatement(statement)) {
                    for (const decl of statement.declarationList.declarations) {
                        if (
                            ts.isIdentifier(decl.name) &&
                            decl.initializer
                        ) {
                            if (decl.name.text === 'providersData' && ts.isObjectLiteralExpression(decl.initializer)) {
                                providersDataNode = decl.initializer;
                            } else if (decl.name.text === 'descriptionTemplates' && ts.isObjectLiteralExpression(decl.initializer)) {
                                descriptionTemplatesNode = decl.initializer;
                            }
                        }
                    }
                }
            }

            if (!providersDataNode) {
                logger.error('Could not find providersData in providers.ts');
                return;
            }

            if (!descriptionTemplatesNode) {
                logger.error('Could not find defaultDescriptions in providers.ts');
                return;
            }

            function parseDescriptionTemplates(node: ts.ObjectLiteralExpression): Record<string, string> {
                const map: Record<string, string> = {};
                for (const prop of node.properties) {
                    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                        const key = prop.name.text;
                        const val = extractDescription(prop.initializer);
                        map[key] = val || '';
                    }
                }
                return map;
            }

            let defaultDescriptionsMap = parseDescriptionTemplates(descriptionTemplatesNode);

            function extractDescription(node: ts.Expression): string {
                if (ts.isCallExpression(node)) {
                    const expr = node.expression;
                    if (ts.isIdentifier(expr) && expr.text === 'translate') {
                        const arg = node.arguments[0];
                        if (arg && ts.isObjectLiteralExpression(arg)) {
                            for (const prop of arg.properties) {
                                if (
                                    ts.isPropertyAssignment(prop) &&
                                    ts.isIdentifier(prop.name) &&
                                    prop.name.text === 'message' &&
                                    ts.isStringLiteral(prop.initializer)
                                ) {
                                    return prop.initializer.text;
                                }
                            }
                        }
                    }
                } else if (ts.isPropertyAccessExpression(node)) {
                    if (ts.isIdentifier(node.expression) && node.expression.text === 'descriptionTemplates') {
                        const key = node.name.text;
                        return defaultDescriptionsMap[key] || '';
                    }
                }
            }

            function parseProvidersArray(prop: ts.PropertyAssignment): {name: string; url: string; description: string;}[] {
                if (ts.isArrayLiteralExpression(prop.initializer)) {
                    return prop.initializer.elements
                        .filter(ts.isObjectLiteralExpression)
                        .map(element => {
                            let nameVal = '';
                            let urlVal = '';
                            let descVal = '';

                            for (const property of element.properties) {
                                if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name)) {
                                    const key = property.name.text;
                                    const val = property.initializer;
                                    if (key === 'name' && ts.isStringLiteral(val)) {
                                        nameVal = val.text;
                                    } else if (key === 'url' && ts.isStringLiteral(val)) {
                                        urlVal = val.text;
                                    } else if (key === 'description') {
                                        descVal = extractDescription(val);
                                    }
                                }
                            }

                            return { name: nameVal, url: urlVal, description: descVal };
                        });
                }
                return [];
            }

            let providersJson = {};

            for (const prop of providersDataNode.properties) {
                if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                    providersJson[prop.name.text] = parseProvidersArray(prop);
                }
            }

            const dataDir = path.join(outDir, 'data');
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            const outputFilePath = path.join(dataDir, 'providers.json');
            fs.writeFileSync(outputFilePath, JSON.stringify(providersJson, null, 4), 'utf-8');
        }
    };
};

export default createProvidersJsonPlugin;