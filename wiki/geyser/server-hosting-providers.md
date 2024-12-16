---
title: Information for server hosting providers
description: Useful information specifically aimed at server hosting providers.
---

# Information for server hosting providers

Hello! If you see this page, it's likely one of your users sent it to you as they wish to use the Geyser plugin/mod. This page aims to explain the configuration needed for Geyser, your options to automatically configure it to make it easier for users, and other noteworthy details.

# What is Geyser/Floodgate?

Geyser is a proxy allowing Minecraft: Bedrock edition users to play on Minecraft: Java edition servers. It can be used as a plugin, a mod, or as a standalone program.

# Requirements

Since Bedrock edition uses UDP (instead of TCP, as Java edition does), Geyser requires a port with UDP traffic allowed on it to properly function. Some setups, such as running Geyser in docker/pterodactyl or some providers such as OVH have specific configuration requirements. See our [portforwarding guide](/wiki/geyser/port-forwarding.md) for further information.

It can be the same port as the Java server, but it cannot be shared with other plugins using UDP traffic, such as voice chat plugins/mods, or Minecraft's query.

Further, see [here](/wiki/geyser/supported-versions/) for which Minecraft versions are currently supported.

# Geyser Download API

Geyser can be automatically downloaded from Geyser's download api. See [our api docs](/wiki/api/downloads.geysermc.org/) for usage instructions. Our current download api is based on Paper's downloads api, so you might be able to re-use existing scripts.

# Auto-Configuring Geyser

For maximum convenience for users, Geyser supports automatic configuration via system properties. See [here](/wiki/geyser/geyser-command-line-arguments-and-system-properties.md) for more information.

# Adding your host to our wiki

You can add usage instructions for your host [here](/src/data/providers.ts). Doing so allows us to direct users to proper instructions.

# Contacting us

Join our discord!
