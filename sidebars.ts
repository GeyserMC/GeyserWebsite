import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import type { SidebarItemConfig } from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

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
    apiSidebar: withUniqueKeys([
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
    ]),
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
                // TODO: hidden until the hosting page launches
                // {
                //     type: 'link',
                //     label: 'Hosting Providers',
                //     href: '/hosting'
                // },
                'geyser/using-geyser-with-consoles',
                'geyser/nethernet-https',
                'geyser/port-forwarding',
                'geyser/creating-a-startup-script',
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
                'geyser/fixing-unable-to-connect-to-world',
                'geyser/nethernet-common-issues'
            ]
        },
        {
            type: 'category',
            label: 'Configuring Geyser',
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
            label: 'Custom Content',
            link: {
                type: 'doc',
                id: 'geyser/custom-content'
            },
            items: [
                'geyser/packs',
                'geyser/custom-items',
                'geyser/custom-blocks',
                'geyser/custom-skulls',
                'geyser/custom-waypoints',
                'geyser/custom-entities'
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
        'other/geyserintegratedpack',
        'other/community-geyser-projects',
        'other/hurricane',
        'other/rainbow',
        'other/hydraulic',
        'other/thunder',
        'other/test-server',
        'other/developer-guide',
        'other/discord-bot-usage'
    ]
};

function withUniqueKeys(items: SidebarItemConfig[]): SidebarItemConfig[] {
    return items.map((item) => {
        if (typeof item === "string") return item;
        if (item.type === "doc") {
            return { ...item, key: item.key ?? item.id };
        }
        if (item.type === "category" && Array.isArray(item.items)) {
            return { ...item, items: withUniqueKeys(item.items) };
        }
        return item;
    });
}

export default sidebars;
