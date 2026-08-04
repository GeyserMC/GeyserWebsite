---
title: Custom Content
description: How to use custom content (requiring resource packs) with Geyser.
---

Geyser supports mapping various custom additions to the game via resource packs and mappings, such as custom items, blocks, and skulls. See:

- [Custom items](/wiki/geyser/custom-items)
- [Custom blocks](/wiki/geyser/custom-blocks)
- [Custom skulls](/wiki/geyser/custom-skulls)
- [Custom waypoint icons](/wiki/geyser/custom-waypoints)
- [Custom entities](/wiki/geyser/custom-entities)

:::info
Geyser does not convert resource packs from Java Edition automatically.
However, you can use automatic tools such as [Rainbow](/wiki/other/rainbow/) or [Thunder](/wiki/other/thunder) to make converting custom content simpler.
:::

## JSON mappings {#json-mappings}

Various custom additions to the game will require writing custom JSON mappings for Geyser. These mappings are placed
within the `custom_mappings` folder in Geyser's config directory. To enable the usage of custom JSON mappings, ensure
that `gameplay.enable-custom-content` is set to `true` in your `config.yml` file:

```yaml
# Whether to add any items and blocks which normally does not exist in Bedrock Edition.
# This should only need to be disabled if using a proxy that does not use the "transfer packet" style of server switching.
# If this is disabled, furnace minecart items will be mapped to hopper minecart items.
# Geyser's block, item, and skull mappings systems will also be disabled.
# This option requires a restart of Geyser in order to change its setting.
enable-custom-content: true
```

JSON mappings will always have a `format_version` key defined at the root object. Refer to the documentation of the
content you're mapping (items, blocks, etc.) to see what the current `format_version` is.
