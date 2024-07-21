- [Adding a Supported Hosting Provider](#adding-a-supported-hosting-provider)
- [Creating a New Page](#creating-a-new-page)
   * [Example Page Layout](#example-page-layout)
   * [Adding a Page to the Sidebar](#adding-a-page-to-the-sidebar)
- [Previewing with GitHub Pages](#previewing-with-github-pages)
- [Running the Website Locally](#running-the-website-locally)
   * [Dependencies](#dependencies)
      + [Windows](#windows)
      + [macOS](#macos)
      + [Linux](#linux)
   * [Running](#running)
      + [Development](#development)
      + [Production](#production)

If you would like to contribute to the wiki, please [open a pull request](https://github.com/GeyserMC/GeyserWebsite/pulls).

Small changes can be made directly in the GitHub interface, but larger changes should be made by cloning the repository and running the website locally, ideally using an IDE with TypeScript support (e.g. [Visual Studio Code](https://code.visualstudio.com/)).

## Adding a Supported Hosting Provider

Supported hosting providers are listed in `src/data/providers.ts`. Hosting providers are grouped into three subcategories:

- `built_in`: Providers that have fully automatic Geyser installation.
- `supported`: Providers that work with Geyser but require manual installation.
- `no_support`: Providers that do not work with Geyser.

To add a new provider, add an object to the appropriate subcategory in alphabetical order. For example, to add a provider named `Example Hosting Provider` to the `supported` subcategory, edit the `providers.ts` file as follows:

```diff
  {
      name: 'Cubes Hosting',
      url: 'https://www.cubes.host/',
      description: translate({
          id: 'providers.provider.cubes_hosting.description',
          message: "Install Geyser using the plugin manager. Then restart the server and Geyser will run on an additional port - you can check it in the server console. Geyser-Standalone can be set up through a support ticket."
      })
  },
+ {
+    name: 'Example Hosting Provider',
+    url: 'https://example.com/',
+    description: translate({
+        id: 'providers.provider.example_hosting_provider.description',
+        message: "Add a description of how to install Geyser on this hosting provider."
+    })
+ },
  {
      name: 'exaroton',
      url: 'https://exaroton.com/',
      description: translate({
          id: 'providers.provider.exaroton.description',
          message: descriptionTemplates.default
      })
  },
```

If possible, use one of the templates listed at the top of the file, such as `descriptionTemplates.default`.

## Creating a New Page

All documentation is in the `docs` folder, where you can add new pages or edit the current ones. When a new page is added, it must also be added to [sidebar.ts](sidebar.ts). Pages that are written in plain markdown should use the extension `.md`, while pages that include React components should use the extension `.mdx`.

### Example Page Layout

```md
---
title: Page title
description: A short description of the page.
---

## Page Subheading One {#page-subheading-1}

This is an example page.

## Page Subheading Two {#page-subheading-2}

This is more of an example page.
```

### Adding a Page to the Sidebar

Once you have added the file you can add a sidebar link. All sidebar links and categories are defined in the [`sidebar.ts`](sidebar.ts) file.

Simply add the page to the items section of the appropriate category. For example, to add a page about an advanced configuration created at the file `docs/geyser/advanced-configuration.md`, edit the `sidebar.ts` as follows:

```diff
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
        'geyser/geyser-command-line-arguments-and-system-properties',
+       'geyser/advanced-configuration',
    ]
},
```

## Previewing with GitHub Pages

If you would like to preview your changes before opening a pull request, you can use GitHub Pages. To do this:
- Create a [fork](https://github.com/GeyserMC/GeyserWebsite/fork) of the repository .
- Ensure you have enabled GitHub Actions from the `Actions` tab of your fork. 
- Under the `Settings` tab of your fork, select the `Pages` section on the left and set the `Source` to `GitHub Actions`.
- Create a new branch in your fork and commit your changes.
- Under the `Actions` tab of your fork, select `Deploy to GitHub Pages` and click the `Run workflow` dropdown on the right.
- Select the branch to which you committed changes and click the `Run workflow` button.
- Once the workflow has completed, see the `Deployments` section at the right of the `Code` tab for `github-pages` to find the link to your preview, which will be in the format `https://<username>.github.io/GeyserWebsite` by default. 

## Running the Website Locally

### Dependencies

#### Windows

Open PowerShell and run:

```ps1
winget install -e --id OpenJS.NodeJS
winget install -e --id Yarn.Yarn
winget install -e --id Git.Git
```

#### macOS

First, install [Homebrew](https://brew.sh/) if not already installed by opening Terminal and running:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, open a new Terminal window and run to install the dependencies:

```bash
brew install node
brew install yarn
brew install git
```

#### Linux

Install [Node.js](https://nodejs.org/en/download/package-manager/), [Yarn](https://classic.yarnpkg.com/en/docs/install), and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) using the package manager for your distribution.

### Running

#### Development

```sh
git clone https://github.com/GeyserMC/GeyserWebsite
cd GeyserWebsite
yarn
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

#### Production

To test the production build locally, run:

```sh
yarn build
yarn serve
```

This command starts a local server that serves the production build of the website. Ensure the build command runs successfully, as this check is required to pass before changes to the website can be merged. Unlike the start command, changes are not reflected live, and the site must be rebuilt and the server restarted to see changes. Any errors, such as broken links, will cause the build to fail.