---
title: Rainbow
description: A Minecraft mod to generate Geyser item mappings and bedrock resourcepacks for use with Geyser's Custom Item API V2.
---

Rainbow is a Fabric client-sided Minecraft mod to generate Geyser item mappings and bedrock resourcepacks for use with Geyser's custom item API (v2) for use on servers. 

## What is Rainbow? {#what-is-rainbow}

Rainbow is a generator to create Geyser item mappings and Bedrock Edition resource packs, it uses the Geyser Custom Item API V2 format to allow the use of 1.21.4+ Java Edition packs.

:::caution

This project is early in development! Any bugs and issues should be reported in our [Discord](https://discord.gg/geysermc).

:::

## Usage {#usage}

To use Rainbow:
1. You need setup a Fabric client for Java Edition and ensure the mod is present on the client.
2. Join your server of choice to start converting packs and run `/rainbow create <pack name>` with `<pack name>` being the name of your output pack.
3. You can map things in a couple of ways:
    - Hold each item in your hand one by one and run `/rainbow map` after holding each one.
    - Fill your inventory with the custom items and run `/rainbow mapinventory` to map your entire inventory.
    - Run `/rainbow auto inventory` and open a UI with the custom content (For example, a chest or command from a plugin to show custom content.), stop this with `/rainbow auto stop`.
4. Run `/rainbow finish` to finish your conversion, Rainbow will then output your pack and mappings file to `<instance folder>/rainbow/<pack name>`, optionally, you can click the `Wrote pack to disk` message in chat to open the folder.
5. In this folder, you will find 3 files, `pack.zip` which you put in your `packs` folder of your server, `geyser_mappings.json` which you put in your `custom_mappings` folder of your server and finally `report.txt` which you can send in our [Discord](https://discord.gg/geysermc) if you face issues, otherwise, you can ignore this file.

## Download {#download} 

You can download Rainbow [here](/download/?project=other-projects&rainbow=expanded).

## Contributing {#contributing}

Any contributions are appreciated. Please feel free to reach out to us on [Discord](https://discord.gg/geysermc) if
you're interested in helping out with Rainbow.

### Project Setup {#project-setup}

1. Clone the repo to your computer
2. Run gradlew build and locate to bootstrap/build folder.
