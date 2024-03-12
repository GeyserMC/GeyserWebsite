import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/downloads.geysermc.org/downloads-api",
    },
    {
      type: "category",
      label: "projects-controller",
      items: [
        {
          type: "doc",
          id: "api/downloads.geysermc.org/projects",
          label: "Gets a list of all available projects.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "project-controller",
      items: [
        {
          type: "doc",
          id: "api/downloads.geysermc.org/project",
          label: "Gets information about a project.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "version-controller",
      items: [
        {
          type: "doc",
          id: "api/downloads.geysermc.org/version",
          label: "Gets information about a version.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "version-builds-controller",
      items: [
        {
          type: "doc",
          id: "api/downloads.geysermc.org/builds",
          label: "Gets all available builds for a project's version.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "version-build-controller",
      items: [
        {
          type: "doc",
          id: "api/downloads.geysermc.org/build-specific",
          label: "Gets information related to a specific build.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/downloads.geysermc.org/build-latest",
          label: "Gets information related to a specific build.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "download-controller",
      items: [
        {
          type: "doc",
          id: "api/downloads.geysermc.org/download-specific",
          label: "Downloads the given file from a build's data.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/downloads.geysermc.org/download-latest",
          label: "Downloads the given file from a build's data.",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
