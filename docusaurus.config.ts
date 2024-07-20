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
    baseUrl: '/',

    organizationName: 'GeyserMC',
    projectName: 'GeyserWebsite',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.ts"),
                    editUrl:
                        'https://github.com/GeyserMC/GeyserWebsite/tree/master/',

                    routeBasePath: '/wiki',
                    docItemComponent: "@theme/ApiItem",
                    path: 'wiki',
                },
                blog: {},
                theme: {
                    customCss: './src/css/custom.scss',
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
                        outputDir: "wiki/api/downloads.geysermc.org",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                        },
                    },
                    'api.geysermc.org': {
                        specPath: "openapi/global.json",
                        outputDir: "wiki/api/api.geysermc.org",
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
        ],
        'docusaurus-plugin-sass'
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
                    to: 'wiki/geyser/setup',
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
                // {
                //     type: 'localeDropdown',
                //     position: 'right',
                // },
            ],
        },
        footer: {
            logo: {
                alt: 'GeyserMC logo',
                src: 'img/site/geyser-text.svg',
                href: '/',
                width: 430,
            },
            links: [
                {
                    title: 'Wiki',
                    items: [
                        {
                            label: 'Geyser',
                            to: 'wiki/geyser/setup',
                        },
                        {
                            label: 'Floodgate',
                            to: 'wiki/floodgate/setup',
                        },
                        {
                            label: 'REST APIs',
                            to: 'wiki/api/api.geysermc.org/global-api',
                        },
                        {
                            label: 'Other',
                            to: 'wiki/other/geyseroptionalpack',
                        },
                    ],
                },
                {
                    title: 'Downloads',
                    items: [
                        {
                            label: 'Geyser',
                            to: 'download?project=geyser',
                        },
                        {
                            label: 'Floodgate',
                            to: 'download?project=floodgate',
                        },
                        {
                            label: 'Other',
                            to: 'download?project=other-projects',
                        }
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Crowdin',
                            href: 'https://translate.geysermc.org/',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discord.gg/geysermc',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/GeyserMC/Geyser',
                        },
                        {
                            label: 'Reddit',
                            href: 'https://www.reddit.com/r/GeyserMC/',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/Geyser_MC',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog',
                        },
                        {
                            label: 'Donate',
                            href: 'https://opencollective.com/geysermc',
                        },
                        {
                            label: 'Global Linking',
                            to: 'https://link.geysermc.org/',
                        },
                    ],
                },
            ]
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
            { name: 'theme-color', content: '#25c2a0' },
        ],
    } satisfies Preset.ThemeConfig,
};

export default config;
