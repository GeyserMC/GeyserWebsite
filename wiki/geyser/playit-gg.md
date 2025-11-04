---
title: playit.gg Setup
description: How to set up playit.gg to use Geyser without port forwarding.
---

## Prerequisites {#prerequisites}

:::info
You must be able to connect to your Geyser instance locally!
:::

:::warning
The playit.gg Minecraft server plugin does not support UDP tunnels. You will need to use the program agent instead!
:::

- If you already have playit.gg running & set up (for e.g. Minecraft Java edition), skip steps 1 and 2 and proceed with step 3.

## Setup {#setup}
1. Head over to [playit.gg's website](https://playit.gg/) - download the program & run it. It will open the login site in the browser - create an account & sign in. Or, use a guest account.
2. Once logged in, make sure to connect the program + site, until step 4 is reached. This should happen automatically, if it does not, follow the instructions on the website and the playit.gg program console.
   ![img](/img/wiki/playit-gg/running.png)
3. Click "Create Tunnel" if you see the screen above, or, select the "Tunnels" tab when logged in to your account. There, select "Minecraft Bedrock", leave "Enable Tunnel" ticked, and click "Add tunnel".
   ![img](/img/wiki/playit-gg/add_tunnel.png)
4. Once "Add tunnel" is clicked, it should create a new tunnel, and you are set! Scroll down until you see this:
   ![img](/img/wiki/playit-gg/added_tunnel.png)
   In Geyser config, set the `broadcast-port` to the playit.gg port from the "Allocation" tab. This will fix ping issues.
   **Please do not change your Geyser port in `config.yml`** unless you have a reason to (e.g. hosting another Geyser server on the same machine), in which case skip to the last two sentences. The bedrock (Geyser) port in `config.yml` and the playit.gg ports are entirely seperate, playit.gg will forward its port to the default Geyser port and should already work. Changing it can cause errors. If you have changed your config port, change the bedrock port back to the default of 19132 and ensure that `clone-remote-port` is `false`.
   If you have Geyser running on a port that is not 19132, update the "Local Port" with your Geyser port on the page shown above. The "Local Address" does not need to be changed unless you are not running playit.gg and Geyser on the same device.
5. Connect to your server - use the IP and Port from the "Allocation" tab. In our example - "180.ip.ply.gg" as the IP, and "17019" as the port. Alternatively, use the Domain it gives you instead of the IP.
6. If you join successfully, then you are done! Make sure to leave the playit.gg program running as closing it will close the tunnel. You also may want to ratelimit individual connections - use the "Per Connection Rate Limit" option to do so.
   (If you failed to join, check out the [troubleshooting](#troubleshooting) section of the page.) 

## Troubleshooting {#troubleshooting}

### I can't connect to my server! {#i-cant-connect-to-my-server}
* *Are there errors in your minecraft server console?*
* *Unless you manually changed the "Local Port" on the playit.gg website, in Geyser config, ensure that the bedrock port is the default of `19132` and that `clone-remote-port` is `false`.*
* *If you changed the `bedrock-port` or set `clone-remote-port` to `true` and have a reason for doing so (e.g. hosting another Geyser server on the same machine), you'll have to tell playit.gg to use that port instead! See the last two sentences in step 4.*
* *Check that you're joining with playit.gg's IP and port from the "Allocation" tab.*
* *Make sure that you have the program agent open while trying to join.*
* *See [here](/wiki/geyser/fixing-unable-to-connect-to-world/) for general troubleshooting steps.*
