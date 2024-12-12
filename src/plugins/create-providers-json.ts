import fs from 'fs';
import path from 'path';
import { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import logger from '@docusaurus/logger';
import Module from 'module';

const createProvidersJsonPlugin = (context: LoadContext, options: PluginOptions): Plugin => {
  return {
    name: 'docusaurus-plugin-create-providers-json',

    async postBuild({ outDir, routes, plugins }) {
      const originalResolveFilename = (Module as any)._resolveFilename

      // This is a hack to allow us to import a custom module instead of the normal translation module
      (Module as any)._resolveFilename = function (request, parent, isMain, options) {
        if (request == '@docusaurus/Translate') {
          request = path.resolve(__dirname, 'custom_modules', 'translate.ts');
        }
        return originalResolveFilename.call(this, request, parent, isMain, options);
      };

      // Import the providers data
      const { providersData } = await import('../data/providers');

      // Restore the original resolve function
      (Module as any)._resolveFilename = originalResolveFilename

      const providersFilePath = path.join(outDir, 'data/providers.json');

      fs.mkdirSync(path.dirname(providersFilePath), { recursive: true });

      fs.writeFileSync(providersFilePath, JSON.stringify(providersData, null, 2), 'utf-8');

      logger.success(`Created providers.json file at ${providersFilePath}`);
    }
  };
};

export default createProvidersJsonPlugin;