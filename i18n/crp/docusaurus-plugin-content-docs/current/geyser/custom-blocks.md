---
title: crwdns21921:0crwdne21921:0
description: crwdns21923:0crwdne21923:0
---

crwdns21925:0crwdne21925:0 crwdns21927:0[crwdnd21927:0](#json-mappings)crwdnd21927:0[crwdnd21927:0](#geyser-extensions)crwdne21927:0

crwdns21929:0crwdne21929:0 crwdns21931:0crwdne21931:0 crwdns21933:0crwdne21933:0

## crwdns21935:0{#enabling-custom-blocks}crwdne21935:0

crwdns21939:0`add-non-bedrock-items`crwdnd21939:0`true`crwdnd21939:0`config.yml`crwdne21939:0

```yml
# Whether to add any items and blocks which normally does not exist in Bedrock Edition.
# This should only need to be disabled if using a proxy that does not use the "transfer packet" style of server switching.
# If this is disabled, furnace minecart items will be mapped to hopper minecart items.
# Geyser's block, item, and skull mappings systems will also be disabled.
# This option requires a restart of Geyser in order to change its setting.
add-non-bedrock-items: true
```

## crwdns21941:0{#json-mappings}crwdne21941:0

crwdns21943:0crwdne21943:0 crwdns21945:0[crwdnd21945:0](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/blockreference/examples/blockcomponents/blockcomponentslist)crwdne21945:0

crwdns21947:0`custom_mappings`crwdne21947:0 crwdns21949:0crwdne21949:0 crwdns21951:0`Geyser-Standalone.jar`crwdne21951:0 crwdns21959:0crwdne21959:0

### crwdns21965:0{#example-mappings-file}crwdne21965:0

```json
{
	"format_version": 1,
	"blocks": {
		"minecraft:granite_wall": {
			"name": "my_block",
			"display_name": "Custom Granite Wall",
			"geometry": "geometry.blocks.my_block_geo",
			"material_instances": {
				"*": {
					"texture": "some_texture",
					"render_method": "alpha_test",
					"face_dimming": true,
					"ambient_occlusion": true
				}
			},
			"tags": ["stone", "wall"],
			"state_overrides": {
				"east=none,north=none,south=none,up=true,waterlogged=true,west=none": {
					"geometry": "geometry.blocks.my_other_block_geo",
					"destructible_by_mining": 10,
					"place_air": false
				},
				"east=none,north=none,south=none,up=false,waterlogged=true,west=tall": {
					"friction": 0.6,
					"light_emission": 7,
					"light_dampening": 8,
					"transformation": {
                        "scale": [0.5, 0.5, 0.5],
                        "translation": [1, 0, 0],
                        "rotation": [0, 90, 0]
                    }
				},
				"east=none,north=none,south=low,up=true,waterlogged=true,west=tall": {
					"placement_filter": {
						"conditions": [{
							"allowed_faces": ["up", "down"],
							"block_filter": [{
									"tags": "!query.any_tag('stone')"
								},
								"minecraft:dirt"
							]
						}]
					}
				}
			}
		}
	}
}
```

### crwdns21971:0{#schema}crwdne21971:0

crwdns21979:0crwdne21979:0 crwdns21985:0`name`crwdne21985:0 crwdns21991:0crwdne21991:0

<div class="long-list" markdown="1">

- crwdns21997:0`format_version`crwdne21997:0
  - crwdns22011:0`integer`crwdne22011:0
    - crwdns22019:0crwdne22019:0
- crwdns22027:0`blocks`crwdne22027:0
  - crwdns22033:0`object`crwdne22033:0
    - crwdns22043:0crwdne22043:0
      - crwdns22047:0`minecraft:some_block`crwdne22047:0
        - crwdns22051:0`object`crwdne22051:0
          - crwdns22059:0crwdne22059:0
            - crwdns22063:0`name`crwdne22063:0
              - crwdns22067:0`string`crwdne22067:0
                - crwdns22069:0crwdne22069:0
                - crwdns22071:0crwdne22071:0
            - crwdns22073:0`collision_box`crwdne22073:0
              - crwdns22075:0`object`crwdne22075:0
                - crwdns22077:0`origin`crwdne22077:0
                  - crwdns22083:0`array`crwdne22083:0
                    - crwdns22089:0crwdne22089:0
                    - crwdns22097:0crwdne22097:0
                    - crwdns22109:0`[-8, 0, -8]`crwdnd22109:0`[8, 16, 8]`crwdne22109:0
                      - crwdns22117:0`items`crwdne22117:0
                        - crwdns22123:0`float`crwdne22123:0
                          - crwdns22129:0crwdne22129:0
                          - crwdns22135:0crwdne22135:0
                - crwdns22143:0`size`crwdne22143:0
                  - crwdns22151:0`array`crwdne22151:0
                    - crwdns22157:0crwdne22157:0
                    - crwdns22163:0crwdne22163:0
                      - crwdns22169:0`items`crwdne22169:0
                        - crwdns22177:0`float`crwdne22177:0
                          - crwdns22185:0crwdne22185:0
                          - crwdns22193:0crwdne22193:0
                - crwdns22199:0`origin`crwdnd22199:0`size`crwdnd22199:0`[-8, 0, -8]`crwdnd22199:0`[8, 16, 8]`crwdne22199:0
            - crwdns22201:0`destructible_by_mining`crwdne22201:0
              - crwdns22203:0`integer`crwdne22203:0
                - crwdns22205:0crwdne22205:0
                - crwdns22207:0crwdne22207:0
            - crwdns22213:0`display_name`crwdne22213:0
              - crwdns22221:0`string`crwdne22221:0
                - crwdns22229:0crwdne22229:0
                - crwdns22235:0crwdne22235:0
            - crwdns22243:0`extended_collision_box`crwdne22243:0
              - crwdns22249:0`object`crwdne22249:0
                - crwdns22257:0`origin`crwdne22257:0
                  - crwdns22263:0`array`crwdne22263:0
                    - crwdns22269:0crwdne22269:0
                    - crwdns22273:0crwdne22273:0
                    - crwdns22277:0`[-8, 0, -8]`crwdnd22277:0`[8, 16, 8]`crwdne22277:0
                      - crwdns22283:0`items`crwdne22283:0
                        - crwdns22291:0`float`crwdne22291:0
                          - crwdns22299:0crwdne22299:0
                          - crwdns22307:0crwdne22307:0
                - crwdns22313:0`size`crwdne22313:0
                  - crwdns22321:0`array`crwdne22321:0
                    - crwdns22327:0crwdne22327:0
                    - crwdns22335:0crwdne22335:0
                      - crwdns22351:0`items`crwdne22351:0
                        - crwdns22359:0`float`crwdne22359:0
                          - crwdns22363:0crwdne22363:0
                          - crwdns22365:0crwdne22365:0
                - crwdns22367:0`origin`crwdnd22367:0`size`crwdnd22367:0`[-8, 0, -8]`crwdnd22367:0`[8, 16, 8]`crwdne22367:0
            - crwdns22369:0`friction`crwdne22369:0
              - crwdns22371:0`float`crwdne22371:0
                - crwdns22373:0`0.0`crwdnd22373:0`1.0`crwdne22373:0
                - crwdns22375:0`0.4`crwdne22375:0
                - crwdns22377:0crwdne22377:0
            - crwdns22379:0`geometry`crwdne22379:0
              - crwdns22381:0`string`crwdne22381:0
                - crwdns22383:0crwdne22383:0
                - crwdns22385:0crwdne22385:0
              - crwdns22387:0`object`crwdne22387:0
                - crwdns22389:0crwdne22389:0
                  - crwdns22391:0`identifier`crwdne22391:0
                    - crwdns22393:0`string`crwdne22393:0
                      - crwdns22395:0crwdne22395:0
                      - crwdns22397:0crwdne22397:0
                  - crwdns22399:0`bone_visibility`crwdne22399:0
                    - crwdns22401:0`object`crwdne22401:0
                      - crwdns22403:0crwdne22403:0
                        - crwdns22405:0`bone_name`crwdne22405:0
                          - crwdns22407:0`string`crwdne22407:0
                            - crwdns22409:0crwdne22409:0
                            - crwdns22411:0crwdne22411:0
                          - crwdns22413:0`boolean`crwdne22413:0
                            - crwdns22415:0crwdne22415:0
                            - crwdns22417:0crwdne22417:0
            - crwdns22419:0`light_emission`crwdne22419:0
              - crwdns22421:0`integer`crwdne22421:0
                - crwdns22423:0`0`crwdnd22423:0`15`crwdne22423:0
                - crwdns22425:0`0`crwdne22425:0
                - crwdns22427:0crwdne22427:0
            - crwdns22429:0`light_dampening`crwdne22429:0
              - crwdns22431:0`integer`crwdne22431:0
                - crwdns22433:0`0`crwdnd22433:0`15`crwdne22433:0
                - crwdns22435:0`15`crwdne22435:0
                - crwdns22437:0crwdne22437:0
            - crwdns22439:0`material_instances`crwdne22439:0
              - crwdns22441:0`object`crwdne22441:0
                - crwdns22443:0crwdne22443:0
                  - crwdns22445:0`key`crwdne22445:0
                    - crwdns22447:0`object`crwdne22447:0
                      - crwdns22449:0crwdne22449:0 crwdns22451:0crwdne22451:0
                        - crwdns22453:0`texture`crwdne22453:0
                          - crwdns22455:0`string`crwdne22455:0
                            - crwdns22457:0crwdne22457:0
                            - crwdns22459:0crwdne22459:0
                        - crwdns22461:0`render_method`crwdne22461:0
                          - crwdns22463:0`string`crwdne22463:0
                            - crwdns22465:0`alpha_test`crwdne22465:0
                            - crwdns22467:0crwdne22467:0
                        - crwdns22469:0`face_dimming`crwdne22469:0
                          - crwdns22471:0`boolean`crwdne22471:0
                            - crwdns22473:0`false`crwdne22473:0
                            - crwdns22475:0crwdne22475:0
                        - crwdns22477:0`ambient_occlusion`crwdne22477:0
                          - crwdns22479:0`boolean`crwdne22479:0
                            - crwdns22481:0`false`crwdne22481:0
                            - crwdns22483:0crwdne22483:0
            - crwdns22485:0`place_air`crwdne22485:0
              - crwdns22487:0`boolean`crwdne22487:0
                - crwdns22489:0`true`crwdne22489:0
                - crwdns22491:0crwdne22491:0
            - crwdns22493:0`placement_filter`crwdne22493:0
              - crwdns22495:0`object`crwdne22495:0
                - crwdns22497:0crwdne22497:0
                  - crwdns22499:0`conditions`crwdne22499:0
                    - crwdns22501:0`array`crwdne22501:0
                      - crwdns22503:0crwdne22503:0
                        - crwdns22505:0`allowed_faces`crwdne22505:0
                          - crwdns22507:0`array`crwdne22507:0
                            - crwdns22509:0crwdne22509:0
                              - crwdns22511:0`items`crwdne22511:0
                                - crwdns22513:0`string`crwdne22513:0
                                  - crwdns22515:0`up`crwdnd22515:0`down`crwdnd22515:0`north`crwdnd22515:0`south`crwdnd22515:0`east`crwdnd22515:0`west`crwdne22515:0
                                  - crwdns22517:0crwdne22517:0
                              - crwdns22519:0`block_filter`crwdne22519:0
                                - crwdns22521:0`array`crwdne22521:0
                                  - crwdns22523:0crwdne22523:0
                                    - crwdns22525:0`items`crwdne22525:0
                                      - crwdns22527:0`string`crwdne22527:0
                                        - crwdns22529:0crwdne22529:0
                                          - crwdns22531:0`object`crwdne22531:0
                                            - crwdns22533:0crwdne22533:0
                                              - crwdns22535:0`tags`crwdne22535:0
                                                - crwdns22537:0`array`crwdne22537:0
                                                  - crwdns22539:0crwdne22539:0
            - crwdns22541:0`selection_box`crwdne22541:0
              - crwdns22543:0`object`crwdne22543:0
                - crwdns22545:0`origin`crwdne22545:0
                  - crwdns22547:0`array`crwdne22547:0
                    - crwdns22549:0crwdne22549:0
                    - crwdns22551:0crwdne22551:0
                    - crwdns22553:0`[-8, 0, -8]`crwdnd22553:0`[8, 16, 8]`crwdne22553:0
                      - crwdns22555:0`items`crwdne22555:0
                        - crwdns22557:0`float`crwdne22557:0
                          - crwdns22559:0crwdne22559:0
                          - crwdns22561:0crwdne22561:0
                - crwdns22563:0`size`crwdne22563:0
                  - crwdns22565:0`array`crwdne22565:0
                    - crwdns22567:0crwdne22567:0
                    - crwdns22569:0crwdne22569:0
                      - crwdns22571:0`items`crwdne22571:0
                        - crwdns22573:0`float`crwdne22573:0
                          - crwdns22575:0crwdne22575:0
                          - crwdns22577:0crwdne22577:0
                - crwdns22579:0`origin`crwdnd22579:0`size`crwdnd22579:0`[-8, 0, -8]`crwdnd22579:0`[8, 16, 8]`crwdne22579:0
            - crwdns22581:0`tags`crwdne22581:0
              - crwdns22583:0`array`crwdne22583:0
                - crwdns22585:0crwdne22585:0
                  - crwdns22587:0`items`crwdne22587:0
                    - crwdns22589:0`string`crwdne22589:0
            - crwdns22591:0`transformation`crwdne22591:0
              - crwdns22593:0`object`crwdne22593:0
                - crwdns22595:0crwdne22595:0
                  - crwdns22597:0`scale`crwdne22597:0
                    - crwdns22599:0`array`crwdne22599:0
                      - crwdns22603:0`[1, 1, 1]`crwdne22603:0
                      - crwdns22605:0crwdne22605:0
                        - crwdns22607:0`items`crwdne22607:0
                          - crwdns22611:0`float`crwdne22611:0
                            - crwdns22615:0`1`crwdne22615:0
                            - crwdns22619:0crwdne22619:0
                  - crwdns22623:0`translation`crwdne22623:0
                    - crwdns22627:0`array`crwdne22627:0
                      - crwdns22633:0`[0, 0, 0]`crwdne22633:0
                      - crwdns22635:0crwdne22635:0
                        - crwdns22637:0`items`crwdne22637:0
                          - crwdns22639:0`float`crwdne22639:0
                            - crwdns22641:0`0`crwdne22641:0
                            - crwdns22643:0crwdne22643:0
                  - crwdns22645:0`rotation`crwdne22645:0
                    - crwdns22647:0`array`crwdne22647:0
                      - crwdns22649:0`[0, 0, 0]`crwdne22649:0
                      - crwdns22651:0`[90, -180, 0]`crwdne22651:0
                        - crwdns22653:0`items`crwdne22653:0
                          - crwdns22655:0`integer`crwdne22655:0
                            - crwdns22657:0`0`crwdnd22657:0`90`crwdnd22657:0`180`crwdnd22657:0`270`crwdne22657:0
                            - crwdns22659:0`0`crwdne22659:0
                            - crwdns22661:0crwdne22661:0
            - crwdns22663:0`unit_cube`crwdne22663:0
              - crwdns22665:0`boolean`crwdne22665:0
                - crwdns22667:0`false`crwdne22667:0
                - crwdns22669:0crwdne22669:0
            - crwdns22671:0`creative_category`crwdne22671:0
              - crwdns22673:0`string`crwdne22673:0
                - crwdns22675:0`building_blocks`crwdne22675:0
                - crwdns22677:0crwdne22677:0
                - crwdns22679:0[crwdnd22679:0](https://wiki.bedrock.dev/documentation/menu-categories.html#list-of-categories)crwdne22679:0
            - crwdns22681:0`creative_group`crwdne22681:0
              - crwdns22683:0`string`crwdne22683:0
                - crwdns22685:0crwdne22685:0
                - crwdns22687:0crwdne22687:0
                - crwdns22689:0[crwdnd22689:0](https://wiki.bedrock.dev/documentation/menu-categories.html#list-of-groups)crwdne22689:0
            - crwdns22691:0`included_in_creative_inventory`crwdne22691:0
              - crwdns22693:0`boolean`crwdne22693:0
                - crwdns22695:0`true`crwdne22695:0
                - crwdns22697:0crwdne22697:0
            - crwdns22699:0`only_override_states`crwdne22699:0
              - crwdns22701:0`boolean`crwdne22701:0
                - crwdns22703:0`false`crwdne22703:0
                - crwdns22705:0`state_overrides`crwdne22705:0
            - crwdns22707:0`state_overrides`crwdne22707:0
              - crwdns22709:0`object`crwdne22709:0
                - crwdns22711:0crwdne22711:0
                  - crwdns22713:0`property1=value1,property2=value2,...`crwdne22713:0
                    - crwdns22715:0`object`crwdne22715:0
                      - crwdns22717:0crwdne22717:0 crwdns22719:0[crwdnd22719:0](https://raw.githubusercontent.com/GeyserMC/mappings/6b661f0d517d895aebc1f55a25d2c86f033beb1d/blocks.json)crwdne22719:0
                      - crwdns22721:0`creative_category`crwdnd22721:0`creative_group`crwdnd22721:0`included_in_creative_inventory`crwdnd22721:0`only_override_states`crwdnd22721:0`state_overrides`crwdne22721:0

</div>

## crwdns22723:0{#geyser-extensions}crwdne22723:0

crwdns22725:0crwdne22725:0 crwdns22727:0crwdne22727:0

crwdns22729:0crwdne22729:0

```java
public class RedstoneDot implements Extension {
    //...
}
```

crwdns22731:0`GeyserDefineCustomBlocksEvent`crwdne22731:0

```java
public class RedstoneDot implements Extension {
    @Subscribe
    public void onDefineCustomBlocks(GeyserDefineCustomBlocksEvent event) {
        //...
    }
}
```

crwdns22733:0`CustomBlockComponents`crwdnd22733:0`CustomBlockData`crwdnd22733:0`CustomBlockPermutation`crwdne22733:0

```java
public class RedstoneDot implements Extension {
    @Subscribe
    public void onDefineCustomBlocks(GeyserDefineCustomBlocksEvent event) {
        BoxComponent selectionBox = new BoxComponent(-5, 0, -5, 10, 1f, 10);

        CustomBlockComponents components = CustomBlockComponents.builder()
                .collisionBox(BoxComponent.emptyBox())
                .selectionBox(selectionBox)
                .geometry(new GeometryComponentBuilder()
                    .identifier("geometry.amberichu.redstone_dot")
                    .build())
                .lightEmission(0)
                .lightDampening(0)
                .friction(1f)
                .build();

        CustomBlockData redstoneDot = CustomBlockData.builder()
                .name("redstone_dot")
                .intProperty("POWER_PROPERTY", IntStream.range(0, 16).boxed().toList())
                .components(components)
                .permutations(createRedstoneDotPermutations())
                .build();

        // ...
    }

    private List<CustomBlockPermutation> createRedstoneDotPermutations() {
        List<CustomBlockPermutation> permutations = new ArrayList<>();
        for (int power = 0; power < 16; power++) {
            String texture = "amberichu.redstone_dot" + power;
            MaterialInstance invisMaterialInstance = MaterialInstance.builder()
                        .texture("amberichu.invisible")
                        .renderMethod("alpha_test")
                        .faceDimming(false)
                        .ambientOcclusion(false)
                        .build();
            CustomBlockComponents components = CustomBlockComponents.builder()
                    .materialInstance("up", MaterialInstance.builder()
                        .texture(texture)
                        .renderMethod("alpha_test")
                        .faceDimming(false)
                        .ambientOcclusion(false)
                        .build())
                    .materialInstance("down", invisMaterialInstance)
                    .materialInstance("north", invisMaterialInstance)
                    .materialInstance("south", invisMaterialInstance)
                    .materialInstance("east", invisMaterialInstance)
                    .materialInstance("west", invisMaterialInstance)
                    .build();
            String condition = String.format("query.block_property('%s') == %d", POWER_PROPERTY, power);
            permutations.add(new CustomBlockPermutation(components, condition));
        }
        return permutations;
    }
}
```

crwdns22735:0crwdne22735:0

```java
public class RedstoneDot implements Extension {
    @Subscribe
    public void onDefineCustomBlocks(GeyserDefineCustomBlocksEvent event) {
        BoxComponent selectionBox = new BoxComponent(-5, 0, -5, 10, 1f, 10);

        CustomBlockComponents components = CustomBlockComponents.builder()
                .collisionBox(BoxComponent.emptyBox())
                .selectionBox(selectionBox)
                .geometry(new GeometryComponentBuilder()
                    .identifier("geometry.amberichu.redstone_dot")
                    .build())
                .lightEmission(0)
                .lightDampening(0)
                .friction(1f)
                .build();

        CustomBlockData redstoneDot = CustomBlockData.builder()
                .name("redstone_dot")
                .intProperty("POWER_PROPERTY", IntStream.range(0, 16).boxed().toList())
                .components(components)
                .permutations(createRedstoneDotPermutations())
                .build();
        
        event.register(redstoneDot);
        event.registerItemOverride("minecraft:redstone_wire", redstoneDot);

        for (int power = 0; power < 16; power++) {
            String javaIdentifier = String.format("minecraft:redstone_wire[east=none,north=none,power=%d,south=none,west=none]", power);
            event.registerOverride(javaIdentifier, redstoneDot.blockStateBuilder()
                    .intProperty("POWER_PROPERTY", power)
                    .build());
        }
    }

    private List<CustomBlockPermutation> createRedstoneDotPermutations() {
        List<CustomBlockPermutation> permutations = new ArrayList<>();
        for (int power = 0; power < 16; power++) {
            String texture = "amberichu.redstone_dot" + power;
            MaterialInstance invisMaterialInstance = MaterialInstance.builder()
                        .texture("amberichu.invisible")
                        .renderMethod("alpha_test")
                        .faceDimming(false)
                        .ambientOcclusion(false)
                        .build();
            CustomBlockComponents components = CustomBlockComponents.builder()
                    .materialInstance("up", MaterialInstance.builder()
                        .texture(texture)
                        .renderMethod("alpha_test")
                        .faceDimming(false)
                        .ambientOcclusion(false)
                        .build())
                    .materialInstance("down", invisMaterialInstance)
                    .materialInstance("north", invisMaterialInstance)
                    .materialInstance("south", invisMaterialInstance)
                    .materialInstance("east", invisMaterialInstance)
                    .materialInstance("west", invisMaterialInstance)
                    .build();
            String condition = String.format("query.block_property('%s') == %d", POWER_PROPERTY, power);
            permutations.add(new CustomBlockPermutation(components, condition));
        }
        return permutations;
    }
}
```
