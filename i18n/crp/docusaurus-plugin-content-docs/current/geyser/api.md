---
title: crwdns21551:0crwdne21551:0
description: crwdns21553:0crwdne21553:0
---

crwdns21555:0crwdne21555:0

### crwdns21557:0crwdne21557:0 crwdns21559:0{#where-can-i-use-the-geyser-api}crwdne21559:0

crwdns21561:0crwdne21561:0

- crwdns21563:0crwdne21563:0
- crwdns21565:0crwdne21565:0
- crwdns21567:0crwdne21567:0

### crwdns21569:0{#accessing-the-geyser-api}crwdne21569:0

crwdns21571:0[crwdnd21571:0](/wiki/geyser/getting-started-with-the-api)crwdne21571:0

### crwdns21573:0{#documentation}crwdne21573:0

crwdns21575:0crwdne21575:0
crwdns21577:0crwdne21577:0
crwdns21579:0[crwdnd21579:0](/wiki/geyser/extensions)crwdne21579:0

crwdns21581:0[crwdnd21581:0](https://repo.opencollab.dev/javadoc/maven-snapshots/org/geysermc/geyser/api/latest)crwdne21581:0
crwdns21583:0crwdne21583:0

#### crwdns21585:0[crwdnd21585:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/GeyserApi.java)crwdnd21585:0{#geyserapi}crwdne21585:0

crwdns21587:0crwdne21587:0
crwdns21589:0[crwdnd21589:0](https://github.com/GeyserMC/api/blob/master/base/src/main/java/org/geysermc/api/GeyserApiBase.java)crwdne21589:0

crwdns21591:0crwdne21591:0\
crwdns21593:0crwdne21593:0

```java
GeyserApi.api();
```

crwdns21595:0crwdne21595:0\
crwdns21597:0crwdne21597:0\
crwdns21599:0[crwdnd21599:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/GeyserApi.java)crwdne21599:0
crwdns21601:0[crwdnd21601:0](https://github.com/GeyserMC/api/blob/master/base/src/main/java/org/geysermc/api/GeyserApiBase.java)crwdne21601:0

#### crwdns21603:0{#well-highlight-a-few-to-get-you-started-quickly}crwdne21603:0

crwdns21605:0`GeyserApi#isBedrockPlayer(UUID)`crwdne21605:0

crwdns21607:0`GeyserApi#connectionByUuid(UUID)`crwdnd21607:0[crwdnd21607:0](https://github.com/GeyserMC/api/blob/master/base/src/main/java/org/geysermc/api/connection/Connection.java)crwdne21607:0\
crwdns21609:0crwdne21609:0

:::info
crwdns21611:0crwdne21611:0\
crwdns21615:0crwdne21615:0
:::

crwdns21617:0`GeyserApi#sendForm(UUID, Form(Builder))`crwdne21617:0\
crwdns21619:0[crwdnd21619:0](/wiki/geyser/forms/)crwdne21619:0

crwdns21623:0`GeyserApi#onlineConnectionsCount()`crwdne21623:0

### crwdns21627:0{#short-overview-of-the-geyser-api}crwdne21627:0

#### crwdns21633:0[crwdnd21633:0](https://github.com/GeyserMC/Cumulus/tree/master/src/main/java/org/geysermc/cumulus)crwdnd21633:0{#cumulus}crwdne21633:0

crwdns21637:0crwdne21637:0
crwdns21641:0crwdne21641:0 crwdns21649:0[crwdnd21649:0](/wiki/geyser/forms/)crwdne21649:0

#### crwdns21653:0[crwdnd21653:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event)crwdnd21653:0{#events}crwdne21653:0

crwdns21655:0crwdne21655:0 crwdns21657:0[crwdnd21657:0](/wiki/geyser/events)crwdne21657:0

#### crwdns21659:0[crwdnd21659:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/command)crwdnd21659:0{#command}crwdne21659:0

crwdns21661:0[crwdnd21661:0](/wiki/geyser/extensions)crwdne21661:0

#### crwdns21663:0[crwdnd21663:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/entity)crwdnd21663:0{#entity}crwdne21663:0

crwdns21665:0crwdne21665:0 crwdns21667:0crwdne21667:0

#### crwdns21669:0[crwdnd21669:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/item)crwdnd21669:0{#item}crwdne21669:0

crwdns21671:0crwdne21671:0 crwdns21673:0crwdne21673:0
crwdns21675:0[crwdnd21675:0](/wiki/geyser/custom-items)crwdne21675:0

#### crwdns21677:0[crwdnd21677:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/block)crwdnd21677:0{#block}crwdne21677:0

crwdns21679:0crwdne21679:0 crwdns21681:0[crwdnd21681:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle/GeyserDefineCustomBlocksEvent.java)crwdne21681:0
crwdns21683:0[crwdnd21683:0](/wiki/geyser/custom-blocks)crwdne21683:0

#### crwdns21685:0[crwdnd21685:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/network)crwdnd21685:0{#network}crwdne21685:0

crwdns21687:0[crwdnd21687:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/network/RemoteServer.java)crwdne21687:0 crwdns21689:0crwdne21689:0
crwdns21691:0[crwdnd21691:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/network/BedrockListener.java)crwdne21691:0

#### crwdns21693:0[crwdnd21693:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/skin)crwdnd21693:0{#skin}crwdne21693:0

crwdns21695:0crwdne21695:0 crwdns21697:0[crwdnd21697:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/bedrock/SessionSkinApplyEvent.java)crwdne21697:0

#### crwdns21699:0[crwdnd21699:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/pack)crwdnd21699:0{#pack}crwdne21699:0

crwdns21701:0crwdne21701:0 crwdns21703:0[crwdnd21703:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/bedrock/SessionLoadResourcePacksEvent.java)crwdne21703:0
crwdns21705:0[crwdnd21705:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle/GeyserLoadResourcePacksEvent.java)crwdne21705:0

crwdns21707:0[crwdnd21707:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/pack/PackCodec.java)crwdnd21707:0[crwdnd21707:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/pack/PathPackCodec.java)crwdne21707:0
crwdns21709:0crwdne21709:0

```java
ResourcePack pack = ResourcePack.create(PackCodec.path(path));
```

#### crwdns21711:0[crwdnd21711:0](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/extension)crwdnd21711:0{#extension}crwdne21711:0

crwdns21713:0crwdne21713:0
crwdns21715:0[crwdnd21715:0](/wiki/geyser/extensions)crwdne21715:0
