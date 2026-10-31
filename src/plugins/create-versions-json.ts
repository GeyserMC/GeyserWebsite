import fs from 'fs';
import path from 'path';
import { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import logger from '@docusaurus/logger';
import versions from '../data/versions.json';

const createVersionsJsonPlugin = (context: LoadContext, options: PluginOptions): Plugin => {
    return {
        name: 'docusaurus-plugin-create-versions-json',

        async postBuild({ outDir, routes, plugins }) {
            const versionsFilePath = path.join(outDir, 'versions.json');

            fs.writeFileSync(versionsFilePath, JSON.stringify({
                "bedrock": {
                    "protocol": versions.bedrock.latest
                }
            }, null, 2), 'utf-8');

            logger.success(`Created versions.json file at ${versionsFilePath}`);
        },
    };
};

export default createVersionsJsonPlugin;