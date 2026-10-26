---
title: Preparing Your Geyser Server for NetherNet
slug: preparing-for-nethernet
authors: Chris
hide_table_of_contents: false
description: >-
  Minecraft Bedrock Edition 26.60 fully switches over to a new networking layer,
  NetherNet. This blog post explains how you can also switch over, so your
  crossplay server will continue to work.
crowdin_page_id: 54c391d9-7dfb-4b06-a7a0-d20628cb2b18
---

With Minecraft: Bedrock Edition 26.60, [planned for October 27th, 2026](https://minecraft.wiki/w/Bedrock_Edition_26.60), 
Bedrock clients will stop connecting over RakNet. From then on, every Bedrock server has to speak NetherNet, the new transport 
Mojang has been rolling out since 26.40. Any Geyser build from 1237 onward supports NetherNet, but it is not enabled by default yet. 
This post covers what changes with NetherNet, how to switch over on a hosting provider or on your own machine, and how to check that everything works.

## TL;DR {/* #tldr */}

- **Update Geyser** by downloading the latest build from [https://geysermc.org/download](https://geysermc.org/download), and turn on NetherNet in your Geyser config.
- **Your server needs a TCP port** in addition to the usual UDP port, unless you use external signaling. See our [setup guide](/wiki/geyser/setup/) for detailed instructions!
- If your server is on a hosting provider for which we do not have an updated setup guide, contact their support. You can send them a link to this post.
- **`clone-remote-port` only works with external signaling.** If you use it, read [this section](#notes-for-hosting-provider-users-with-clone-remote-port-enabled) below.
- **Do it before October 27th.** After that date, Bedrock players can't join servers that haven't made the switch.

{/* truncate */}

## What Changes {/* #what-changes */}

With RakNet, Bedrock players connected directly to the server over UDP. NetherNet adds a step before that, called signaling. 
Bedrock clients now send the server a web request over TCP, asking how to connect. The signaling server then responds with
the server information needed to connect over WebRTC (which runs on UDP), finishing the join process.

The MOTD and player count shown in the server list are now also fetched through signaling. This allows Geyser's built-in
signaling server to receive the address initially pinged by the client, and forward it to the Java server for MOTD passthrough.
Players who connect through an IP address, or through a domain without HTTPS, will see a "trust on first use" prompt on their first join.

In practice, this means your Geyser instance now needs a TCP port for signaling, in addition to the UDP port for gameplay.
By default, Geyser uses port 19132 for both. As long as your address and port stay the same, your players can keep using the server entry they already have.
However, if Geyser previously ran on the same port as your Java server, as it does on many hosts, players will need to change the port in their saved server.

Geyser also supports using HTTPS to avoid the "trust on first use" prompt. See the [HTTPS section](#https-and-the-trust-prompt) for details.

## Enabling NetherNet {/* #enabling-nethernet */}

Start by downloading the latest build from [https://geysermc.org/download](https://geysermc.org/download). 
Any build from 1237 onward supports NetherNet, but newer builds include a number of fixes, so we recommend always using the latest one.

RakNet is currently still Geyser's default, so NetherNet has to be turned on in the config. For this, take a look at our 
[setup guide](/wiki/geyser/setup/): it shows the exact config changes needed. Also, check the server console for any errors or warnings!

If you need help with the migration, please join our [Discord](https://discord.gg/geysermc) and ask for help. Provide the following information:
- Where you host the server
- A Geyser dump (get it by running `/geyser dump` in the server console)
- A description of the issues you are seeing

## Using NetherNet and RakNet Together {/* #using-nethernet-and-raknet-together */}

If some of your players are still on versions older than 26.40, you can also set `transport` to `both`. Geyser then accepts NetherNet and RakNet side by side. 
However, the two transport modes cannot run on the same UDP port, so in this mode you also need to set `webrtc-port` to a separate UDP port for 
NetherNet and open it. Once 26.60 is out and everyone has updated, you can switch to `nethernet` and close the old RakNet port.

Note: 26.30 support will be removed once we add support for 26.60, so if you have players on old versions, ask them to update!

## HTTPS and the Trust Prompt {/* #https-and-the-trust-prompt */}

Built-in signaling uses plain HTTP by default. While this works, players see a "trust on first use" prompt the first time they join your server.
Serving signaling over HTTPS removes the prompt. We strongly recommend configuring HTTPS if you can!

There are two ways to enable HTTPS signaling. You can point Geyser to a TLS certificate in its built-in signaling config, 
and it will serve HTTPS instead of HTTP on the same port. Alternatively, you can put a reverse proxy in front of the signaling
port and let it handle HTTPS. See our [HTTPS guide](/wiki/geyser/nethernet-https) for detailed information. 

If neither option is available, you can use an external signaling service that provides HTTPS, such as [Warden](https://warden.cloud).

## Checking That It Works {/* #checking-that-it-works */}

After restarting, try joining from a Bedrock client on version 26.40 or newer. If the connection fails, the Geyser console is the first place to look,
since Geyser reports most NetherNet problems there. The table below covers the most common ones.

| What you see                                                                            | Likely cause                                                 | What to do                                                                                                  |
|-----------------------------------------------------------------------------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Console: "Built-in signaling cannot use port … because the Java server already uses it" | Bedrock and Java share a port, e.g. with `clone-remote-port` | Ask your host for a separate port, or keep using external signaling, which Geyser switches to automatically |
| Console: "RakNet and NetherNet each need their own UDP port"                            | `both` is set, but `webrtc-port` equals the Bedrock port     | Set `webrtc-port` to a different available port                                                             |
| Console: "… is a loopback address"                                                      | The Bedrock `address` is set to 127.0.0.1 or similar         | Set `address` to 0.0.0.0                                                                                    |
| Players get a "trust on first use" prompt                                               | Signaling runs over plain HTTP                               | Set up HTTPS, see above                                                                                     |

If none of these apply, please join our [Discord](https://discord.gg/geysermc) and share a `/geyser dump`, along with any other useful information about your setup.

## Notes For Hosting Provider Users With `clone-remote-port` Enabled {/* #notes-for-hosting-provider-users-with-clone-remote-port-enabled */}

Many hosts have relied on `clone-remote-port`, which makes Geyser use the same port as the Java server. **This does not work with built-in signaling.** 
Signaling needs a TCP port, and the Java server already uses TCP on that port, so the two cannot share it. If your server only works with `clone-remote-port`, 
you have two options: ask your host for a separate port for Geyser that is open for both TCP and UDP, or use external signaling, which does not need a TCP port.

When Geyser detects that the Java server already uses its port, it falls back to external signaling through [Warden](https://warden.cloud), 
a free service run by Ziax, the creators of CubeCraft, and the console shows where players can join. 
If your host has no notes in our [setup guide](/wiki/geyser/setup/), pick "Not listed": it covers both options, including keeping a single port with `clone-remote-port` and Warden. 
Keep in mind that with this setup, players no longer join with your Java server's address, but with the address and port Geyser shows in the console unless
a custom domain is registered on [Warden](https://warden.cloud). It also takes care of HTTPS for you, so users will not see a "trust on first use" prompt.

You may also notice that the "Supported hosting providers" list is gone from our website. Soon, it will be replaced with
a list of hosts that support our work through the Open Collaboration program, and work with us to automatically configure Geyser
for their users. This is also highlighted in the setup guide. However, a host's absence from that list will not mean Geyser 
won't run there, and the setup guide will continue to include community-collected setup instructions.

## If You Run a Hosting Provider {/* #if-you-run-a-hosting-provider */}

If you offer Minecraft servers, we recommend automatically configuring Geyser for your users, so NetherNet works without
them touching the config. For this purpose, Geyser reads [system properties](/wiki/geyser/geyser-command-line-arguments-and-system-properties)
that can be set in the server's startup command, and take priority over the config. 
The most important ones are:

- `-DgeyserTransport=nethernet` turns on NetherNet.
- `-DgeyserUdpPort` sets the Bedrock port. If you give each server its own port that is open for both TCP and UDP, built-in signaling works without further changes.
- `-DgeyserSignalingPort` and `-DgeyserWebrtcPort` split signaling (TCP) and gameplay (UDP) onto different ports, if your network hands them out separately.
- `-DgeyserSignalingMode=nxs` switches to external signaling, if you cannot give servers a TCP port. You can also run your own NXS-compatible signaling service.
- `-DgeyserAdvertiseAddresses` tells players which public address to connect to, if servers run in containers or behind a NAT and do not hold their public address themselves.

Once you have set this up, please let us know by [opening a pull request](https://github.com/GeyserMC/GeyserWebsite) or 
reaching out on [Discord](https://discord.gg/geysermc), so our setup guide can tell your users that there is nothing for them to do.
In case you need further system properties, please reach out to us! If you would also like to support Geyser's
development and be featured on our upcoming hosting page, have a look at [Open Collaboration](https://opencollaboration.dev/).

## NetherNet External Signaling (NXS) {/* #nethernet-external-signaling-nxs */}

Geyser supports using external signaling providers which follow the NetherNet External Signaling (NXS) standard. It can be useful for
load-balancing between multiple Geyser instances, central certificate management, or avoiding running multiple built-in signaling servers,
amongst other benefits. See the [Open Collaboration blog post](https://opencollaboration.dev/articles/nethernet) to find out more about NXS.
Note that NXS does not support live forwarding of the MOTD and player count. Instead, they are updated periodically.

## HAProxy Support {/* #haproxy-support */}

~~HAProxy headers are currently supported for RakNet and for built-in signaling, but not yet for NetherNet gameplay over 
WebRTC. This feature will be added soon.~~
Update 26.10.2026: As of Geyser build 1272, Geyser supports HAProxy headers for NetherNet gameplay over WebRTC. Note that 
unlike RakNet HAProxy support, you must configure trusted HAProxy speaking IPs in the config.

## Further Reading {/* #further-reading */}
- [Geyser setup guide](/wiki/geyser/setup/): setup steps, including notes for individual hosts
- [HTTPS for NetherNet](/wiki/geyser/nethernet-https): removing the trust prompt with a certificate or a reverse proxy
- [NetherNet HTTP Signaling onboarding guide](https://mojang.github.io/bedrock-protocol-docs/guides/nether-net-onboarding-guide/): Mojang's official documentation
- [Open Collaboration blog post](https://opencollaboration.dev/articles/nethernet): detailed information about NetherNet and the 
external signaling specification
- [System properties supported by Geyser](/wiki/geyser/geyser-command-line-arguments-and-system-properties): every NetherNet setting you can set at startup

## Acknowledgements {/* #acknowledgements */}

We thank Mojang for documenting NetherNet and signaling ahead of the switch, and Ziax for running Warden, a free external 
signaling service open to every Geyser server. NetherNet support in Geyser would not have been possible without [Kas-tle](https://github.com/Kas-tle), 
whose early NetherNet transport in [NetworkCompatible](https://github.com/Kas-tle/NetworkCompatible) and first NetherNet 
support in [CloudburstMC/Network](https://github.com/CloudburstMC/Network) got this started, [rtm516](https://github.com/rtm516), 
for HTTP signaling and the move to libdatachannel, and [irrld](https://github.com/irrld), for bringing NetherNet and NXS into Geyser. 
Thank you as well to the community members who tested NetherNet support in Geyser and reported issues along the way. 
We would also like to thank all donors, and [Open Collaboration](https://opencollaboration.dev/) and its members, for their continued support of the project.
