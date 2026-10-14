---
title: crwdns30522:0crwdne30522:0
description: crwdns30524:0crwdne30524:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns30526:0{#port-forwarding}crwdne30526:0

crwdns30528:0crwdne30528:0
crwdns30530:0crwdne30530:0

:::caution

crwdns30532:0[crwdnd30532:0](/wiki/geyser/setup)crwdne30532:0

:::

:::info crwdns30534:0crwdne30534:0
crwdns30536:0crwdne30536:0
crwdns30538:0`webrtc-port`crwdne30538:0
crwdns30540:0[crwdnd30540:0](https://warden.cloud)crwdne30540:0
:::

## crwdns30542:0{#port-forwarding-on-linuxwindowsmacos}crwdne30542:0

crwdns30544:0crwdne30544:0
crwdns30546:0crwdne30546:0
crwdns30548:0crwdne30548:0
crwdns30550:0[crwdnd30550:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd30550:0[crwdnd30550:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne30550:0
crwdns30552:0crwdne30552:0

:::info

crwdns30554:0crwdne30554:0
crwdns30556:0crwdne30556:0  
crwdns30558:0[crwdnd30558:0](/wiki/geyser/playit-gg/)crwdne30558:0

:::

### crwdns30560:0{#windows}crwdne30560:0

crwdns30562:0crwdne30562:0 crwdns30564:0crwdne30564:0

- crwdns30566:0`Powershell`crwdne30566:0

  crwdns30568:0crwdne30568:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns30570:0crwdne30570:0

- crwdns30572:0crwdne30572:0
  1. crwdns30574:0crwdne30574:0 crwdns30576:0[crwdnd30576:0](/img/wiki/port-forwarding/windows-1.png)crwdne30576:0
  2. crwdns30578:0crwdne30578:0 crwdns30580:0[crwdnd30580:0](/img/wiki/port-forwarding/windows-2.png)crwdne30580:0
  3. crwdns30582:0crwdne30582:0 crwdns30584:0[crwdnd30584:0](/img/wiki/port-forwarding/windows-2.png)crwdne30584:0
  4. crwdns30586:0crwdne30586:0 crwdns30588:0[crwdnd30588:0](/img/wiki/port-forwarding/windows-3.png)crwdne30588:0
  5. crwdns30590:0crwdne30590:0 crwdns30592:0crwdne30592:0 crwdns30594:0[crwdnd30594:0](/img/wiki/port-forwarding/windows-4.png)crwdne30594:0
  6. crwdns30596:0crwdne30596:0 crwdns30598:0[crwdnd30598:0](/img/wiki/port-forwarding/windows-5.png)crwdne30598:0
  7. crwdns30600:0crwdne30600:0 crwdns30602:0[crwdnd30602:0](/img/wiki/port-forwarding/windows-6.png)crwdne30602:0
  8. crwdns30604:0crwdne30604:0 crwdns30606:0[crwdnd30606:0](/img/wiki/port-forwarding/windows-7.png)crwdne30606:0
  9. crwdns30608:0crwdne30608:0

### crwdns30610:0{#linux}crwdne30610:0

crwdns30612:0crwdne30612:0 crwdns30614:0`19132`crwdne30614:0

- crwdns30616:0`ufw`crwdne30616:0 crwdns30618:0crwdne30618:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns30620:0`sudo ufw reload`crwdnd30620:0`sudo ufw status`crwdne30620:0  
  crwdns30622:0[crwdnd30622:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd30622:0[crwdnd30622:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne30622:0

- crwdns30624:0`firewalld`crwdne30624:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns30626:0`sudo firewall-cmd --reload`crwdnd30626:0`sudo firewall-cmd --list-all`crwdne30626:0  
  crwdns30628:0[crwdnd30628:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne30628:0

- crwdns30630:0`iptables`crwdne30630:0 crwdns30632:0crwdne30632:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns30634:0`sudo iptables-save`crwdnd30634:0`sudo iptables -L`crwdne30634:0  
  crwdns30636:0[crwdnd30636:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd30636:0[crwdnd30636:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne30636:0

### crwdns30638:0{#macos}crwdne30638:0

crwdns30640:0`Block all incoming connections`crwdne30640:0
crwdns30642:0`Allow`crwdnd30642:0[crwdnd30642:0](/img/wiki/port-forwarding/macos_warning.png)crwdne30642:0
crwdns30644:0[crwdnd30644:0](https://support.apple.com/guide/mac-help/MH11783)crwdne30644:0

## crwdns30646:0{#using-docker-or-pterodactyl}crwdne30646:0

crwdns30648:0crwdne30648:0

### crwdns30650:0{#pterodactyl}crwdne30650:0

crwdns30652:0`Network`crwdne30652:0
crwdns30654:0[crwdnd30654:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne30654:0

crwdns30656:0![crwdnd30656:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne30656:0

crwdns30658:0[crwdnd30658:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne30658:0

:::caution

crwdns30660:0crwdne30660:0

:::

### crwdns30662:0{#docker}crwdne30662:0

crwdns30664:0[crwdnd30664:0](https://github.com/itzg/docker-minecraft-server)crwdne30664:0 crwdns30666:0`ports`crwdne30666:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns30668:0crwdne30668:0 crwdns30670:0`/udp`crwdne30670:0
crwdns30672:0`-p 19132:19132 -p 19132:19132/udp`crwdne30672:0

## crwdns30674:0{#issues-with-specific-vpskvm-providers}crwdne30674:0

crwdns30676:0crwdne30676:0

### crwdns30678:0{#ovh-and-soyoustart}crwdne30678:0

crwdns30680:0crwdne30680:0 crwdns30682:0crwdne30682:0
crwdns30684:0crwdne30684:0
crwdns30686:0`Other`crwdne30686:0

:::caution

crwdns30688:0crwdne30688:0

:::

crwdns30690:0crwdne30690:0

crwdns30692:0crwdne30692:0

1. crwdns30694:0`Network interfaces`crwdne30694:0
2. crwdns30696:0`...`crwdnd30696:0`...`crwdnd30696:0`Configure the GAME firewall`crwdnd30696:0`Add rule`crwdnd30696:0`Other protocol`crwdne30696:0
3. crwdns30698:0`outgoing port`crwdne30698:0 crwdns30700:0`webrtc-port`crwdne30700:0
4. crwdns30702:0crwdne30702:0

crwdns30704:0crwdne30704:0

1. crwdns30706:0crwdne30706:0
2. crwdns30708:0crwdne30708:0
3. crwdns30710:0crwdne30710:0
4. crwdns30712:0crwdne30712:0 crwdns30714:0`webrtc-port`crwdne30714:0
5. crwdns30716:0crwdne30716:0

### crwdns30718:0{#oracle-cloudoci}crwdne30718:0

crwdns30720:0crwdne30720:0 crwdns30722:0crwdne30722:0

crwdns30724:0crwdne30724:0

1. crwdns30726:0crwdne30726:0
2. crwdns30728:0crwdne30728:0
3. crwdns30730:0crwdne30730:0
4. crwdns30732:0crwdne30732:0 crwdns30734:0crwdne30734:0 crwdns30736:0crwdne30736:0
5. crwdns30738:0crwdne30738:0
6. crwdns30740:0crwdne30740:0
   - crwdns30742:0`0.0.0.0/0`crwdne30742:0
   - crwdns30744:0`25565-25565`crwdne30744:0
   - crwdns30746:0crwdne30746:0
7. crwdns30748:0crwdne30748:0
   - crwdns30750:0`0.0.0.0/0`crwdne30750:0
   - crwdns30752:0`19132-19132`crwdne30752:0
   - crwdns30754:0crwdne30754:0
   - crwdns30756:0crwdne30756:0
8. crwdns30758:0crwdne30758:0

#### crwdns30760:0{#oracle-linux}crwdne30760:0

crwdns30762:0crwdne30762:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns30764:0{#ubuntu}crwdne30764:0

crwdns30766:0crwdne30766:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
