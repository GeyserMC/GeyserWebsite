---
title: GeyserIntegratedPack
description: GeyserIntegratedPack is a Bedrock resource pack that fixes parity issues with Geyser to bring Bedrock Edition in line with Java Edition.
---

:::info
Geyser includes the GeyserIntegratedPack (previously called "GeyserOptionalPack"), you do not need to add it manually!
See the "Migration" section for further details.
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
  
A more complete list can be found on the integrated pack's [README](https://github.com/GeyserMC/GeyserIntegratedPack/blob/master/README.md). 
Implementation details for those interested in how features are added can be found [here](https://github.com/GeyserMC/GeyserIntegratedPack/blob/master/developer_documentation.md).

## Migration from GeyserOptionalPack {#migration}

Users previously using the GeyserOptionalPack should remove it to allow Geyser to serve the GeyserIntegratedPack instead.
This change has one main benefit: automatic updates, and it is a preparation for advanced features that are tied-in to Geyser (such 
as a proper Java-style attack indicator!). 

You can also disable the GeyserIntegratedPack in Geyser's config if you do not wish to have these changes applied.

### What changed?
- The resource pack uuid and version have been changed
- The GeyserIntegratedPack is being sent with a lower priority in the clients resource pack stack (the order in which 
resource packs are applied), so manual overrides are possible
- With Geyser including the pack, you no longer need to worry about updating the pack yourself!

### How to migrate?

If you previously downloaded the GeyserOptionalPack from Geyser's download page, you can simply remove it from Geyser's
`packs` folder and let Geyser apply the GeyserIntegratedPack - and you're done!

However, if you were applying modifications to the resource pack, there are more things to be done:
- You should separate out your changes into a separate resource pack. The GeyserIntegratedPack has a low priority in the 
resource pack stack, so your changes in your resource pack will take priority. 
- If you modify entity definitions that the GeyserIntegratedPack changes, make sure to merge the definitions manually!

Users utilizing the UrlPackCodec should also serve the GeyserIntegratedPack instead (available [here](https://github.com/GeyserMC/GeyserIntegratedPack)).
Geyser will still perform checks to ensure the "manually" included version isn't outdated, so we recommend to regularly poll 
Geyser's downloads API for pack updates.

## Resource pack conflicts {#resource-pack-conflicts}

If your current server resource pack contains any entity definitions that overlap with Geyser's changes (found [here](https://github.com/GeyserMC/GeyserIntegratedPack/tree/master/src/main/resources/integratedpack/entity) 
and [here](https://github.com/GeyserMC/GeyserIntegratedPack/tree/master/src/main/resources/patches/entity)),
you will need to merge the definitions for these entities for the optional pack and your own pack to work correctly. 
The Bedrock client will prioritize the entity definition based on pack application order - highest wins! This process is best performed manually 
due to the complexity of entity definition files, though it can also be [scripted](https://gist.github.com/Kas-tle/89c6adc3e7901fbabd1b9f71d902d0a6).
