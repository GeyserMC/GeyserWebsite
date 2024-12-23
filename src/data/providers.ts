import { translate } from "@docusaurus/Translate"
import { Providers } from "../types/providers"

// Do not modify the structure of this file without updating the extraction logic in create-providers-json.ts

// TODO remove
const descriptionTemplates = {
    ipAndPort: translate({
        id: 'providers.description.templates.ip_and_port',
        message: "Enable `clone-remote-port` (or manually set `bedrock port` to the Java port), uncomment `bedrock address`, and change `0.0.0.0` to your Java server's IP. Connect with the Java IP and port."
    }),
    forwardingOption: translate({
        id: 'providers.description.templates.forwarding_option',
        message: "Offers a working port forwarding option."
    }),
    javaIp: translate({
        id: 'providers.description.templates.java_ip',
        message: "Make sure your remote address is 'auto', uncomment `bedrock address`, and change `0.0.0.0` to your Java server's IP."
    })
}

const connectionTemplates = {
    default: translate({
        id: 'providers.connect.templates.default.as_configured',
        message: "Connect using the Java server IP and Bedrock port set in your Geyser config."
    }),
    bedrockPort: translate({
       id: 'providers.connect.templates.default_bedrock_port',
       message: "Connect with the Java server IP and the default Bedrock port (19132)."
    }),
    sameAsJava: translate({
        id: 'providers.connect.templates.java_ip_port',
        message: 'Connect with the Java server IP and port.'
    }),
    providedByHost: translate({
        id: 'providers.connect.templates.provided_by_host',
        message: 'Instructions on how to connect on Bedrock edition are provided by the host.'
    })
}

const configChangeTemplates = {
    cloneRemotePort: {
        clone_remote_port: true
    },
    contactHostForPort: {
        port_instruction: translate({
            id: 'providers.config.templates.ask_host_for_port',
            message: "Contact your server hosting provider and ask for a UDP port to use Geyser. Set 'bedrock port' to the port provided."
        })
    },
    assignPort: {
        port_instruction: translate({
            id: 'providers.config.templates.assign_port',
            message: "Assign a UDP port in the server hosting providers panel, and set 'bedrock port' to it."
        })
    },
    cloneRemotePortOrSupport: {
        clone_remote_port: true,
        other_instruction: translate({
            id: 'providers.config.templates.alternative_support',
            message: "Alternatively to running Geyser on the same port as the Java server, contact the server hosting provider."
        })
    },
    cloneRemotePortOrCustom: {
        clone_remote_port: true,
        other_instructions: translate({
            id: 'providers.config.templates.alternative_allocation',
            message: "Alternatively to running Geyser on the same port as the Java server, you can create a port allocation."
        })
    },
    javaAddress: {
        port: 19132,
        address_instructions: translate({
            id: 'providers.config.templates.java_address',
            message: "Set 'bedrock address' to the Java server's public address."
        })
    }
}

export const providersData: Providers = {
    built_in: [
        {
            name: 'Apex Hosting',
            url: 'https://apexminecrafthosting.com/',
            hosting_article: "https://apexminecrafthosting.com/geysermc/",
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.apex_hosting.install',
                message: "Go to the Customizations tab in the panel and select 'Enabled' under the 'Geyser Auto Installer' option."
            })
        },
        {
            name: 'Arth Hosting',
            url: 'https://arthmc.xyz/',
            connect_instructions: connectionTemplates.default,
            custom_install_location: translate({
                id: 'providers.provider.arth_hosting.install',
                message: "Geyser is installed and configured on all servers by default. You can disable it in the 'Manage Plugins' menu."
            })
        },
        {
            name: 'Aternos',
            url: 'https://aternos.org/',
            connect_instructions: connectionTemplates.sameAsJava,
            hosting_article: "https://support.aternos.org/hc/en-us/articles/360051047631",
            custom_install_location: translate({
                id: 'providers.provider.aternos.install',
                message: "Install Geyser in the Aternos plugin list."
            }),
            info: translate({
                id: 'providers.provider.aternos.info',
                message: "Aternos automatically installs the latest version of Geyser, but does not auto update it. To update, reinstall the plugin (no need to uninstall Geyser/deleting the plugin files)."
            })
        },
        {
            name: 'Cloud Nord',
            url: 'https://cloudnord.net/',
            connect_instructions: connectionTemplates.providedByHost,
            description: translate({
                id: 'providers.provider.cloud_nord.description',
                message: "Go to their [Crossplay Server](https://cloudnord.net/minecraftcrossplay-server-hosting/) hosting section and order your server."
            })
        },
        {
            name: 'CreeperHost',
            url: 'https://www.creeperhost.net/',
            connect_instructions: "provided_by_host",
            custom_install_location: translate({
                id: 'providers.provider.creeperhost.install',
                message: "Has a toggle within the control panel to automatically enable Geyser."
            })
        },
        {
            name: 'Cubes Hosting',
            url: 'https://www.cubes.host/',
            connect_instructions: translate({
                id: 'providers.provider.cubes_hosting.connect',
                message: "Connect with the Java server IP and the port shown in the server console."
            }),
            custom_install_location: translate({
                id: 'providers.provider.cubes_hosting.install',
                message: "Install Geyser using the plugin manager. Then restart the server and Geyser will run on an additional port - you can check it in the server console."
            }),
            info: translate({
                id: 'providers.provider.cubes_hosting.info',
                message: "Geyser-Standalone can be set up through a support ticket."
            }),
        },
        {
            name: 'exaroton',
            url: 'https://exaroton.com/',
            hosting_article: "https://support.exaroton.com/hc/en-us/articles/360019857918-Geyser",
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.exaroton.install',
                message: "Install Geyser in the exaroton plugin list."
            })
        },
        {
            name: 'GGServers',
            url: 'https://ggservers.com',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.ggservers.install',
                message: "Can be installed to any server from their auto plugin setups."
            })
        },
        {
            name: 'Lilypad',
            url: 'https://lilypad.gg',
            hosting_article: "https://lilypad.gg/bedrock",
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.lilypad.install',
                message: "Tick the 'Enable Bedrock crossplay?' option when changing your server software to automatically install and configure Geyser + Floodgate."
            })
        },
        {
            name: 'Minefort',
            url: 'https://minefort.com/',
            connect_instructions: translate({
                id: 'providers.provider.minefort.connect_instructions',
                message: "Connect via `play.minefort.com` and join using `/server [servername]`, or connect directly via `[servername].minefort.com`."
            }),
            additional_step: translate({
                id: 'providers.provider.minefort.additional_step',
                message: "To allow Bedrock players, go to the server dashboard under 'Connect Support', and enable the 'Allow Bedrock' option."
            })
        },
        {
            name: 'Minehut',
            url: 'https://minehut.com/',
            connect_instructions: translate({
                id: 'providers.provider.minehut.connect_instructions',
                message: "Connect via `bedrock.minehut.com` and do `/join [servername]`, or connect directly via `[servername].bedrock.minehut.gg`."
            })
        },
        {
            name: 'Physgun',
            url: 'https://physgun.com/',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'PiglinHost',
            url: 'https://piglinhost.com/',
            hosting_support: 'https://billing.piglinhost.com/submitticket.php?step=2&deptid=5',
            connect_instructions: connectionTemplates.providedByHost,
            config: {
              other_instructions: translate({
                  id: 'providers.provider.config.other',
                  message: "If you did not order the server from the [cross-platform servers page](https://piglinhost.com/minecraft-java-hosting.html), contact the support for help."
              })
            }
        },
        {
            name: 'OMGServ',
            url: 'https://www.omgserv.com/en/',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.omgserv.install',
                message: "Select Geyser in the [Install Menu](https://i.imgur.com/Gewpsrq.png), to automatically it. You can enable floodgate in the [server properties on the dashboard](https://i.imgur.com/jg5mzNj.png)."
            })
        },
        {
            name: 'Pufferfish Host',
            url: 'https://pufferfish.host/',
            connect_instructions: connectionTemplates.providedByHost,
            info: translate({
                id: 'providers.provider.pufferfish_host.info',
                message: "Geyser is installed and configured on all servers by default."
            })
        },
        // { TODO outdated instructions
        //     name: 'Server.pro (Dedicated IP servers)',
        //     url: 'https://server.pro',
        //     custom_install_location: translate({
        //         id: 'providers.provider.server.pro.vps.description',
        //         message: "Select Geyser in the [Service Type Menu](https://i.imgur.com/loSNmvu.png), Floodgate can be enabled on the dashboard configuration. For manual installation: If you are using a PRO or a VPS plan, you can use any port, which can be opened on the Firewall tab."
        //     })
        // },
        {
            name: 'Snakecraft Hosting',
            url: 'https://snakecrafthosting.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.snakecraft_hosting.install',
                message: "Select 'Paper + Geyser with Floodgate' under the Jar Type at checkout to install the Geyser plugin."
            })
        },
        {
            name: 'SRKHOST',
            url: 'https://www.srkhost.eu/',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.srkhost.install',
                message: "You can enable Geyser on the version changer page. Geyser will run on the given port by the host."
            })
        },
        {
            name: 'WiseHosting',
            url: 'https://wisehosting.com',
            hosting_article: 'https://help.wisehosting.com/en/articles/13-how-to-install-geysermc-java-bedrock-crossplay-to-your-server',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.wisehosting.install',
                message: "For auto installation: Find the GeyserMC presets from the `Properties` tab in the Game Panel. There, click `Install` and restart your server."
            })
        },
        {
            name: 'ZapHosting',
            url: 'https://zap-hosting.com/en/',
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.zaphosting.install',
                message: "Find the plugin in the control panel and restart your server."
            })
        }
    ],
    support: [
        {
            name: 'Akliz',
            url: 'https://www.akliz.net/',
            connect_instructions: connectionTemplates.default,
            config: configChangeTemplates.assignPort,
        },
        {
            name: 'Aquatis',
            url: 'https://aquatis.host/',
            connect_instructions: connectionTemplates.default,
            config: configChangeTemplates.contactHostForPort,
        },
        {
            name: 'BisectHosting',
            url: 'https://www.bisecthosting.com/',
            hosting_support: 'https://www.bisecthosting.com/clients/index.php?rp=/knowledgebase/193/How-to-install-Geyser-and-Floodgate-on-a-Minecraft-Java-server.html',
            connect_instructions: connectionTemplates.default,
            config: {
                port: 19132,
                address_instruction: translate({
                    id: 'providers.provider.bisecthosting.config.address',
                    message: "Set 'bedrock address' to the public IP of your server (e.g. `address: 51.79.129.18`)"
                }),
                other_instructions: "Under the home tab, select 'Enable UDP Network' and restart the server."
            },
            warn: translate({
                id: 'providers.provider.bisecthosting.info',
                message: "If you still cannot connect after following these instructions, contact Bisects support as they reportedly have UDP disabled on some nodes."
            }),
        },
        // { TODO
        //     name: 'Birdflop',
        //     url: 'https://birdflop.com/',
        //     description: translate({
        //         id: 'providers.provider.birdflop.description',
        //         message: "Open an allocation in the networks tab. If you have a dedicated IP, you can open a ticket to request allocation of the default Bedrock port (19132). Update the config to use the allocated port and restart the server."
        //     })
        // },
        {
            name: 'Bloom.Host',
            url: 'https://www.bloom.host/',
            hosting_article: 'https://docs.bloom.host/plugins/geysermc/',
            connect_instructions: connectionTemplates.default,
            config: {

            }
        },
        {
            name: 'Clovux',
            url: 'https://clovux.net/',
            connect_instructions: connectionTemplates.bedrockPort,
            config: configChangeTemplates.javaAddress
        },
        {
            name: 'Consulhosting',
            url: 'https://consulhosting.nl/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Craft-Hosting',
            url: 'https://craft-hosting.ru/',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava,
            info: translate({
                id: 'providers.provider.craft-hosting.description',
                message: "This provider appears to only provide service in Russia."
            })
        },
        {
            name: 'DedicatedMC',
            url: 'https://dedicatedmc.io/',
            hosting_article: 'https://docs.dedicatedmc.io/plugins-mods/how-to-install-geysermc/',
            config: configChangeTemplates.cloneRemotePortOrSupport,
            description: translate({
                id: 'providers.provider.dedicatedmc.description',
                message: "Check [DedicatedMC's documentation](https://docs.dedicatedmc.io/plugins-mods/how-to-install-geysermc/) for specific instructions."
            })
        },
        {
            name: 'ElfIDC',
            url: 'https://www.elfidc.com/',
            description: translate({
                id: 'providers.provider.elfidc.description',
                message: "When placing an order, choose Paper/Spigot + Geyser, which will automatically install the Geyser plugin. Connect with the Java server's IP and port. Note: This provider only provides service in China."
            })
        },
        {
            name: 'EnviroMC',
            url: 'https://enviromc.host/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'ExtraVM',
            url: 'https://extravm.com/',
            connect_instructions: connectionTemplates.bedrockPort,
            config: configChangeTemplates.javaAddress,
        },
        {
            name: 'FadeHost',
            url: 'https://fadehost.com/',
            description: translate({
                id: 'providers.provider.fadehost.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port. Alternatively, buy a dedicated IP address to support a different port."
            })
        },
        {
            name: 'FakaHeda',
            url: 'https://fakaheda.eu/',
            description: translate({
                id: 'providers.provider.fakaheda.description',
                message: "Set the `bedrock port` in the config to the Java server's port or use one of the available ports allocated to your server, and connect with that port."
            })
        },
        {
            name: 'FalixNodes',
            url: 'https://falixnodes.net/',
            description: translate({
                id: 'providers.provider.falixnodes.description',
                message: "Open a port yourself on the network page in the game panel, then use that port in the bedrock section of the Geyser config."
            })
        },
        {
            name: 'Ferox Hosting',
            url: 'https://feroxhosting.nl',
            description: translate({
                id: 'providers.provider.ferox_hosting.description',
                message: "Open a port yourself in their panel and check out the [knowledgebase article](https://feroxhosting.nl/kb/) for how to install and configure Geyser."
            })
        },
        {
            name: 'Fluctis Hosting',
            url: 'https://fluctishosting.com',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'FREAKHOSTING',
            url: 'https://freakhosting.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'FreeMcServer.net',
            url: 'https://freemcserver.net',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'GameHosting.it',
            url: 'https://www.gamehosting.it/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'GameProHost',
            url: 'https://gameprohost.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'GPortal',
            url: 'https://www.g-portal.com/',
            description: translate({
                id: 'providers.provider.gportal.description',
                message: "You have to adjust the port according to your query port. Scheme: Query port: xxx65. The ports from xxx66 to xxx70 are available. For example, if your query port is 12365, then Geyser can only run under the port range 12366-12370. Furthermore, you have to change the 'Bedrock' 'address' in the Geyser config to your IP address. You can find it above your query port. Don't forget to delete the # in front of `address'."
            })
        },
        {
            name: 'Heavynode',
            url: 'https://www.heavynode.com/',
            description: translate({
                id: 'providers.provider.heavynode.description',
                message: "Open a port yourself in the networking section of the control panel. Port `19132` is only available with a dedicated IP (contact support), otherwise you will need to use a randomly assigned port. To resolve further connection issues for servers located in Canada and the UK, contact their support with the info found [here](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart)."
            })
        },
        {
            name: 'Hicoria',
            url: 'https://hicoria.com/en/',
            description: translate({
                id: 'providers.provider.hicoria.description',
                message: "Use one of the available ports allocated for your server for the Bedrock port in your config and connect with that port."
            })
        },
        {
            name: 'Hosterfy',
            url: 'https://www.hosterfy.com/',
            description: translate({
                id: 'providers.provider.hosterfy.description',
                message: "Use the same port as your Java server for the Bedrock port in your config (either by setting it yourself, or enabling `clone-remote-port`) and connect with the same IP and port as you would on Java. You can also ask for a new port."
            })
        },
        {
            name: 'HostEZ',
            url: 'https://hostez.io/minecraft',
            description: translate({
                id: 'providers.provider.hostez.description',
                message: "Geyser plugin supported with self-install or installed on request with its own port."
            })
        },
        {
            name: 'Host Havoc',
            url: 'https://hosthavoc.com/minecraft',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Hosting-Minecraft',
            url: 'https://hosting-minecraft.pro/',
            description: translate({
                id: 'providers.provider.hosting-minecraft.description',
                message: 'Create a new port in the "Allocations" tab and use that port in the config.'
            })
        },
        {
            name: 'HumbleServers',
            url: 'https://humbleservers.com/',
            description: translate({
                id: 'providers.provider.humbleservers.description',
                message: "Set the Bedrock port to the Java server's port, or to one of the two extra ports, and connect with that port. If the subdomain doesn't work, use your regular numbered IP address."
            })
        },
        {
            name: 'KeKsHost',
            url: 'https://kekshost.com/en/',
            description: translate({
                id: 'providers.provider.kekshost.description',
                message: "Use the default bedrock port (19132) and the server ip to connect on Bedrock edition. No changes to the Geyser config are needed. You can also ask for a new port and use it instead."
            })
        },
        {
            name: 'Kinetic Hosting',
            url: 'https://kinetichosting.net/',
            description: translate({
                id: 'providers.provider.kinetic_hosting.description',
                message: "Open a port in the Network and Ports page, and set that port as the `bedrock port` in the Geyser config. Alternatively, use the Java server's port by enabling the `clone-remote-port` option in the config. Connect with the same IP as on Java, and the port that you have chosen. For more info see the hosts [support article](https://www.kinetichosting.net/articles/minecraft-java/plugins/geyser)."
            })
        },
        {
            name: 'MC-HOST24.de',
            url: 'https://mc-host24.de/',
            description: descriptionTemplates.ipAndPort
        },
        {
            name: 'MCPEhost.ru',
            url: 'https://mcpehost.ru',
            description: translate({
                id: 'providers.provider.mcpehost.ru.description',
                message: "Create an additional port in the server settings and enable UDP protocol, then use that as the `bedrock port` in the config. Connect with the Java IP and that new port."
            })
        },
        {
            name: 'Meloncube',
            url: 'https://www.meloncube.net/',
            description: translate({
                id: 'providers.provider.meloncube.description',
                message: "Contact the support for a UDP port to use for Geyser. Set that port as the `bedrock port`, and connect with it."
            })
        },
        {
            name: 'MineStrator',
            url: 'https://minestrator.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Minecraft-Hosting.pro',
            url: 'https://www.minecraft-hosting.pro/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Netbela',
            url: 'https://netbela.nl/store/minecraft',
            description: translate({
                id: 'providers.provider.netbela.description',
                message: "Install Geyser with the dedicated Plugin installer. Use the same port as your Java server in your config. Connect with the same address and port as your Java server."
            })
        },
        {
            name: 'NFOservers',
            url: 'https://nfoservers.com/',
            description: translate({
                id: 'providers.provider.nfoservers.description',
                message: "Uncomment and set `bedrock address` to the server IP in the Geyser config file. As an alternative, you can run Geyser standalone separately on an Unmanaged VDS."
            })
        },
        {
            name: 'Nitrado',
            url: 'https://nitrado.net',
            description: translate({
                id: 'providers.provider.nitrado.description',
                message: "Get Geyser as a plugin. Add 4 to the Port of the Java server. See [here](https://wiki.nitrado.net/en/How_to_install_GeyserMC_and_Floodgate) for specific instructions."
            })
        },
        {
            name: 'Nodecraft',
            url: 'https://nodecraft.com',
            description: translate({
                id: 'providers.provider.nodecraft.description',
                message: "Use the default server port and `0.0.0.0` or your server IP as the host address."
            })
        },
        {
            name: 'PaperNodes',
            url: 'https://papernodes.com/',
            description: translate({
                id: 'providers.provider.papernodes.description',
                message: 'Enable clone-remote-port (or manually set the Bedrock port to the Java port), and connect with the Java IP and port. Alternatively, you can contact the host to request an additional port or a dedicated IP.'
            })
        },
        {
            name: 'Pebblehost',
            url: 'https://pebblehost.com/',
            description: translate({
                id: 'providers.provider.pebblehost.description',
                message: "Enable `clone-remote-port` (or manually set `bedrock port` to the Java port), and connect with the Java IP and port. See [this video](https://youtu.be/v9lC80UBZF4) for a PebbleHost-specific tutorial."
            })
        },
        {
            name: 'PlanetNode',
            url: 'https://planetnode.net',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'PUBCS',
            url: 'https://pubcs.com',
            description: translate({
                id: 'providers.provider.pubcs.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port, or upgrade to a plan that includes dedicated IP address to support a different port."
            })
        },
        {
            name: 'RamShard',
            url: 'https://ramshard.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Redline Hosting',
            url: 'https://redlinehosting.net/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Revivenode',
            url: 'https://revivenode.com/',
            description: translate({
                id: 'providers.provider.revivenode.description',
                message: "Set `bedrock port` to the Java server's port (either by setting it yourself, or enabling `clone-remote-port`). You can also create a secondary port in the `network tab` and use that. To fix random `Unable to Connect` issues, see [here](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart)."
            })
        },
        {
            name: 'ScalaCube',
            url: 'https://scalacube.com/',
            description: descriptionTemplates.ipAndPort
        },
        {
            name: 'Shockbyte',
            url: 'https://shockbyte.com/',
            description: translate({
                id: 'providers.provider.shockbyte.description',
                message: "The port will be automatically set after you download Geyser and restart the server. Connect with the same IP and port as on Java. For Geyser Standalone installation instructions, see [here](https://shockbyte.com/billing/knowledgebase/173/Introduction-to-GeyserMCorDragonProxy-How-GeyserMC-Works.html)."
            })
        },
        {
            name: 'Skynode.pro',
            url: 'https://skynode.pro/',
            description: translate({
                id: 'providers.provider.skynode.pro.description',
                message: "Go to 'Server Details', add a new port, and set the `bedrock port` in your config to that port. Connect with it and the Java server's address."
            })
        },
        {
            name: 'Sparked Host',
            url: 'https://sparkedhost.com',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'STIPE',
            url: 'https://stipe.com.au/',
            description: translate({
                id: 'providers.provider.stipe.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port; note that this provider only provides service in Australia."
            })
        },
        {
            name: 'SyntexHosting',
            url: 'https://syntexhosting.com/',
            description: translate({
                id: 'providers.provider.syntexhosting.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port, or request a (free) additional port."
            })
        },
        {
            name: 'The Minecraft Hosting',
            url: 'https://theminecrafthosting.com/',
            description: translate({
                id: 'providers.provider.the_minecraft hosting.description',
                message: "Try using `19132` as the Bedrock port, if that does not work, use the same Java server's port for the `bedrock port` in your config and connect with that port and the Java server's IP."
            })
        },
        {
            name: 'TNAHosting',
            url: 'https://tnahosting.net/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'TurboHost',
            url: 'https://turbohost.nl/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'UltimateSRV',
            url: 'https://ultimatesrv.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'VexyHost',
            url: 'https://vexyhost.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Volcano Hosting',
            url: 'https://www.volcanohosting.net/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'VoltHosting',
            url: 'https://www.volthosting.co.uk/',
            hosting_support: 'https://volthosting.co.uk/contact.html',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.volthosting.description',
                    message: "Alternatively, request an additional port, or buy a dedicated IP address."
                })
            },
            connect_instructions: connectionTemplates.default,
        },
        {
            name: 'Vultam',
            url: 'https://vultam.net/',
            hosting_support: 'https://clients.vultam.net/submitticket.php?step=2&deptid=1',
            connect_instructions: connectionTemplates.default,
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'TODO',
                    message: "Alternatively, allocate a port to your server in the Network section of the control panel. Set that as the `bedrock port` in the Geyser config."
                })
            },
            description: translate({
                id: 'providers.provider.vultam.description',
                message: "Use that port to connect from Bedrock."
            })
        },
        {
            name: 'Wasabi Hosting',
            url: 'https://wasabihosting.com',
            custom_install_location: translate({
                id: 'providers.provider.wasabihosting.description',
                message: "Install Geyser with the plugin installer."
            }),
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: "Wepwawet",
            url: "https://wepwawet.net/",
            connect_instructions: connectionTemplates.default,
            config: {
                other_instructions: translate({
                    id: 'providers.provider.wepwawet.description',
                    message: "Add a new port in the Network tab. Use this new port as the bedrock port."
                })
            }
        },
        {
            name: 'WinterNode',
            url: 'https://winternode.com',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.winternode.config.other_description',
                    message: "Alternatively, request an additional port, or buy a dedicated IP address."
                })
            },
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'WitherHosting',
            url: 'https://witherhosting.com/',
            hosting_article: 'https://support.witherhosting.com/en/article/how-to-install-and-use-geysermc-1xn5l6v',
            connect_instructions: connectionTemplates.default,
            config: {
              other_instructions: translate({
                  id: 'providers.provider.witherhosting.description',
                  message: "Either use the Java server's port, or create a port in the ports manager on the panel and use that for Bedrock."
              })
            }
        }
    ],
    no_support: [
        {
            name: 'MyArena',
            url: 'https://www.myarena.ru/',
            connect_instructions: null,
            description: translate({
                id: 'providers.provider.myarena.description',
                message: "Does seem to be working, but the Java version is too old in order for Geyser to run properly."
            })
        },
        {
            name: 'NiCraft',
            url: 'https://www.ni-host.com/',
            connect_instructions: null,
            description: translate({
                id: 'providers.provider.nicraft.description',
                message: "Does not provide Bedrock support, and are affected by a [firewall configuration issue](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart), which prohibits most players from joining."
            })
        },
        {
            name: 'Feather',
            url: 'https://feathermc.com/',
            connect_instructions: null,
            description: translate({
                id: 'providers.provider.feather.description',
                message: "Their proxy network does not support UDP. Therefore, Geyser is not supported. As an alternative, set up a paper server with e.g. playit.gg instead of port forwarding."
            })
        }
    ]
}
