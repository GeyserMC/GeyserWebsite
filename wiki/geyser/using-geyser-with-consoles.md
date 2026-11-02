---
title: Using Geyser with Consoles
description: >-
  Information on how to use Geyser with consoles, including how to join servers
  on console versions of Bedrock Edition.
crowdin_page_id: 2b692367-58d4-469b-a795-0621539456eb
---

# Using Geyser with Consoles

Consoles can't join third-party servers like Geyser out of the box, but there are a few ways around it:

- **[BedrockConnect](#bedrockconnect)** - change your console's DNS and pick a server from an in-game menu.
- **[MCXboxBroadcast](#mcxboxbroadcast)** - advertises your server through a bot account so it appears in game as a friend's world.
- **[LAN emulation](#lan-emulation)** - run a helper app on another device (phone, tablet, or PC) that makes the server show up as a LAN game.

## BedrockConnect {/* #bedrockconnect */}

[BedrockConnect](https://github.com/Pugmatt/BedrockConnect) is a program (not affiliated with GeyserMC) that lets console players join third-party servers by changing the console's DNS. Once it's set, joining one of the featured servers in Minecraft's Servers tab opens the BedrockConnect menu, where you can add and connect to any Geyser server.

Setup instructions for each console are on the [BedrockConnect GitHub page](https://github.com/Pugmatt/BedrockConnect).

:::note

The main IP used for BedrockConnect is often blocked on consoles.
If you run into issues with your internet connection or joining servers after changing your DNS,
try one of the other BedrockConnect servers on the [BedrockConnect GitHub page](https://github.com/Pugmatt/BedrockConnect#community-hosted-instances).

:::

## MCXboxBroadcast {/* #mcxboxbroadcast */}

[MCXboxBroadcast](https://github.com/MCXboxBroadcast/Broadcaster) puts your Geyser server on a bot Xbox account's friends list, so it shows up on the Worlds tab in game. Players friend that account and join from there, with no DNS changes. Unlike the other methods, this one is set up by the server owner rather than each player. It runs alongside the server, either on its own or as a Geyser extension.

Setup instructions are on the [MCXboxBroadcast GitHub page](https://github.com/MCXboxBroadcast/Broadcaster#installation).

## LAN Emulation {/* #lan-emulation */}

These apps make your server look like a LAN game. Run one on another device, point it at your Geyser server, and it'll show up on the Worlds tab on your console.

| App | iOS | Android | Desktop | Notes |
| --- | --- | --- | --- | --- |
| **MCCompanion** | [App Store](https://apps.apple.com/be/app/netherlink/id6747323142?l=en) | [Play Store](https://play.google.com/store/apps/details?id=net.netherdev.netherLink) | [Windows](https://apps.microsoft.com/detail/9NSFPT6D8PTR) · [macOS](https://apps.apple.com/us/app/mccompanion/id6747323142?platform=mac) · [Linux (Snap)](https://snapcraft.io/mccompanion) · [Linux (Tarball & Flatpak)](https://mccompanion.net/download/) | Free and ad-free |
| **BridgePlay** | [App Store](https://apps.apple.com/app/id6786974231) | [Play Store](https://play.google.com/store/apps/details?id=com.bridgeplay.app) | — | Free, no ads while you connect |
| **BedrockTogether** | [App Store](https://apps.apple.com/app/bedrocktogether/id1534593376) | [Play Store](https://play.google.com/store/apps/details?id=pl.extollite.bedrocktogetherapp) | — | |
| **BedrockConnect (app)** | [App Store](https://apps.apple.com/app/id6443529739) | [Play Store](https://play.google.com/store/apps/details?id=io.bedrockhub.connector.bedrockhub_connector) | — | Ads, with a paid tier to remove them. Unrelated to the DNS tool above |
