---
title: crwdns33858:0crwdne33858:0
description: crwdns33860:0crwdne33860:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns33862:0{#port-forwarding}crwdne33862:0

crwdns33864:0crwdne33864:0
crwdns33866:0crwdne33866:0

:::caution

crwdns33868:0[crwdnd33868:0](/wiki/geyser/setup)crwdne33868:0

:::

:::info crwdns33870:0crwdne33870:0
crwdns33872:0crwdne33872:0
crwdns33874:0`webrtc-port`crwdne33874:0
crwdns33876:0[crwdnd33876:0](https://warden.cloud)crwdne33876:0
:::

## crwdns33878:0{#port-forwarding-on-linuxwindowsmacos}crwdne33878:0

crwdns33880:0crwdne33880:0
crwdns33882:0crwdne33882:0
crwdns33884:0crwdne33884:0
crwdns33886:0[crwdnd33886:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd33886:0[crwdnd33886:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne33886:0
crwdns33888:0crwdne33888:0

:::info

crwdns33890:0crwdne33890:0
crwdns33892:0crwdne33892:0  
crwdns33894:0[crwdnd33894:0](/wiki/geyser/playit-gg/)crwdne33894:0

:::

### crwdns33896:0{#windows}crwdne33896:0

crwdns33898:0crwdne33898:0 crwdns33900:0crwdne33900:0

- crwdns33902:0`Powershell`crwdne33902:0

  crwdns33904:0crwdne33904:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns33906:0crwdne33906:0

- crwdns33908:0crwdne33908:0
  1. crwdns33910:0crwdne33910:0 crwdns33912:0[crwdnd33912:0](/img/wiki/port-forwarding/windows-1.png)crwdne33912:0
  2. crwdns33914:0crwdne33914:0 crwdns33916:0[crwdnd33916:0](/img/wiki/port-forwarding/windows-2.png)crwdne33916:0
  3. crwdns33918:0crwdne33918:0 crwdns33920:0[crwdnd33920:0](/img/wiki/port-forwarding/windows-2.png)crwdne33920:0
  4. crwdns33922:0crwdne33922:0 crwdns33924:0[crwdnd33924:0](/img/wiki/port-forwarding/windows-3.png)crwdne33924:0
  5. crwdns33926:0crwdne33926:0 crwdns33928:0crwdne33928:0 crwdns33930:0[crwdnd33930:0](/img/wiki/port-forwarding/windows-4.png)crwdne33930:0
  6. crwdns33932:0crwdne33932:0 crwdns33934:0[crwdnd33934:0](/img/wiki/port-forwarding/windows-5.png)crwdne33934:0
  7. crwdns33936:0crwdne33936:0 crwdns33938:0[crwdnd33938:0](/img/wiki/port-forwarding/windows-6.png)crwdne33938:0
  8. crwdns33940:0crwdne33940:0 crwdns33942:0[crwdnd33942:0](/img/wiki/port-forwarding/windows-7.png)crwdne33942:0
  9. crwdns33944:0crwdne33944:0

### crwdns33946:0{#linux}crwdne33946:0

crwdns33948:0crwdne33948:0 crwdns33950:0`19132`crwdne33950:0

- crwdns33952:0`ufw`crwdne33952:0 crwdns33954:0crwdne33954:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns33956:0`sudo ufw reload`crwdnd33956:0`sudo ufw status`crwdne33956:0  
  crwdns33958:0[crwdnd33958:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd33958:0[crwdnd33958:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne33958:0

- crwdns33960:0`firewalld`crwdne33960:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns33962:0`sudo firewall-cmd --reload`crwdnd33962:0`sudo firewall-cmd --list-all`crwdne33962:0  
  crwdns33964:0[crwdnd33964:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne33964:0

- crwdns33966:0`iptables`crwdne33966:0 crwdns33968:0crwdne33968:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns33970:0`sudo iptables-save`crwdnd33970:0`sudo iptables -L`crwdne33970:0  
  crwdns33972:0[crwdnd33972:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd33972:0[crwdnd33972:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne33972:0

### crwdns33974:0{#macos}crwdne33974:0

crwdns33976:0`Block all incoming connections`crwdne33976:0
crwdns33978:0`Allow`crwdnd33978:0[crwdnd33978:0](/img/wiki/port-forwarding/macos_warning.png)crwdne33978:0
crwdns33980:0[crwdnd33980:0](https://support.apple.com/guide/mac-help/MH11783)crwdne33980:0

## crwdns33982:0{#using-docker-or-pterodactyl}crwdne33982:0

crwdns33984:0crwdne33984:0

### crwdns33986:0{#pterodactyl}crwdne33986:0

crwdns33988:0`Network`crwdne33988:0
crwdns33990:0[crwdnd33990:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne33990:0

crwdns33992:0![crwdnd33992:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne33992:0

crwdns33994:0[crwdnd33994:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne33994:0

:::caution

crwdns33996:0crwdne33996:0

:::

### crwdns33998:0{#docker}crwdne33998:0

crwdns34000:0[crwdnd34000:0](https://github.com/itzg/docker-minecraft-server)crwdne34000:0 crwdns34002:0`ports`crwdne34002:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns34004:0crwdne34004:0 crwdns34006:0`/udp`crwdne34006:0
crwdns34008:0`-p 19132:19132 -p 19132:19132/udp`crwdne34008:0

## crwdns34010:0{#issues-with-specific-vpskvm-providers}crwdne34010:0

crwdns34012:0crwdne34012:0

### crwdns34014:0{#ovh-and-soyoustart}crwdne34014:0

crwdns34016:0crwdne34016:0 crwdns34018:0crwdne34018:0
crwdns34020:0crwdne34020:0
crwdns34022:0`Other`crwdne34022:0

:::caution

crwdns34024:0crwdne34024:0

:::

crwdns34026:0crwdne34026:0

crwdns34028:0crwdne34028:0

1. crwdns34030:0`Network interfaces`crwdne34030:0
2. crwdns34032:0`...`crwdnd34032:0`...`crwdnd34032:0`Configure the GAME firewall`crwdnd34032:0`Add rule`crwdnd34032:0`Other protocol`crwdne34032:0
3. crwdns34034:0`outgoing port`crwdne34034:0 crwdns34036:0`webrtc-port`crwdne34036:0
4. crwdns34038:0crwdne34038:0

crwdns34040:0crwdne34040:0

1. crwdns34042:0crwdne34042:0
2. crwdns34044:0crwdne34044:0
3. crwdns34046:0crwdne34046:0
4. crwdns34048:0crwdne34048:0 crwdns34050:0`webrtc-port`crwdne34050:0
5. crwdns34052:0crwdne34052:0

### crwdns34054:0{#oracle-cloudoci}crwdne34054:0

crwdns34056:0crwdne34056:0 crwdns34058:0crwdne34058:0

crwdns34060:0crwdne34060:0

1. crwdns34062:0crwdne34062:0
2. crwdns34064:0crwdne34064:0
3. crwdns34066:0crwdne34066:0
4. crwdns34068:0crwdne34068:0 crwdns34070:0crwdne34070:0 crwdns34072:0crwdne34072:0
5. crwdns34074:0crwdne34074:0
6. crwdns34076:0crwdne34076:0
   - crwdns34078:0`0.0.0.0/0`crwdne34078:0
   - crwdns34080:0`25565-25565`crwdne34080:0
   - crwdns34082:0crwdne34082:0
7. crwdns34084:0crwdne34084:0
   - crwdns34086:0`0.0.0.0/0`crwdne34086:0
   - crwdns34088:0`19132-19132`crwdne34088:0
   - crwdns34090:0crwdne34090:0
   - crwdns34092:0crwdne34092:0
8. crwdns34094:0crwdne34094:0

#### crwdns34096:0{#oracle-linux}crwdne34096:0

crwdns34098:0crwdne34098:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns34100:0{#ubuntu}crwdne34100:0

crwdns34102:0crwdne34102:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
