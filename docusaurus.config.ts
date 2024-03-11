import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
    projectName: 'GeyserWiki', // Usually your repo name.

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
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/GeyserMC/Geyser/tree/main/',

                    routeBasePath: '/', // Serve the docs at the site's root
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

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
                    position: 'right',
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
                            docId: 'other/geyseroptionalpack',
                            label: 'Other',
                        },
                    ]
                },
                {
                    to: 'download',
                    label: 'Download',
                    position: 'right',
                    className: 'header-download-link'
                },
                {
                    href: 'https://github.com/GeyserMC/Geyser',
                    label: 'GitHub',
                    position: 'right',
                    className: 'header-github-link'
                },
                {
                    href: 'https://discord.gg/geysermc',
                    label: 'Discord',
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
            additionalLanguages: ['bash', 'batch', 'java', 'json'],
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
        // Remove in production
        announcementBar: {
            id: 'support_us',
            content: '<b>This is the in-development version of the site and may not be fully updated. Vist the <a target="_blank" rel="noopener noreferrer" href="#">main site</a> or <a target="_blank" rel="noopener noreferrer" href="#">current wiki</a> for the most updated info.</b>',
            backgroundColor: '#ff333d',
            textColor: '#e3e3e3',
            isCloseable: true,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
