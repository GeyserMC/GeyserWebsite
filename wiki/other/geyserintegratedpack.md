---
title: GeyserIntegratedPack
description: GeyserIntegratedPack is a Bedrock resource pack that fixes parity issues with Geyser to bring Bedrock Edition in line with Java Edition.
---

:::info
Since Geyser builds #982 and above, users no longer need to manually add this resource pack as it is natively shipped with Geyser.
:::

GeyserIntegratedPack is a Bedrock resource pack that adds more features to Geyser to bring Bedrock Edition in line with Java Edition. 
A resource pack allows various features and bug fixes to be implemented in Bedrock, including:

- Armor base arms/baseplate visibility
- Armor stand poses
- Illusioners
- Missing particles
- Offhand animations
- Shulker invisibility parity
- Spectral arrow entity texture
- Bypass for the scoreboard character limit
- Hides UI elements that do not exist on Java edition, such as:
  - Text input field in the cartography table
  - 2x2 crafting grid while in creative mode
  - Tick-delay and rename fields in the command block menu
  - Structure block options that do not exist on Java
- Hides the accessibility background on titles for the weapon cooldown
  
A more complete list can be found on the optional pack's [README](https://github.com/GeyserMC/GeyserOptionalPack/blob/master/README.md). Implementation details for those interested in how features are added can be found [here](https://github.com/GeyserMC/GeyserOptionalPack/blob/master/developer_documentation.md).

## Resource pack conflicts {#resource-pack-conflicts}

If your current server resource pack contains any [entity definitions](https://github.com/GeyserMC/GeyserOptionalPack/tree/master/entity) that overlap with the optional pack, you will need to merge the definitions for these entities for the optional pack and your own pack to work correctly. 
Otherwise, the prevailing entity definition will be based on pack application order. This process is best performed manually due to the complexity of entity definition files, though it can also be [scripted](https://gist.github.com/Kas-tle/89c6adc3e7901fbabd1b9f71d902d0a6).
