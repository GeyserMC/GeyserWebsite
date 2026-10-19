---
title: Port forwarding
description: Information on how to set up port forwarding required for Geyser.
crowdin_sync: true
crowdin_page_id: be7c5a22-1e8e-4ffe-8d13-7d763dd75886
---

# Port forwarding {#port-forwarding}
This page contains information on how to set up port forwarding required for Geyser to work when self-hosting.
There are also guides for specific configurations, such as Docker/Pterodactyl, or on specific VPS/KVM providers, such as OVH or Oracle Cloud. 

:::caution

If you are using a Minecraft server hosting provider (e.g. Aternos, or Nodecraft), you should refer to the hosting provider setup on the [setup](/wiki/geyser/setup) page instead.

:::

:::info Ports that need to be opened
With NetherNet, the Geyser port (by default 19132) has to be open for **both TCP and UDP**: players find the server over TCP (signaling), and play on it over UDP.
If you use the "NetherNet and RakNet" option, also open the `webrtc-port` for UDP.
With external signaling, such as [Warden](https://warden.cloud), only UDP for WebRTC is needed.
:::

## Port forwarding on Linux/Windows/macOS {#port-forwarding-on-linuxwindowsmacos}
To allow others to play on your server, you will need to set up port forwarding on the device hosting Geyser.
Additionally, you will need to port forward the port on your router/modem (in other words, allow and route traffic on that port to the proper machine) if you want the server to be accessible outside your own home network. 
Forward it for both TCP and UDP; many routers offer a "TCP/UDP" or "Both" option for this.
See [here](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) or [here](https://www.lifewire.com/how-to-port-forward-4163829) for helpful guides.
Do note: if you do not have a static IP address, your IP address may change over time. 

:::info

Some ISPs (Internet Service Providers) block certain ports, or don't allow you to open ports (e.g. by using CGNAT, which doesn't allow you to open a port with a dynamic IP).
Other ISPs may require you to pay extra for a static IP address.   
As an alternative to port forwarding, you can use [playit.gg](/wiki/geyser/playit-gg/) to create a tunnel.

:::

### Windows {#windows}
To open a port on Windows, you will need to open the port through the Windows Firewall. There are multiple ways to do this:

- `Powershell` (recommended)

  To open a port on TCP and UDP (in our example, port 19132), run the following commands in an administrator Powershell:
  ```powershell
  New-NetFirewallRule -DisplayName "Geyser (TCP)" -Direction Inbound -Protocol TCP -LocalPort 19132 -Action Allow
  New-NetFirewallRule -DisplayName "Geyser (UDP)" -Direction Inbound -Protocol UDP -LocalPort 19132 -Action Allow
  ```
  Running these commands creates two rules that allow TCP and UDP traffic on port 19132.


- Windows Defender Firewall with Advanced Security (GUI)
  1. Search for "Windows Defender Firewall with Advanced Security" in the start menu, and open it. ([Image](/img/wiki/port-forwarding/windows-1.png))
  2. Click on "Inbound Rules" in the left sidebar. ([Image](/img/wiki/port-forwarding/windows-2.png))
  3. Click on "New Rule..." in the right sidebar. ([Image](/img/wiki/port-forwarding/windows-2.png))
  4. Select "Port" as the rule type and click "Next". ([Example](/img/wiki/port-forwarding/windows-3.png))
  5. Select "UDP" and "Specific local ports", and enter the port you want to open (in our example, 19132). Click "Next". ([Example](/img/wiki/port-forwarding/windows-4.png))
  6. Select "Allow the connection" and click "Next". ([Example](/img/wiki/port-forwarding/windows-5.png))
  7. Select the profiles you want to apply the rule to (e.g. "Domain", "Private", "Public"), and click "Next". ([Example](/img/wiki/port-forwarding/windows-6.png))
  8. Enter a name for the rule (e.g. "Geyser (UDP)"), and click "Finish". ([Image](/img/wiki/port-forwarding/windows-7.png))
  9. Repeat these steps, selecting "TCP" in step 5 and naming the rule e.g. "Geyser (TCP)".

### Linux {#linux}
Different Linux distributions, even different VPS providers ship and configure different firewalls. In the following examples, we will use `19132` as the port to open, but you should replace this with the port you are using for Geyser.

- `ufw` is a simple firewall front-end for iptables that is commonly used on Ubuntu and Debian. To open a port on TCP and UDP, run the following commands:
  ```bash
  sudo ufw allow 19132/tcp
  sudo ufw allow 19132/udp
  ```
  Then, reload the firewall with `sudo ufw reload`, and see all open rules with `sudo ufw status`.   
  Further helpful guides: [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server), [Baeldung](https://www.baeldung.com/linux/uncomplicated-firewall)

- `firewalld` Add a port on TCP and UDP by running:
  ```bash
  sudo firewall-cmd --zone=public --permanent --add-port=19132/tcp
  sudo firewall-cmd --zone=public --permanent --add-port=19132/udp
  ``` 
  Then, reload the firewall with `sudo firewall-cmd --reload`, and see all open rules with `sudo firewall-cmd --list-all`.   
  Further helpful guides: [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)

- `iptables` is a common firewall that is used on many Linux distributions. To open a port on TCP and UDP, run the following commands:
  ```bash
  sudo iptables -A INPUT -p tcp --dport 19132 -j ACCEPT
  sudo iptables -A INPUT -p udp --dport 19132 -j ACCEPT
  ```
  Then, save the firewall with `sudo iptables-save`, and see all open rules with `sudo iptables -L`.   
  Further helpful guides for iptables: [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04), [Ubuntu](https://help.ubuntu.com/community/IptablesHowTo)

### macOS {#macos}
You will need to disable `Block all incoming connections` in your Firewall settings, as that will block any connections and won't allow you to make exceptions. 
To allow incoming connections, click `Allow` when getting [these prompts](/img/wiki/port-forwarding/macos_warning.png).
If you are still facing issues, see Apple's official guide [here](https://support.apple.com/guide/mac-help/MH11783) to open a port on macOS.

## Using Docker or Pterodactyl {#using-docker-or-pterodactyl}
In addition to port forwarding the port in your server's firewall (and, if applicable, your router/modem), you will need to assign the port in Docker/Pterodactyl.

### Pterodactyl {#pterodactyl}
Make sure to allocate the port(s) to the server in the Pterodactyl panel's `Network` tab, additionally to port forwarding the port(s). 
See [here](https://pterodactyl.io/community/games/minecraft.html#allocations-in-the-panel) for more information.

![Pterodactyl panel, Network section](/img/wiki/port-forwarding/pterodactyl-1.png)

There are also different Geyser eggs for Pterodactyl, which can be found [here](https://github.com/GeyserMC/pterodactyl-stuff).

:::caution

If you are not able to allocate ports in the Pterodactyl panel, you will need to contact your server host to allocate one for you or try to use an existing port allocation.

:::

### Docker {#docker}
For Geyser to work under Docker (e.g. using [Itzg's Docker image](https://github.com/itzg/docker-minecraft-server)), you will need to add the Geyser port on TCP and UDP to the docker-compose file. This is done by adding the following to the `ports` section:
```yaml
ports:
    - "25565:25565"
    - "19132:19132"
    - "19132:19132/udp"
```
Without a suffix, Docker exposes the port on TCP. The additional `/udp` suffix exposes it on UDP.
Alternatively, add the ports with the `-p 19132:19132 -p 19132:19132/udp` flags to the docker run command.


## Issues with specific VPS/KVM providers {#issues-with-specific-vpskvm-providers}
Some providers, such as OVH, Oracle Cloud, and SoYouStart, have a firewall that blocks the ports Geyser needs by default/in most cases.

### OVH and SoYouStart {#ovh-and-soyoustart}
OVH's GAME firewall filters traffic with rules made for specific games. The Minecraft Bedrock and Minecraft Pocket Edition rules currently only support RakNet, the protocol Bedrock used before NetherNet.
With NetherNet, players find the server over HTTP (TCP) and play over WebRTC (UDP), which these rules currently do not support.
For now, use the `Other` rule for the Geyser port(s) instead.

:::caution

If you do not have access to these firewall settings, but got linked to this page, please contact your server host and provide them with this link - they are likely using OVH internally.

:::

**To resolve it:**

OVH:
1. Navigate to `Network interfaces`
2. Click on the `...` button on the table for your IP -> then `...` and `Configure the GAME firewall` -> `Add rule` -> `Other protocol`
3. Add your Geyser port into `outgoing port`. If you use the "NetherNet and RakNet" option, add a rule for the `webrtc-port` as well.
4. If you use OVH's Edge Network Firewall, make sure it allows the Geyser port over both TCP and UDP.

SoYouStart (subsidiary of OVH):
1. Click the IP tab.
2. Click the gear at the right of the public IP address; select "Game mitigation".
3. Pick "Add a rule".
4. Select "Other" in the dropdown list and enter the Geyser port. If you use the "NetherNet and RakNet" option, add the `webrtc-port` as well.
5. Save and wait a few seconds for the changes to come into effect.

### Oracle Cloud/OCI {#oracle-cloudoci}
By default, Oracle Cloud will block all incoming traffic except for SSH and RDP. This must be resolved within Oracle Cloud itself and the Compute Instance running Geyser.

The steps below assume that you are using the default ports for the Java server and Geyser, and should be adjusted accordingly.

1. Find your Compute Instance in the OCI Console
2. Click on the instances Virtual Cloud Network (this will be under "Instance details")
3. On the left-hand side, select "Security Lists"
4. Select one of the security lists. By default only one security list will exist. It doesn't matter which security list we add the rules to.
5. Select "Add Ingress Rules"
6. Configure rules for Java (optional)
   - Set "Source CIDR" to `0.0.0.0/0`
   - Set "Destination Port Range" to `25565-25565`
   - Select "Another Ingress Rule"
7. Configure rules for Geyser, once for TCP and once for UDP
   - Set "Source CIDR" to `0.0.0.0/0`
   - Set "Destination Port Range" to `19132-19132`
   - Set "IP Protocol" to TCP
   - Select "Another Ingress Rule", and repeat with "IP Protocol" set to UDP
8. Select "Add Ingress Rules"

#### Oracle Linux {#oracle-linux}

Run the following commands to allow Minecraft and Geyser through the OS firewall:

```bash
sudo firewall-cmd --add-port=25565/tcp --permanent
sudo firewall-cmd --add-port=19132/tcp --permanent
sudo firewall-cmd --add-port=19132/udp --permanent
sudo firewall-cmd --reload
```

#### Ubuntu {#ubuntu}

Run the following commands to allow Minecraft and Geyser through the OS firewall:

```bash
sudo ufw allow 25565/tcp
sudo ufw allow 19132/tcp
sudo ufw allow 19132/udp
```
