---
title: crwdns32466:0crwdne32466:0
description: crwdns32468:0crwdne32468:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns32470:0{#port-forwarding}crwdne32470:0

crwdns32472:0crwdne32472:0
crwdns32474:0crwdne32474:0

:::caution

crwdns32476:0[crwdnd32476:0](/wiki/geyser/setup)crwdne32476:0

:::

:::info crwdns32478:0crwdne32478:0
crwdns32480:0crwdne32480:0
crwdns32482:0`webrtc-port`crwdne32482:0
crwdns32484:0[crwdnd32484:0](https://warden.cloud)crwdne32484:0
:::

## crwdns32486:0{#port-forwarding-on-linuxwindowsmacos}crwdne32486:0

crwdns32488:0crwdne32488:0
crwdns32490:0crwdne32490:0
crwdns32492:0crwdne32492:0
crwdns32494:0[crwdnd32494:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd32494:0[crwdnd32494:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne32494:0
crwdns32496:0crwdne32496:0

:::info

crwdns32498:0crwdne32498:0
crwdns32500:0crwdne32500:0  
crwdns32502:0[crwdnd32502:0](/wiki/geyser/playit-gg/)crwdne32502:0

:::

### crwdns32504:0{#windows}crwdne32504:0

crwdns32506:0crwdne32506:0 crwdns32508:0crwdne32508:0

- crwdns32510:0`Powershell`crwdne32510:0

  crwdns32512:0crwdne32512:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns32514:0crwdne32514:0

- crwdns32516:0crwdne32516:0
  1. crwdns32518:0crwdne32518:0 crwdns32520:0[crwdnd32520:0](/img/wiki/port-forwarding/windows-1.png)crwdne32520:0
  2. crwdns32522:0crwdne32522:0 crwdns32524:0[crwdnd32524:0](/img/wiki/port-forwarding/windows-2.png)crwdne32524:0
  3. crwdns32526:0crwdne32526:0 crwdns32528:0[crwdnd32528:0](/img/wiki/port-forwarding/windows-2.png)crwdne32528:0
  4. crwdns32530:0crwdne32530:0 crwdns32532:0[crwdnd32532:0](/img/wiki/port-forwarding/windows-3.png)crwdne32532:0
  5. crwdns32534:0crwdne32534:0 crwdns32536:0crwdne32536:0 crwdns32538:0[crwdnd32538:0](/img/wiki/port-forwarding/windows-4.png)crwdne32538:0
  6. crwdns32540:0crwdne32540:0 crwdns32542:0[crwdnd32542:0](/img/wiki/port-forwarding/windows-5.png)crwdne32542:0
  7. crwdns32544:0crwdne32544:0 crwdns32546:0[crwdnd32546:0](/img/wiki/port-forwarding/windows-6.png)crwdne32546:0
  8. crwdns32548:0crwdne32548:0 crwdns32550:0[crwdnd32550:0](/img/wiki/port-forwarding/windows-7.png)crwdne32550:0
  9. crwdns32552:0crwdne32552:0

### crwdns32554:0{#linux}crwdne32554:0

crwdns32556:0crwdne32556:0 crwdns32558:0`19132`crwdne32558:0

- crwdns32560:0`ufw`crwdne32560:0 crwdns32562:0crwdne32562:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns32564:0`sudo ufw reload`crwdnd32564:0`sudo ufw status`crwdne32564:0  
  crwdns32566:0[crwdnd32566:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd32566:0[crwdnd32566:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne32566:0

- crwdns32568:0`firewalld`crwdne32568:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns32570:0`sudo firewall-cmd --reload`crwdnd32570:0`sudo firewall-cmd --list-all`crwdne32570:0  
  crwdns32572:0[crwdnd32572:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne32572:0

- crwdns32574:0`iptables`crwdne32574:0 crwdns32576:0crwdne32576:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns32578:0`sudo iptables-save`crwdnd32578:0`sudo iptables -L`crwdne32578:0  
  crwdns32580:0[crwdnd32580:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd32580:0[crwdnd32580:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne32580:0

### crwdns32582:0{#macos}crwdne32582:0

crwdns32584:0`Block all incoming connections`crwdne32584:0
crwdns32586:0`Allow`crwdnd32586:0[crwdnd32586:0](/img/wiki/port-forwarding/macos_warning.png)crwdne32586:0
crwdns32588:0[crwdnd32588:0](https://support.apple.com/guide/mac-help/MH11783)crwdne32588:0

## crwdns32590:0{#using-docker-or-pterodactyl}crwdne32590:0

crwdns32592:0crwdne32592:0

### crwdns32594:0{#pterodactyl}crwdne32594:0

crwdns32596:0`Network`crwdne32596:0
crwdns32598:0[crwdnd32598:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne32598:0

crwdns32600:0![crwdnd32600:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne32600:0

crwdns32602:0[crwdnd32602:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne32602:0

:::caution

crwdns32604:0crwdne32604:0

:::

### crwdns32606:0{#docker}crwdne32606:0

crwdns32608:0[crwdnd32608:0](https://github.com/itzg/docker-minecraft-server)crwdne32608:0 crwdns32610:0`ports`crwdne32610:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns32612:0crwdne32612:0 crwdns32614:0`/udp`crwdne32614:0
crwdns32616:0`-p 19132:19132 -p 19132:19132/udp`crwdne32616:0

## crwdns32618:0{#issues-with-specific-vpskvm-providers}crwdne32618:0

crwdns32620:0crwdne32620:0

### crwdns32622:0{#ovh-and-soyoustart}crwdne32622:0

crwdns32624:0crwdne32624:0 crwdns32626:0crwdne32626:0
crwdns32628:0crwdne32628:0
crwdns32630:0`Other`crwdne32630:0

:::caution

crwdns32632:0crwdne32632:0

:::

crwdns32634:0crwdne32634:0

crwdns32636:0crwdne32636:0

1. crwdns32638:0`Network interfaces`crwdne32638:0
2. crwdns32640:0`...`crwdnd32640:0`...`crwdnd32640:0`Configure the GAME firewall`crwdnd32640:0`Add rule`crwdnd32640:0`Other protocol`crwdne32640:0
3. crwdns32642:0`outgoing port`crwdne32642:0 crwdns32644:0`webrtc-port`crwdne32644:0
4. crwdns32646:0crwdne32646:0

crwdns32648:0crwdne32648:0

1. crwdns32650:0crwdne32650:0
2. crwdns32652:0crwdne32652:0
3. crwdns32654:0crwdne32654:0
4. crwdns32656:0crwdne32656:0 crwdns32658:0`webrtc-port`crwdne32658:0
5. crwdns32660:0crwdne32660:0

### crwdns32662:0{#oracle-cloudoci}crwdne32662:0

crwdns32664:0crwdne32664:0 crwdns32666:0crwdne32666:0

crwdns32668:0crwdne32668:0

1. crwdns32670:0crwdne32670:0
2. crwdns32672:0crwdne32672:0
3. crwdns32674:0crwdne32674:0
4. crwdns32676:0crwdne32676:0 crwdns32678:0crwdne32678:0 crwdns32680:0crwdne32680:0
5. crwdns32682:0crwdne32682:0
6. crwdns32684:0crwdne32684:0
   - crwdns32686:0`0.0.0.0/0`crwdne32686:0
   - crwdns32688:0`25565-25565`crwdne32688:0
   - crwdns32690:0crwdne32690:0
7. crwdns32692:0crwdne32692:0
   - crwdns32694:0`0.0.0.0/0`crwdne32694:0
   - crwdns32696:0`19132-19132`crwdne32696:0
   - crwdns32698:0crwdne32698:0
   - crwdns32700:0crwdne32700:0
8. crwdns32702:0crwdne32702:0

#### crwdns32704:0{#oracle-linux}crwdne32704:0

crwdns32706:0crwdne32706:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns32708:0{#ubuntu}crwdne32708:0

crwdns32710:0crwdne32710:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
