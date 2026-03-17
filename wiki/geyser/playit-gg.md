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
1. Head over to [playit.gg's website](https://playit.gg/) - download the program & run it.
2. The program will provide a claiming link. Visit that link, log in.
   ![img](/img/wiki/playit-gg/playit_claim.png)
3. Confirm your agent.
   ![img](/img/wiki/playit-gg/playit_claim_confirm.png)
4. Add the agent.
   ![img](/img/wiki/playit-gg/playit_add_agent.png)
5. After the agent is created, create a tunnel.
   ![img](/img/wiki/playit-gg/playit_add_tunnel.png)
6. Name your tunnel and click Next.
   ![img](/img/wiki/playit-gg/playit_name_tunnel.png)
7. Select "Minecraft Bedrock" as the tunnel type and click Next.
   ![img](/img/wiki/playit-gg/playit_tunnel_type.png)
8. Select the Free Network and click Next.  
   **Do not change your Geyser port in `config.yml` unless you have a reason (for example, hosting another Geyser server on the same machine).** The Bedrock (Geyser) port in `config.yml` and the playit.gg ports are separate. playit.gg will forward its port to the default Geyser port and should work as-is. Changing it can cause errors. If you have changed your config port, set the Bedrock port back to the default `19132` and ensure `clone-remote-port` is `false`.
9. If the playit.gg agent and GeyserMC are running on the same device, leave the IP as `127.0.0.1` and set the port to whatever you configured in GeyserMC's config.  
   ![img](/img/wiki/playit-gg/playit_set_ipandport.png)
10. Select `proxy-protocol-v2` for the Proxy Protocol section and click Next.
11. Under `bedrock:`, set `use-haproxy-protocol` to `true`.
12. Click Create Tunnel and wait for the tunnel to be created.
   ![img](/img/wiki/playit-gg/playit_create_tunnel.png)
13. Copy your tunnel's port. For example, if your tunnel address is `visiting-phone.gl.at.ply.gg:6695`, then `6695` is the tunnel port.
14. Under `bedrock:`, set `broadcast-port` to your tunnel port (`6695` in the example).
15. Save your config. Start your Minecraft server and connect using your tunnel's IP and port.
16. If you join successfully, then you are done! Make sure to leave the playit.gg program running as closing it will close the tunnel. You also may want to ratelimit individual connections - use the "Per Connection Rate Limit" option to do so.
   (If you failed to join, check out the [troubleshooting](#troubleshooting) section of the page.) 

## Troubleshooting {#troubleshooting}

### I can't connect to my server! {#i-cant-connect-to-my-server}
* *Are there errors in your minecraft server console?*
* *Unless you manually changed the "Local Port" on the playit.gg website, in Geyser config, ensure that the bedrock port is the default of `19132` and that `clone-remote-port` is `false`.*
* *If you changed the `bedrock-port` or set `clone-remote-port` to `true` and have a reason for doing so (e.g. hosting another Geyser server on the same machine), you'll have to tell playit.gg to use that port instead! See the last paragraph in step 4.*
* *Check that you're joining with playit.gg's IP and port from the "Allocation" tab.*
* *Make sure that you have the program agent open while trying to join.*
* *See [here](/wiki/geyser/fixing-unable-to-connect-to-world/) for general troubleshooting steps.*
