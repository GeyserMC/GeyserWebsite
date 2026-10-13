---
title: Preparing Your Geyser Server for NetherNet
slug: preparing-for-nethernet
authors: Chris
hide_table_of_contents: false
description: Minecraft Bedrock Edition 26.60 fully switches over to a new networking layer, NetherNet. This blog post explains how you can also switch over, so your crossplay server will continue to work.
---

With Minecraft: Bedrock Edition 26.60, [planned for October 27th, 2026](https://minecraft.wiki/w/Bedrock_Edition_26.60), 
Bedrock clients will stop connecting over RakNet. From then on, every Bedrock server has to speak NetherNet, the new transport Mojang has been rolling out since 26.40. 
Geyser has supported NetherNet since build 1237, but it is not turned on by default yet, so most servers will need a few changes before the 27th. 
This post will cover what changes with NetherNet, how to switch over on a hosting provider or on your own machine, and how to check that everything works.

## TL;DR

- **Update Geyser** by downloading the latest build from [https://geysermc.org/download](https://geysermc.org/download), and turn on NetherNet in your Geyser config.
- **Your server needs a TCP port** in addition to the usual UDP port, unless you use external signaling. 
- If your server is on a hosting provider, check your host's help pages or ask their support. You can send them a link to this post.
- **`clone-remote-port` only works with external signaling.** If you use it, read the hosting section below.
- **Do it before October 27th.** After that date, Bedrock players can't join servers that haven't made the switch.

<!-- truncate -->

<!-- TODO link the Open Collaboration announcement once it is published -->
If you are interested in the technical background, we have also written an announcement on the Open Collaboration blog.

## What Changes

With RakNet, Bedrock players connected directly to the server over UDP. NetherNet adds a step before that, called signaling. 
Clients now first contact the server over TCP to ask how to connect, and only then receive a reply with the information needed to connect over WebRTC (which runs on UDP) and start playing. The MOTD and player count shown in the server list are now also fetched through signaling. Mojang documents this process in more detail in its [NetherNet HTTP Signaling onboarding guide](https://mojang.github.io/bedrock-protocol-docs/guides/nether-net-onboarding-guide/).

In practice, this means your server now needs a TCP port for signaling, in addition to the UDP port for gameplay. 
By default, Geyser uses port 19132 for both. As long as your address and port stay the same, your players can keep using the server entry they already have. 
However, if Geyser previously ran on the same port as your Java server, as it does on many hosts, players will need to change the port in their saved server. 
[Aternos](https://support.aternos.org/hc/en-us/articles/39155890785053-NetherNet-protocol-Minecraft-Bedrock-Edition), for example, moves NetherNet servers to port 19132.

## Updating Geyser and Turning on NetherNet

Start by downloading the latest build from [https://geysermc.org/download](https://geysermc.org/download). 
Any build from 1237 onward supports NetherNet, but newer builds include a number of fixes, so we recommend always using the latest one.

RakNet is currently still Geyser's default, so NetherNet has to be turned on in the config. Set `transport` in the `bedrock` section to `nethernet`, 
then restart the server. Bedrock players on version 26.40 or newer can then join over NetherNet. Some setups need further configuration; 
our [setup guide](/wiki/geyser/setup/) shows the exact config changes for your host.

If some of your players are still on versions older than 26.40, you can also set `transport` to `both`. Geyser then accepts NetherNet and RakNet side by side. 
The two cannot share a UDP port, however, so in this mode you also need to set `webrtc-port` to a separate UDP port for 
NetherNet and open it. Once 26.60 is out and everyone has updated, you can switch to `nethernet` and close the old RakNet port.

## If Your Server Is on a Hosting Provider

On a hosting provider, the network is in your host's hands, so the first step is finding out how your host handles NetherNet. 
Some hosts already support it; on [Aternos](https://support.aternos.org/hc/en-us/articles/39155890785053-NetherNet-protocol-Minecraft-Bedrock-Edition), for example, no further changes are needed.

Our [setup guide](/wiki/geyser/setup/) includes community-gathered setup notes for many individual hosts. With NetherNet, 
though, much depends on how each host configures its network, so those notes may not cover everything. If you are unsure, 
reach out to your host's support and send them a link to this post. If they gave you a UDP port for Geyser, ask whether the same port is also open for TCP, 
and not used on TCP by another program. If it is open and available, Geyser's built-in signaling will work.

### `clone-remote-port` and Built-in Signaling

Many hosts have relied on `clone-remote-port`, which makes Geyser use the same port as the Java server. **This does not work with built-in signaling.** 
Signaling needs a TCP port, and the Java server already uses TCP on that port, so the two cannot share it. If your server only works with `clone-remote-port`, 
you have two options: ask your host for a separate port for Geyser that is open for both TCP and UDP, or use external signaling, which needs no TCP port at all.

When Geyser sees that the Java server already uses its port, it switches to external signaling through [Warden](https://warden.cloud), 
a free service run by Ziax, the creators of CubeCraft, and the console shows where players can join. 
If your host has no notes in our [setup guide](/wiki/geyser/setup/), pick "Not listed": it covers both options, including keeping a single port with `clone-remote-port` and Warden. 
Keep in mind that with this setup, players no longer join with your Java server's address, but with the address and port Geyser shows in the console. 
External signaling also takes care of HTTPS for you, so users will not see a trust on first use prompt.

You may also notice that the "Supported hosting providers" list is gone from our website. We have replaced it with a [list of hosts that support our work through the Open Collaboration programme](/hosting). 
A host's absence from that list does not mean Geyser won't run there. The hosts listed there already set Geyser up for NetherNet, so their users have nothing to configure.

## If You Host the Server Yourself

Most self-hosted servers should use Geyser's built-in signaling, which is the default. Geyser then runs its own signaling server on the Bedrock port, 
so you need to open or forward that port for both TCP and UDP. If you run in `both` mode, open your `webrtc-port` for UDP as well. 
Keep in mind that the signaling port cannot be the same as your Java server's port.

Alternatively, you can use external signaling. This is the way to go if you cannot open a TCP port, for example behind certain 
routers or tunnels, but it can also be worth it for the signaling service's routing, or to get HTTPS without managing a certificate yourself. 
To do so, set `signaling.mode` to `nxs`. Geyser then registers with an external signaling service: [Warden](https://warden.cloud) by default, 
or another one you configure. Players then find your server through that service. You no longer need a TCP port or a certificate, but you still need to open a UDP port, 
as gameplay always goes directly to your server. The `hybrid` mode runs built-in and external signaling at the same time.

If your server sits behind a NAT or a tunnel, players must be able to reach its UDP port from the internet. When Geyser 
cannot detect its own public address, list it under `advertise-addresses` in the `builtin` part of the `signaling` section 
(or under `nxs` when using external signaling). You can also set it at startup with [`-DgeyserAdvertiseAddresses`](/wiki/geyser/geyser-command-line-arguments-and-system-properties).

## If You Run a Hosting Provider

If you offer Minecraft servers, you can set Geyser up for your users, so that NetherNet works without them touching the config. 
Geyser reads a number of [system properties](/wiki/geyser/geyser-command-line-arguments-and-system-properties) from the server's startup command, which take priority over the config. 
The most important ones are:

- `-DgeyserTransport=nethernet` turns on NetherNet.
- `-DgeyserUdpPort` sets the Bedrock port. If you give each server its own port that is open for both TCP and UDP, built-in signaling works without further changes.
- `-DgeyserSignalingPort` and `-DgeyserWebrtcPort` split signaling (TCP) and gameplay (UDP) onto different ports, if your network hands them out separately.
- `-DgeyserSignalingMode=nxs` switches to external signaling, if you cannot give servers a TCP port. You can also run your own NXS-compatible signaling service.
- `-DgeyserAdvertiseAddresses` tells players which public address to connect to, if servers run in containers or behind a NAT and do not hold their public address themselves.

Once you have set this up, please let us know by [opening a pull request](https://github.com/GeyserMC/GeyserWebsite) or 
reaching out on [Discord](https://discord.gg/geysermc), so our setup guide can tell your users that there is nothing for them to do. 
If you would also like to support Geyser's development and be featured on our server hosting list, have a look at [our hosting page](/hosting).

## HTTPS and the Trust Prompt

Built-in signaling uses plain HTTP by default. That works, but over plain HTTP, players see a "trust on first use" prompt the first time they join your server. 
Serving signaling over HTTPS removes the prompt.

There are three ways to get there. You can point Geyser to a TLS certificate in its built-in signaling settings, and it will serve HTTP and HTTPS on the same port. 
You can put a reverse proxy in front of the signaling port and let it handle HTTPS. Or you can use external signaling, where the signaling service takes care of HTTPS for you. 
Our [HTTPS guide](/wiki/geyser/nethernet-https) walks you through the first two on Windows, Linux and macOS.

## Checking That It Works

After restarting, try joining from a Bedrock client on version 26.40 or newer. If the connection fails, the Geyser console is the first place to look, 
since Geyser reports most NetherNet problems there. The table below covers the most common ones.

| What you see | Likely cause | What to do |
|---|---|---|
| Server missing from the list, or no MOTD | The TCP signaling port is not reachable | Open the Bedrock port for TCP, or use external signaling |
| Server shows up, but joining times out | The UDP gameplay port is not reachable | Open the UDP port. Behind a NAT, list your public address in `advertise-addresses` |
| Console: "Built-in signaling cannot use port … because the Java server already uses it" | Bedrock and Java share a port, e.g. with `clone-remote-port` | Ask your host for a separate port, or keep using external signaling, which Geyser switches to automatically |
| Console: "RakNet and NetherNet each need their own UDP port" | `both` is set, but `webrtc-port` equals the Bedrock port | Set `webrtc-port` to a different free port |
| Console: "… is a loopback address" | The Bedrock `address` is set to 127.0.0.1 or similar | Set `address` to 0.0.0.0 |
| Players get a "trust on first use" prompt | Signaling runs over plain HTTP | Set up HTTPS, see above |

If none of these apply, please join our [Discord](https://discord.gg/geysermc) and share a `/geyser dump`, along with any other useful information about your setup.

## Further Reading

<!-- TODO add the Open Collaboration post: what NetherNet changes for hosts and networks, and how the NXS standard works -->
- [NetherNet system properties](/wiki/geyser/geyser-command-line-arguments-and-system-properties): every NetherNet setting you can set at startup
- [HTTPS for NetherNet](/wiki/geyser/nethernet-https): removing the trust prompt with a certificate or a reverse proxy
- [Geyser setup guide](/wiki/geyser/setup/): setup steps, including notes for individual hosts
- [NetherNet HTTP Signaling onboarding guide](https://mojang.github.io/bedrock-protocol-docs/guides/nether-net-onboarding-guide/): Mojang's official documentation

## Acknowledgements

We thank Mojang for documenting NetherNet and signaling ahead of the switch, and Ziax for running Warden, a free external 
signaling service open to every Geyser server. NetherNet support in Geyser would not have been possible without [Kas-tle](https://github.com/Kas-tle), 
whose early NetherNet transport in [NetworkCompatible](https://github.com/Kas-tle/NetworkCompatible) and first NetherNet 
support in [CloudburstMC/Network](https://github.com/CloudburstMC/Network) got this started, [rtm516](https://github.com/rtm516), 
for HTTP signaling and the move to libdatachannel, and [irrld](https://github.com/irrld), for bringing NetherNet and NXS into Geyser. 
Thank you as well to the community members who tested NetherNet support in Geyser and reported issues along the way. 
We would also like to thank all donors, and [Open Collaboration](https://opencollaboration.dev/) and its members, for their continued support of the project.
