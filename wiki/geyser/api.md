---
title: Geyser API
description: The Geyser API allows you to interact with Geyser in your own plugins, mods, or extensions.
---

Geyser has an API to extend what is possible with Geyser, and to allow you to interact with Geyser in your own plugins, mods, or extensions.

### Where can I use the Geyser API? {#where-can-i-use-the-geyser-api}
You could use the Geyser API in:
- A plugin for Paper/Spigot, Velocity, Waterfall/BungeeCord, etc.
- A mod for Fabric or NeoForge
- A Geyser Extension

### Accessing the Geyser API {#accessing-the-geyser-api}
See [here](/wiki/geyser/getting-started-with-the-api) for how to include the Geyser API dependency in your project.

### Documentation {#documentation}

The Geyser API offers events to subscribe to, or information on whether a player is joining through Geyser, and gives you the ability to enhance what is possible with Geyser (i.e. register custom items).
(soon, blocks and entities too).
It can be used easily in Geyser Extensions, see [here](/wiki/geyser/extensions) for details on those.

**Quick overview:**   
<div class="alert alert-info" role="alert">
    Note: To see full, detailed documentation, see the <a href="https://repo.opencollab.dev/javadoc/maven-snapshots/org/geysermc/geyser/api/latest">javadocs</a>.
</div>

#### [GeyserApi](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/GeyserApi.java): {#geyserapi}
The GeyserApi interface serves as a central access point to various functionalities provided by the Geyser API, providing methods to e.g. interact with player connections.
It extends the [Base API](https://github.com/GeyserMC/api/blob/master/base/src/main/java/org/geysermc/api/GeyserApiBase.java) interface, which provides basic information about individual players.

The class GeyserApi is the base class of the API and you need to use it to access any part of the API.  
To access it, you simply type:
```java
GeyserApi.api();
```

After you got the instance, you have access to all the methods.  
Use the documentation in the API module to see (and get info about) every single method available.  
Most [API methods have a simple explanation](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/GeyserApi.java).
Since the Geyser API extends the Base API that is shared across Floodgate and Geyser, you can also use the [methods from the Base API](https://github.com/GeyserMC/api/blob/master/base/src/main/java/org/geysermc/api/GeyserApiBase.java).


#### We'll highlight a few to get you started quickly: {#well-highlight-a-few-to-get-you-started-quickly}
`GeyserApi#isBedrockPlayer(UUID)`  
Used to check if the given UUID of an **online** player is a Bedrock player.

`GeyserApi#connectionByUuid(UUID)`  
Used to get the [Connection](https://github.com/GeyserMC/api/blob/master/base/src/main/java/org/geysermc/api/connection/Connection.java) of an **online** player.  
This method will return null if the player is not a Bedrock player.

<div class="alert alert-info" role="alert">
    You don't need to wait until the Bedrock player is online to use the getPlayer and isBedrockPlayer methods.  
    You can even use them in the pre-login events.
</div>

`GeyserApi#sendForm(UUID, Form(Builder))`  
Used to send a form to the Bedrock player with the given UUID.  
Click [here](/wiki/geyser/forms/) to get more information about Forms.

`GeyserApi#onlineConnectionsCount()`  
Used to get the amount of online Bedrock players.

### Short Overview of the Geyser API {#short-overview-of-the-geyser-api}

#### [Cumulus](https://github.com/GeyserMC/Cumulus/tree/master/src/main/java/org/geysermc/cumulus) {#cumulus}
While technically not directly in the Geyser API, the Cumulus library is also provided by the Geyser API. 
It allows you to send Bedrock edition forms to players. See [Cumulus](/wiki/geyser/forms/) for more information.

#### [Events](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event) {#events}
The event package contains all the events that Geyser fires. See [here](/wiki/geyser/events) for detailed information on how to listen to Geyser events.

#### [Command](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/command) {#command}
This package contains classes and interfaces related to commands in Geyser, which allows [Geyser Extensions](/wiki/geyser/extensions) to register custom commands.

#### [Entity](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/entity) {#entity}
The Entity package contains classes and interfaces related to entities in Geyser, like the GeyserPlayerEntity interface, 
which represents a player entity in Geyser. This interface extends the GeyserEntity interface, while providing additional functionality specifically for player entities, 
like currently, showing emotes.

#### [Item](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/item) {#item}
The item package contains classes and interfaces related to items in Geyser. You can create custom items and register them using the Geyser API.
See [here](/wiki/geyser/custom-items) for detailed information on how to register custom items.

#### [Block](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/block) {#block}
The block package contains classes and interfaces related to blocks in Geyser. You can create custom blocks using this package, and register them in using the [GeyserDefineCustomBlocksEvent](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle/GeyserDefineCustomBlocksEvent.java).
See [here](/wiki/geyser/custom-blocks) for detailed information.

#### [Network](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/network) {#network}
The network package contains basic information about the remote server via the 
[RemoteServer](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/network/RemoteServer.java)
interface, such as the server's IP address and port, and the protocol version of the remote server. Or the auth type.
You can also get the port/IP that Geyser listens to via the [BedrockListener](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/network/BedrockListener.java) interface.

### [Skin](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/skin) {#skin}
The skin package contains some records representing skin data. If you want to change the skin of players, you can listen to the [SessionSkinApplyEvent](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/bedrock/SessionSkinApplyEvent.java), and set a new skin, skin geometry or cape there.

#### [Pack](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/pack) {#pack}
The pack package contains classes and interfaces related to resource packs in Geyser. You can create custom resource packs and send them to individual sessions before they log in using the [SessionLoadResourcePacksEvent](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/bedrock/SessionLoadResourcePacksEvent.java).
If you wish to send a resource pack to all sessions, you can use the [GeyserLoadResourcePacksEvent](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle/GeyserLoadResourcePacksEvent.java).

Packs can be created using a [PackCodec](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/pack/PackCodec.java), such as the provided [PathPackCodec](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/pack/PathPackCodec.java).
This allows you to load a Bedrock resource pack from a file path:
```java
ResourcePack pack = ResourcePack.create(PackCodec.path(path));
```

#### [Extension](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/extension) {#extension}
This package provides the necessary components to create and manage extensions.
For a more detailed explanation of extensions, see [here](/wiki/geyser/extensions).
