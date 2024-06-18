import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { docOgRenderer, blogOgRenderer, pageOgRenderer } from './src/renderer/ImageRenderers';

const config: Config = {
    title: 'GeyserMC',
    tagline: 'Revolutionize Your Minecraft Server',
    favicon: 'img/favicon.ico',

    // TODO: Change to correct domain in production! 
    url: 'https://dev.geysermc.org',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'GeyserMC', // Usually your GitHub org/user name.
    projectName: 'GeyserWebsite', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.ts"),
                    editUrl:
                        'https://github.com/GeyserMC/GeyserWebsite/tree/master/',

                    routeBasePath: '/', // Serve the docs at the site's root
                    docItemComponent: "@theme/ApiItem",
                },
                blog: {},
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            'docusaurus-plugin-openapi-docs',
            {
                id: "api",
                docsPluginId: "classic",
                config: {
                    'downloads.geysermc.org': {
                        specPath: "openapi/downloads.json",
                        outputDir: "docs/api/downloads.geysermc.org",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                        },
                    },
                    'api.geysermc.org': {
                        specPath: "openapi/global.json",
                        outputDir: "docs/api/api.geysermc.org",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                        },
                    }
                }
            },
        ],
        [
            '@kas-tle/docusaurus-og',
            {
                path: './preview-images',
                imageRenderers: {
                    'docusaurus-plugin-content-docs': docOgRenderer,
                    'docusaurus-plugin-content-pages': pageOgRenderer,
                    'docusaurus-plugin-content-blog': blogOgRenderer,
                },
            },
        ]
    ],
    themes: ["docusaurus-theme-openapi-docs"],

    themeConfig: {
        image: 'img/site/geyser.png',
        navbar: {
            title: 'GeyserMC',
            logo: {
                alt: 'GeyserMC logo',
                src: 'img/apple-touch-icon.png',
            },
            items: [
                {
                    type: 'dropdown',
                    label: 'Wiki',
                    className: 'header-wiki-link',
                    position: 'left',
                    to: 'geyser/setup',
                    items: [
                        {
                            type: 'doc',
                            docId: 'geyser/setup',
                            label: 'Geyser',
                        },
                        {
                            type: 'doc',
                            docId: 'floodgate/setup',
                            label: 'Floodgate',
                        },
                        {
                            type: 'doc',
                            docId: 'api/api.geysermc.org/global-api',
                            label: 'REST APIs',
                        },
                        {
                            type: 'doc',
                            docId: 'other/geyseroptionalpack',
                            label: 'Other',
                        },
                    ]
                },
                {
                    to: 'blog',
                    label: 'Blog',
                    position: 'left',
                    className: 'header-blog-link'
                },
                {
                    type: 'dropdown',
                    label: 'Utilities',
                    className: 'header-utilities-link',
                    position: 'left',
                    items: [
                        {

                            to: 'utilities/config-editor',
                            label: 'Config Editor',
                        },
                        {

                            to: 'utilities/dump-viewer',
                            label: 'Dump Viewer',
                        }
                    ]
                },
                {
                    to: 'download',
                    label: 'Download',
                    position: 'left',
                    className: 'header-download-link'
                },
                {
                    href: 'https://github.com/GeyserMC/Geyser',
                    position: 'right',
                    className: 'header-github-link'
                },
                {
                    href: 'https://discord.gg/geysermc',
                    position: 'right',
                    className: 'header-discord-link'
                },
                {
                    type: 'localeDropdown',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            copyright: `© ${new Date().getFullYear()} GeyserMC | Built with Docusaurus`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: [
                'bash', 'batch', 'java', 'json', // Docs
                'php', 'powershell', 'csharp', 'ruby' // API examples
            ],
        },
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: false,
            respectPrefersColorScheme: false,
        },
        docs: {
            sidebar: {
                hideable: true,
            }
        },
        algolia: {
            appId: '0DTHI9QFCH',
            apiKey: '3cc0567f76d2ed3ffdb4cc94f0ac9815',
            indexName: 'geysermc',
            contextualSearch: true,
            searchPagePath: 'search',
        },
        metadata: [
            {name: 'theme-color', content: '#25c2a0'},
        ],
    } satisfies Preset.ThemeConfig,
};

export default config;
