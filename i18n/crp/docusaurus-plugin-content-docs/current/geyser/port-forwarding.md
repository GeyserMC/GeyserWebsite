---
title: crwdns36486:0crwdne36486:0
description: crwdns36488:0crwdne36488:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns36490:0crwdne36490:0 {#port-forwarding}

crwdns36492:0crwdne36492:0
crwdns36494:0crwdne36494:0

:::caution

crwdns36496:0[crwdnd36496:0](/wiki/geyser/setup)crwdne36496:0

:::

:::info crwdns36498:0crwdne36498:0
crwdns36500:0crwdne36500:0
crwdns36502:0`webrtc-port`crwdne36502:0
crwdns36504:0[crwdnd36504:0](https://warden.cloud)crwdne36504:0
:::

## crwdns36506:0crwdne36506:0 {/* #port-forwarding-on-linuxwindowsmacos */}

crwdns36508:0crwdne36508:0
crwdns36510:0crwdne36510:0
crwdns36512:0crwdne36512:0
crwdns36514:0[crwdnd36514:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd36514:0[crwdnd36514:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne36514:0
crwdns36516:0crwdne36516:0

:::info

crwdns36518:0crwdne36518:0
crwdns36520:0crwdne36520:0\
crwdns36522:0[crwdnd36522:0](/wiki/geyser/playit-gg/)crwdne36522:0

:::

### crwdns36524:0crwdne36524:0 {/* #windows */}

crwdns36526:0crwdne36526:0 crwdns36528:0crwdne36528:0

- crwdns36530:0`Powershell`crwdne36530:0

  crwdns36532:0crwdne36532:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns36534:0crwdne36534:0

- crwdns36536:0crwdne36536:0
  1. crwdns36538:0crwdne36538:0 crwdns36540:0[crwdnd36540:0](/img/wiki/port-forwarding/windows-1.png)crwdne36540:0
  2. crwdns36542:0crwdne36542:0 crwdns36544:0[crwdnd36544:0](/img/wiki/port-forwarding/windows-2.png)crwdne36544:0
  3. crwdns36546:0crwdne36546:0 crwdns36548:0[crwdnd36548:0](/img/wiki/port-forwarding/windows-2.png)crwdne36548:0
  4. crwdns36550:0crwdne36550:0 crwdns36552:0[crwdnd36552:0](/img/wiki/port-forwarding/windows-3.png)crwdne36552:0
  5. crwdns36554:0crwdne36554:0 crwdns36556:0crwdne36556:0 crwdns36558:0[crwdnd36558:0](/img/wiki/port-forwarding/windows-4.png)crwdne36558:0
  6. crwdns36560:0crwdne36560:0 crwdns36562:0[crwdnd36562:0](/img/wiki/port-forwarding/windows-5.png)crwdne36562:0
  7. crwdns36564:0crwdne36564:0 crwdns36566:0[crwdnd36566:0](/img/wiki/port-forwarding/windows-6.png)crwdne36566:0
  8. crwdns36568:0crwdne36568:0 crwdns36570:0[crwdnd36570:0](/img/wiki/port-forwarding/windows-7.png)crwdne36570:0
  9. crwdns36572:0crwdne36572:0

### crwdns36574:0crwdne36574:0 {/* #linux */}

crwdns36576:0crwdne36576:0 crwdns36578:0`19132`crwdne36578:0

- crwdns36580:0`ufw`crwdne36580:0 crwdns36582:0crwdne36582:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns36584:0`sudo ufw reload`crwdnd36584:0`sudo ufw status`crwdne36584:0\
  crwdns36586:0[crwdnd36586:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd36586:0[crwdnd36586:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne36586:0

- crwdns36588:0`firewalld`crwdne36588:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns36590:0`sudo firewall-cmd --reload`crwdnd36590:0`sudo firewall-cmd --list-all`crwdne36590:0\
  crwdns36592:0[crwdnd36592:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne36592:0

- crwdns36594:0`iptables`crwdne36594:0 crwdns36596:0crwdne36596:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns36598:0`sudo iptables-save`crwdnd36598:0`sudo iptables -L`crwdne36598:0\
  crwdns36600:0[crwdnd36600:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd36600:0[crwdnd36600:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne36600:0

### crwdns36602:0crwdne36602:0 {/* #macos */}

crwdns36604:0`Block all incoming connections`crwdne36604:0
crwdns36606:0`Allow`crwdnd36606:0[crwdnd36606:0](/img/wiki/port-forwarding/macos_warning.png)crwdne36606:0
crwdns36608:0[crwdnd36608:0](https://support.apple.com/guide/mac-help/MH11783)crwdne36608:0

## crwdns36610:0crwdne36610:0 {/* #using-docker-or-pterodactyl */}

crwdns36612:0crwdne36612:0

### crwdns36614:0crwdne36614:0 {/* #pterodactyl */}

crwdns36616:0`Network`crwdne36616:0
crwdns36618:0[crwdnd36618:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne36618:0

crwdns36620:0![crwdnd36620:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne36620:0

crwdns36622:0[crwdnd36622:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne36622:0

:::caution

crwdns36624:0crwdne36624:0

:::

### crwdns36626:0crwdne36626:0 {/* #docker */}

crwdns36628:0[crwdnd36628:0](https://github.com/itzg/docker-minecraft-server)crwdne36628:0 crwdns36630:0`ports`crwdne36630:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns36632:0crwdne36632:0 crwdns36634:0`/udp`crwdne36634:0
crwdns36636:0`-p 19132:19132 -p 19132:19132/udp`crwdne36636:0

## crwdns36638:0crwdne36638:0 {/* #issues-with-specific-vpskvm-providers */}

crwdns36640:0crwdne36640:0

### crwdns36642:0crwdne36642:0 {/* #ovh-and-soyoustart */}

crwdns36644:0crwdne36644:0 crwdns36646:0crwdne36646:0
crwdns36648:0crwdne36648:0
crwdns36650:0`Other`crwdne36650:0

:::caution

crwdns36652:0crwdne36652:0

:::

crwdns36654:0crwdne36654:0

crwdns36656:0crwdne36656:0

1. crwdns36658:0`Network interfaces`crwdne36658:0
2. crwdns36660:0`...`crwdnd36660:0`...`crwdnd36660:0`Configure the GAME firewall`crwdnd36660:0`Add rule`crwdnd36660:0`Other protocol`crwdne36660:0
3. crwdns36662:0`outgoing port`crwdne36662:0 crwdns36664:0`webrtc-port`crwdne36664:0
4. crwdns36666:0crwdne36666:0

crwdns36668:0crwdne36668:0

1. crwdns36670:0crwdne36670:0
2. crwdns36672:0crwdne36672:0
3. crwdns36674:0crwdne36674:0
4. crwdns36676:0crwdne36676:0 crwdns36678:0`webrtc-port`crwdne36678:0
5. crwdns36680:0crwdne36680:0

### crwdns36682:0crwdne36682:0 {/* #oracle-cloudoci */}

crwdns36684:0crwdne36684:0 crwdns36686:0crwdne36686:0

crwdns36688:0crwdne36688:0

1. crwdns36690:0crwdne36690:0
2. crwdns36692:0crwdne36692:0
3. crwdns36694:0crwdne36694:0
4. crwdns36696:0crwdne36696:0 crwdns36698:0crwdne36698:0 crwdns36700:0crwdne36700:0
5. crwdns36702:0crwdne36702:0
6. crwdns36704:0crwdne36704:0
   - crwdns36706:0`0.0.0.0/0`crwdne36706:0
   - crwdns36708:0`25565-25565`crwdne36708:0
   - crwdns36710:0crwdne36710:0
7. crwdns36712:0crwdne36712:0
   - crwdns36714:0`0.0.0.0/0`crwdne36714:0
   - crwdns36716:0`19132-19132`crwdne36716:0
   - crwdns36718:0crwdne36718:0
   - crwdns36720:0crwdne36720:0
8. crwdns36722:0crwdne36722:0

#### crwdns36724:0crwdne36724:0 {/* #oracle-linux */}

crwdns36726:0crwdne36726:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns36728:0crwdne36728:0 {/* #ubuntu */}

crwdns36730:0crwdne36730:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
