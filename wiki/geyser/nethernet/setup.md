---
title: Nethernet Setup Guide
description: A guide for setting Nethernet up with Geyser.
---

Geyser now supports the new Nethernet mode of transport used by default on Bedrock as of build TODO BUILD NUM HERE, this is preferred over Raknet which will be removed in the upcoming 26.60 update (Date TBA).

## Differences between Nethernet and Raknet

The important different between Nethernet and Raknet is that Nethernet requires a TCP port **and** a UDP port, compared to Raknet that only needed a UDP port. This makes Nethernet more difficult to setup on certain hosting providers/networking setups.

Nethernet will do the following with a bedrock server:
- Contact the "Signalling" server found on the TCP port in order to get the following:
  - The MOTD, player count and ping
  - The connection details with bedrock will use to connect via UDP (WebRTC)
- The client then connects to the server via WebRTC which is where the UDP port is required

Raknet will do the following with a bedrock server:
- Make a small connection to the server to get the MOTD, player count and ping
- The client then connects to the server properly and starts sending the join data

This small difference shakes up the entire networking involved when connecting to a server on Bedrock. For this reason, the migration to Nethernet may be difficult for some users; but, we're hoping with the preparation time we've been given, we can make the transition smoother.

## What does this mean for you?

This means something different depending on how you host your server, but generally you need to redo your network configurations if you made any previously for your server.

:::caution

If you used `clone-remote-port` when setting up your Geyser server, it is important to note this option **no longer works**! You must either change the port used, or setup [Nethernet External Signalling](#nethernet-external-signalling), if you do not, the Nethernet TCP port will collide with the Java server's port and the Nethernet signalling server will fail to boot, making it impossible to connect to your server.

:::

### Self-hosting

Ensure you have port forwarded your bedrock port for TCP also, this will allow Geyser to run the signalling server and continue accepting connections successfully. If you cannot do this for some reason, there is another option in order to get Nethernet working, see [Nethernet External Signalling](#nethernet-external-signalling).

### Hosting provider

When using a hosting provider, the fix is variable depending on which provider you're using, but we can help a bit here.

If you manually setup your network for Geyser by assigning a UDP port, good news! There's a good chance Nethernet should just work, as many providers will also allocate a TCP port with it. However, if this is not the case, allocate your UDP port for TCP also.

If you did not manage the networking, odds are you should be fine, as your hosting provider will hopefully be prepared for Nethernet, as we've given them the tools in order to get Nethernet setup.

If you only needed to enable `clone-remote-port`, see the caution above, with describes why this option **no longer works**.

If after this, none of those options worked, you may want to look into [Nethernet External Signalling](#nethernet-external-signalling).

## Nethernet External Signalling

Nethernet External Signalling (or NXS for short) is an open standard developed by [Open Collaboration](https://opencollaboration.dev/) alongside [Ziax](https://ziax.com/)! This standard allows you to run the Nethernet signalling server (the TCP port part) away from your server, then have them connect to each other!

This is good because:
- The signalling server can handle multiple servers at once, under a single port, making the networking setup more simple
- Any external provider can be used, not just your own, for example, [Warden](#warden-signalling)
- A hosting provider can automatically setup a signalling server and tell Geyser to use it, making setup much simpler!

### Warden Signalling

Warden Signalling, or just Warden, is a free service offered by [Ziax](https://ziax.com/) which Geyser can connect to in order to be given an IP which can be used to connect to your server!

What this means:
- You do not need to forward a TCP port
- You will not have a custom IP address, but something like `turquoisemango.wdn.gg` instead
- You **still** need to forward a UDP port for Warden to connect to, otherwise Warden will send the client to an unconnectable address
- You do not need any other signalling server, Warden is plug and play with Geyser

:::info

Warden is limited, once your server is too big, you'll reach the TODO limit, and either need to upgrade, or use another external signalling server.

:::