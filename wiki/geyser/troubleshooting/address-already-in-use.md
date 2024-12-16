---
title: Resolving Address already in use
description: A small guide on resolving the "Address already in use" error.
---

# Resolving "Address already in use"

This error means that something else using UDP is already running on the address/port that Geyser 
is trying to bind to.

## Potential causes
The following section lists potential causes for this issue.

### Incorrect configuration

If you are using a Minecraft server hosting provider, this can also be caused by your Geyser configuration not using 
the port assigned to your server. Please make sure you configured Geyser properly by checking our [setup guide](/wiki/geyser/setup).

:::info
If you are using a Minecraft server hosting provider, you may only have one UDP port assigned to you.
In that case, you **cannot** use multiple of the features listed here, and may need to choose one over another.
:::

### Minecraft's Query system
It also utilizes UDP, and some server hosting providers automatically enable it or change the port it is running on.
If you suspect it is conflicting with Geyser, you can disable query entirely, or change the query port.

To *disable* it: 

| Platform | Spigot/Paper/Fabric/NeoForge | BungeeCord                | Velocity                             |
|:---------|:-----------------------------|:--------------------------|:-------------------------------------|
| Filename | `server.properties`          | BungeeCord's `config.yml` | `velocity.toml`                      |
| Options  | `enable-query=false`         | `query_enabled:false`     | `[query]` section: `enabled = false` |

To *change the port* it is running on:

| Platform | Spigot/Paper/Fabric/NeoForge | BungeeCord                | Velocity                         |
|:---------|:-----------------------------|:--------------------------|:---------------------------------|
| Filename | `server.properties`          | BungeeCord's `config.yml` | `velocity.toml`                  |
| Options  | change `query.port`          | change `query_port`       | `[query]` section: change `port` |

### Voice Chat plugins/mods
You can remove them, or change the port in their respective configuration. Please consult their documentation to find out how!

### Another application using UDP

If you are self-hosting, it can also mean that something (likely another instance of Geyser) is running on the port you have specified in the config.
Please make sure you close all applications running on this port. If you don't recall opening anything, usually restarting your computer fixes this.
