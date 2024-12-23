---
title: crwdns19809:0crwdne19809:0
description: crwdns19823:0crwdne19823:0
---

crwdns19825:0crwdne19825:0 crwdns19827:0crwdne19827:0 crwdns19829:0crwdne19829:0 crwdns19831:0crwdne19831:0 crwdns19833:0crwdne19833:0 crwdns19835:0crwdne19835:0 crwdns19841:0crwdne19841:0 crwdns19847:0crwdne19847:0 crwdns19851:0crwdne19851:0

crwdns19853:0crwdne19853:0 crwdns19855:0[crwdnd19855:0](#custom-skullsyml)crwdnd19855:0[crwdnd19855:0](#geyser-extensions)crwdne19855:0

## crwdns19857:0{#enabling-custom-skulls}crwdne19857:0

crwdns19859:0`add-non-bedrock-items`crwdnd19859:0`true`crwdnd19859:0`config.yml`crwdne19859:0 crwdns19877:0crwdne19877:0 crwdns19885:0`custom-skulls.yml`crwdne19885:0

```yaml
# Whether to add any items and blocks which normally does not exist in Bedrock Edition.
# This should only need to be disabled if using a proxy that does not use the "transfer packet" style of server switching.
# If this is disabled, furnace minecart items will be mapped to hopper minecart items.
# Geyser's block, item, and skull mappings systems will also be disabled.
# This option requires a restart of Geyser in order to change its setting.
add-non-bedrock-items: true
```

## crwdns19891:0{#custom-skullsyml}crwdne19891:0

crwdns19897:0`custom-skulls.yml`crwdne19897:0

```yml
# --------------------------------
# Geyser Custom Skull Configuration Files
#
# This file is ignored with `add-custom-skull-blocks` disabled.
# See `config.yml` for the main set of configuration values
#
# Custom skulls with the player username, UUID, or texture specified in this file
# will be translated as custom blocks and be displayed in the inventory and on entities.
# --------------------------------

# Java player usernames
# Skins will be updated when Geyser starts and players will have to re-download
# the resource pack if any players had changed their skin.
player-usernames:
  - GeyserMC

# Java player UUIDs
# Skins will be updated when Geyser starts and players will have to re-download
# the resource pack if any players had changed their skin.
player-uuids:
  - 8b8d8e8f-2759-47c6-acb5-5827de8a72b8

# The long string of characters found in the NBT of custom player heads
player-profiles:
  - ewogICJ0aW1lc3RhbXAiIDogMTY1NzMyMjIzOTgzMywKICAicHJvZmlsZUlkIiA6ICJjZGRiZTUyMGQwNDM0YThiYTFjYzlmYzkyZmRlMmJjZiIsCiAgInByb2ZpbGVOYW1lIiA6ICJBbWJlcmljaHUiLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYTkwNzkwYzU3ZTE4MWVkMTNhZGVkMTRjNDdlZTJmN2M4ZGUzNTMzZTAxN2JhOTU3YWY3YmRmOWRmMWJkZTk0ZiIsCiAgICAgICJtZXRhZGF0YSIgOiB7CiAgICAgICAgIm1vZGVsIiA6ICJzbGltIgogICAgICB9CiAgICB9CiAgfQp9

# The hash of the skin on Minecraft's skin server
skin-hashes:
  - a90790c57e181ed13aded14c47ee2f7c8de3533e017ba957af7bdf9df1bde94f
```

crwdns19901:0crwdne19901:0 crwdns19905:0crwdne19905:0

### crwdns19907:0{#player-usernames}crwdne19907:0

crwdns19909:0crwdne19909:0 crwdns19911:0crwdne19911:0 crwdns19913:0crwdne19913:0

### crwdns19915:0{#player-uuids}crwdne19915:0

crwdns19917:0crwdne19917:0 crwdns19919:0crwdne19919:0 crwdns19921:0crwdne19921:0

### crwdns19923:0{#player-profiles}crwdne19923:0

crwdns19925:0crwdne19925:0 crwdns19927:0crwdne19927:0 crwdns19929:0crwdne19929:0 crwdns19931:0crwdne19931:0 crwdns19933:0crwdne19933:0

```json
{
  "timestamp" : 1657322239833,
  "profileId" : "cddbe520d0434a8ba1cc9fc92fde2bcf",
  "profileName" : "Amberichu",
  "textures" : {
    "SKIN" : {
      "url" : "http://textures.minecraft.net/texture/a90790c57e181ed13aded14c47ee2f7c8de3533e017ba957af7bdf9df1bde94f",
      "metadata" : {
        "model" : "slim"
      }
    }
  }
}
```

crwdns19935:0`/paper dumpitem`crwdne19935:0 crwdns19937:0crwdne19937:0 crwdns19939:0`SkullOwner`crwdnd19939:0`Properties`crwdnd19939:0`textures`crwdnd19939:0`Value`crwdne19939:0 crwdns19941:0crwdne19941:0

```log
[05:58:07 INFO]: .KastleFirefox issued server command: /paper dumpitem
[05:58:07 INFO]: minecraft:player_head{display: {Name: '{"text":"Test"}'}, SkullOwner: {Properties: {textures: [{Value: "ewogICJ0aW1lc3RhbXAiIDogMTY1NzMyMjIzOTgzMywKICAicHJvZmlsZUlkIiA6ICJjZGRiZTUyMGQwNDM0YThiYTFjYzlmYzkyZmRlMmJjZiIsCiAgInByb2ZpbGVOYW1lIiA6ICJkYXZjaG9vIiwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlL2E5MDc5MGM1N2UxODFlZDEzYWRlZDE0YzQ3ZWUyZjdjOGRlMzUzM2UwMTdiYTk1N2FmN2JkZjlkZjFiZGU5NGYiLAogICAgICAibWV0YWRhdGEiIDogewogICAgICAgICJtb2RlbCIgOiAic2xpbSIKICAgICAgfQogICAgfQogIH0KfQ"}]}, Id: [I; -229048314, -553040501, -1407961158, 465313087]}}
```

### crwdns19943:0{#skin-hashes}crwdne19943:0

crwdns19945:0crwdne19945:0 crwdns19947:0crwdne19947:0 crwdns19949:0`http://textures.minecraft.net/texture/a90790c57e181ed13aded14c47ee2f7c8de3533e017ba957af7bdf9df1bde94f`crwdnd19949:0`a90790c57e181ed13aded14c47ee2f7c8de3533e017ba957af7bdf9df1bde94f`crwdne19949:0 crwdns19951:0crwdne19951:0

crwdns19953:0crwdne19953:0

## crwdns19955:0{#geyser-extensions}crwdne19955:0

crwdns19957:0crwdne19957:0 crwdns19959:0crwdne19959:0

crwdns19961:0crwdne19961:0

```java
public class RegisterCustomSkull implements Extension {
    //...
}
```

crwdns19963:0`GeyserDefineCustomSkullsEvent`crwdne19963:0

```java
public class RegisterCustomSkull implements Extension {
    @Subscribe
    public void onDefineCustomSkulls(GeyserDefineCustomSkullsEvent event) {
        //...
    }
}
```

crwdns19965:0crwdne19965:0 crwdns19967:0crwdne19967:0

```java
public class RegisterCustomSkull implements Extension {
    @Subscribe
    public void onDefineCustomSkulls(GeyserDefineCustomSkullsEvent event) {
        String profile = "ewogICJ0aW1lc3RhbXAiIDogMTY1NzMyMjIzOTgzMywKICAicHJvZmlsZUlkIiA6ICJjZGRiZTUyMGQwNDM0YThiYTFjYzlmYzkyZmRlMmJjZiIsCiAgInByb2ZpbGVOYW1lIiA6ICJkYXZjaG9vIiwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlL2E5MDc5MGM1N2UxODFlZDEzYWRlZDE0YzQ3ZWUyZjdjOGRlMzUzM2UwMTdiYTk1N2FmN2JkZjlkZjFiZGU5NGYiLAogICAgICAibWV0YWRhdGEiIDogewogICAgICAgICJtb2RlbCIgOiAic2xpbSIKICAgICAgfQogICAgfQogIH0KfQ"
        event.register(profile, SkullTextureType.PROFILE);
    }
}
```

## crwdns19969:0{#scraping-custom-skulls-from-a-world}crwdne19969:0

crwdns19971:0[crwdnd19971:0](https://github.com/davchoo/HeadExtractor)crwdne19971:0 crwdns19973:0crwdne19973:0
