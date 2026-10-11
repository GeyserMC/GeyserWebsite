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

Hosting providers are listed in `src/data/providers.ts`, in alphabetical order. The setup guide generates the Geyser config changes and connection instructions from each entry. 
Set `updated` to the date you add or edit an entry (`'YYYY-MM-DD'`); the setup guide shows it as "Instructions last updated on". 
See `src/types/providers.ts` for all fields. They are grouped in the order the setup guide shows them: `links` to the host's own help pages, `install` (step 1), `config` (step 2), `extra_step` (step 3), `connect` (step 4), and `notices` shown around the guide.

Geyser uses NetherNet for Bedrock connections, which needs:

- **UDP** for game traffic flowing over WebRTC (`config.udp`), and
- **TCP** for signaling, which is how Bedrock players find the server. Geyser can do this itself ("built-in" signaling, which needs a **TCP** port that is not the Java server's port), or through an external signaling service ([Warden](https://warden.cloud) by default), which needs no extra port.

Ports (`udp` and `builtin_signaling`) can be:

- `'java'`: the Java server's port (UDP only; built-in signaling cannot share the Java server's TCP port),
- a number, e.g. `19132`, if it is always the same,
- `{ obtain: translate({...}) }` with how to get one, e.g. "Open an allocation in the Network tab.". The guide adds which config option to set it as.

Prefer a single port: use `builtin_signaling: 'same_as_udp'` when the UDP port is also open on TCP (e.g. Pterodactyl allocations), so users only need one port. Only give `builtin_signaling` its own port if the host really hands out TCP and UDP separately. Leave `builtin_signaling` out if your servers only support external signaling, and set `external_signaling` if you run your own signaling service (or `false` if external signaling is blocked).

Anything else users need to change in the config, such as which Bedrock address to use, goes in `config.notes`, which are shown below the generated config.

If the host has not confirmed these details yet, set `config.confirmed: false`, and the guide shows a warning. Remove it once the host confirms them.

```diff
+ {
+     name: 'Example Hosting Provider',
+     url: 'https://example.com/',
+     updated: '2026-10-11',
+     links: { article: 'https://example.com/docs/geyser' },
+     config: {
+         udp: {
+             obtain: translate({
+                 id: 'providers.provider.example_hosting_provider.port',
+                 message: "Open an additional port in the Network tab."
+             })
+         },
+         builtin_signaling: 'same_as_udp'
+     }
+ },
```

Hosts that support Geyser through Open Collaboration also get an `open_collaboration` entry with their `tier` (`bronze`, `silver` or `gold`), and an optional `logo` (placed in `static/img/hosts`) and `description`. Silver and gold hosts are listed on the [Hosting Providers](https://geysermc.org/hosting) page, and pinned at the top of the setup guide; bronze hosts are listed like any other host.

If Geyser is installed and configured by the host, use `config: { preconfigured: true, port }` instead, where `port` is the port players connect with, and explain the installation in `install`. Hosts can configure Geyser without config changes using [system properties](https://geysermc.org/wiki/geyser/geyser-command-line-arguments-and-system-properties), such as `-DgeyserTransport`, `-DgeyserSignalingMode`, `-DgeyserWebrtcPort` and `-DgeyserSignalingPort`.

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