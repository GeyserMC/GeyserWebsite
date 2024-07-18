import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/api.geysermc.org/global-api",
    },
    {
      type: "category",
      label: "health",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-health-controller-health",
          label: "Simple server online check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "link",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-link-controller-get-bedrock-link-v-1",
          label: "GlobalApiWeb.Api.LinkController.get_bedrock_link_v1",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-link-controller-get-java-link-v-1",
          label: "GlobalApiWeb.Api.LinkController.get_java_link_v1",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-link-controller-get-bedrock-link-v-2",
          label: "Get linked Java account from Bedrock xuid",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-link-controller-get-java-link-v-2",
          label: "Get linked Bedrock account from Java UUID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "stats",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-stats-controller-get-all-stats",
          label: "Get all publicly available Global Api statistics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-stats-controller-get-all-stats-2",
          label: "Get all publicly available Global Api statistics",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "xbox",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-xbox-controller-get-gamertag-v-1",
          label: "GlobalApiWeb.Api.XboxController.get_gamertag_v1",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-xbox-controller-get-xuid-v-1",
          label: "GlobalApiWeb.Api.XboxController.get_xuid_v1",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-xbox-controller-get-gamertag-v-2",
          label: "Get the gamertag from a xuid",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-xbox-controller-get-xuid-v-2",
          label: "Get the xuid from a gamertag",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "skin",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-skin-controller-get-recent-uploads-page",
          label: "Get a list of the most recently uploaded skins",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-skin-controller-get-recent-uploads",
          label: "Get a list of the most recently uploaded skins",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-skin-controller-get-skin",
          label: "Get the most recently converted skin of a Bedrock player",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "utils",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-utils-controller-get-bedrock-or-java-uuid",
          label: "Utility endpoint to get either a Java UUID or a Bedrock xuid",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-render-controller-get-front-texture",
          label: "GlobalApiWeb.Api.RenderController.get_front_texture",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/api.geysermc.org/global-api-web-api-render-controller-get-raw-texture",
          label: "GlobalApiWeb.Api.RenderController.get_raw_texture",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
