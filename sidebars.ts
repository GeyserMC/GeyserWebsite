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
        "api/index",
        {
            type: "category",
            label: "api.geysermc.org",
            link: {
                type: "generated-index",
                title: "Global API",
                description: "Global API",
                slug: "/api/global",
            },
            items: require("./wiki/api/api.geysermc.org/sidebar.ts"),
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
            items: require("./wiki/api/downloads.geysermc.org/sidebar.ts"),
        },
    ],
    geyserSidebar: [
        'geyser/index',
        {
            type: 'category',
            label: 'Setup',
            link: {
                type: 'doc',
                id: 'geyser/setup'
            },
            items: [
                'geyser/supported-hosting-providers',
                'geyser/using-geyser-with-consoles',
                'geyser/playit-gg',
                'geyser/creating-a-startup-script',
                'geyser/port-forwarding'
            ]
        },
        {
            type: 'category',
            label: 'Common Issues',
            link: {
                type: 'doc',
                id: 'geyser/common-issues'
            },
            items: [
                'geyser/fixing-unable-to-connect-to-world'
            ]
        },
        {
            type: 'category',
            label: 'Configuring Geyser',
            link: {
                type: 'doc',
                id: 'geyser/understanding-the-config',
            },
            items: [
                'geyser/commands',
                'geyser/translations',
                'geyser/geyser-command-line-arguments-and-system-properties'
            ]
        },
        {
            type: 'category',
            label: 'FAQ',
            link: {
                type: 'doc',
                id: 'geyser/faq'
            },
            items: [
                'geyser/supported-versions',
                'geyser/anticheat-compatibility',
                'geyser/current-limitations'
            ]
        },
        {
            type: 'category',
            label: 'Custom Resource Packs',
            link: {
                type: 'doc',
                id: 'geyser/custom-resource-packs'
            },
            items: [
                'geyser/custom-items',
                'geyser/custom-blocks',
                'geyser/custom-skulls',
            ]
        },
        {
            type: 'category',
            label: 'Geyser API',
            link: {
                type: 'doc',
                id: 'geyser/api',
            },
            items: [
                'geyser/getting-started-with-the-api',
                'geyser/events',
                'geyser/forms'
            ],
        },
        'geyser/extensions'
    ],

    floodgateSidebar: [
        'floodgate/index',
        'floodgate/setup',
        'floodgate/issues',
        'floodgate/faq',
        'floodgate/features',
        'floodgate/commands',
        'floodgate/api',
        'floodgate/linking'
    ],

    otherSidebar: [
        'other/index',
        'other/geyserconnect',
        'other/thirdpartycosmetics',
        'other/geyseroptionalpack',
        'other/community-geyser-projects',
        'other/hurricane',
        'other/hydraulic',
        'other/test-server',
        'other/developer-guide',
        'other/discord-bot-usage'
    ]
};

export default sidebars;
