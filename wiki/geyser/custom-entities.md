---
title: Geyser Entity API
description: Geyser extensions can register custom Bedrock entity definitions, modify current entities, and replace built-in types in entity spawning events.
---

:::warning Experimental API
The (Custom) Entity API was introduced with Geyser API **2.11.0** (26.2 update) and is currently marked `@ApiStatus.Experimental`. This means that the API may change or be rewritten in parts in a future version without prior deprecation.
If you have feedback on this API, encounter issues, or wish to request further features, please reach out to us!

The `GeyserDefineEntityPropertiesEvent` has been available since **2.9.0**, but its identifier parameter changed in 2.11.0: it now takes a **Bedrock** entity identifier instead of a Java one. See [Entity Properties](#entity-properties) for details.
:::

:::info
This API currently cannot be used via JSON mappings. In the future, we are planning to support entity variants, which would likely also be usable through JSON mappings. 
:::

Custom entities currently (as of 26.2) do not exist in Minecraft: Java Edition. Instead, they can be simulated with armor stands holding item models, or item/block display entity combinations.
Unlike Java Edition, Bedrock does support custom entity types, but does not have item or block display entities. With this API, Geyser extensions can register custom Bedrock entity definitions to use instead of Java
entity types in entity spawning events to properly support custom entities for Bedrock players. Further, it allows modifying entity properties and data for any entity sent to a Bedrock player at runtime.

Additionally to registering custom entity definitions, you will also need to provide a resource pack to players [defining custom entity textures and animations](https://wiki.bedrock.dev/guide/custom-entity).

## Prerequisites: Vocabulary {#vocabulary}

- **Bedrock Entity Definition** (`GeyserEntityDefinition` / `CustomEntityDefinition`): Identifies the Bedrock entity type to spawn, either a built-in type, or a custom type
- **Entity Properties**: Bedrock Molang-queryable values (`query.property(...)`) registered per Bedrock entity type. See [here](https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties?view=minecraft-bedrock-stable) for official documentation.
- **Entity Data Types**: Properties on entities that can be changed dynamically, such as scale, size, hitboxes, and color.

## Registering a Custom Entity Definition {#registering-entity-definition}

Custom entity definitions are registered using `GeyserDefineEntitiesEvent`, which fires once during Geyser's startup:

```java
@Subscribe
public void onDefineEntities(GeyserDefineEntitiesEvent event) {
    CustomEntityDefinition myEntity = CustomEntityDefinition.of(Identifier.of("mynamespace:my_entity"));
    event.register(myEntity);
}
```

Do note:
- Custom entity definition type identifier must not use the `minecraft` namespace
- Entity types must have a unique identifier

## Summoning custom entities {#custom-entity-spawning}

Whenever the Java server creates a new non-player entity for any connection, a `ServerSpawnEntityEvent` is fired. It can be used to change which Bedrock entity definition is sent to the Bedrock player or cancel the spawn entirely. 
Each connection has its own entity cache, so different players will never share the same entity instance.

Example:

```java
private static final Identifier ZOMBIE = Identifier.of("minecraft:zombie");
private static final CustomEntityDefinition MY_ENTITY = CustomEntityDefinition.of(Identifier.of("mynamespace:my_entity"));

@Subscribe
public void onDefineEntities(GeyserDefineEntitiesEvent event) {
    event.register(MY_ENTITY);
}

@Subscribe
public void onSpawn(ServerSpawnEntityEvent event) {
    if (event.entityType().is(ZOMBIE)) {
        event.definition(MY_ENTITY); // definition must be registered beforehand
    }
}
```

This example replaces all spawned zombies with our custom entity, which we registered in `onDefineEntities`.

:::info
The `ServerSpawnEntityEvent` fires before the entity is spawned (since it could be canceled). You can provide a consumer for the resulting `GeyserEntity` to set initial entity data values before the entity is spawned on the client:

```java
private static final Identifier ZOMBIE = Identifier.of("minecraft:zombie");
private static final CustomEntityDefinition MY_ENTITY = CustomEntityDefinition.of(Identifier.of("mynamespace:my_entity"));

@Subscribe
public void onSpawn(ServerSpawnEntityEvent event) {
    if (!event.entityType().is(ZOMBIE)) {
        return;
    }
    event.definition(MY_ENTITY);
    event.preSpawnConsumer(entity -> {
        entity.override(GeyserEntityDataTypes.SCALE, 2.0f);
        entity.override(GeyserEntityDataTypes.COLOR, (byte) 5);
    });
}
```
:::

### Modifying shoulder parrots {#shoulder-parrots}

`ServerAttachParrotsEvent` fires when a parrot is attached to a player's shoulder. It extends `ServerSpawnEntityEvent`, so definition replacement, cancellation, and setting a pre spawn consumer for the 
resulting `GeyserEntity` instance are all available.

```java
@Subscribe
public void onParrotAttach(ServerAttachParrotsEvent event) {
    event.definition(myParrotReplacement); // this entity definition would also be registered previously
}
```

## Modifying entity data {#entity-data}

Entity data consists of runtime-modifiable values such as scale, size, and hitboxes. All constants live in `GeyserEntityDataTypes`. Values for these types can be updated on a `GeyserEntity` 
at any time using `entity.override(type, value)`, or set inside a pre-spawn consumer in the entity spawn events to modify it before the spawn packet is sent.

Updating any of these values will override the value sent by the server until the override is removed. To remove an override, a `null` value can be used.

| Constant                           | Value Type     | Description                                                                  |
|------------------------------------|----------------|------------------------------------------------------------------------------|
| `COLOR`                            | `Byte`         | Bedrock color component (0–15)                                               |
| `VARIANT`                          | `Integer`      | Numeric variant index, queryable via `query.variant` in resource packs       |
| `WIDTH`                            | `Float`        | Collision box width                                                          |
| `HEIGHT`                           | `Float`        | Collision box height                                                         |
| `VERTICAL_OFFSET`                  | `Float`        | Y-axis offset applied on top of the Java entity position                     |
| `SCALE`                            | `Float`        | Visual scale multiplier                                                      |
| `HITBOXES`                         | `List<Hitbox>` | Custom hitboxes. Set an empty list to remove all hitboxes                    |
| `SEAT_OFFSET`                      | `Vector3f`     | Riding position offset                                                       |
| `ROTATION_LOCKED_TO_VEHICLE`       | `Boolean`      | Whether the rider's rotation is locked to the vehicle's rotation             |
| `SEAT_LOCK_RIDER_ROTATION_DEGREES` | `Float`        | The degrees of rotation a rider may rotate within when mounted on an entity. |
| `SEAT_HAS_ROTATION`                | `Boolean`      | Whether a seat has rotation                                                  | 
| `ROTATE_RIDER_DEGREES`             | `Float`        | Rotation offset for the seat in degrees                                      |

:::info
Hitbox `min`, `max` and `pivot` are absolute world coordinates, not relative to the entity's position.
:::

## Entity Properties {#entity-properties}

Entity properties expose Java-side state to Bedrock resource packs via `query.property('namespace:name')` in Molang. Entity properties can be registered for both custom, and vanilla entity types using the `GeyserDefineEntityPropertiesEvent`, which fires during Geyser startup.

:::warning Breaking Change in 2.11.0
`GeyserDefineEntityPropertiesEvent` has been available since **2.9.0**, but its first parameter changed in 2.11.0: it now takes a **Bedrock** entity type identifier.
:::

A maximum of 32 properties per entity type can be registered.

```java
private GeyserFloatEntityProperty aggression = null;
private GeyserIntEntityProperty state = null;
private GeyserBooleanEntityProperty enraged = null;
private GeyserEnumEntityProperty<Phase> phase = null;
private GeyserStringEnumProperty mode = null;

@Subscribe
public void onDefineProperties(GeyserDefineEntityPropertiesEvent event) {
    Identifier zombieType = Identifier.of("minecraft:zombie");

    // Float property: min, max, default (null default uses min)
    aggression = event.registerFloatProperty(zombieType, Identifier.of("mynamespace:aggression"), 0f, 1f, 0f);

    // Integer property
    state = event.registerIntegerProperty(zombieType, Identifier.of("mynamespace:state"), 0, 10, null);

    // Boolean property
    enraged = event.registerBooleanProperty(zombieType, Identifier.of("mynamespace:enraged"), false);

    // Enum from a Java enum class (max 16 values, names max 32 chars, must start with a letter)
    phase = event.registerEnumProperty(zombieType, Identifier.of("mynamespace:phase"), Phase.class, Phase.IDLE);

    // Enum from a string list
    mode = event.registerEnumProperty(zombieType, Identifier.of("mynamespace:mode"), List.of("idle", "active", "fleeing"), "idle");
}
```

Properties can be updated on a `GeyserEntity` instance at any time:

```java
// Single property
entity.updateProperty(aggression, 0.5f);
```

## Looking up entities {#looking-up-entities}

After an entity has spawned it can be looked up through `GeyserConnection#entities()`. All lookup methods are thread-safe.

```java
EntityData entityData = connection.entities();

// By Java entity ID (int)
GeyserEntity entity = entityData.byJavaId(javaId);

// By UUID
GeyserEntity entity = entityData.byUuid(uuid);

// By Geyser/Bedrock runtime ID (long)
GeyserEntity entity = entityData.byGeyserId(geyserId);
```

All three return `null` if no entity is found. A `GeyserEntity` exposes various properties, such as the entity uuid, current passengers / vehicle if applicable, and it can further be used to update
entity properties or entity data type values.

## Full Example {#full-example}

<details>
<summary>Expand for a full extension example</summary>

```java
public class MyExtension implements Extension {
    // Create a custom entity definition
    private final CustomEntityDefinition enhancedZombie = CustomEntityDefinition.of(Identifier.of("myext:enhanced_zombie"));
    private GeyserFloatEntityProperty healthFraction = null;

    // Register the custom entity type
    @Subscribe
    public void onDefineEntities(GeyserDefineEntitiesEvent event) {
        event.register(enhancedZombie);
    }

    // Optionally: Register entity properties (Bedrock identifier)
    @Subscribe
    public void onDefineProperties(GeyserDefineEntityPropertiesEvent event) {
        healthFraction = event.registerFloatProperty(
            enhancedZombie.identifier(),
            Identifier.of("myext:health_fraction"), 
            0f, 1f, 1f
        );
    }

    // Replace a default Bedrock entity definition with our custom one
    @Subscribe
    public void onSpawn(ServerSpawnEntityEvent event) {
        // Unless you want to replace everything, you should probably add checks for e.g., entity type, or entity UUID
        event.definition(enhancedZombie);
        event.preSpawnConsumer(entity -> {
            entity.override(GeyserEntityDataTypes.SCALE, 1.5f);
            entity.override(GeyserEntityDataTypes.COLOR, (byte) 4);
        });
    }
}
```
</details>