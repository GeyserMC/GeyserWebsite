---
title: crwdns19257:0crwdne19257:0
description: crwdns19259:0crwdne19259:0
---

# crwdns19261:0crwdne19261:0

crwdns19263:0crwdne19263:0\
crwdns19265:0crwdne19265:0\
crwdns19267:0[crwdnd19267:0](https://github.com/GeyserMC/Cumulus)crwdne19267:0 crwdns19269:0[crwdnd19269:0](/wiki/floodgate/api/)crwdnd19269:0[crwdnd19269:0](/wiki/geyser/api)crwdne19269:0

crwdns19271:0crwdne19271:0

- crwdns19273:0crwdne19273:0
- crwdns19275:0crwdne19275:0
- crwdns19277:0crwdne19277:0

crwdns19279:0crwdne19279:0\
crwdns19281:0crwdne19281:0\
crwdns19283:0crwdne19283:0

## crwdns19285:0{#modalform}crwdne19285:0

crwdns19287:0crwdne19287:0\
crwdns19289:0crwdne19289:0

crwdns19291:0![crwdnd19291:0](https://i.imgur.com/kMpMgOh.png)crwdne19291:0

crwdns19293:0crwdne19293:0

```java
ModalForm.builder()
    .title("Title")
    .content("Content")
    .button1("Button 1")
    .button2("Button 2")
```

## crwdns19295:0{#simpleform}crwdne19295:0

crwdns19297:0crwdne19297:0\
crwdns19299:0crwdne19299:0

crwdns19301:0![crwdnd19301:0](https://i.imgur.com/3rj2OQ2.png)crwdne19301:0

crwdns19303:0crwdne19303:0

```java
SimpleForm.builder()
    .title("Title")
    .content("Content")
    .button("Button without an image")
    .button("Button with URL image", FormImage.Type.URL, "https://github.com/GeyserMC.png?size=200")
    .button("Button with path image", FormImage.Type.PATH, "textures/i/glyph_world_template.png")
```

## crwdns19305:0{#customform}crwdne19305:0

crwdns19307:0crwdne19307:0\
crwdns19309:0crwdne19309:0\
crwdns19311:0[crwdnd19311:0](https://github.com/GeyserMC/Cumulus/tree/master/src/main/java/org/geysermc/cumulus/component)crwdne19311:0

crwdns19313:0![crwdnd19313:0](https://i.imgur.com/zHgxELm.png)crwdne19313:0

crwdns19315:0crwdne19315:0

```java
CustomForm.builder()
    .title("Title")
    .dropdown("Text", "Option 1", "Option 2")
    .input("Input", "placeholder")
    .toggle("Toggle")
    .slider("Text", 0, 10, 1, 5)
```

## crwdns19317:0{#sending-a-form}crwdne19317:0

crwdns19319:0crwdne19319:0\
crwdns19321:0crwdne19321:0

```java
FloodgateApi.getInstance().sendForm(uuid, form); // or #sendForm(uuid, formBuilder)
```

crwdns19323:0crwdne19323:0

```java
FloodgatePlayer player = FloodgateApi.getInstance().getPlayer(uuid);
player.sendForm(form); // or #sendForm(formBuilder)
```

crwdns19325:0crwdne19325:0

```java
FloodgatePlayer player = FloodgateApi.getInstance().getPlayer(uuid);
...
player.sendForm(
    CustomForm.builder()
        .title("My cool title")
        .label("10/10 content")
);
```

## crwdns19327:0{#receiving-a-response-from-the-client}crwdne19327:0

crwdns19329:0crwdne19329:0\
crwdns19331:0crwdne19331:0 crwdns19333:0`validResultHandler(BiConsumer<Form, ValidFormResponseResult> | Consumer<ValidFormResponseResult>)`crwdnd19333:0`invalidResultHandler`crwdnd19333:0`closedResultHandler`crwdnd19333:0`closedOrInvalidResultHandler`crwdne19333:0\
crwdns19335:0crwdne19335:0

```java
CustomForm.builder()
    .title("geyser.auth.login.form.details.title")
    .label("geyser.auth.login.form.details.desc")
    .input("geyser.auth.login.form.details.email", "account@geysermc.org", "")
    .input("geyser.auth.login.form.details.pass", "123456", "")
    .closedOrInvalidResultHandler(() -> buildAndShowLoginDetailsWindow(session))
    .validResultHandler(response -> session.authenticate(response.next(), response.next())));
```

## crwdns19337:0{#advanced-stuff}crwdne19337:0

crwdns19339:0crwdne19339:0\
crwdns19341:0`translator(BiFunction<String, String, String>)`crwdnd19341:0`translator(BiFunction<String, String, String>, String)`crwdne19341:0

```java
ModalForm form = ModalForm.builder()
    .translator(this::translate, userLanguage)
    .title("Title")
    .content("Content")
    .button1("translate.button1")
    .button2("translate.button2")
    .build();

public String translate(String key, String locale) {
    // this method will be called for every string, in this case, 4 times:
    // Title, Content, translate.button1, translate.button2
    // your own translate logic here
    // return the value that replaces the key
}
```

crwdns19343:0crwdne19343:0

```java
ModalForm form = ModalForm.builder()
    .translator((key, unused) -> {
        // this method will be called for every string, in this case, 4 times:
        // Title, Content, translate.button1, translate.button2
        // since this isn't a separate method, you don't need the locale argument, so it's unused.
        // your own translate logic here
        // return the value that replaces the key
    })
    .title("Title")
    .content("Content")
    .button1("translate.button1")
    .button2("translate.button2")
    .build();
```
