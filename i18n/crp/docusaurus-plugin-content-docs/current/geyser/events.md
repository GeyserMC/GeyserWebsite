---
title: crwdns20407:0crwdne20407:0
description: crwdns20409:0crwdne20409:0 crwdns20411:0crwdne20411:0
---

# crwdns20413:0crwdne20413:0

crwdns20415:0crwdne20415:0 crwdns20417:0crwdne20417:0

crwdns20419:0[crwdnd20419:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event)crwdne20419:0

## crwdns20421:0{#event-categories}crwdne20421:0

crwdns20423:0crwdne20423:0
crwdns20425:0crwdne20425:0

crwdns20427:0crwdne20427:0

- crwdns20429:0[crwdnd20429:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/bedrock)crwdne20429:0
- crwdns20431:0[crwdnd20431:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/java)crwdne20431:0
- crwdns20433:0[crwdnd20433:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/connection)crwdne20433:0
- crwdns20435:0[crwdnd20435:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle)crwdne20435:0

crwdns20437:0crwdne20437:0

## crwdns20439:0{#usage-examples}crwdne20439:0

crwdns20441:0crwdne20441:0

```java
@Subscribe
public void onGeyserLoadResourcePacksEvent(GeyserLoadResourcePacksEvent event) {
    logger().info("Loading: " + event.resourcePacks().size() + " resource packs.");
    // you could add a resource pack with event.resourcePacks().add(path-to-pack)
}
```

crwdns20443:0crwdne20443:0 crwdns20445:0`EventRegistrar`crwdne20445:0
crwdns20447:0crwdne20447:0

crwdns20449:0crwdne20449:0

1. crwdns20451:0crwdne20451:0

```yaml
  depend: ["Geyser-Spigot"]
```

crwdns20453:0crwdne20453:0

2. crwdns20455:0crwdne20455:0

```java
public class ExamplePlugin extends JavaPlugin implements EventRegistrar {
    
    @Override
    public void onEnable(){
        getLogger().info("Registering Geyser event bus!");
        GeyserApi.api().eventBus().register(this, this); // register your plugin & this class instance as a listener
    }

    // here an event, we subscribe as usual with the @Subscribe annotation
    @Subscribe
    public void onGeyserPostInitializeEvent(GeyserPostInitializeEvent event) {
        getLogger().info("Geyser started!");
    }
}
```

3. crwdns20457:0crwdne20457:0

```java
// add this after you register your event registrar in onEnable
GeyserApi.api().eventBus().subscribe(this, GeyserPostInitializeEvent.class, this::onGeyserPostInitializeEvent);
```

crwdns20459:0crwdne20459:0

```java
public class ExampleMod implements ModInitializer, EventRegistrar {
    public static final Logger LOGGER = LoggerFactory.getLogger("modid");
    
    @Override 
    public void onInitialize() {
        ServerLifecycleEvents.SERVER_STARTING.register((server) -> {
            GeyserApi.api().eventBus().register(this, this); // register your mod & this class instance as a listener
        });
        
        LOGGER.info("Geyser is cool!");
    }
    
    // here an event, we subscribe as usual with the @Subscribe annotation
    @Subscribe 
    public void onGeyserPostInitializeEvent(GeyserPostInitializeEvent event) {
        LOGGER.info("Geyser started!");
    }
}
```

:::info
crwdns20461:0crwdne20461:0
:::

crwdns20463:0crwdne20463:0

## crwdns20465:0{#event-priority}crwdne20465:0

crwdns20467:0crwdne20467:0 crwdns20469:0crwdne20469:0
crwdns20471:0`@Subscribe`crwdne20471:0

```java
@Subscribe(postOrder = PostOrder.EARLY)
```

crwdns20473:0crwdne20473:0 crwdns20475:0[crwdnd20475:0](https://github.com/GeyserMC/Events/blob/master/src/main/java/org/geysermc/event/PostOrder.java)crwdne20475:0
