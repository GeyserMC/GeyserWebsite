import React from 'react';
import Translate, { translate } from "@docusaurus/Translate"
import Link from '@docusaurus/Link';
import { InlineCode } from "./InlineCode";
import { Versions } from "./Versions";

const supportedVersions = <Translate id="mdx.setup.supported_versions">Supported versions</Translate>;
const code = (text: string) => <InlineCode>{text}</InlineCode>;
const bold = (node: React.ReactNode) => <strong>{node}</strong>;

export const MDXTranslatable = {
    setup: {
        host_provider: () => <Translate id="mdx.setup.host_provider">Host Provider</Translate>,
        self_host: () => <Translate id="mdx.setup.self_host">Self Host</Translate>,
        paper_spigot: () => <>Paper / Spigot</>,
        modded_servers: () => <Translate id="mdx.setup.modded_servers">Modded Servers</Translate>,
        fabric: () => <>Fabric</>,
        neoforge: () => <>NeoForge</>,
        proxy_servers: () => <Translate id="mdx.setup.proxy_servers">Proxy Servers</Translate>,
        velocity: () => <>Velocity</>,
        bungeecord: () => <>BungeeCord</>,
        viaproxy: () => <>ViaProxy</>,
        standalone: () => <Translate id="mdx.setup.standalone">Standalone</Translate>,

        checking_server_version: () => <Translate id="mdx.setup.checking_server_version">Checking your server version</Translate>,
        installing_geyser: () => <Translate id="mdx.setup.installing_geyser">Installing Geyser</Translate>,
        download_jar: ({ jarName }: { jarName: string }) => (
            <Translate id="mdx.setup.download_jar" values={{
                jarName: <Link to='/download'><InlineCode>{jarName}</InlineCode></Link>
            }}>
                {"Download {jarName}."}
            </Translate>
        ),
        place_jar: ({ jarName, jarDirectory }: { jarName: string, jarDirectory: string }) => (
            <Translate id="mdx.setup.place_jar" values={{
                jarName: <InlineCode>{jarName}</InlineCode>,
                jarDirectory: <InlineCode>{jarDirectory}</InlineCode>
            }}>
                {"Place the {jarName} in the {jarDirectory} folder."}
            </Translate>
        ),
        restart_server: () => <Translate id="mdx.setup.restart_server">Restart the server.</Translate>,
        restart_geyser: () => <Translate id="mdx.setup.restart_geyser">Restart Geyser.</Translate>,
        restart_velocity: () => <Translate id="mdx.setup.restart_velocity">Restart Velocity.</Translate>,
        restart_bungeecord: () => <Translate id="mdx.setup.restart_bungeecord">Restart BungeeCord.</Translate>,
        restart_viaproxy: () => <Translate id="mdx.setup.restart_viaproxy">Restart ViaProxy.</Translate>,
        fabric_dependency: () => (
            <Translate id="mdx.setup.fabric_dependency" values={{ fabricApi: <Link to='https://modrinth.com/mod/fabric-api'>Fabric API</Link> }}>
                {"If it is not installed already, download {fabricApi} and place it in the same folder."}
            </Translate>
        ),

        // Platform notices and version checks
        version_step_viaversion: () => (
            <Translate id="mdx.setup.version_step_viaversion" values={{
                version: Versions.java(),
                viaVersion: <Link to='https://viaversion.com/viaversion'>ViaVersion</Link>,
                supportedVersions: <Link to='/wiki/geyser/supported-versions/'>{supportedVersions}</Link>
            }}>
                {"If your server is not running {version}, you will need to install {viaVersion}. For more information, see {supportedVersions}."}
            </Translate>
        ),
        version_step_proxy: () => (
            <Translate id="mdx.setup.version_step_proxy" values={{ version: Versions.java() }}>
                {"All servers on the network must accept {version} Java clients, as Geyser imitates one."}
            </Translate>
        ),
        proxy_install_only: ({ proxy }: { proxy: string }) => (
            <Translate id="mdx.setup.proxy_install_only" values={{ proxy }}>
                {"Install Geyser only on the {proxy} server! You can install Floodgate on all servers for better skin support and network-wide Floodgate API availability for other plugins."}
            </Translate>
        ),
        modded_requirements: ({ jarName }: { jarName: string }) => (
            <Translate id="mdx.setup.modded_requirements" values={{
                jarName,
                version: Versions.java(),
                supportedVersions: <Link to='/wiki/geyser/supported-versions#using-geyser-on-fabric-neoforge-servers-not-on-the-latest-minecraft-version'>{supportedVersions}</Link>
            }}>
                {"{jarName} runs only on a {version} server, and only works alongside server-side mods. Mods that players also need to install on their client will not work. See {supportedVersions} for more details."}
            </Translate>
        ),

        // Self-hosted guides
        self_port_choice: ({ platform }: { platform: string }) => (
            <Translate id="mdx.setup.self_port_choice" values={{ platform }}>
                {"Since you are self-hosting, you can choose the port freely; the default is 19132. Geyser uses it over both TCP and UDP, so it cannot be the port of the {platform} server."}
            </Translate>
        ),
        self_port_choice_standalone: () => (
            <Translate id="mdx.setup.self_port_choice_standalone">
                Since you are self-hosting, you can choose the port freely; the default is 19132. Geyser uses it over both TCP and UDP.
            </Translate>
        ),
        self_port_sharing: () => (
            <Translate id="mdx.setup.self_port_sharing" values={{ important: bold(<Translate id="mdx.setup.self_port_sharing.important">Important</Translate>) }}>
                {"{important}: No other program can use the Geyser port, over either protocol. This includes programs that use UDP, such as voice chat mods or Query, and programs that use TCP, such as another server, a web map, or a website."}
            </Translate>
        ),
        connect_local_title: () => <Translate id="mdx.setup.connect_local_title">Connecting from the same network</Translate>,
        connect_local: () => (
            <Translate id="mdx.setup.connect_local" values={{ localhost: code('localhost'), loopback: code('127.0.0.1'), ten: code('10.'), oneNineTwo: code('192.168.') }}>
                {"On the same device as the server, connect with {localhost} or {loopback} as the address. Other devices in the same local network can use your local IPv4 address, which starts with {ten} or {oneNineTwo}."}
            </Translate>
        ),
        connect_lan: () => (
            <Translate id="mdx.setup.connect_lan" values={{ friends: bold(<Translate id="mdx.setup.connect_lan.friends">Friends</Translate>) }}>
                {"Alternatively, open Minecraft: Bedrock Edition and join the LAN server in the {friends} tab."}
            </Translate>
        ),
        connect_remote_title: () => <Translate id="mdx.setup.connect_remote_title">Connecting from a different network</Translate>,
        connect_remote: () => (
            <Translate id="mdx.setup.connect_remote">
                To let players from outside your network join, you need to make the Geyser port reachable from the internet.
            </Translate>
        ),
        connect_tcp_udp: () => (
            <Translate id="mdx.setup.connect_tcp_udp" values={{
                webrtcPort: code('webrtc-port')
            }}>
                {"The Geyser port has to be forwarded for both TCP and UDP. Before NetherNet, forwarding UDP was enough. Now, players use TCP to find your server and UDP to play on it, so without TCP your server will not show up. If you use the \"NetherNet and RakNet\" option, also forward the {webrtcPort} for UDP."}
            </Translate>
        ),
        connect_options: () => <Translate id="mdx.setup.connect_options">You have two options:</Translate>,
        connect_port_forwarding: () => (
            <Translate id="mdx.setup.connect_port_forwarding" values={{
                portForwarding: bold(<Translate id="mdx.setup.connect_port_forwarding.title">Port forwarding</Translate>),
                guide: <Link to='/wiki/geyser/port-forwarding'><Translate id="mdx.setup.connect_port_forwarding.guide">Port forwarding</Translate></Link>
            }}>
                {"{portForwarding}: open the Geyser port (e.g. 19132) for both TCP and UDP in your router and in your firewall. Players then connect with your public IPv4 address and the port. For detailed steps, see {guide}."}
            </Translate>
        ),
        connect_playit: () => (
            <Translate id="mdx.setup.connect_playit" values={{
                playit: bold('playit.gg'),
                guide: <Link to='/wiki/geyser/playit-gg'><Translate id="mdx.setup.connect_playit.guide">playit.gg Setup</Translate></Link>,
                status: <Link to='https://status.playit.gg/3/adding-nethernet-support'><Translate id="mdx.setup.connect_playit.status">NetherNet support on playit.gg</Translate></Link>
            }}>
                {"{playit}: if you cannot open a port, or do not want to expose your home IP address, playit.gg can create a tunnel for you. See {guide}. That guide was written for RakNet. For NetherNet, see {status}. Ngrok does not work, since it does not support UDP."}
            </Translate>
        ),
        https_step_title: () => <Translate id="mdx.setup.https_step_title">Recommended: Set up HTTPS for signaling</Translate>,
        https_step: () => (
            <Translate id="mdx.setup.https_step" values={{
                httpsGuide: <Link to='/wiki/geyser/nethernet-https'><Translate id="mdx.setup.https_step.guide">HTTPS for NetherNet</Translate></Link>,
                warden: <Link to='https://warden.cloud'>Warden</Link>
            }}>
                {"Geyser's built-in signaling server uses plain HTTP by default, so Minecraft shows players a \"Trust on First Use?\" prompt the first time they join. To avoid this prompt, serve signaling over HTTPS, as explained in {httpsGuide}. Some external signaling services, such as {warden}, provide HTTPS as well."}
            </Translate>
        ),
        floodgate_info: () => (
            <Translate id="mdx.setup.floodgate_info" values={{ floodgate: <Link to='/wiki/floodgate/setup/'>Floodgate</Link> }}>
                {"To allow Bedrock Edition players to join your server without a paid Java Edition account, you can use {floodgate}."}
            </Translate>
        ),

        // ViaProxy
        viaproxy_not_plugin_title: () => <Translate id="mdx.setup.viaproxy_not_plugin.title">ViaProxy is not a plugin or mod</Translate>,
        viaproxy_not_plugin: () => (
            <Translate id="mdx.setup.viaproxy_not_plugin" values={{
                plugins: code('plugins'), mods: code('mods')
            }}>
                {"ViaProxy is a standalone program that runs separately from your Minecraft server. Do not put the ViaProxy jar into your server's {plugins} or {mods} folder. To run Geyser as a plugin or mod on your server instead, pick your server software in the tabs above."}
            </Translate>
        ),
        viaproxy_setup: () => (
            <Translate id="mdx.setup.viaproxy_setup" values={{ viaProxy: <Link to='https://viaversion.com/viaproxy?tab=readme-ov-file#usage-for-players-gui'>ViaProxy</Link> }}>
                {"Set up {viaProxy}."}
            </Translate>
        ),
        viaproxy_accounts: () => (
            <Translate id="mdx.setup.viaproxy_accounts" values={{ floodgate: <Link to='/wiki/floodgate/setup'>Floodgate</Link> }}>
                {"If you use the ViaProxy GUI, you can use its account management to join online mode servers with Bedrock Edition. If you use the ViaProxy CLI and want Bedrock players to join your online mode server, install and set up {floodgate}."}
            </Translate>
        ),
        viaproxy_auth_type: () => (
            <Translate id="mdx.setup.viaproxy_auth_type" values={{ authType: code('auth-type') }}>
                {"ViaProxy manages the {authType} setting itself, so its value in the config is ignored."}
            </Translate>
        ),

        // Geyser Standalone
        standalone_java: () => (
            <Translate id="mdx.setup.standalone_java">
                You need Java 21 or newer to run Geyser. To run Geyser Standalone on Android, see the end of this page.
            </Translate>
        ),
        standalone_not_plugin: () => (
            <Translate id="mdx.setup.standalone_not_plugin">
                Geyser Standalone is not a plugin or mod. It is a separate Java program that runs alongside your Java Edition server.
            </Translate>
        ),
        standalone_download: () => (
            <Translate id="mdx.setup.standalone_download" values={{ standalone: <Link to='/download'>Geyser Standalone</Link> }}>
                {"Download {standalone}."}
            </Translate>
        ),
        standalone_folder: () => <Translate id="mdx.setup.standalone_folder">Create a new folder for Geyser, and put the jar in it.</Translate>,
        standalone_start: () => <Translate id="mdx.setup.standalone_start">Start Geyser Standalone:</Translate>,
        standalone_gui: () => (
            <Translate id="mdx.setup.standalone_gui" values={{ gui: bold('GUI') }}>
                {"{gui} (recommended): double-click the jar file. Geyser creates all the files it needs."}
            </Translate>
        ),
        standalone_console: () => (
            <Translate id="mdx.setup.standalone_console" values={{
                console: bold(<Translate id="mdx.setup.standalone_console.console">Console</Translate>),
                startupScript: <Link to='/wiki/geyser/creating-a-startup-script/'><Translate id="mdx.setup.standalone_console.startup_script">Creating a Startup Script</Translate></Link>
            }}>
                {"{console}: create a startup script, like the one you would use for a Paper server. See {startupScript} for what to put into it. Run it, and Geyser creates all the files it needs."}
            </Translate>
        ),
        standalone_remote_intro: () => (
            <Translate id="mdx.setup.standalone_remote_intro" values={{ java: code('java') }}>
                {"To choose which Java Edition server Geyser Standalone sends players to, find the {java} section:"}
            </Translate>
        ),
        standalone_remote: () => (
            <Translate id="mdx.setup.standalone_remote" values={{
                address: code('address'), port: code('port'), authType: code('auth-type'),
                floodgate: code('floodgate'), online: code('online'), offline: code('offline'),
                floodgateSetup: <Link to='/wiki/floodgate/setup'><Translate id="mdx.setup.standalone_remote.floodgate_setup">Floodgate Setup</Translate></Link>
            }}>
                {"Change {address} to the Java server's address, or leave it as it is if the server runs on the same machine as Geyser. Then change {port} to the Java server's port. Set {authType} to {floodgate} if you set up Floodgate on the Java server, otherwise to {online} for an online mode server or {offline} for an offline mode server. To use Floodgate with Geyser Standalone, see {floodgateSetup}."}
            </Translate>
        ),
        standalone_android_title: () => <Translate id="mdx.setup.standalone_android_title">Running Geyser Standalone on Android</Translate>,
        standalone_android_caution: () => (
            <Translate id="mdx.setup.standalone_android_caution">
                Apps such as Termux can run Geyser on Android, but how well this works depends on how powerful your device is. Do so at your own risk.
            </Translate>
        ),
        standalone_termux_install: () => (
            <Translate id="mdx.setup.standalone_termux_install" values={{ termux: <Link to='https://termux.com/'>Termux</Link> }}>
                {"Download and install {termux}."}
            </Translate>
        ),
        run_command: ({ command }: { command: string }) => (
            <Translate id="mdx.setup.run_command" values={{ command: code(command) }}>{"Run {command}."}</Translate>
        ),
        standalone_termux_script: () => (
            <Translate id="mdx.setup.standalone_termux_script">
                Alternatively, there is an automated setup script for clean Termux installs. It might not work for everyone, so try it if the steps above do not work:
            </Translate>
        ),
        https_note: () => (
            <Translate id="mdx.setup.https_note" values={{ https: <Link to="/wiki/geyser/nethernet-https">HTTPS</Link> }}>
                {"Unless signaling runs over {https}, Minecraft asks players whether they trust the server the first time they join."}
            </Translate>
        ),

        configuring_geyser: () => <Translate id="mdx.setup.configuring_geyser">Configuring Geyser</Translate>,
        open_config_match: ({ configLocation }: { configLocation: string }) => (
            <Translate id="mdx.setup.open_config_simple" values={{ configLocation: <InlineCode>{configLocation}</InlineCode>, bedrock: <InlineCode>bedrock:</InlineCode> }}>
                {"Now open the file {configLocation}. Find the part that starts with {bedrock}, and change the lines shown below."}
            </Translate>
        ),
        preconfigured: ({ name }: { name: string }) => (
            <Translate id="mdx.setup.preconfigured" values={{ name }}>
                {"No changes needed. {name} automatically configures Geyser."}
            </Translate>
        ),
        transport_nethernet_explainer: () => (
            <Translate id="mdx.setup.transport_nethernet_simple">
                NetherNet is supported fully by 26.50+. If you'd like to also have working MOTD and player count for older versions, you will need to set up both NetherNet and Raknet.
            </Translate>
        ),
        transport_both_explainer: () => (
            <Translate id="mdx.setup.transport_both_compat">
                Also accepts RakNet, for additional compatibility: some Bedrock versions, such as 26.40, fetch the server's MOTD and player count over RakNet. This option needs a separate UDP port for NetherNet.
            </Translate>
        ),
        placeholder: () => <Translate id="mdx.setup.placeholder_word">Replace this</Translate>,
        replace_with: () => <Translate id="mdx.setup.replace_with_simple">With this</Translate>,
        placeholder_java_port: () => <Translate id="mdx.setup.placeholder_java_port">The port of the Java server.</Translate>,
        placeholder_java_port_udp: () => (
            <Translate id="mdx.setup.placeholder_java_port_udp" values={{ port: <InlineCode>port</InlineCode> }}>
                {"A UDP port for NetherNet, other than {port}. This can be the Java server's port: the Java server only uses it over TCP, so Geyser can use it over UDP. Any other available UDP port works too."}
            </Translate>
        ),
        placeholder_second_available_port: () => (
            <Translate id="mdx.setup.placeholder_second_available_port" values={{ port: <InlineCode>port</InlineCode> }}>
                {"An available UDP port for NetherNet, other than {port}. Open it for UDP."}
            </Translate>
        ),
        raknet_on_port: () => (
            <Translate id="mdx.setup.raknet_on_port" values={{ port: <InlineCode>port</InlineCode> }}>
                {"RakNet uses {port} over UDP, so that port has to be open for UDP as well."}
            </Translate>
        ),

        summary_nethernet_reported: () => <Translate id="mdx.setup.summary.nethernet_reported_generic">Reported to work with NetherNet</Translate>,
        summary_supporter_configures: ({ name }: { name: string }) => (
            <Translate id="mdx.setup.summary.supporter_configures" values={{ name }}>{"{name} configures Geyser for you automatically, including NetherNet."}</Translate>
        ),
        summary_updated: ({ date }: { date: string }) => (
            <Translate id="mdx.setup.summary.updated" values={{ date }}>{"Instructions last updated on {date}"}</Translate>
        ),
        badge_gold: () => <Translate id="mdx.setup.badge.gold">Gold supporter</Translate>,
        badge_silver: () => <Translate id="mdx.setup.badge.silver">Silver supporter</Translate>,
        badge_bronze: () => <Translate id="mdx.setup.badge.bronze">Bronze supporter</Translate>,

        unconfirmed_title: () => <Translate id="mdx.setup.unconfirmed_title">Not checked for NetherNet yet</Translate>,
        warning_title: () => <Translate id="mdx.setup.warning_title">Warning</Translate>,
        unconfirmed: ({ name }: { name: string }) => (
            <Translate id="mdx.setup.unconfirmed_reach_out_update" values={{ name, discord: <Link to="https://discord.gg/geysermc">Discord</Link> }}>
                {"These instructions have not been checked for NetherNet yet. If Bedrock players can't join, reach out to {name} to get instructions on how to use Geyser, and let us know on {discord} so we can update this guide."}
            </Translate>
        ),
        try_not_listed: ({ link }: { link: string }) => (
            <Translate id="mdx.setup.try_not_listed" values={{
                notListed: <a href={link}><Translate id="mdx.setup.try_not_listed.link">"Not listed" guide for using only the Java server's port</Translate></a>,
                warden: <Link to="https://warden.cloud">Warden</Link>
            }}>
                {"If your host cannot give you a separate port, follow the {notListed} instead. Players then join through {warden}, an external signaling service."}
            </Translate>
        ),
        no_signaling: ({ name }: { name: string }) => (
            <Translate id="mdx.setup.no_signaling" values={{ name }}>
                {"{name} supports neither built-in nor external signaling, so Bedrock players cannot connect over NetherNet."}
            </Translate>
        ),

        additional_steps: () => <Translate id="mdx.setup.additional_steps">Additional Steps</Translate>,
        connecting_on_bedrock: () => <Translate id="mdx.setup.connecting_on_bedrock">Connecting on Bedrock</Translate>,

        hosting_provider_article: () => <Translate id="mdx.setup.hosting_provider_article_short">Host's Geyser guide</Translate>,
        hosting_provider_website: () => <Translate id="mdx.setup.hosting_provider_website_short">Website</Translate>,
        hosting_provider_support: () => <Translate id="mdx.setup.hosting_provider_support_short">Support</Translate>,
        hosting_provider_discord: () => <>Discord</>,
    }
}