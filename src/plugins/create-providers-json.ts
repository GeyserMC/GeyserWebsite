import fs from 'fs';
import path from 'path';
import { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import logger from '@docusaurus/logger';
import ts from "typescript";

// Welcome to hell (part 2)
const createProvidersJsonPlugin = (_context: LoadContext, _options: PluginOptions): Plugin => {
    return {
        name: 'docusaurus-plugin-create-providers-json',

        async postBuild({ outDir }) {
            const providersFilePath = path.join(__dirname, '../data/providers.ts');
            const providersFileContent = fs.readFileSync(providersFilePath, 'utf-8');
            const providersAst = ts.createSourceFile('providers.ts', providersFileContent, ts.ScriptTarget.Latest, true);

            let providersDataNode: ts.ObjectLiteralExpression | null = null;
            let connectionTemplatesNode: ts.ObjectLiteralExpression | null = null;
            let configChangeTemplatesNode: ts.ObjectLiteralExpression | null = null;
            let warningsNode: ts.ObjectLiteralExpression | null = null;

            for (const statement of providersAst.statements) {
                if (ts.isVariableStatement(statement)) {
                    for (const decl of statement.declarationList.declarations) {
                        if (ts.isIdentifier(decl.name) && decl.initializer) {
                            if (decl.name.text === 'providersData' && ts.isObjectLiteralExpression(decl.initializer)) {
                                providersDataNode = decl.initializer;
                            } else if (decl.name.text === 'connectionTemplates' && ts.isObjectLiteralExpression(decl.initializer)) {
                                connectionTemplatesNode = decl.initializer;
                            } else if (decl.name.text === 'configChangeTemplates' && ts.isObjectLiteralExpression(decl.initializer)) {
                                configChangeTemplatesNode = decl.initializer;
                            } else if (decl.name.text === 'warnings' && ts.isObjectLiteralExpression(decl.initializer)) {
                                warningsNode = decl.initializer;
                            }
                        }
                    }
                }
            }

            if (!providersDataNode) {
                logger.error('Could not find providersData in providers.ts');
                return;
            }

            function extractTranslation(node: ts.CallExpression): string {
                const args = node.arguments;
                if (args.length > 0 && ts.isObjectLiteralExpression(args[0])) {
                    for (const prop of args[0].properties) {
                        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === 'message') {
                            if (ts.isStringLiteral(prop.initializer)) {
                                return prop.initializer.text;
                            }
                        }
                    }
                }
                return '';
            }

            function extractValue(node: ts.Expression): any {
                if (ts.isCallExpression(node)) {
                    const expr = node.expression;
                    if (ts.isIdentifier(expr) && expr.text === 'translate') {
                        return extractTranslation(node);
                    }
                    return null;
                } else if (ts.isStringLiteral(node)) {
                    return node.text;
                } else if (ts.isNumericLiteral(node)) {
                    return Number(node.text);
                } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
                    return true;
                } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
                    return false;
                } else if (ts.isObjectLiteralExpression(node)) {
                    const obj: Record<string, any> = {};
                    node.properties.forEach(prop => {
                        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                            obj[prop.name.text] = extractValue(prop.initializer);
                        }
                    });
                    return obj;
                } else if (ts.isArrayLiteralExpression(node)) {
                    return node.elements.map(el => extractValue(el));
                } else if (ts.isPropertyAccessExpression(node)) {
                    if (ts.isIdentifier(node.expression)) {
                        const objName = node.expression.text;
                        const key = node.name.text;
                        if (objName === 'connectionTemplates') {
                            return connectionTemplatesMap[key] || '';
                        } else if (objName === 'configChangeTemplates') {
                            return configChangeTemplatesMap[key] || null;
                        } else if (objName === 'warnings') {
                            return warningsMap[key] || '';
                        }
                    }
                    return null;
                } else if (node.kind === ts.SyntaxKind.NullKeyword) {
                    return null;
                }
                return null;
            }

            function buildSimpleTemplateMap(node: ts.ObjectLiteralExpression): Record<string, string> {
                const map: Record<string, string> = {};
                for (const prop of node.properties) {
                    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                        const key = prop.name.text;
                        map[key] = extractValue(prop.initializer);
                    }
                }
                return map;
            }

            function buildConfigTemplateMap(node: ts.ObjectLiteralExpression): Record<string, any> {
                const map: Record<string, any> = {};
                for (const prop of node.properties) {
                    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                        const key = prop.name.text;
                        map[key] = extractValue(prop.initializer);
                    }
                }
                return map;
            }

            const connectionTemplatesMap = connectionTemplatesNode ? buildSimpleTemplateMap(connectionTemplatesNode) : {};
            const configChangeTemplatesMap = configChangeTemplatesNode ? buildConfigTemplateMap(configChangeTemplatesNode) : {};
            const warningsMap = warningsNode ? buildSimpleTemplateMap(warningsNode) : {};

            const providersJson: Record<string, any> = {};
            providersDataNode.properties.forEach(prop => {
                if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                    const key = prop.name.text;
                    if (ts.isArrayLiteralExpression(prop.initializer)) {
                        providersJson[key] = prop.initializer.elements
                            .filter(ts.isObjectLiteralExpression)
                            .map(providerObj => {
                                const provider: Record<string, any> = {};
                                providerObj.properties.forEach(p => {
                                    if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) {
                                        provider[p.name.text] = extractValue(p.initializer);
                                    }
                                });
                                return provider;
                            });
                    }
                }
            });

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
