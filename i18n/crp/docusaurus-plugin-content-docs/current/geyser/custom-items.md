---
title: crwdns19975:0crwdne19975:0
description: crwdns19977:0crwdne19977:0
---

crwdns19979:0crwdne19979:0 crwdns19981:0[crwdnd19981:0](#json-mappings)crwdnd19981:0[crwdnd19981:0](#geyser-extensions)crwdne19981:0

## crwdns19983:0{#json-mappings}crwdne19983:0

1. crwdns19985:0`custom_mappings`crwdne19985:0 crwdns19987:0`Geyser.jar`crwdne19987:0
2. crwdns19989:0`.json`crwdne19989:0 crwdns19991:0crwdne19991:0 crwdns19993:0crwdne19993:0

```json
{
    "format_version": 1,
    "items": {

    }
}
```

3. crwdns19995:0`items`crwdne19995:0

```json
"minecraft:JAVA_ITEM": [

]
```

4. crwdns19997:0crwdne19997:0

```json
{
    "name": "my_item"
}
```

5. crwdns19999:0crwdne19999:0
   - crwdns20001:0`custom_model_data`crwdne20001:0
   - crwdns20003:0`damage_predicate`crwdne20003:0
   - crwdns20005:0`unbreakable`crwdne20005:0
6. crwdns20007:0crwdne20007:0 crwdns20009:0crwdne20009:0
   - crwdns20011:0`display_name`crwdne20011:0
   - crwdns20013:0`icon`crwdne20013:0
   - crwdns20015:0`allow_offhand`crwdne20015:0
   - crwdns20017:0`texture_size`crwdne20017:0
   - crwdns20019:0`creative_category`crwdne20019:0 crwdns20021:0crwdne20021:0 crwdns20023:0crwdne20023:0 crwdns20025:0crwdne20025:0
   - crwdns20027:0`creative_group`crwdne20027:0 crwdns20029:0crwdne20029:0 crwdns20031:0[crwdnd20031:0](https://wiki.bedrock.dev/documentation/menu-categories.html#list-of-categories)crwdne20031:0
   - crwdns20033:0`render_offsets`crwdne20033:0 crwdns20035:0crwdne20035:0 crwdns20037:0crwdne20037:0 crwdns20039:0crwdne20039:0
   - crwdns20041:0`tags`crwdne20041:0 crwdns20043:0crwdne20043:0 crwdns20045:0[crwdne20045:0
   ```json
   "render_offsets": {
       "main_hand": {
           "first_person": {
               "position": {
                   "x": 0,
                   "y": 0,
                   "z": 0
               },
               "rotation": {
                   "x": 0,
                   "y": 0,
                   "z": 0
               },
               "scale": {
                   "x": 0,
                   "y": 0,
                   "z": 0
               }
           },
           "third_person": {

           }
       },
       "off_hand": {

       }
   }
   ```

## crwdns20047:0{#geyser-extensions}crwdne20047:0

### crwdns20049:0{#extending-a-vanilla-item}crwdne20049:0

1. crwdns20051:0crwdne20051:0 crwdns20053:0crwdne20053:0

```java
CustomItemOptions itemOptions = CustomItemOptions.builder()
        .customModelData(1)
        .damagePredicate(1) //This is a fractional value of damage/max damage and not a number between 0 and 1.
        .unbreakable(true)
        .build();
```

2. crwdns20055:0crwdne20055:0

```java
CustomItemData data = CustomItemData.builder()
        .name("my_item")
        .customItemOptions(itemOptions)
        .build();
```

3. crwdns20057:0crwdne20057:0 crwdns20059:0crwdne20059:0

```java
.displayName("displayName"); //Default: item name
.icon("my_icon"); //Default: item name
.allowOffhand(false); //Default: false
.textureSize(16); //Default: 16
.renderOffsets(new CustomRenderOffsets(...)); //Default: no render offset
```

4. crwdns20061:0crwdne20061:0

```java
@Subscribe
public void onGeyserPreInitializeEvent(GeyserDefineCustomItemsEvent event) {
    event.registerCustomItem("minecraft:JAVA_ITEM", data);
}
```

### crwdns20063:0{#non-vanilla-modded-items-with-geyser-extensions-for-example-to-use-with-fabric}crwdne20063:0

1. crwdns20065:0crwdne20065:0

```java
NonVanillaCustomItemData data = NonVanillaCustomItemData.builder()
        .name("my_item")
        .identifier("my_mod:my_item")
        .javaId(1)
```

2. crwdns20067:0crwdne20067:0 crwdns20069:0[crwdnd20069:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/item/custom/NonVanillaCustomItemData.java)crwdne20069:0
3. crwdns20071:0crwdne20071:0

```java
@Subscribe
public void onGeyserDefineCustomItemsEvent(GeyserDefineCustomItemsEvent event) {
    event.register(data);
}
```

## crwdns20073:0{#resource-pack}crwdne20073:0

1. crwdns20075:0crwdne20075:0 crwdns20077:0[crwdnd20077:0](https://wiki.bedrock.dev/guide/project-setup.html#rp-manifest)crwdne20077:0
2. crwdns20079:0`textures`crwdne20079:0
3. crwdns20081:0`item_texture.json`crwdnd20081:0`textures`crwdne20081:0

```json
{
  "resource_pack_name": "MY_PACK_NAME_HERE",
  "texture_name": "atlas.items",
  "texture_data": {
    
  }
}
```

4. crwdns20083:0crwdne20083:0 crwdns20085:0crwdne20085:0

```json
"my_item": {
    "textures": [
        "textures/items/my_item"
    ]
}
```

5. crwdns20087:0`textures/items`crwdne20087:0 crwdns20089:0`item_texture.json`crwdne20089:0
