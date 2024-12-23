---
title: crwdns20481:0crwdne20481:0
description: crwdns20485:0crwdne20485:0
---

# crwdns20489:0crwdne20489:0

crwdns20491:0crwdne20491:0
crwdns20495:0crwdne20495:0

:::caution

crwdns20497:0[crwdnd20497:0](/wiki/geyser/setup)crwdne20497:0

:::

## crwdns20501:0{#port-forwarding-on-linuxwindowsmacos}crwdne20501:0

crwdns20503:0crwdne20503:0
crwdns20507:0crwdne20507:0
crwdns20511:0[crwdnd20511:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd20511:0[crwdnd20511:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne20511:0
crwdns20513:0crwdne20513:0

:::info

crwdns20517:0crwdne20517:0
crwdns20519:0crwdne20519:0\
crwdns20521:0[crwdnd20521:0](/wiki/geyser/playit-gg/)crwdne20521:0

:::

### crwdns20525:0{#windows}crwdne20525:0

crwdns20527:0crwdne20527:0 crwdns20531:0crwdne20531:0

- crwdns20533:0`Powershell`crwdne20533:0

  crwdns20535:0crwdne20535:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns20539:0crwdne20539:0

- crwdns20541:0crwdne20541:0
  1. crwdns20545:0crwdne20545:0 crwdns20547:0[crwdnd20547:0](/img/wiki/port-forwarding/windows-1.png)crwdne20547:0
  2. crwdns20549:0crwdne20549:0 crwdns20553:0[crwdnd20553:0](/img/wiki/port-forwarding/windows-2.png)crwdne20553:0
  3. crwdns20555:0crwdne20555:0 crwdns20559:0[crwdnd20559:0](/img/wiki/port-forwarding/windows-2.png)crwdne20559:0
  4. crwdns20561:0crwdne20561:0 crwdns20563:0[crwdnd20563:0](/img/wiki/port-forwarding/windows-3.png)crwdne20563:0
  5. crwdns20567:0crwdne20567:0 crwdns20569:0crwdne20569:0 crwdns20573:0[crwdnd20573:0](/img/wiki/port-forwarding/windows-4.png)crwdne20573:0
  6. crwdns20575:0crwdne20575:0 crwdns20579:0[crwdnd20579:0](/img/wiki/port-forwarding/windows-5.png)crwdne20579:0
  7. crwdns20581:0crwdne20581:0 crwdns20585:0[crwdnd20585:0](/img/wiki/port-forwarding/windows-6.png)crwdne20585:0
  8. crwdns20589:0crwdne20589:0 crwdns20591:0[crwdnd20591:0](/img/wiki/port-forwarding/windows-7.png)crwdne20591:0

### crwdns20595:0{#linux}crwdne20595:0

crwdns20597:0crwdne20597:0 crwdns20601:0`19132`crwdne20601:0

- crwdns20603:0`ufw`crwdne20603:0 crwdns20607:0crwdne20607:0
  ```bash
  sudo ufw allow 19132/udp
  ```
  crwdns20609:0`sudo ufw reload`crwdnd20609:0`sudo ufw status`crwdne20609:0\
  crwdns20615:0[crwdnd20615:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd20615:0[crwdnd20615:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne20615:0

- crwdns20617:0`firewalld`crwdne20617:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns20619:0`sudo firewall-cmd --reload`crwdnd20619:0`sudo firewall-cmd --list-all`crwdne20619:0\
  crwdns20621:0[crwdnd20621:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne20621:0

- crwdns20625:0`iptables`crwdne20625:0 crwdns20627:0crwdne20627:0
  ```bash
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns20631:0`sudo iptables-save`crwdnd20631:0`sudo iptables -L`crwdne20631:0\
  crwdns20635:0[crwdnd20635:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd20635:0[crwdnd20635:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne20635:0

### crwdns20639:0{#macos}crwdne20639:0

crwdns20641:0`Block all incoming connections`crwdne20641:0
crwdns20643:0`Allow`crwdnd20643:0[crwdnd20643:0](/img/wiki/port-forwarding/macos_warning.png)crwdne20643:0
crwdns20647:0[crwdnd20647:0](https://support.apple.com/guide/mac-help/MH11783)crwdne20647:0

## crwdns20649:0{#using-docker-or-pterodactyl}crwdne20649:0

crwdns20653:0crwdne20653:0

### crwdns20655:0{#pterodactyl}crwdne20655:0

crwdns20659:0`Network`crwdne20659:0
crwdns20663:0[crwdnd20663:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne20663:0

crwdns20667:0![crwdnd20667:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne20667:0

crwdns20671:0[crwdnd20671:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne20671:0

:::caution

crwdns20675:0crwdne20675:0

:::

### crwdns20683:0{#docker}crwdne20683:0

crwdns20687:0[crwdnd20687:0](https://github.com/itzg/docker-minecraft-server)crwdne20687:0 crwdns20689:0`ports`crwdne20689:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132/udp"
```

crwdns20693:0`/udp`crwdne20693:0 crwdns20695:0crwdne20695:0

```yaml
ports:
    - "25565:25565"
    - "25565:25565/udp"
```

crwdns20699:0`-p 19132:19132/udp`crwdne20699:0

## crwdns20701:0{#issues-with-specific-vpskvm-providers}crwdne20701:0

crwdns20705:0crwdne20705:0

### crwdns20707:0{#ovh-and-soyoustart}crwdne20707:0

crwdns20711:0crwdne20711:0 crwdns20713:0crwdne20713:0

:::caution

crwdns20717:0crwdne20717:0

:::

crwdns20719:0crwdne20719:0

crwdns20723:0`http://test.geysermc.org:19132`crwdne20723:0 crwdns20725:0crwdne20725:0
crwdns20729:0crwdne20729:0

crwdns20733:0crwdne20733:0

crwdns20735:0crwdne20735:0

1. crwdns20737:0`Network interfaces`crwdne20737:0
2. crwdns20739:0`...`crwdnd20739:0`...`crwdnd20739:0`Configure the GAME firewall`crwdnd20739:0`Add rule`crwdnd20739:0`Other protocol`crwdnd20739:0`minecraftPocketEdition`crwdne20739:0
3. crwdns20741:0`outgoing port`crwdne20741:0

crwdns20743:0crwdne20743:0

1. crwdns20745:0crwdne20745:0
2. crwdns20747:0crwdne20747:0
3. crwdns20749:0crwdne20749:0
4. crwdns20751:0crwdne20751:0
5. crwdns20753:0crwdne20753:0

#### crwdns20755:0crwdne20755:0

crwdns20757:0`minecraftPocketEdition`crwdnd20757:0`Other`crwdne20757:0

crwdns20759:0`minecraftPocketEdition`crwdnd20759:0`-DGeyser.RakSendCookie=false`crwdne20759:0

crwdns20761:0crwdne20761:0

- crwdns20763:0[crwdnd20763:0](https://github.com/ovh/infrastructure-roadmap/issues/186)crwdne20763:0
- crwdns20765:0[crwdnd20765:0](https://github.com/GeyserMC/Geyser/pull/4554)crwdne20765:0

### crwdns20767:0{#oracle-cloudoci}crwdne20767:0

crwdns20769:0crwdne20769:0 crwdns20771:0crwdne20771:0

crwdns20773:0crwdne20773:0

1. crwdns20775:0crwdne20775:0
2. crwdns20777:0crwdne20777:0
3. crwdns20779:0crwdne20779:0
4. crwdns20781:0crwdne20781:0 crwdns20783:0crwdne20783:0 crwdns20785:0crwdne20785:0
5. crwdns20787:0crwdne20787:0
6. crwdns20789:0crwdne20789:0
   - crwdns20791:0`0.0.0.0/0`crwdne20791:0
   - crwdns20793:0`25565-25565`crwdne20793:0
   - crwdns20795:0crwdne20795:0
7. crwdns20797:0crwdne20797:0
   - crwdns20799:0`0.0.0.0/0`crwdne20799:0
   - crwdns20801:0`19132-19132`crwdne20801:0
   - crwdns20803:0crwdne20803:0
8. crwdns20805:0crwdne20805:0

#### crwdns20807:0{#oracle-linux}crwdne20807:0

crwdns20809:0crwdne20809:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns20811:0{#ubuntu}crwdne20811:0

1. crwdns20813:0`-A INPUT -j REJECT --reject-with icmp-host-prohibited`crwdnd20813:0`/etc/iptables/rules.v4`crwdne20813:0
2. crwdns20815:0`ufw`crwdne20815:0

```bash
sudo iptables-restore < /etc/iptables/rules.v4
```
