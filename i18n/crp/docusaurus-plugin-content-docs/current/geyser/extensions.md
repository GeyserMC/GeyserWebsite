---
title: crwdns20105:0crwdne20105:0
description: crwdns20107:0crwdne20107:0 crwdns20109:0crwdne20109:0
---

# crwdns20111:0crwdne20111:0

crwdns20113:0crwdne20113:0
crwdns20115:0crwdne20115:0
crwdns20117:0crwdne20117:0

## crwdns20119:0crwdne20119:0 crwdns20121:0{#what-can-geyser-extensions-do}crwdne20121:0

crwdns20123:0crwdne20123:0
crwdns20127:0[crwdnd20127:0](/wiki/geyser/api/)crwdne20127:0

crwdns20133:0crwdne20133:0

- crwdns20137:0crwdne20137:0
- crwdns20141:0crwdne20141:0
- crwdns20145:0crwdne20145:0
- crwdns20149:0crwdne20149:0
- crwdns20153:0crwdne20153:0

crwdns20157:0crwdne20157:0

## crwdns20161:0crwdne20161:0 crwdns20165:0{#which-geyser-extensions-exist}crwdne20165:0

crwdns20169:0crwdne20169:0
crwdns20173:0crwdne20173:0

crwdns20177:0[crwdnd20177:0](https://github.com/GeyserMC/GeyserExtensionList)crwdne20177:0
crwdns20181:0crwdne20181:0

## crwdns20185:0{#installing-extensions}crwdne20185:0

crwdns20189:0`extensions`crwdne20189:0
crwdns20193:0crwdne20193:0

## crwdns20197:0{#updating-extensions}crwdne20197:0

crwdns20201:0`update`crwdne20201:0

1. crwdns20205:0`update`crwdne20205:0
2. crwdns20211:0`update`crwdne20211:0 crwdns20215:0crwdne20215:0
3. crwdns20219:0crwdne20219:0 crwdns20223:0crwdne20223:0

## crwdns20227:0{#creating-geyser-extensions}crwdne20227:0

crwdns20231:0[crwdnd20231:0](https://github.com/GeyserMC/GeyserExampleExtension/)crwdne20231:0
crwdns20237:0`extension.yml`crwdnd20237:0`settings.gradle`crwdne20237:0

crwdns20241:0`extension.yml`crwdnd20241:0`resources`crwdne20241:0

```yml title="extension.yml"
id: exampleid
name: ExampleExtension
main: org.geyser.extension.exampleid.ExampleExtension
api: 2.4.1
version: 1.0.0
authors: [ExampleAuthor]
```

crwdns20245:0crwdne20245:0

- crwdns20249:0crwdne20249:0 crwdns20253:0crwdne20253:0 crwdns20257:0`/exampleid command`crwdne20257:0
- crwdns20261:0crwdne20261:0
- crwdns20265:0crwdne20265:0
- crwdns20269:0crwdne20269:0
- crwdns20273:0crwdne20273:0 crwdns20277:0crwdne20277:0

## crwdns20283:0{#creating-the-main-class}crwdne20283:0

crwdns20287:0[crwdnd20287:0](https://github.com/GeyserMC/GeyserExampleExtension/blob/master/src/main/java/org/geyser/extension/exampleid/ExampleExtension.java#L12)crwdne20287:0
crwdns20293:0`logger()`crwdne20293:0
crwdns20299:0[crwdnd20299:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/extension/Extension.java)crwdne20299:0

crwdns20313:0`onEnable`crwdnd20313:0`onDisable`crwdne20313:0 crwdns20319:0crwdne20319:0
crwdns20341:0crwdne20341:0

- crwdns20343:0`GeyserPreInitializeEvent`crwdne20343:0 crwdns20345:0`GeyserDefineCommandsEvent`crwdne20345:0
- crwdns20347:0`GeyserPostInitializeEvent`crwdne20347:0 crwdns20349:0crwdne20349:0
- crwdns20351:0`GeyserShutdownEvent`crwdne20351:0 crwdns20353:0crwdne20353:0

crwdns20355:0crwdne20355:0

```java
@Subscribe
public void onPostInitialize(GeyserPostInitializeEvent event) {
    // example: show that your extension is loading.
    this.logger().info("Loading example extension...");
}
```

crwdns20357:0crwdne20357:0 crwdns20359:0[crwdnd20359:0](/wiki/geyser/custom-items#geyser-extensions)crwdne20359:0 crwdns20361:0[crwdnd20361:0](/wiki/geyser/events)crwdne20361:0

crwdns20363:0crwdne20363:0

## crwdns20365:0{#creating-commands-with-geyser-extensions}crwdne20365:0

crwdns20367:0`Commands`crwdne20367:0 crwdns20369:0crwdne20369:0

- crwdns20371:0[crwdnd20371:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/command/Command.java)crwdne20371:0 crwdns20373:0[crwdnd20373:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle/GeyserDefineCommandsEvent.java)crwdne20373:0
- crwdns20375:0[crwdnd20375:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/command/CommandExecutor.java)crwdne20375:0
- crwdns20377:0[crwdnd20377:0](https://github.com/GeyserMC/Geyser/blob/master/api/src/main/java/org/geysermc/geyser/api/command/CommandSource.java)crwdne20377:0 crwdns20379:0crwdne20379:0

```java
Command command = Command.builder(this) // "this" is the extension's main class
        .name("ExampleCommand")
        .bedrockOnly(true)
        .source(CommandSource.class)
        .aliases(List.of("example", "ex"))
        .description("An example command")
        .executableOnConsole(false) 
        .suggestedOpOnly(false)
        .permission("example.command")
        .executor((source, cmd, args) -> {
            // this is the command executor - this is where you would put your code to execute the command.
            // source is the source that executed the command
            // cmd is the command that was executed
            // args are the arguments passed to the command
            source.sendMessage("Hello World");
        })
        .build();
```

crwdns20381:0`GeyserDefineCommandsEvent`crwdne20381:0

```java
@Subscribe
public void onDefineCommands(GeyserDefineCommandsEvent event) {
    event.register(command);
}
```

crwdns20383:0`/extesionid [command]`crwdnd20383:0`/exampleid examplecommand`crwdne20383:0
crwdns20385:0crwdne20385:0
crwdns20387:0`/exampleid example`crwdnd20387:0`/exampleid ex`crwdne20387:0
crwdns20389:0`/exampleid examplecommand [args]`crwdnd20389:0`[args]`crwdne20389:0

## crwdns20391:0{#listening-to-events}crwdne20391:0

crwdns20393:0[crwdnd20393:0](/wiki/geyser/events)crwdne20393:0 crwdns20395:0crwdne20395:0

---

## crwdns20397:0crwdne20397:0 crwdns20399:0{#facing-troubles-with-extensions}crwdne20399:0

- crwdns20401:0crwdne20401:0
- crwdns20403:0crwdne20403:0
- crwdns20405:0[crwdnd20405:0](https://discord.gg/geysermc)crwdne20405:0
