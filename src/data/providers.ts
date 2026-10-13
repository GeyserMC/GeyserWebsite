import { translate } from "@docusaurus/Translate"
import { HostingProvider, PortSource } from "../types/providers"

// See CONTRIBUTING.md for how to add or update a hosting provider.
// Only add strings where the generated steps are not enough: the setup guide already covers downloading and placing
// the jar, the config changes for the given ports, and what players enter to connect.

const connectionTemplates = {
    providedByHost: translate({
        id: 'providers.connecting.templates.provided_by_host',
        message: "Instructions to connect with Bedrock Edition are provided by the host."
    })
}

// Ways to get a port. The setup guide adds which config option to set it as.
const ports: Record<string, PortSource> = {
    assign: {
        obtain: translate({
            id: 'providers.ports.assign',
            message: "Assign a port in your host's panel, open for both TCP and UDP."
        })
    },
    allocated: {
        obtain: translate({
            id: 'providers.ports.allocated',
            message: "Pick a free port from the ports allocated to your server, open for both TCP and UDP."
        })
    },
    askHost: {
        obtain: translate({
            id: 'providers.ports.ask_host',
            message: "Ask your host for a port that is open for both TCP and UDP."
        })
    },
    // For hosts we have no NetherNet details on, which used to share the Java server's port
    newPort: {
        obtain: translate({
            id: 'providers.ports.new_port',
            message: "Open a new port in your server panel, open for both TCP and UDP, or ask your host for one if the panel has no option for it."
        })
    },
    // For hosts that configure Geyser themselves: the port players connect with
    fromHost: {
        obtain: translate({
            id: 'providers.ports.from_host',
            message: "The Bedrock port your host shows you."
        })
    }
}

const javaAddressInstruction = translate({
    id: 'providers.config.templates.java_address',
    message: "Set `address` in the `bedrock` section to the public address of the Java server."
});

const otherInstructions = {
    dedicatedIp: translate({
        id: 'providers.config.templates.custom_port_dedicated_ip',
        message: "This host may only give out a separate port with a dedicated IP address."
    })
}

const warnings = {
    ovhFirewallMisconfiguration: translate({
        id: 'providers.warnings.ovh_firewall_misconfig',
        message: "To fix random `Unable to Connect` issues, see [here](/wiki/geyser/port-forwarding/#ovh-and-soyoustart)."
    })
}

const customInstallLocations = {
    plugin_list: translate({
        id: 'providers.config.templates.install_location.plugin_list',
        message: "Install Geyser through the plugin or mod list provided by the host."
    }),
    enable_bedrock_crossplay_option: translate({
        id: 'providers.config.templates.install_location.enable_bedrock_crossplay',
        message: "Select the 'Enable Bedrock crossplay?' option when changing your server software to automatically install and configure Geyser and Floodgate."
    })
}

const infos = {
    installed_by_default: translate({
        id: 'providers.config.templates.info.geyser_installed_by_default',
        message: "Geyser is installed and configured on all servers by default."
    })
}

const onlyServesRegion = (region: string) => translate({
    id: 'providers.config.templates.info.only_serves_region',
    message: "This host only provides service in {region}."
}, { region });

export const providersData: HostingProvider[] = [
    {
        name: 'Akliz',
        url: 'https://www.akliz.net/',
        updated: '2025-03-22',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'Apex Hosting',
        url: 'https://apexminecrafthosting.com/',
        updated: '2026-07-10',
        links: {
            article: "https://apexminecrafthosting.com/geysermc/",
            support: "https://apexminecrafthosting.com/support/",
            discord: 'https://discord.apexminecrafthosting.com/'
        },
        install: translate({
            id: 'providers.provider.apex_hosting.install',
            message: "Go to the Customizations tab in the panel and select 'Enabled' under the 'Geyser Auto Installer' option."
        }),
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Aquatis',
        url: 'https://aquatis.host/',
        updated: '2025-03-22',
        config: { udp: ports.askHost, confirmed: false }
    },
    {
        name: 'Arth Hosting',
        url: 'https://arthmc.xyz/',
        updated: '2026-07-10',
        links: { discord: 'https://discord.com/invite/jUeNm7UvKy' },
        install: infos.installed_by_default,
        config: { preconfigured: true, port: ports.fromHost, confirmed: false }
    },
    {
        name: 'Aternos',
        url: 'https://aternos.org/',
        updated: '2026-07-10',
        links: {
            article: "https://support.aternos.org/hc/en-us/articles/39155890785053-NetherNet-protocol-Minecraft-Bedrock-Edition",
            support: 'https://support.aternos.org/',
            discord: "https://discord.aternos.org/"
        },
        install: customInstallLocations.plugin_list,
        // Aternos runs NetherNet on 19132 for all servers, and keeps RakNet on the old port while it exists
        config: { preconfigured: true, port: 19132 },
        notices: {
            info: translate({
                id: 'providers.provider.aternos.info',
                message: "Aternos automatically installs the latest version of Geyser and Floodgate, but does not auto update it. To update, reinstall the plugin (no need to uninstall Geyser/deleting the plugin files)."
            })
        },
        proxies_banned: true
    },
    {
        name: 'AxentHost',
        url: 'https://axenthost.com/games/minecraft/',
        updated: '2026-07-10',
        links: {
            article: 'https://axenthost.com/knowledgebase/categories/minecraft/create-a-crossplay-server-with-geyser/',
            discord: 'https://discord.axenthost.com/'
        },
        install: translate({
            id: 'providers.provider.axenthost.install',
            message: "Select GeyserMC in the Variants tab. This reinstalls the server with Paper and Geyser."
        }),
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'BedrockBetter',
        url: 'https://example.com/bedrockbetter',
        updated: '2026-10-11',
        links: {
            article: 'https://example.com/bedrockbetter/docs/geyser',
            support: 'https://example.com/bedrockbetter/support',
            discord: 'https://discord.gg/bedrockbetter'
        },
        // TODO placeholder host for previewing the hosting page, remove before release
        open_collaboration: {
            tier: 'gold',
            logo: '/img/hosts/bedrockbetter.svg',
            description: "Servers tuned for crossplay, with Geyser and Floodgate preinstalled and NetherNet ready out of the box."
        },
        config: { preconfigured: true, port: 19132 }
    },
    {
        name: 'BedrockHost',
        url: 'https://bedrockhost.pl/',
        updated: '2026-07-10',
        links: {
            article: 'https://bedrockhost.pl/w/geyser-czyli-serwer-minecraft-java-i-bedrock-w-jednym',
            support: 'https://bedrockhost.pl/kontakt'
        },
        install: translate({
            id: 'providers.provider.bedrockhost.install',
            message: "In the hosting panel, go to install new engine > Ready-made solutions and select Geyser. This installs Paper and Geyser."
        }),
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Birdflop',
        url: 'https://birdflop.com/',
        updated: '2025-03-22',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'BisectHosting',
        url: 'https://www.bisecthosting.com/',
        updated: '2026-03-03',
        links: {
            article: 'https://www.bisecthosting.com/clients/index.php?rp=/knowledgebase/193/How-to-install-Geyser-and-Floodgate-on-a-Minecraft-Java-server.html'
        },
        config: { udp: ports.allocated, confirmed: false },
        notices: {
            warn: translate({
                id: 'providers.provider.bisecthosting.warn',
                message: "If you cannot connect after following these instructions, contact Bisect Support, as they reportedly have UDP disabled on some nodes."
            })
        }
    },
    {
        name: 'BlockBarn',
        url: 'https://example.com/blockbarn',
        updated: '2026-10-11',
        links: {
            article: 'https://example.com/blockbarn/docs/geyser',
            support: 'https://example.com/blockbarn/support',
            discord: 'https://discord.gg/blockbarn'
        },
        // TODO placeholder host for previewing the hosting page, remove before release
        open_collaboration: {
            tier: 'silver',
            logo: '/img/hosts/blockbarn.svg',
            description: "Budget friendly Minecraft hosting with one click Geyser installs."
        },
        config: { preconfigured: true, port: 19132 }
    },
    {
        name: 'Bloom.Host',
        url: 'https://www.bloom.host/',
        updated: '2026-05-25',
        links: { article: 'https://docs.bloom.host/multiplatform/geysermc' },
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'CloudNord',
        url: 'https://cloudnord.net/',
        updated: '2026-07-10',
        links: { support: "https://cloudnord.net/submitticket.php", discord: 'https://cloudnord.net/discord' },
        install: customInstallLocations.plugin_list,
        config: { udp: ports.assign, confirmed: false },
        notices: {
            info: translate({
                id: 'providers.provider.cloud_nord.description',
                message: "Servers from the [Crossplay Server](https://cloudnord.net/minecraftcrossplay-server-hosting/) hosting section do not need further configuration."
            })
        }
    },
    {
        name: 'Clovux',
        url: 'https://clovux.net/',
        updated: '2024-12-23',
        config: {
            udp: 19132,
            confirmed: false,
            notes: [javaAddressInstruction]
        }
    },
    {
        name: 'ConsulHosting',
        url: 'https://consulhosting.com/minecraft-server-hosting/',
        updated: '2026-08-08',
        links: { article: 'https://consulhosting.com/help/install-geysermc/' },
        install: translate({
            id: 'providers.provider.consulhosting.install',
            message: "Install GeyserMC from the Software section of your server panel."
        }),
        config: { preconfigured: true, port: ports.fromHost, confirmed: false }
    },
    {
        name: 'Craft-Hosting',
        url: 'https://craft-hosting.ru/',
        updated: '2025-03-22',
        config: { udp: ports.newPort, confirmed: false },
        notices: { info: onlyServesRegion('Russia') }
    },
    {
        name: 'CreeperHost',
        url: 'https://www.creeperhost.net/',
        updated: '2026-07-10',
        links: { discord: 'https://discord.gg/cJTYkdmbgy' },
        install: translate({
            id: 'providers.provider.creeperhost.install',
            message: "Enable Geyser in the control panel."
        }),
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'CrossplayCloud',
        url: 'https://example.com/crossplaycloud',
        updated: '2026-10-11',
        links: {
            article: 'https://example.com/crossplaycloud/docs/geyser',
            support: 'https://example.com/crossplaycloud/support',
            discord: 'https://discord.gg/crossplaycloud'
        },
        // TODO placeholder host for previewing the hosting page, remove before release
        open_collaboration: {
            tier: 'silver',
            logo: '/img/hosts/crossplaycloud.svg',
            description: "Cloud servers with UDP ports available on every plan."
        },
        config: { preconfigured: true, port: 19132 }
    },
    {
        name: 'Cubes Hosting',
        url: 'https://www.cubes.host/',
        updated: '2026-07-10',
        links: { support: 'https://cubes.host/client/submitticket.php', discord: 'https://discord.gg/K8XzK4RqUH' },
        install: customInstallLocations.plugin_list,
        config: {
            preconfigured: true,
            port: {
                obtain: translate({
                    id: 'providers.provider.cubes_hosting.port',
                    message: "The port shown in the server console."
                })
            },
            confirmed: false
        },
        notices: {
            info: translate({
                id: 'providers.provider.cubes_hosting.info',
                message: "Geyser-Standalone can be set up through a support ticket."
            })
        }
    },
    {
        name: 'Dawn',
        url: 'https://dawn.gg/',
        updated: '2026-08-15',
        config: { udp: 'java', confirmed: false },
        notices: {
            unsupported: translate({
                id: 'providers.provider.dawn.description',
                message: "Their proxy network does not support UDP. Therefore, Geyser is not supported. As an alternative, set up a paper server with e.g. playit.gg instead of port forwarding."
            })
        }
    },
    {
        name: 'DedicatedMC',
        url: 'https://dedicatedmc.io/',
        updated: '2024-12-23',
        links: { article: 'https://docs.dedicatedmc.io/plugins-mods/how-to-install-geysermc/' },
        config: { udp: ports.askHost, confirmed: false }
    },
    {
        name: 'ElfIDC',
        url: 'https://www.elfidc.com/',
        updated: '2024-12-23',
        install: translate({
            id: 'providers.provider.elfidc.custom',
            message: "When placing an order, choose Paper/Spigot + Geyser, which will automatically install the Geyser plugin."
        }),
        config: { udp: ports.newPort, confirmed: false },
        notices: { info: onlyServesRegion('China') }
    },
    {
        name: 'EnviroMC',
        url: 'https://enviromc.host/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'exaroton',
        url: 'https://exaroton.com/',
        updated: '2026-07-10',
        links: {
            article: "https://support.exaroton.com/hc/en-us/articles/39157467467165-NetherNet-protocol-Minecraft-Bedrock-Edition",
            discord: 'https://discord.gg/exaroton'
        },
        install: customInstallLocations.plugin_list,
        // Same setup as Aternos: NetherNet runs on 19132 for all servers
        config: { preconfigured: true, port: 19132 }
    },
    {
        name: 'ExtraVM',
        url: 'https://extravm.com/',
        updated: '2024-12-23',
        config: {
            udp: 19132,
            confirmed: false,
            notes: [javaAddressInstruction]
        }
    },
    {
        name: 'FadeHost',
        url: 'https://fadehost.com/',
        updated: '2024-12-23',
        config: {
            udp: ports.askHost,
            confirmed: false,
            notes: [otherInstructions.dedicatedIp]
        }
    },
    {
        name: 'FakaHeda',
        url: 'https://fakaheda.eu/',
        updated: '2025-03-22',
        config: { udp: ports.allocated, confirmed: false }
    },
    {
        name: 'FalixNodes',
        url: 'https://falixnodes.net/',
        updated: '2026-07-09',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'Ferox Hosting',
        url: 'https://feroxhosting.nl',
        updated: '2025-03-22',
        links: { article: "https://feroxhosting.nl/kb/" },
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'Fluctis Hosting',
        url: 'https://fluctishosting.com',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'FREAKHOSTING',
        url: 'https://freakhosting.com/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'FreeMcServer.net',
        url: 'https://freemcserver.net',
        updated: '2025-12-14',
        install: customInstallLocations.plugin_list,
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'GameHosting.it',
        url: 'https://www.gamehosting.it/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'GeyserHost',
        url: 'https://example.com/geyserhost',
        updated: '2026-10-11',
        links: {
            article: 'https://example.com/geyserhost/docs/geyser',
            support: 'https://example.com/geyserhost/support',
            discord: 'https://discord.gg/geyserhost'
        },
        // TODO placeholder host for previewing the hosting page, remove before release
        open_collaboration: {
            tier: 'gold',
            logo: '/img/hosts/geyserhost.svg',
            description: "Minecraft hosting built around Geyser, so Java and Bedrock players can join from day one."
        },
        config: { preconfigured: true, port: 19132 }
    },
    {
        name: 'GGServers',
        url: 'https://ggservers.com',
        updated: '2026-07-10',
        links: {
            article: 'https://ggservers.com/knowledgebase/article/how-to-set-up-and-use-geyser-plugin/',
            discord: 'https://discord.gg/ggservers'
        },
        install: translate({
            id: 'providers.provider.ggservers.install',
            message: "Install Geyser in the auto plugin setups section."
        }),
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'GPortal',
        url: 'https://www.g-portal.com/',
        updated: '2025-10-29',
        config: {
            udp: {
                obtain: translate({
                    id: 'providers.provider.gportal.description',
                    message: "Pick a port based on your query port. Scheme: Query port: xxx65. The ports from xxx66 to xxx70 are available. For example, if your query port is 12365, then Geyser can only run under the port range 12366-12370."
                })
            },
            confirmed: false,
            notes: [javaAddressInstruction]
        }
    },
    {
        name: 'Hicoria',
        url: 'https://hicoria.com/en/',
        updated: '2025-03-22',
        config: { udp: ports.allocated, confirmed: false }
    },
    {
        name: 'Host Havoc',
        url: 'https://hosthavoc.com/minecraft',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Hosterfy',
        url: 'https://www.hosterfy.com/',
        updated: '2024-12-23',
        config: { udp: ports.askHost, confirmed: false }
    },
    {
        name: 'HostEZ',
        url: 'https://hostez.io/minecraft',
        updated: '2025-03-22',
        config: {
            udp: {
                obtain: translate({
                    id: 'providers.provider.hostez.config.port',
                    message: "Add 1 to the port you were assigned (e.g. 25565 -> 25566)."
                })
            },
            confirmed: false,
            notes: [
                translate({
                    id: 'providers.provider.hostez.config.other',
                    message: "Different ports can be set in the Allocations tab. Premium products with a dedicated IP can use the default port (19132)."
                })
            ]
        }
    },
    {
        name: 'Hosting-Minecraft',
        url: 'https://hosting-minecraft.pro/',
        updated: '2025-10-29',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'HumbleServers',
        url: 'https://humbleservers.com/',
        updated: '2025-10-29',
        config: { udp: ports.allocated, confirmed: false }
    },
    {
        name: 'KaasHosting',
        url: 'https://www.kaashosting.nl/minecraft-servers',
        updated: '2026-07-10',
        links: {
            article: 'https://www.kaashosting.nl/help/nl/minecraft/hoe-maak-ik-mijn-minecraft-server-crossplay-met-geysermc',
            discord: 'https://kaas.gg/discord'
        },
        install: customInstallLocations.plugin_list,
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'KeKsHost',
        url: 'https://kekshost.com/en/',
        updated: '2024-12-23',
        config: { udp: 19132, confirmed: false }
    },
    {
        name: 'Kinetic Hosting',
        url: 'https://kinetichosting.net/',
        updated: '2025-10-29',
        links: { article: 'https://www.kinetichosting.net/articles/minecraft-java/plugins/geyser' },
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'Lilypad',
        url: 'https://lilypad.gg',
        updated: '2026-07-10',
        links: { article: "https://lilypad.gg/bedrock", discord: "https://lilypad.gg/discord" },
        install: customInstallLocations.enable_bedrock_crossplay_option,
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'MC-HOST24.de',
        url: 'https://mc-host24.de/',
        updated: '2024-12-23',
        config: {
            udp: ports.newPort,
            confirmed: false,
            notes: [javaAddressInstruction]
        }
    },
    {
        name: 'MCPEhost.ru',
        url: 'https://mcpehost.ru',
        updated: '2025-10-29',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'MCServerHost',
        url: 'https://www.mcserverhost.com/',
        updated: '2026-09-25',
        links: {
            article: 'https://www.mcserverhost.com/community/tutorials/how-to-set-up-a-minecraft-java-and-bedrock-crossplay-server-with-mcserverhost',
            discord: 'https://discord.gg/mcserverhost'
        },
        install: translate({
            id: 'providers.provider.mcserverhost.install',
            message: "In the Software tab of the server panel, turn on 'Bedrock crossplay' and restart the server."
        }),
        config: { preconfigured: true, port: 19132, confirmed: false }
    },
    {
        name: 'Meloncube',
        url: 'https://www.meloncube.net/',
        updated: '2024-12-23',
        config: { udp: ports.askHost, confirmed: false }
    },
    {
        name: 'Minecraft-Hosting.pro',
        url: 'https://www.minecraft-hosting.pro/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Minefort',
        url: 'https://minefort.com/',
        updated: '2026-07-10',
        links: { support: 'https://minefort.com/support', discord: 'https://discord.minefort.com/' },
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        extra_step: translate({
            id: 'providers.provider.minefort.additional_step',
            message: "Go to the server dashboard under 'Connect Support', and enable the 'Allow Bedrock' option."
        }),
        connect: translate({
            id: 'providers.provider.minefort.connect_instructions',
            message: "Connect via `play.minefort.com` and join using `/server [servername]`, or connect directly via `[servername].minefort.com`."
        })
    },
    {
        name: 'Minehost',
        url: 'https://www.minehost.com/',
        updated: '2026-09-25',
        install: translate({
            id: 'providers.provider.minehost.install',
            message: "In the Software tab of the server panel, turn on 'Minecraft Bedrock support' and restart the server."
        }),
        config: { preconfigured: true, port: 19132, confirmed: false }
    },
    {
        name: 'Minehut',
        url: 'https://minehut.com/',
        updated: '2026-07-10',
        links: { discord: 'https://discord.gg/cCyEeUs' },
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: translate({
            id: 'providers.provider.minehut.connect_instructions',
            message: "Connect via `bedrock.minehut.com` and do `/join [servername]`, or connect directly via `[servername].bedrock.minehut.gg`."
        })
    },
    {
        name: 'MineStrator',
        url: 'https://minestrator.com/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Modrinth Hosting',
        url: 'https://modrinth.com/hosting',
        updated: '2026-03-07',
        links: { article: 'https://support.modrinth.com/en/articles/10986613-adding-geyser-to-your-server' },
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'MyArena',
        url: 'https://www.myarena.ru/',
        updated: '2024-03-03',
        config: { udp: 'java', confirmed: false },
        notices: {
            unsupported: translate({
                id: 'providers.provider.myarena.description',
                message: "Does seem to be working, but the Java version is too old in order for Geyser to run properly."
            })
        }
    },
    {
        name: 'NFOservers',
        url: 'https://nfoservers.com/',
        updated: '2025-11-17',
        config: {
            udp: 19132,
            confirmed: false,
            notes: [javaAddressInstruction]
        },
        notices: {
            info: translate({
                id: 'providers.provider.nfoservers.info',
                message: "You can also run Geyser-Standalone separately on an Unmanaged VDS."
            })
        }
    },
    {
        name: 'NiCraft',
        url: 'https://www.ni-host.com/',
        updated: '2025-10-29',
        config: { udp: 'java', confirmed: false },
        notices: {
            unsupported: translate({
                id: 'providers.provider.nicraft.description',
                message: "Nicraft does not provide Bedrock support, and is affected by a [firewall configuration issue](/wiki/geyser/port-forwarding/#ovh-and-soyoustart), which prohibits most players from joining."
            })
        }
    },
    {
        name: 'Nitrado',
        url: 'https://nitrado.net',
        updated: '2025-03-22',
        links: { article: 'https://wiki.nitrado.net/en/How_to_install_GeyserMC_and_Floodgate' },
        config: {
            udp: {
                obtain: translate({
                    id: 'providers.provider.nitrado.config.port',
                    message: "Add 4 to the port of the Java server."
                })
            },
            confirmed: false
        }
    },
    {
        name: 'Nodecraft',
        url: 'https://nodecraft.com',
        updated: '2025-10-29',
        config: { udp: 19132, confirmed: false }
    },
    {
        name: 'NolimitHost',
        url: 'https://nolimithost.cc',
        updated: '2026-07-09',
        links: { article: 'https://nolimithost.cc/docs/minecraft/geyser' },
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'OMGServ',
        url: 'https://www.omgserv.com/en/',
        updated: '2026-07-10',
        install: translate({
            id: 'providers.provider.omgserv.install',
            // TODO imgur? RIP the brits
            message: "Automatic Geyser install can be done in the [Install Menu](https://i.imgur.com/Gewpsrq.png). You can enable floodgate in the [server properties on the dashboard](https://i.imgur.com/jg5mzNj.png)."
        }),
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'PaperNodes',
        url: 'https://papernodes.com/',
        updated: '2024-12-23',
        config: {
            udp: ports.askHost,
            confirmed: false,
            notes: [otherInstructions.dedicatedIp]
        }
    },
    {
        name: 'Pebblehost',
        url: 'https://pebblehost.com/',
        updated: '2024-12-23',
        links: { article: 'https://youtu.be/v9lC80UBZF4' },
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Physgun',
        url: 'https://physgun.com/',
        updated: '2026-07-10',
        links: { discord: 'https://physgun.com/discord' },
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'PiglinHost',
        url: 'https://piglinhost.com/',
        updated: '2026-07-10',
        links: { support: 'https://billing.piglinhost.com/submitticket.php', discord: 'https://discord.gg/piglinhost' },
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost,
        notices: {
            info: translate({
                id: 'providers.provider.config.other',
                message: "If you did not order the server from the [cross-platform servers page](https://piglinhost.com/minecraft-java-hosting.html), contact the support for help with Geyser setup."
            })
        }
    },
    {
        name: 'PlanetNode',
        url: 'https://planetnode.net',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Play Hosting',
        url: 'https://play.hosting',
        updated: '2026-07-10',
        links: {
            article: 'https://help.play.hosting/minecraft/crossplay',
            discord: 'https://discord.com/invite/PmXc62p4PN'
        },
        install: customInstallLocations.enable_bedrock_crossplay_option,
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'PUBCS',
        url: 'https://pubcs.com',
        updated: '2024-12-23',
        config: {
            udp: ports.askHost,
            confirmed: false,
            notes: [otherInstructions.dedicatedIp]
        }
    },
    {
        name: 'Pufferfish Host',
        url: 'https://pufferfish.host/',
        updated: '2026-07-10',
        links: {
            article: 'https://docs.pufferfish.host/plugins/how-to-allow-bedrock-and-java-crossplay/',
            discord: 'https://discord.gg/reZw4vQV9H'
        },
        install: infos.installed_by_default,
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'RackGenius',
        url: 'https://rackgenius.com/',
        updated: '2026-08-08',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Redline Hosting',
        url: 'https://redlinehosting.net/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Revivenode',
        url: 'https://revivenode.com/',
        updated: '2025-03-22',
        config: { udp: ports.assign, confirmed: false },
        notices: {
            warn: warnings.ovhFirewallMisconfiguration
        }
    },
    {
        name: 'ScalaCube',
        url: 'https://scalacube.com/',
        updated: '2024-12-23',
        config: {
            udp: ports.newPort,
            confirmed: false,
            notes: [javaAddressInstruction]
        }
    },
    {
        name: 'Server.pro',
        url: 'https://server.pro',
        updated: '2026-07-10',
        links: { support: 'https://server.pro/support', discord: 'https://server.pro/discord' },
        // PRO and VPS plans can open more ports in the Firewall tab; Free and Premium plans fall back to "Not listed"
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'ServerPrism',
        url: 'https://serverprism.com/',
        updated: '2026-07-10',
        links: {
            article: 'https://serverprism.com/docs/minecraft/crossplay-getting-started',
            support: 'https://serverprism.com/tickets/create',
            discord: 'https://serverprism.com/discord'
        },
        install: customInstallLocations.plugin_list,
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Shockbyte',
        url: 'https://shockbyte.com/',
        updated: '2024-12-23',
        links: {
            article: 'https://shockbyte.com/billing/knowledgebase/173/Introduction-to-GeyserMCorDragonProxy-How-GeyserMC-Works.html'
        },
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'SimpleGameHosting',
        url: 'https://simplegamehosting.com/',
        updated: '2026-07-09',
        links: { article: 'https://help.simplegamehosting.com/how-to-enable-crossplay-with-geyser-on-your-minecraft-server/' },
        config: { udp: ports.askHost, confirmed: false }
    },
    {
        name: 'Skynode.pro',
        url: 'https://skynode.pro/',
        updated: '2025-03-22',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'Sparked Host',
        url: 'https://sparkedhost.com',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'SRKHOST',
        url: 'https://www.srkhost.eu/',
        updated: '2025-03-22',
        install: translate({
            id: 'providers.provider.srkhost.install',
            message: "Enable Geyser on the version changer page. Geyser will run on the given port by the host."
        }),
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'STIPE',
        url: 'https://stipe.com.au/',
        updated: '2025-10-29',
        config: { udp: ports.newPort, confirmed: false },
        notices: { info: onlyServesRegion('Australia') }
    },
    {
        name: 'The Minecraft Hosting',
        url: 'https://theminecrafthosting.com/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'TNAHosting',
        url: 'https://tnahosting.net/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'UltraServers',
        url: 'https://ultraservers.com/',
        updated: '2026-07-10',
        links: {
            article: 'https://docs.ultraservers.com/minecraft/plugins-mods/crossplay-on-java-and-bedrock',
            support: 'https://ultraservers.com/contact',
            discord: 'https://discord.ultraservers.com/'
        },
        install: translate({
            id: 'providers.provider.ultraservers.install',
            message: "Select 'Paper + Geyser' in the Change version tab. On existing servers, install Geyser from the Plugins/Minecraft mods tab instead."
        }),
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'VemoxHost',
        url: 'https://vemoxhost.com/',
        updated: '2026-07-10',
        links: {
            article: 'https://vemoxhost.com/post/como-instalar-y-configurar-geysermc',
            discord: 'https://discord.com/invite/NWv4KyQDzg'
        },
        install: translate({
            id: 'providers.provider.vemox_hosting.description',
            message: "Full automatic installation. Open the panel options and select the option to enable GeyserMC."
        }),
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'VeryCoolHost',
        url: 'https://example.com/verycoolhost',
        updated: '2026-10-11',
        links: {
            article: 'https://example.com/verycoolhost/docs/geyser',
            support: 'https://example.com/verycoolhost/support',
            discord: 'https://discord.gg/verycoolhost'
        },
        // TODO placeholder host for previewing the hosting page, remove before release
        open_collaboration: {
            tier: 'silver',
            logo: '/img/hosts/verycoolhost.svg',
            description: "A very cool host. Geyser is available from the plugin installer."
        },
        config: { preconfigured: true, port: 19132 }
    },
    {
        name: 'VexyHost',
        url: 'https://vexyhost.com/',
        updated: '2024-12-23',
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'VoltHosting',
        url: 'https://www.volthosting.co.uk/',
        updated: '2025-10-29',
        links: { support: 'https://volthosting.co.uk/contact.html' },
        config: {
            udp: ports.askHost,
            confirmed: false,
            notes: [otherInstructions.dedicatedIp]
        }
    },
    {
        name: 'Vultam',
        url: 'https://vultam.net/',
        updated: '2025-11-17',
        links: { support: 'https://clients.vultam.net/submitticket.php?step=2&deptid=1' },
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'Wasabi Hosting',
        url: 'https://wasabihosting.com',
        updated: '2025-10-29',
        install: customInstallLocations.plugin_list,
        config: { udp: ports.newPort, confirmed: false }
    },
    {
        name: 'Wepwawet',
        url: "https://wepwawet.net/",
        updated: '2025-03-22',
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'WinterNode',
        url: 'https://winternode.com',
        updated: '2025-10-29',
        config: {
            udp: ports.askHost,
            confirmed: false,
            notes: [otherInstructions.dedicatedIp]
        }
    },
    {
        name: 'WiseHosting',
        url: 'https://wisehosting.com',
        updated: '2026-07-10',
        links: {
            article: 'https://wisehosting.com/help/how-to-install-geysermc-to-your-minecraft-server',
            support: 'https://wisehosting.com/billing/supporttickets.php',
            discord: 'https://discord.gg/9NSbNnTN3J'
        },
        install: translate({
            id: 'providers.provider.wisehosting.install',
            message: "Install the GeyserMC preset from the `Addons` tab in the Game Panel, then restart your server."
        }),
        config: { preconfigured: true, port: ports.fromHost, confirmed: false },
        connect: connectionTemplates.providedByHost
    },
    {
        name: 'WitherHosting',
        url: 'https://witherhosting.com/',
        updated: '2026-04-26',
        links: { article: 'https://my.witherhosting.com/kb/how-to-install-and-use-geysermc-java' },
        config: { udp: ports.assign, confirmed: false }
    },
    {
        name: 'ZapHosting',
        url: 'https://zap-hosting.com/en/',
        updated: '2026-07-10',
        links: { support: 'https://zap-hosting.com/en/customer/support/', discord: 'https://discord.gg/zaphosting' },
        install: customInstallLocations.plugin_list,
        config: { udp: ports.newPort, confirmed: false }
    }
]
