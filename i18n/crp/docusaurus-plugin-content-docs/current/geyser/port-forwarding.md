---
title: crwdns35158:0crwdne35158:0
description: crwdns35160:0crwdne35160:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns35162:0{#port-forwarding}crwdne35162:0

crwdns35164:0crwdne35164:0
crwdns35166:0crwdne35166:0

:::caution

crwdns35168:0[crwdnd35168:0](/wiki/geyser/setup)crwdne35168:0

:::

:::info crwdns35170:0crwdne35170:0
crwdns35172:0crwdne35172:0
crwdns35174:0`webrtc-port`crwdne35174:0
crwdns35176:0[crwdnd35176:0](https://warden.cloud)crwdne35176:0
:::

## crwdns35178:0{/\* #port-forwarding-on-linuxwindowsmacos \*/}crwdne35178:0

crwdns35180:0crwdne35180:0
crwdns35182:0crwdne35182:0
crwdns35184:0crwdne35184:0
crwdns35186:0[crwdnd35186:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd35186:0[crwdnd35186:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne35186:0
crwdns35188:0crwdne35188:0

:::info

crwdns35190:0crwdne35190:0
crwdns35192:0crwdne35192:0  
crwdns35194:0[crwdnd35194:0](/wiki/geyser/playit-gg/)crwdne35194:0

:::

### crwdns35196:0{/\* #windows \*/}crwdne35196:0

crwdns35198:0crwdne35198:0 crwdns35200:0crwdne35200:0

- crwdns35202:0`Powershell`crwdne35202:0

  crwdns35204:0crwdne35204:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns35206:0crwdne35206:0

- crwdns35208:0crwdne35208:0
  1. crwdns35210:0crwdne35210:0 crwdns35212:0[crwdnd35212:0](/img/wiki/port-forwarding/windows-1.png)crwdne35212:0
  2. crwdns35214:0crwdne35214:0 crwdns35216:0[crwdnd35216:0](/img/wiki/port-forwarding/windows-2.png)crwdne35216:0
  3. crwdns35218:0crwdne35218:0 crwdns35220:0[crwdnd35220:0](/img/wiki/port-forwarding/windows-2.png)crwdne35220:0
  4. crwdns35222:0crwdne35222:0 crwdns35224:0[crwdnd35224:0](/img/wiki/port-forwarding/windows-3.png)crwdne35224:0
  5. crwdns35226:0crwdne35226:0 crwdns35228:0crwdne35228:0 crwdns35230:0[crwdnd35230:0](/img/wiki/port-forwarding/windows-4.png)crwdne35230:0
  6. crwdns35232:0crwdne35232:0 crwdns35234:0[crwdnd35234:0](/img/wiki/port-forwarding/windows-5.png)crwdne35234:0
  7. crwdns35236:0crwdne35236:0 crwdns35238:0[crwdnd35238:0](/img/wiki/port-forwarding/windows-6.png)crwdne35238:0
  8. crwdns35240:0crwdne35240:0 crwdns35242:0[crwdnd35242:0](/img/wiki/port-forwarding/windows-7.png)crwdne35242:0
  9. crwdns35244:0crwdne35244:0

### crwdns35246:0{/\* #linux \*/}crwdne35246:0

crwdns35248:0crwdne35248:0 crwdns35250:0`19132`crwdne35250:0

- crwdns35252:0`ufw`crwdne35252:0 crwdns35254:0crwdne35254:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns35256:0`sudo ufw reload`crwdnd35256:0`sudo ufw status`crwdne35256:0  
  crwdns35258:0[crwdnd35258:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd35258:0[crwdnd35258:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne35258:0

- crwdns35260:0`firewalld`crwdne35260:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns35262:0`sudo firewall-cmd --reload`crwdnd35262:0`sudo firewall-cmd --list-all`crwdne35262:0  
  crwdns35264:0[crwdnd35264:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne35264:0

- crwdns35266:0`iptables`crwdne35266:0 crwdns35268:0crwdne35268:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns35270:0`sudo iptables-save`crwdnd35270:0`sudo iptables -L`crwdne35270:0  
  crwdns35272:0[crwdnd35272:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd35272:0[crwdnd35272:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne35272:0

### crwdns35274:0{/\* #macos \*/}crwdne35274:0

crwdns35276:0`Block all incoming connections`crwdne35276:0
crwdns35278:0`Allow`crwdnd35278:0[crwdnd35278:0](/img/wiki/port-forwarding/macos_warning.png)crwdne35278:0
crwdns35280:0[crwdnd35280:0](https://support.apple.com/guide/mac-help/MH11783)crwdne35280:0

## crwdns35282:0{/\* #using-docker-or-pterodactyl \*/}crwdne35282:0

crwdns35284:0crwdne35284:0

### crwdns35286:0{/\* #pterodactyl \*/}crwdne35286:0

crwdns35288:0`Network`crwdne35288:0
crwdns35290:0[crwdnd35290:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne35290:0

crwdns35292:0![crwdnd35292:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne35292:0

crwdns35294:0[crwdnd35294:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne35294:0

:::caution

crwdns35296:0crwdne35296:0

:::

### crwdns35298:0{/\* #docker \*/}crwdne35298:0

crwdns35300:0[crwdnd35300:0](https://github.com/itzg/docker-minecraft-server)crwdne35300:0 crwdns35302:0`ports`crwdne35302:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns35304:0crwdne35304:0 crwdns35306:0`/udp`crwdne35306:0
crwdns35308:0`-p 19132:19132 -p 19132:19132/udp`crwdne35308:0

## crwdns35310:0{/\* #issues-with-specific-vpskvm-providers \*/}crwdne35310:0

crwdns35312:0crwdne35312:0

### crwdns35314:0{/\* #ovh-and-soyoustart \*/}crwdne35314:0

crwdns35316:0crwdne35316:0 crwdns35318:0crwdne35318:0
crwdns35320:0crwdne35320:0
crwdns35322:0`Other`crwdne35322:0

:::caution

crwdns35324:0crwdne35324:0

:::

crwdns35326:0crwdne35326:0

crwdns35328:0crwdne35328:0

1. crwdns35330:0`Network interfaces`crwdne35330:0
2. crwdns35332:0`...`crwdnd35332:0`...`crwdnd35332:0`Configure the GAME firewall`crwdnd35332:0`Add rule`crwdnd35332:0`Other protocol`crwdne35332:0
3. crwdns35334:0`outgoing port`crwdne35334:0 crwdns35336:0`webrtc-port`crwdne35336:0
4. crwdns35338:0crwdne35338:0

crwdns35340:0crwdne35340:0

1. crwdns35342:0crwdne35342:0
2. crwdns35344:0crwdne35344:0
3. crwdns35346:0crwdne35346:0
4. crwdns35348:0crwdne35348:0 crwdns35350:0`webrtc-port`crwdne35350:0
5. crwdns35352:0crwdne35352:0

### crwdns35354:0{/\* #oracle-cloudoci \*/}crwdne35354:0

crwdns35356:0crwdne35356:0 crwdns35358:0crwdne35358:0

crwdns35360:0crwdne35360:0

1. crwdns35362:0crwdne35362:0
2. crwdns35364:0crwdne35364:0
3. crwdns35366:0crwdne35366:0
4. crwdns35368:0crwdne35368:0 crwdns35370:0crwdne35370:0 crwdns35372:0crwdne35372:0
5. crwdns35374:0crwdne35374:0
6. crwdns35376:0crwdne35376:0
   - crwdns35378:0`0.0.0.0/0`crwdne35378:0
   - crwdns35380:0`25565-25565`crwdne35380:0
   - crwdns35382:0crwdne35382:0
7. crwdns35384:0crwdne35384:0
   - crwdns35386:0`0.0.0.0/0`crwdne35386:0
   - crwdns35388:0`19132-19132`crwdne35388:0
   - crwdns35390:0crwdne35390:0
   - crwdns35392:0crwdne35392:0
8. crwdns35394:0crwdne35394:0

#### crwdns35396:0{/\* #oracle-linux \*/}crwdne35396:0

crwdns35398:0crwdne35398:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns35400:0{/\* #ubuntu \*/}crwdne35400:0

crwdns35402:0crwdne35402:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
