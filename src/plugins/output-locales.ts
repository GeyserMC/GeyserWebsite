import fs from 'fs';
import path from 'path';
import {LoadContext, Plugin, PluginOptions} from '@docusaurus/types';

const PLUGIN_NAME = 'docusaurus-plugin-output-locales';

const ouputLocalesPlugin = (context: LoadContext, options: PluginOptions): Plugin => {
    return {
        name: PLUGIN_NAME,
        extendCli(cli) {
            cli
                .command('output-locales')
                .description('Sync translations with Crowdin')
                .action(async () => {
                    fs.writeFileSync(
                        path.join(context.siteDir, 'locales.json'),
                        JSON.stringify(context.siteConfig.i18n.locales),
                        'utf-8'
                    )
                });
        }
    };
}

export default ouputLocalesPlugin;