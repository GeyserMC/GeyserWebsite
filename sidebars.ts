import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    apiSidebar: [
        {
            type: "category",
            label: "api.geysermc.org",
            link: {
                type: "generated-index",
                title: "Global API",
                description: "Global API",
                slug: "/api/global",
            },
            items: require("./docs/api/api.geysermc.org/sidebar.ts"),
        },
        {
            type: "category",
            label: "download.geysermc.org",
            link: {
                type: "generated-index",
                title: "Downloads API",
                description: "Downloads API",
                slug: "/api/downloads",
            },
            items: require("./docs/api/downloads.geysermc.org/sidebar.ts"),
        },
    ],
    geyserSidebar: [
        'wiki/geyser/index',
        {
            type: 'category',
            label: 'Setup',
            link: {
                type: 'doc',
                id: 'wiki/geyser/setup'
            },
            items: [
                'wiki/geyser/supported-hosting-providers',
                'wiki/geyser/using-geyser-with-consoles',
                'wiki/geyser/playit-gg',
                'wiki/geyser/creating-a-startup-script',
                'wiki/geyser/port-forwarding'
            ]
        },
        {
            type: 'category',
            label: 'Common Issues',
            link: {
                type: 'doc',
                id: 'wiki/geyser/common-issues'
            },
            items: [
                'wiki/geyser/fixing-unable-to-connect-to-world'
            ]
        },
        {
            type: 'category',
            label: 'Configuring Geyser',
            link: {
                type: 'doc',
                id: 'wiki/geyser/understanding-the-config',
            },
            items: [
                'wiki/geyser/commands',
                'wiki/geyser/translations',
                'wiki/geyser/geyser-command-line-arguments-and-system-properties'
            ]
        },
        {
            type: 'category',
            label: 'FAQ',
            link: {
                type: 'doc',
                id: 'wiki/geyser/faq'
            },
            items: [
                'wiki/geyser/anticheat-compatibility',
                'wiki/geyser/current-limitations'
            ]
        },
        {
            type: 'category',
            label: 'Custom Resource Packs',
            link: {
                type: 'doc',
                id: 'wiki/geyser/custom-resource-packs'
            },
            items: [
                'wiki/geyser/custom-items',
                'wiki/geyser/custom-blocks',
                'wiki/geyser/custom-skulls',
            ]
        },
        {
            type: 'category',
            label: 'Geyser API',
            link: {
                type: 'doc',
                id: 'wiki/geyser/api',
            },
            items: [
                'wiki/geyser/getting-started-with-the-api',
                'wiki/geyser/events',
                'wiki/geyser/forms'
            ],
        },
        'wiki/geyser/extensions',
        'wiki/geyser/global-api'
    ],

    floodgateSidebar: [
        'wiki/floodgate/setup',
        'wiki/floodgate/issues',
        'wiki/floodgate/faq',
        'wiki/floodgate/features',
        'wiki/floodgate/commands',
        'wiki/floodgate/api',
        'wiki/floodgate/linking'
    ],

    otherSidebar: [
        'wiki/other/geyseroptionalpack',
        'wiki/other/hurricane',
        'wiki/other/geyserconnect',
        'wiki/other/community-geyser-projects',
        'wiki/other/test-server',
        'wiki/other/developer-guide',
        'wiki/other/discord-bot-usage',
        'wiki/other/hydraulic'
    ]
};

export default sidebars;
