import Translate, { translate } from "@docusaurus/Translate"
import Link from '@docusaurus/Link';
import { InlineCode } from "./InlineCode";

const downloadsPage = <Translate id="mdx.setup.downloads_page">downloads page</Translate>;

export const MDXTranslatable = {
    setup: {
        host_provider: () => <Translate id="mdx.setup.host_provider">Host Provider</Translate>,
        self_host: () => <Translate id="mdx.setup.self_host">Self Host</Translate>,
        paper_spigot: () => <Translate id="mdx.setup.paper_spigot">Paper / Spigot</Translate>,
        modded_servers: () => <Translate id="mdx.setup.modded_servers">Modded Servers</Translate>,
        fabric: () => <Translate id="mdx.setup.fabric">Fabric</Translate>,
        neoforge: () => <Translate id="mdx.setup.neoforge">NeoForge</Translate>,
        proxy_servers: () => <Translate id="mdx.setup.proxy_servers">Proxy Servers</Translate>,
        viaproxy: () => <Translate id="mdx.setup.viaproxy">ViaProxy</Translate>,
        standalone: () => <Translate id="mdx.setup.standalone">Standalone</Translate>,

        checking_server_version: () => <Translate id="mdx.setup.checking_server_version">Checking your server version</Translate>,
        installing_geyser: () => <Translate id="mdx.setup.installing_geyser">Installing Geyser</Translate>,
        download_jar: ({ jarName }: { jarName: string }) => (
            <Translate id="mdx.setup.download_jar" values={{
                jarName: <InlineCode>{jarName}</InlineCode>,
                downloadsPage: <Link to='/download'>{downloadsPage}</Link>
            }}>
                {"Download {jarName} from the {downloadsPage}."}
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
        https_note: () => (
            <Translate id="mdx.setup.https_note" values={{ https: <Link to="/wiki/geyser/nethernet-https">HTTPS</Link> }}>
                {"Unless signaling runs over {https}, Minecraft asks players    whether they trust the server the first time they join."}
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
                {"A UDP port for NetherNet, other than {port}. This can be the Java server's port: the Java server only uses it over TCP, so Geyser can use it over UDP. Any other free UDP port works too."}
            </Translate>
        ),
        placeholder_second_free_port: () => (
            <Translate id="mdx.setup.placeholder_second_free_port" values={{ port: <InlineCode>port</InlineCode> }}>
                {"A free UDP port for NetherNet, other than {port}. Open it for UDP."}
            </Translate>
        ),
        placeholder_second_udp_port: () => (
            <Translate id="mdx.setup.placeholder_second_udp_port">
                A UDP port for NetherNet, other than the Java server's port. Ask your host for one if you only have the Java server's port.
            </Translate>
        ),
        raknet_on_port: () => (
            <Translate id="mdx.setup.raknet_on_port" values={{ port: <InlineCode>port</InlineCode> }}>
                {"RakNet uses {port} over UDP, so that port has to be open for UDP as well."}
            </Translate>
        ),

        summary_nethernet_reported: () => <Translate id="mdx.setup.summary.nethernet_reported_generic">Reported to work with NetherNet</Translate>,
        summary_supporter_configures: ({ name }: { name: string }) => (
            <Translate id="mdx.setup.summary.supporter_configures" values={{ name }}>{"{name} installs and configures Geyser for you, including NetherNet."}</Translate>
        ),
        summary_updated: ({ date }: { date: string }) => (
            <Translate id="mdx.setup.summary.updated" values={{ date }}>{"Instructions last updated on {date}"}</Translate>
        ),
        badge_gold: () => <Translate id="mdx.setup.badge.gold">Gold supporter</Translate>,
        badge_silver: () => <Translate id="mdx.setup.badge.silver">Silver supporter</Translate>,

        unconfirmed_title: () => <Translate id="mdx.setup.unconfirmed_title">Not checked for NetherNet yet</Translate>,
        warning_title: () => <Translate id="mdx.setup.warning_title">Warning</Translate>,
        unconfirmed: ({ name }: { name: string }) => (
            <Translate id="mdx.setup.unconfirmed_reach_out_update" values={{ name, discord: <Link to="https://discord.gg/geysermc">Discord</Link> }}>
                {"These instructions have not been checked for NetherNet yet. If Bedrock players can't join, reach out to {name} to get instructions on how to use Geyser, and let us know on {discord} so we can update this guide."}
            </Translate>
        ),
        try_not_listed: ({ link }: { link: string }) => (
            <Translate id="mdx.setup.try_not_listed" values={{ notListed: <a href={link}><Translate id="mdx.setup.try_not_listed.link">"Not listed" guide</Translate></a> }}>
                {"If these instructions don't work, you can follow the {notListed} instead."}
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
        hosting_provider_discord: () => <Translate id="mdx.setup.hosting_provider_discord_short">Discord</Translate>,
    }
}