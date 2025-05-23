---
title: Geyser Command Line Arguments and System Properties
description: Geyser offers a few command line arguments/system properties to allow you to configure Geyser without editing the config files.
---

# Geyser Command Line Arguments and System Properties

Geyser offers a few command line arguments/system properties to allow you to configure Geyser without editing the config files.
Additionally, you can suppress some warnings that may be printed to the console.

## Configuration system properties {#configuration-system-properties}

You can set Geyser to automatically bind to a specific address and port by using the following command line arguments.   
This is primarily aimed at server hosting providers to automatically configure servers for users.

:::note

The Geyser specific properties are prioritized over the plugin properties!

:::

- ```-DgeyserUdpPort=server``` or ```-DpluginUdpPort=server```
  - ```-1``` means UDP is not supported and will forcibly stop Geyser.
  - ```server``` means to match the port of the TCP server.
  - any other number means to use that specific port

- ```-DgeyserUdpAddress=server``` or ```-DpluginUdpAddress=server```
  - ```server``` means to match the bind address of the TCP server
  - any other string will be used as-is for the bind address.

- ```-DgeyserBroadcastPort=19132```
    - This can be used in cases where the port Geyser runs on does not match the port players use to connect to (e.g. due to port forwarding routings).
    - When not set or set to 0, it defaults to the same port that Geyser runs on

## Disabling warnings and advanced configuration {#disabling-warnings-and-advanced-configuration}
You may disable some warnings that may be printed to the console by using the following command line arguments. The values shown are the defaults used by Geyser, unless otherwise noted.

:::caution

Disabling Geyser warnings from being logged will not fix the real issue! Only disable them if you know what you are doing.

:::

- `-DGeyser.PrintSecureChatInformation=true`
  - Allows you to disable the warning about secure chat being disabled. 
  Since the warning is sent when the server sends the warning, this option does not do much anymore.
- `-DGeyser.ShowScoreboardLogs=true`
  - Allows you to disable warnings related to scoreboards, such as "Tried to update score without the existence of its requested objective".
- `-DGeyser.ShowResourcePackLengthWarning=true`
  - Allows you to disable the warning about a resource pack having too long paths. Disabling this warning will not fix the underlying issue! 
  Console players might not be able to join your server at all if you have a resource pack with paths exceeding the 80 character limit.
- `-DGeyser.PrintPingsInDebugMode=true`
  - Controls if pings are being logged in debug mode.
- `-DGeyser.UseDirectAdapters=true`
  - Allows you to disable the usage of NMS adapters. Disabling will result in a performance penalty and should only be used for debugging.
  This is Spigot-only and will not work on other platforms.
- `-DGeyser.BedrockNetworkThreads=8`
  - Allows you to set the number of threads used for the Bedrock networking. This is not set to a specific number by default, but is instead calculated based on the available resources.
- `-DGeyser.AddTeamSuggestions=true`
  - Allows you to turn off suggestions for teams in the scoreboard command. This is enabled by default, disabling this can help with performance if there are a lot of teams defined. 
  Setting "command-suggestions" to false in the config will also disable this.
- `-DGeyser.RakPacketLimit=120`
  - Sets RakNet's per-ip per-tick (10ms) post-connection packet limit.
- `-DGeyser.RakGlobalPacketLimit=100000`
  - Sets RakNet's per-tick (10ms) overall packet limit.
- `-DGeyser.RakRateLimitingDisabled=false`
  - Allows you to disable RakNet's post-connection rate limiter. The rate limiter should not be disabled unless initial RakNet connections are being handled by a reverse proxy.
- `-DGeyser.RakSendCookie=true`
  - Allows you to disable sending and validation of a cookie challenge in [Open Connection Reply 1](https://wiki.vg/Raknet_Protocol#Open_Connection_Reply_1) packet. This should not be set to `false` unless Geyser is running behind a reverse proxy that is also sending a challenge to prevent IP spoofing.

## Geyser-Standalone Specific Options {#geyser-standalone-specific-options}

### `--config [file]` {#--config-file}
- **Alias: `-c`**
- Points to an alternative config file to use.

### `--gui` / `--nogui` {#--gui----nogui}
- **Alias: `gui` / `nogui`**:
- Forces GUI or non-GUI usage, depending on context.

## Overriding specific config values {#overriding-specific-config-values}
Overriding a standard config option (e.g. `command-suggestions`):

`--command-suggestions=false`

Overriding a nested config option(e.g. the `remote` section with `address`):

`--remote.address=test.geysermc.org`
