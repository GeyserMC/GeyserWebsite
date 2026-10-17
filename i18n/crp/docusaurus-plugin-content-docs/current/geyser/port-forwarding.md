---
title: crwdns37744:0crwdne37744:0
description: crwdns37746:0crwdne37746:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns37748:0crwdne37748:0 {#port-forwarding}

crwdns37750:0crwdne37750:0

:::caution

crwdns37752:0[crwdnd37752:0](/wiki/geyser/setup)crwdne37752:0

:::

:::info crwdns37754:0crwdne37754:0
crwdns37756:0`webrtc-port`crwdnd37756:0[crwdnd37756:0](https://warden.cloud)crwdne37756:0
:::

## crwdns37758:0crwdne37758:0 {/* #port-forwarding-on-linuxwindowsmacos */}

crwdns37760:0[crwdnd37760:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd37760:0[crwdnd37760:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne37760:0

:::info

crwdns37762:0[crwdnd37762:0](/wiki/geyser/playit-gg/)crwdne37762:0

:::

### crwdns37764:0crwdne37764:0 {/* #windows */}

crwdns37766:0crwdne37766:0

- crwdns37768:0`Powershell`crwdne37768:0

  crwdns37770:0crwdne37770:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns37772:0crwdne37772:0

- crwdns37774:0crwdne37774:0
  1. crwdns37776:0[crwdnd37776:0](/img/wiki/port-forwarding/windows-1.png)crwdne37776:0
  2. crwdns37778:0[crwdnd37778:0](/img/wiki/port-forwarding/windows-2.png)crwdne37778:0
  3. crwdns37780:0[crwdnd37780:0](/img/wiki/port-forwarding/windows-2.png)crwdne37780:0
  4. crwdns37782:0[crwdnd37782:0](/img/wiki/port-forwarding/windows-3.png)crwdne37782:0
  5. crwdns37784:0[crwdnd37784:0](/img/wiki/port-forwarding/windows-4.png)crwdne37784:0
  6. crwdns37786:0[crwdnd37786:0](/img/wiki/port-forwarding/windows-5.png)crwdne37786:0
  7. crwdns37788:0[crwdnd37788:0](/img/wiki/port-forwarding/windows-6.png)crwdne37788:0
  8. crwdns37790:0[crwdnd37790:0](/img/wiki/port-forwarding/windows-7.png)crwdne37790:0
  9. crwdns37792:0crwdne37792:0

### crwdns37794:0crwdne37794:0 {/* #linux */}

crwdns37796:0`19132`crwdne37796:0

- crwdns37798:0`ufw`crwdne37798:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns37800:0`sudo ufw reload`crwdnd37800:0`sudo ufw status`crwdnd37800:0[crwdnd37800:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd37800:0[crwdnd37800:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne37800:0

- crwdns37802:0`firewalld`crwdne37802:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns37804:0`sudo firewall-cmd --reload`crwdnd37804:0`sudo firewall-cmd --list-all`crwdnd37804:0[crwdnd37804:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne37804:0

- crwdns37806:0`iptables`crwdne37806:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns37808:0`sudo iptables-save`crwdnd37808:0`sudo iptables -L`crwdnd37808:0[crwdnd37808:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd37808:0[crwdnd37808:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne37808:0

### crwdns37810:0crwdne37810:0 {/* #macos */}

crwdns37812:0`Block all incoming connections`crwdnd37812:0`Allow`crwdnd37812:0[crwdnd37812:0](/img/wiki/port-forwarding/macos_warning.png)crwdnd37812:0[crwdnd37812:0](https://support.apple.com/guide/mac-help/MH11783)crwdne37812:0

## crwdns37814:0crwdne37814:0 {/* #using-docker-or-pterodactyl */}

crwdns37816:0crwdne37816:0

### crwdns37818:0crwdne37818:0 {/* #pterodactyl */}

crwdns37820:0`Network`crwdnd37820:0[crwdnd37820:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne37820:0

crwdns37822:0![crwdnd37822:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne37822:0

crwdns37824:0[crwdnd37824:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne37824:0

:::caution

crwdns37826:0crwdne37826:0

:::

### crwdns37828:0crwdne37828:0 {/* #docker */}

crwdns37830:0[crwdnd37830:0](https://github.com/itzg/docker-minecraft-server)crwdnd37830:0`ports`crwdne37830:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns37832:0`/udp`crwdnd37832:0`-p 19132:19132 -p 19132:19132/udp`crwdne37832:0

## crwdns37834:0crwdne37834:0 {/* #issues-with-specific-vpskvm-providers */}

crwdns37836:0crwdne37836:0

### crwdns37838:0crwdne37838:0 {/* #ovh-and-soyoustart */}

crwdns37840:0`Other`crwdne37840:0

:::caution

crwdns37842:0crwdne37842:0

:::

crwdns37844:0crwdne37844:0

crwdns37846:0crwdne37846:0

1. crwdns37848:0`Network interfaces`crwdne37848:0
2. crwdns37850:0`...`crwdnd37850:0`...`crwdnd37850:0`Configure the GAME firewall`crwdnd37850:0`Add rule`crwdnd37850:0`Other protocol`crwdne37850:0
3. crwdns37852:0`outgoing port`crwdnd37852:0`webrtc-port`crwdne37852:0
4. crwdns37854:0crwdne37854:0

crwdns37856:0crwdne37856:0

1. crwdns37858:0crwdne37858:0
2. crwdns37860:0crwdne37860:0
3. crwdns37862:0crwdne37862:0
4. crwdns37864:0`webrtc-port`crwdne37864:0
5. crwdns37866:0crwdne37866:0

### crwdns37868:0crwdne37868:0 {/* #oracle-cloudoci */}

crwdns37870:0crwdne37870:0

crwdns37872:0crwdne37872:0

1. crwdns37874:0crwdne37874:0
2. crwdns37876:0crwdne37876:0
3. crwdns37878:0crwdne37878:0
4. crwdns37880:0crwdne37880:0
5. crwdns37882:0crwdne37882:0
6. crwdns37884:0crwdne37884:0
   - crwdns37886:0`0.0.0.0/0`crwdne37886:0
   - crwdns37888:0`25565-25565`crwdne37888:0
   - crwdns37890:0crwdne37890:0
7. crwdns37892:0crwdne37892:0
   - crwdns37894:0`0.0.0.0/0`crwdne37894:0
   - crwdns37896:0`19132-19132`crwdne37896:0
   - crwdns37898:0crwdne37898:0
   - crwdns37900:0crwdne37900:0
8. crwdns37902:0crwdne37902:0

#### crwdns37904:0crwdne37904:0 {/* #oracle-linux */}

crwdns37906:0crwdne37906:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns37908:0crwdne37908:0 {/* #ubuntu */}

crwdns37910:0crwdne37910:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
