---
title: crwdns19017:0crwdne19017:0
description: crwdns19019:0crwdne19019:0 crwdns19021:0crwdne19021:0
---

## crwdns19023:0crwdne19023:0 crwdns19025:0{#what-is-global-linking}crwdne19025:0

crwdns19027:0[crwdnd19027:0](https://link.geysermc.org/)crwdne19027:0

crwdns19029:0crwdne19029:0 crwdns19031:0crwdne19031:0 crwdns19033:0crwdne19033:0

crwdns19035:0crwdne19035:0 crwdns19037:0crwdne19037:0 crwdns19039:0crwdne19039:0 crwdns19041:0crwdne19041:0

crwdns19043:0[crwdnd19043:0](/wiki/api/api.geysermc.org/global-api/)crwdne19043:0 crwdns19045:0crwdne19045:0

1. crwdns19047:0`link.geysermc.org`crwdnd19047:0`25565`crwdnd19047:0`19132`crwdne19047:0
2. crwdns19049:0`/linkaccount`crwdne19049:0
3. crwdns19051:0crwdne19051:0
4. crwdns19053:0`/linkaccount <code>`crwdne19053:0
5. crwdns19055:0crwdne19055:0

crwdns19057:0`/unlinkaccount`crwdne19057:0

crwdns19059:0`player-link`crwdne19059:0

```yml
# Configuration for player linking
player-link:
  # Whether to enable the linking system. Turning this off will prevent
  # players from using the linking feature even if they are already linked.
  enabled: true
  # Whether to use global linking. Global linking uses a central server to request link
  # accounts, allowing people to link once, join everywhere (on servers with global linking).
  enable-global-linking: true
```

crwdns19061:0[crwdnd19061:0](https://github.com/GeyserMC/Floodgate/blob/master/core/src/main/resources/config.yml)crwdne19061:0

crwdns19063:0crwdne19063:0

crwdns19065:0`enable-global-linking`crwdne19065:0

## crwdns19067:0{#local-linking}crwdne19067:0

crwdns19069:0crwdne19069:0 crwdns19071:0crwdne19071:0 crwdns19073:0crwdne19073:0

crwdns19075:0crwdne19075:0

1. crwdns19077:0[crwdnd19077:0](https://ci.opencollab.dev/job/GeyserMC/job/Floodgate/job/fix-weird-via-issue/)crwdne19077:0
   crwdns19079:0`mysql`crwdne19079:0 crwdns19081:0`sqlite`crwdne19081:0 crwdns19083:0`floodgate-*type*-database.jar`crwdne19083:0
2. crwdns19085:0`/plugins/floodgate/`crwdne19085:0
3. crwdns19087:0`enable-own-linking`crwdnd19087:0`player-link`crwdne19087:0
4. crwdns19089:0`type`crwdnd19089:0`player-link`crwdnd19089:0`mysql`crwdnd19089:0`sqlite`crwdne19089:0 crwdns19091:0`sqlite`crwdne19091:0
5. crwdns19093:0crwdne19093:0

crwdns19095:0`mysql`crwdne19095:0 crwdns19097:0crwdne19097:0 crwdns19099:0crwdne19099:0

crwdns19101:0crwdne19101:0 crwdns19103:0`/linkaccount`crwdne19103:0
