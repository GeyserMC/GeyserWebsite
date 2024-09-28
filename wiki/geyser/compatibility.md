---

Title: Compatibility with 3rd Party Services and Plugins  
Description: A help page related to 3rd-party services and plugins.

---

# Compatibility

:::caution
This page highlights selected incompatibilities and warnings. We are NOT affiliated with these services or plugins, nor do we endorse them. If you have further questions, please refer to their provided documentation.
:::

## Port-forwarding / Tunnelling Services {#tunnelling-services}

These are commonly used to allow players to join a server hosted at home without needing to set up port-forwarding.

- **[playit.gg](https://playit.gg/)** <br/>
The playit.gg plugin unfortunately does not support UDP tunnels, but the standalone version of playit.gg can be used 
with Geyser. See [our guide](/wiki/geyser/playit-gg/) for help.


- **[ngrok](https://ngrok.com/)** <br/>
Unfortunately, ngrok does not support UDP traffic, and can therefore not be used with Geyser. We recommend using playit.gg instead.

## DDoS-Protection {#ddos-protection}

These services can be used to protect your server from DDoS attacks. These are paid, and are usually only needed for larger
networks.

Do note: With haproxy protocol enabled, you should also configure `proxy-protocol-whitelisted-ips` in your Geyser config 
to whitelist the IP's from your ddos protection provider.

The config option accepts either single strings, or an array of entries. These can either be IP addresses, 
or a URL containing a new-line separated list of IPs/CIDRs. For example, TCPShield and Cosmic provide a URL with an updated list of their CIDRs:
```yaml
bedrock:
  # ...
  proxy-protocol-whitelisted-ips: [ "https://cosmic.global/ips/", "https://tcpshield.com/v4/" ]
```

Provider-specific information:

- **[TCPShield](https://tcpshield.com/)**: <br/>
Requires `only-allow-proxy-connections` to be disabled unless you have a paid plan. The "Premium" plan supports Geyser — 
see [their docs](https://docs.tcpshield.com/miscellaneous/geyser) for setup instructions.


- **[Cosmicguard](https://cosmicguard.com/)** <br/>
Setup instructions:
  1. Access the host system's terminal. (This guide is for Linux systems only.)
  2. Set up a "Guard," selecting "gaming" and then "Minecraft: Bedrock edition."
  3. Click "setup" for Linux, run the guardian installer, and start the service.
  4. Run "guardian status" and note the "Local IP" (starts with "10.31.x.x").
  5. Go to the Geyser `config.yml` and update the Bedrock address to the Local IP you found above.
  6. Restart the Minecraft server and test it out. It should work for both Java and Bedrock.

    For further questions, contact their support.

## Web Stores {#web-stores}

- **[Tebex](https://www.tebex.io/)** <br/>
Tebex (formerly Buycraft) supports Java & Bedrock players via the 'Minecraft Offline/Geyser' store option. <br/>
See [their blog entry](https://blog.tebex.io/setting-up-geyser-minecraft/), or below for a guide:
  1. Go to Tebex and create a webstore.
  2. Select the game as "Minecraft Offline/Geyser"
  3. Continue and click "Create my Webstore."
  4. Name your server and select the currency, then continue.
  5. Select the game server and continue.
  6. Download the plugin version that matches your server type.
  7. Execute the secret command from your server's console.
  
  **Note:** If you are using a prefix with Floodgate, Bedrock players will have to enter the prefix.


- **[CraftingStore](https://craftingstore.net/)** <br/>
CraftingStore works with Geyser. However, if you are using a Floodgate prefix that is not `+`, you will need to disable the premium name checking config option.

## Plugin Incompatibilities {#plugin-incompatibilities}

Geyser generally works fine with most plugins as it emulates a Java client. However, there are some exceptions:

- **[ExploitFixer](https://www.spigotmc.org/resources/62842/):** Thinks that Floodgate users are UUID spoofing — disable the `uuidspoof` setting in ExploitFixer's config.
- **[LibHatesMods](https://www.spigotmc.org/resources/78202/):** Causes authentication failures with `com.github.steveice10.mc.auth.exception.request.InvalidCredentialsException`.
- **[ProtocolSupport](https://www.spigotmc.org/resources/7201/):** Works with Floodgate, but we recommend using [ViaBackwards](https://hangar.papermc.io/ViaVersion/ViaBackwards) instead.
- **[ProtocolSupportBungee](https://www.spigotmc.org/resources/8733/):** Changes how the login process works, breaking Floodgate's injection code.
- **[SayNoToMcLeaks](https://www.spigotmc.org/resources/40906/):** Prevents Floodgate from completing its login system.

If you come across any more plugin incompatibilities, please let us know via [Discord](https://discord.gg/geysermc).

:::caution

The AntiCheats listed below have been categorized based on their compatibility with Geyser.
This is a community-compiled list and does not indicate any endorsement from GeyserMC. Use them at your own risk!

:::

## AntiCheat compatibility reports {#anticheat-compatibility-reports}

Full Compatibility (Checks Bedrock Players Accurately)

- [AntiAura](https://www.spigotmc.org/resources/1368/) (Paid) - Last checked on 24th January 2023
- [LightAntiCheat](https://modrinth.com/plugin/lightanticheat) - Last checked on 19rd July 2024
- [Spartan: Bedrock Edition](https://builtbybit.com/resources/12832/) (Paid) - Last checked on 18th July 2024
- [Themis](https://www.spigotmc.org/resources/90766/) - Last checked on 11th July 2024

Partially Compatible (Does not Check/Ignores Bedrock Players)

- [GrimAC](https://github.com/MWHunter/Grim) - Last checked on 30th June 2024
- [Intave](https://intave.ac) (Paid) Requires [GeyserMC addon](https://github.com/intave/bedrock) - Last checked on 2nd July 2024
- [Matrix](https://matrix.rip/) (Paid) - Last checked on 23rd July 2024
- [Spartan: Java Edition](https://www.spigotmc.org/resources/25638/) (Paid) - Last checked on 18th July 2024
- [Verus](https://verus.ac) (Paid) - Last checked on 4th February 2024
- [Vulcan](https://www.spigotmc.org/resources/83626/) (Paid) - Last checked on 20th July 2024

Incompatible (False Positives on Bedrock Players, no Compatibility at All)

- [GodsEye](https://www.spigotmc.org/resources/69595/) ([GodsEyeGeyserMC](https://github.com/TheDejavu/GodsEyeGeyserMC/releases) is an addon that enables Partial Compatibility) (Paid) - Last checked on 23rd March 2024
- [NoCheatPlus](https://ci.codemc.io/job/Updated-NoCheatPlus/job/Updated-NoCheatPlus/) ([Compat NCP](https://github.com/Updated-NoCheatPlus/CompatNoCheatPlus/) is an addon that enables Partial Compatibility) - Last checked on 14th July 2024
- [Wraith](https://www.spigotmc.org/resources/66887/) (Paid) - Last checked on 26th January 2023