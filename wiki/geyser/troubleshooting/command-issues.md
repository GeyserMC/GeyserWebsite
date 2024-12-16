---
title: Command/Permission issues
description: This page aims to resolve issues about being unable to run or use Geyser commands.
---

# Resolving issues related to commands and command permissions

---------

# Geyser commands not available to players

See [our page on commands](/wiki/geyser/commands/) for information on how to grant permissions to players.
For Floodgate commands, see [here](/wiki/floodgate/commands).

---------

# Bedrock clients freeze when opening up commands for the first time

Disable `command-suggestions` in your Geyser config. This will stop the freezing at the expense of removing command suggestions from Bedrock clients.
If you're a dedicated server admin, you can have a list of commands players should be using. This will remove any unnecessary commands from tab completion as well for Java players. 
It has other benefits too. Here's a plugin that can just do that: 
[CommandWhitelist](https://www.spigotmc.org/resources/81326/). Alternatively, use the [HideCommands](https://github.com/Redned235/HideCommands) Geyser extension to hide commands just for Bedrock players.

---------

# Unable to whitelist / op Bedrock players

## Whitelist command
To whitelist Bedrock players when using Floodgate, use the [`/fwhitelist` command](/wiki/floodgate/features#whitelist-command) provided by Floodgate. 

## For other commands:
In some instances, like if you have the `username-prefix` set to `*`, you may need to wrap the Bedrock player's username in quotes; for example: `/tp "*BedrockPlayer"`. Setting the prefix to `.` should also fix this.
