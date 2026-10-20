---
title: crwdns38900:0crwdne38900:0
description: crwdns38902:0crwdne38902:0
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# crwdns38904:0crwdne38904:0 {#port-forwarding}

crwdns38906:0crwdne38906:0

:::caution

crwdns38908:0[crwdnd38908:0](/wiki/geyser/setup)crwdne38908:0

:::

:::info crwdns38910:0crwdne38910:0
crwdns38912:0`webrtc-port`crwdnd38912:0[crwdnd38912:0](https://warden.cloud)crwdne38912:0
:::

## crwdns38914:0crwdne38914:0 {/* #port-forwarding-on-linuxwindowsmacos */}

crwdns38916:0[crwdnd38916:0](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)crwdnd38916:0[crwdnd38916:0](https://www.lifewire.com/how-to-port-forward-4163829)crwdne38916:0

:::info

crwdns38918:0[crwdnd38918:0](/wiki/geyser/playit-gg/)crwdne38918:0

:::

### crwdns38920:0crwdne38920:0 {/* #windows */}

crwdns38922:0crwdne38922:0

- crwdns38924:0`Powershell`crwdne38924:0

  crwdns38926:0crwdne38926:0

  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```

  crwdns38928:0crwdne38928:0

- crwdns38930:0crwdne38930:0
  1. crwdns38932:0[crwdnd38932:0](/img/wiki/port-forwarding/windows-1.png)crwdne38932:0
  2. crwdns38934:0[crwdnd38934:0](/img/wiki/port-forwarding/windows-2.png)crwdne38934:0
  3. crwdns38936:0[crwdnd38936:0](/img/wiki/port-forwarding/windows-2.png)crwdne38936:0
  4. crwdns38938:0[crwdnd38938:0](/img/wiki/port-forwarding/windows-3.png)crwdne38938:0
  5. crwdns38940:0[crwdnd38940:0](/img/wiki/port-forwarding/windows-4.png)crwdne38940:0
  6. crwdns38942:0[crwdnd38942:0](/img/wiki/port-forwarding/windows-5.png)crwdne38942:0
  7. crwdns38944:0[crwdnd38944:0](/img/wiki/port-forwarding/windows-6.png)crwdne38944:0
  8. crwdns38946:0[crwdnd38946:0](/img/wiki/port-forwarding/windows-7.png)crwdne38946:0
  9. crwdns38948:0crwdne38948:0

### crwdns38950:0crwdne38950:0 {/* #linux */}

crwdns38952:0`19132`crwdne38952:0

- crwdns38954:0`ufw`crwdne38954:0
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  crwdns38956:0`sudo ufw reload`crwdnd38956:0`sudo ufw status`crwdnd38956:0[crwdnd38956:0](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)crwdnd38956:0[crwdnd38956:0](https://www.baeldung.com/linux/uncomplicated-firewall)crwdne38956:0

- crwdns38958:0`firewalld`crwdne38958:0
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ```
  crwdns38960:0`sudo firewall-cmd --reload`crwdnd38960:0`sudo firewall-cmd --list-all`crwdnd38960:0[crwdnd38960:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)crwdne38960:0

- crwdns38962:0`iptables`crwdne38962:0
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  crwdns38964:0`sudo iptables-save`crwdnd38964:0`sudo iptables -L`crwdnd38964:0[crwdnd38964:0](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04)crwdnd38964:0[crwdnd38964:0](https://help.ubuntu.com/community/IptablesHowTo)crwdne38964:0

### crwdns38966:0crwdne38966:0 {/* #macos */}

crwdns38968:0`Block all incoming connections`crwdnd38968:0`Allow`crwdnd38968:0[crwdnd38968:0](/img/wiki/port-forwarding/macos_warning.png)crwdnd38968:0[crwdnd38968:0](https://support.apple.com/guide/mac-help/MH11783)crwdne38968:0

## crwdns38970:0crwdne38970:0 {/* #using-docker-or-pterodactyl */}

crwdns38972:0crwdne38972:0

### crwdns38974:0crwdne38974:0 {/* #pterodactyl */}

crwdns38976:0`Network`crwdnd38976:0[crwdnd38976:0](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel)crwdne38976:0

crwdns38978:0![crwdnd38978:0](/img/wiki/port-forwarding/pterodactyl-1.png)crwdne38978:0

crwdns38980:0[crwdnd38980:0](https://github.com/GeyserMC/pterodactyl-stuff)crwdne38980:0

:::caution

crwdns38982:0crwdne38982:0

:::

### crwdns38984:0crwdne38984:0 {/* #docker */}

crwdns38986:0[crwdnd38986:0](https://github.com/itzg/docker-minecraft-server)crwdnd38986:0`ports`crwdne38986:0

```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```

crwdns38988:0`/udp`crwdnd38988:0`-p 19132:19132 -p 19132:19132/udp`crwdne38988:0

## crwdns38990:0crwdne38990:0 {/* #issues-with-specific-vpskvm-providers */}

crwdns38992:0crwdne38992:0

### crwdns38994:0crwdne38994:0 {/* #ovh-and-soyoustart */}

crwdns38996:0`Other`crwdne38996:0

:::caution

crwdns38998:0crwdne38998:0

:::

crwdns39000:0crwdne39000:0

crwdns39002:0crwdne39002:0

1. crwdns39004:0`Network interfaces`crwdne39004:0
2. crwdns39006:0`...`crwdnd39006:0`...`crwdnd39006:0`Configure the GAME firewall`crwdnd39006:0`Add rule`crwdnd39006:0`Other protocol`crwdne39006:0
3. crwdns39008:0`outgoing port`crwdnd39008:0`webrtc-port`crwdne39008:0
4. crwdns39010:0crwdne39010:0

crwdns39012:0crwdne39012:0

1. crwdns39014:0crwdne39014:0
2. crwdns39016:0crwdne39016:0
3. crwdns39018:0crwdne39018:0
4. crwdns39020:0`webrtc-port`crwdne39020:0
5. crwdns39022:0crwdne39022:0

### crwdns39024:0crwdne39024:0 {/* #oracle-cloudoci */}

crwdns39026:0crwdne39026:0

crwdns39028:0crwdne39028:0

1. crwdns39030:0crwdne39030:0
2. crwdns39032:0crwdne39032:0
3. crwdns39034:0crwdne39034:0
4. crwdns39036:0crwdne39036:0
5. crwdns39038:0crwdne39038:0
6. crwdns39040:0crwdne39040:0
   - crwdns39042:0`0.0.0.0/0`crwdne39042:0
   - crwdns39044:0`25565-25565`crwdne39044:0
   - crwdns39046:0crwdne39046:0
7. crwdns39048:0crwdne39048:0
   - crwdns39050:0`0.0.0.0/0`crwdne39050:0
   - crwdns39052:0`19132-19132`crwdne39052:0
   - crwdns39054:0crwdne39054:0
   - crwdns39056:0crwdne39056:0
8. crwdns39058:0crwdne39058:0

#### crwdns39060:0crwdne39060:0 {/* #oracle-linux */}

crwdns39062:0crwdne39062:0

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### crwdns39064:0crwdne39064:0 {/* #ubuntu */}

crwdns39066:0crwdne39066:0

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
