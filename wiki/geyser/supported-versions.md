---
title: Supported versions
description: Information on the versions Geyser supports.
---

import { Versions } from '@site/src/components/Versions'
import DocCardList from '@theme/DocCardList';

# Currently supported versions

:::info
**Geyser currently supports Minecraft Bedrock <Versions platform="bedrock"/> and Minecraft Java <Versions platform="java"/>**. 
:::

## Using Geyser with older Minecraft: Bedrock edition versions
Older Bedrock versions are not supported. Minecraft: Bedrock Edition updates automatically on all platforms, so there are few users who would
want to use older versions. Further, older Bedrock versions do not have all features which Geyser support, which would lead to a sub-par experience.

## Using Geyser on older Minecraft: Java edition servers
Geyser emulates a <Versions platform="java"/> client, so a Java server must accept users using that version in order for Geyser to work. 
This is possible thanks to [ViaVersion](https://viaversion.com/), which allows Java edition players with newer versions to join servers 
that run older versions of the game.

### Using Geyser-Spigot on a Spigot/Paper server running on 1.16.5 or above
You can use Geyser-Spigot on servers that run on 1.16.5 or above. Do note that Geyser requires Java 17 to run! You will also need to run at least Java 17 or later to use Geyser. See [here](https://docs.papermc.io/misc/java-install) for more info on updating Java. Paper versions not supporting Java 17 can add `-DPaper.IgnoreJavaVersion=true` flag to the Java startup arguments to allow Paper to run on Java 17.

In order for Bedrock players to chat (1.19.3+) or join (1.19.1/1.19.2), you need to disable chat signing. More information about that can be read on the [chat signing page](/wiki/geyser/secure-chat).

### Using Geyser-Spigot on a Spigot/Paper server running on a version below 1.16.5
This is unfortunately not possible. You'll need to use a proxy such as Velocity or BungeeCord, or set up Geyser-Standalone separately with the [ViaVersion](https://github.com/ViaVersion/ViaVersion) plugin. Another alternative would be to install [ViaProxy](https://github.com/ViaVersion/ViaProxy), which is a standalone ViaVersion proxy that 
translates between different Minecraft: Java edition versions, and to install Geyser-ViaProxy on it.

### Using Geyser-Fabric or Geyser-NeoForge on servers that do not run <Versions platform="java"/>
Unfortunately, Geyser-Fabric and Geyser-NeoForge only support the latest version of Minecraft: Java edition. The recommended way to still use
Geyser with older versions would be to install [ViaProxy](https://github.com/ViaVersion/ViaProxy), which is a standalone ViaVersion proxy that 
translates between different Minecraft: Java edition versions, and to install Geyser-ViaProxy on it. This will also work with Floodgate auth.

### Using Geyser-Velocity or Geyser-BungeeCord on a proxy
Make sure you update your proxy software to the latest available version, and, if the backend servers are not on <Versions platform="java"/>, also install the [ViaVersion](https://github.com/ViaVersion/ViaVersion) plugin on the backend servers. Velocity/BungeeCord support most Minecraft versions, so you can update them regardless of the backend server versions.