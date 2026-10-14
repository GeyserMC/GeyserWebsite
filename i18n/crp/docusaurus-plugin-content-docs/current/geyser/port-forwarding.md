---
title: crwdns27539:0crwdne27539:0
description: crwdns29304:0crwdne29304:0
crowdin_sync: true
crowdin_page_id: crwdns27543:0crwdne27543:0
---

# crwdns28881:0{#port-forwarding}crwdne28881:0

crwdns27547:0crwdne27547:0
crwdns27549:0crwdne27549:0

:::caution

crwdns27551:0[crwdnd27551:0](/wiki/geyser/setup)crwdne27551:0

:::

:::info crwdns29306:0crwdne29306:0
crwdns29308:0crwdne29308:0
crwdns29310:0`webrtc-port`crwdne29310:0
crwdns29312:0[crwdnd29312:0](https://warden.cloud)crwdne29312:0
:::

## crwdns27553:0{#port-forwarding-on-linuxwindowsmacos}crwdne27553:0

crwdns27555:0crwdne27555:0
crwdns27557:0crwdne27557:0
crwdns29314:0crwdne29314:0
crwdns27559:0[crwdnd27559:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd27559:0[crwdnd27559:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne27559:0
crwdns27561:0crwdne27561:0

:::info

crwdns27563:0crwdne27563:0
crwdns27565:0crwdne27565:0  
crwdns27567:0[crwdnd27567:0](/wiki/geyser/playit-gg/)crwdne27567:0

:::

### crwdns27569:0{#windows}crwdne27569:0

crwdns27571:0crwdne27571:0 crwdns27573:0crwdne27573:0

- crwdns27575:0`Powershell`crwdne27575:0

  crwdns29316:0crwdne29316:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns29318:0crwdne29318:0

- crwdns27581:0crwdne27581:0
  1. crwdns27583:0crwdne27583:0 crwdns27585:0[crwdnd27585:0](/img/wiki/port-forwarding/windows-1.png)crwdne27585:0
  2. crwdns27587:0crwdne27587:0 crwdns27589:0[crwdnd27589:0](/img/wiki/port-forwarding/windows-2.png)crwdne27589:0
  3. crwdns27591:0crwdne27591:0 crwdns27593:0[crwdnd27593:0](/img/wiki/port-forwarding/windows-2.png)crwdne27593:0
  4. crwdns27595:0crwdne27595:0 crwdns27597:0[crwdnd27597:0](/img/wiki/port-forwarding/windows-3.png)crwdne27597:0
  5. crwdns27599:0crwdne27599:0 crwdns27601:0crwdne27601:0 crwdns27603:0[crwdnd27603:0](/img/wiki/port-forwarding/windows-4.png)crwdne27603:0
  6. crwdns27605:0crwdne27605:0 crwdns27607:0[crwdnd27607:0](/img/wiki/port-forwarding/windows-5.png)crwdne27607:0
  7. crwdns27609:0crwdne27609:0 crwdns27611:0[crwdnd27611:0](/img/wiki/port-forwarding/windows-6.png)crwdne27611:0
  8. crwdns29320:0crwdne29320:0 crwdns27615:0[crwdnd27615:0](/img/wiki/port-forwarding/windows-7.png)crwdne27615:0
  9. crwdns29322:0crwdne29322:0

### crwdns27617:0{#linux}crwdne27617:0

crwdns27619:0crwdne27619:0 crwdns27621:0`19132`crwdne27621:0

- crwdns27623:0`ufw`crwdne27623:0 crwdns29324:0crwdne29324:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns27627:0`sudo ufw reload`crwdnd27627:0`sudo ufw status`crwdne27627:0  
  crwdns27629:0[crwdnd27629:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd27629:0[crwdnd27629:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne27629:0

- crwdns29326:0`firewalld`crwdne29326:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns27633:0`sudo firewall-cmd --reload`crwdnd27633:0`sudo firewall-cmd --list-all`crwdne27633:0  
  crwdns27635:0[crwdnd27635:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne27635:0

- crwdns27637:0`iptables`crwdne27637:0 crwdns29328:0crwdne29328:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns27641:0`sudo iptables-save`crwdnd27641:0`sudo iptables -L`crwdne27641:0  
  crwdns27643:0[crwdnd27643:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd27643:0[crwdnd27643:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne27643:0

### crwdns27645:0{#macos}crwdne27645:0

crwdns27647:0`Block all incoming connections`crwdne27647:0
crwdns27649:0`Allow`crwdnd27649:0[crwdnd27649:0](/img/wiki/port-forwarding/macos_warning.png)crwdne27649:0
crwdns27651:0[crwdnd27651:0](https://support.apple.com/guide/mac-help/MH11783)crwdne27651:0

## crwdns27653:0{#using-docker-or-pterodactyl}crwdne27653:0

crwdns27655:0crwdne27655:0

### crwdns27657:0{#pterodactyl}crwdne27657:0

crwdns29330:0`Network`crwdne29330:0
crwdns27661:0[crwdnd27661:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne27661:0

crwdns27663:0![crwdnd27663:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne27663:0

crwdns27665:0[crwdnd27665:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne27665:0

:::caution

crwdns27667:0crwdne27667:0

:::

### crwdns27669:0{#docker}crwdne27669:0

crwdns29332:0[crwdnd29332:0](https://github.com/itzg/docker-minecraft-server)crwdne29332:0 crwdns27673:0`ports`crwdne27673:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns29334:0crwdne29334:0 crwdns29336:0`/udp`crwdne29336:0
crwdns29338:0`-p 19132:19132 -p 19132:19132/udp`crwdne29338:0

## crwdns27681:0{#issues-with-specific-vpskvm-providers}crwdne27681:0

crwdns29340:0crwdne29340:0

### crwdns27685:0{#ovh-and-soyoustart}crwdne27685:0

crwdns29342:0crwdne29342:0 crwdns29344:0crwdne29344:0
crwdns29346:0crwdne29346:0
crwdns29348:0`Other`crwdne29348:0

:::caution

crwdns27691:0crwdne27691:0

:::

crwdns27701:0crwdne27701:0

crwdns27703:0crwdne27703:0

1. crwdns27705:0`Network interfaces`crwdne27705:0
2. crwdns29350:0`...`crwdnd29350:0`...`crwdnd29350:0`Configure the GAME firewall`crwdnd29350:0`Add rule`crwdnd29350:0`Other protocol`crwdne29350:0
3. crwdns27709:0`outgoing port`crwdne27709:0 crwdns29352:0`webrtc-port`crwdne29352:0
4. crwdns29354:0crwdne29354:0

crwdns27711:0crwdne27711:0

1. crwdns27713:0crwdne27713:0
2. crwdns27715:0crwdne27715:0
3. crwdns27717:0crwdne27717:0
4. crwdns29356:0crwdne29356:0 crwdns29358:0`webrtc-port`crwdne29358:0
5. crwdns27721:0crwdne27721:0

### crwdns27735:0{#oracle-cloudoci}crwdne27735:0

crwdns27737:0crwdne27737:0 crwdns27739:0crwdne27739:0

crwdns27741:0crwdne27741:0

1. crwdns27743:0crwdne27743:0
2. crwdns27745:0crwdne27745:0
3. crwdns27747:0crwdne27747:0
4. crwdns27749:0crwdne27749:0 crwdns27751:0crwdne27751:0 crwdns27753:0crwdne27753:0
5. crwdns27755:0crwdne27755:0
6. crwdns27757:0crwdne27757:0
   - crwdns27759:0`0.0.0.0/0`crwdne27759:0
   - crwdns27761:0`25565-25565`crwdne27761:0
   - crwdns27763:0crwdne27763:0
7. crwdns29360:0crwdne29360:0
   - crwdns27767:0`0.0.0.0/0`crwdne27767:0
   - crwdns27769:0`19132-19132`crwdne27769:0
   - crwdns29362:0crwdne29362:0
   - crwdns29364:0crwdne29364:0
8. crwdns27773:0crwdne27773:0

#### crwdns27775:0{#oracle-linux}crwdne27775:0

crwdns29366:0crwdne29366:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns27779:0{#ubuntu}crwdne27779:0

crwdns27777:0crwdne27777:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
