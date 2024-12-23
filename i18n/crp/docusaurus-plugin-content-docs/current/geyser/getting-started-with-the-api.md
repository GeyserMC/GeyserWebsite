---
title: crwdns19129:0crwdne19129:0
description: crwdns19131:0crwdne19131:0
---

crwdns19133:0crwdne19133:0

crwdns19135:0crwdne19135:0

```xml
<repository>
    <id>opencollab-snapshot</id>
    <url>https://repo.opencollab.dev/main/</url>
</repository>
```

crwdns19137:0crwdne19137:0

crwdns19139:0crwdne19139:0

```groovy
repositories {
    maven {
        url = uri("https://repo.opencollab.dev/main/")
    }
}
```

## crwdns19141:0{#using-geyser}crwdne19141:0

crwdns19143:0crwdne19143:0

crwdns19145:0crwdne19145:0

```xml
<dependency>
    <groupId>org.geysermc.geyser</groupId>
    <artifactId>api</artifactId>
    <version>2.4.2-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>
```

crwdns19147:0crwdne19147:0

```groovy
dependencies {
    compileOnly('org.geysermc.geyser:api:2.4.2-SNAPSHOT')
}
```

crwdns19149:0crwdne19149:0

```java
GeyserConnection connection = GeyserApi.api().connectionByUuid(uuid);
```

crwdns19151:0`connection`crwdne19151:0

crwdns19153:0`GeyserApi.api()`crwdne19153:0

crwdns19155:0[crwdnd19155:0](/wiki/geyser/api/)crwdne19155:0

## crwdns19157:0{#using-floodgate}crwdne19157:0

crwdns19159:0crwdne19159:0 crwdns19161:0[crwdnd19161:0](/wiki/floodgate/api/)crwdne19161:0

crwdns19163:0crwdne19163:0

crwdns19165:0crwdne19165:0

```xml
<dependency>
    <groupId>org.geysermc.floodgate</groupId>
    <artifactId>api</artifactId>
    <version>2.2.3-SNAPSHOT</version>
    <scope>provided</scope>
</dependency>
```

crwdns19167:0crwdne19167:0

```groovy
dependencies {
    compileOnly('org.geysermc.floodgate:api:2.2.3-SNAPSHOT')
}
```

crwdns19169:0crwdne19169:0

```java
FloodgateApi api = FloodgateApi.getInstance();
api.isFloodgatePlayer(uuid);
```

crwdns19171:0[crwdnd19171:0](/wiki/floodgate/api/)crwdne19171:0
