---
title: Rainbow
description: A tool to convert custom content to Bedrock.
---

Rainbow is a client-sided Minecraft mod to convert resource packs with custom content created for Java Edition to
an equivalent resource pack for Bedrock Edition, together with custom mappings to be used in Geyser. Rainbow is available
for the Fabric modloader.

Rainbow can be downloaded at [our website](https://geysermc.org/download?project=other-projects&rainbow=expanded),
or over at [Modrinth](https://modrinth.com/mod/rainbow-mod).

:::info
Rainbow is a mod installed on the Java client! As such, you need to be able to use a Java client to use Rainbow.
Rainbow can be used with every resource pack, regardless of your server's software (it may be used with Spigot or
Paper servers, for example).
:::

:::warning
Rainbow is used to convert resource packs adding new, custom content. For resource packs modifying vanilla content,
you should look into using [Thunder](/wiki/other/thunder).
:::

:::caution
This project is in early development! Any bugs and issues should be reported at its [issue tracker](https://github.com/GeyserMC/Rainbow/issues).
:::

You can use Rainbow to convert custom content of datapacks (that require a resource pack), custom content plugins like Nexo or ItemsAdder, or even
server-side only Fabric/NeoForge mods, such as Polymer mods. However, these custom content providers may use
[item displays](https://minecraft.wiki/w/Display), which Geyser does not yet support. This may result in your custom blocks or items
not rendering on Bedrock when placed in the world.

You can use extensions created by the community, such as [GeyserDisplayEntity](https://github.com/GeyserExtensionists/GeyserDisplayEntity),
to add support for item displays to Geyser. However, keep in mind that these are not created by or affiliated with Geyser,
and as such any issues that may occur should not be reported to us.

## Usage {#usage}

Rainbow works by analysing the loaded resource packs on the client and extracting the custom content found. As such,
you need to ensure all the necessary resource packs for your custom content are loaded on your client. If custom content
appears correctly on your Java client, then Rainbow is able to analyse it.

Generally, you use Rainbow as follows:

1. Set up a Java Edition 26.1 client, with Fabric installed, and ensure that Rainbow is present on your client.
2. Join a world or server of choice and make sure all the necessary resource packs are loaded. Then, run `/rainbow create <pack name>`, with `<pack name>` replaced with the name of your resource pack on Bedrock Edition.
3. You can then start converting (or "mapping") custom content to be exported in your Bedrock resource pack. You can find a full list of ways to map custom content below.
4. Run `/rainbow finish` to finish your conversion. Rainbow will then output the generated resource pack and additional files to `.minecraft/rainbow/<pack name>`. You can click the `Wrote pack to disk` message in chat to open that folder.
5. In this folder, you'll find 5 important files/folders:
    - `custom-skulls.yml`: put this in Geyser's config folder. These are the exported player skulls. The file may already exist in Geyser's config folder, be careful with overwriting it!
    - `custom_mappings`: you need to put the files in here in the `custom_mappings` folder in Geyser's config folder. These are the generated Geyser mappings.
    - `pack.zip`: this is the generated resource pack for Bedrock Edition. You need to put this file in the `packs` folder in Geyser's config folder.
    - `lang`: you need to put all files in this folder in the `locales/overrides` folder in Geyser's config folder.
      - The folder can be empty or non-existent if no language files were found. This is usually not an issue!
    - `report.txt`: you don't need to do anything with this file, but it contains information about generated assets and possible problems that occurred. It can be useful to diagnose potential issues with Rainbow, and you should upload it when filing a bug report.
6. Once you've taken all the necessary steps and uploaded the generated content to your Geyser server, restart your server. If everything went well, Bedrock users should now see your custom content!

### Mapping custom blocks

Rainbow is able to map custom blocks that are created by overriding unused vanilla block states. Most blocks can automatically
be mapped by running `/rainbow auto blocks`, which will scan through all loaded resource packs for custom blocks created using block state overrides,
and mapping all that are found.

:::warning
Running `/rainbow auto blocks` may shortly freeze your client.
:::

With some resource packs, Rainbow may not be able to automatically detect all custom blocks. In this case, you may have to
map blocks manually, which you can do by using `/rainbow map block <target>`, where `<target>` is a position in the world,
at which a custom block is placed.

### Mapping custom items and skulls

Rainbow supports mapping custom items, by detecting items with custom `minecraft:item_model` or `minecraft:custom_model_data` components.
Rainbow is also able to map custom skulls. Each method of mapping custom items is described below.

#### Mapping manually

You can map custom items manually by running `/rainbow map item`. This will map the custom item or skull you're currently
holding in your hand in-game, if any. You can also run `/rainbow mapinventory`, which will scan your entire inventory
for any custom items or skulls, and maps all that are found.

:::info
Rainbow is automatically able to find most kinds of custom items when using `mapinventory`, however,
items created by overriding a vanilla item model definition may not be automatically detected,
so you'll have to map these explicitly.
:::

#### Mapping inventory menus automatically

Custom item plugins, like Nexo or ItemsAdder, commonly include an inventory menu listing all custom items. Rainbow
can make use of this and automatically map all items listed in such an inventory menu, by running `/rainbow auto inventory`.
This will scan all inventory menus and containers you open for custom items or skulls, and maps all that are found.
You can also use this with chests that are filled with custom items, for example.

Run `/rainbow auto stop` to stop the mapping of custom items.

:::info
Like with `mapinventory`, items created by overriding a vanilla item model definition may not be automatically detected,
so you'll have to map these explicitly.
:::

#### Mapping custom items from recipe outputs automatically

Rainbow is able to search through all known recipes for outputs that are custom items or skulls, and map any that are found,
by running `/rainbow auto recipes`. This can be useful when mapping datapacks that add large amounts of custom items with
custom recipes, for example.

:::info
You can use the vanilla `/recipe give @s *` command to give yourself all recipes, which helps Rainbow recognise custom items when using this
way of mapping items.
:::

:::info
As with `mapinventory` and `auto inventory`, items created by overriding a vanilla item model definition may not be automatically detected,
so you'll have to map these explicitly.
:::

### Mapping custom sounds

Custom sounds may be mapped by using `/rainbow auto sounds`, which scans through all loaded resource packs for custom sounds,
and maps all that are found. You may also use `/rainbow map sound <namespace>`, which maps all the custom sounds
of the given namespace. This can be useful when you only want to export custom sounds of a single resource pack.

## Capabilities and limitations

Rainbow is currently capable of the following:

- Generating Geyser block mappings for custom blocks made using block state overrides, both automatically and manually from loaded resource packs.
- Generating Geyser item mappings complete with data components and proper bedrock options, by detecting items with custom `minecraft:item_model` or `minecraft:custom_model_data` components, and analysing their components.
   - Also includes generating mappings with predicates for more complicated Java item model definitions, such as checks for if an item is broken. The following definition types are currently supported by Rainbow:
      - Plain item model definitions.
      - Conditional item models, supported properties are:
         - `broken`,
         - `damaged`,
         - `custom_model_data`,
         - `has_component`, and,
         - `fishing_rod/cast`.
      - Range dispatch item models, supported properties are:
         - `bundle/fullness`,
         - `count`,
         - `custom_model_data`, and,
         - `damage`.
      - Select item models, supported properties are:
         - `charge_type`,
         - `trim_material`,
         - `context_dimension`, and,
         - `custom_model_data`.
         - For the `display_context` property, the `gui` case is mapped, if present.
   - Also includes detecting if an item should be displayed handheld by looking at the item's model.
   - Also is able to detect and map items using the "legacy" `custom_model_data` range-dispatch style, and map them to Geyser's `legacy` item mappings.
- Generating a simple Bedrock resource pack for blocks and simple 2D items, as well as:
   - Simple custom armour items, by analysing an item's `minecraft:equippable` component and loaded equipment assets.
      - Custom elytra items also work, but only visually, due to bedrock limitations.
   - 3D items, by converting the Java model to a bedrock one, and generating an attachable and animations for it, as well as rendering a custom GUI icon.
      - Is able to translate display transformations for the head, first-person and third-person item slots.
   - Custom sounds.
- Generating working animated (flipbook) textures for 2D items and 3D items that make use of a single texture only.
- Exporting merged language files from loaded resource packs to a folder, for easy copying to Geyser's `locales/overrides` folder.
   - Files from different resource packs for the same language are merged together.

## Contributing {#contributing}

Any contributions are appreciated. Please feel free to reach out to us on [Discord](https://discord.gg/geysermc) if
you're interested in helping out with Rainbow.
