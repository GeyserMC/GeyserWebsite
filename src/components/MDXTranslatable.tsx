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
        velocity: () => <Translate id="mdx.setup.velocity">Velocity</Translate>,
        bungeecord: () => <Translate id="mdx.setup.bungeecord">BungeeCord</Translate>,
        viaproxy: () => <Translate id="mdx.setup.viaproxy">ViaProxy</Translate>,
        standalone: () => <Translate id="mdx.setup.standalone">Standalone</Translate>,

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
        fabric_dependency: () => (
            <Translate id="mdx.setup.fabric_dependency" values={{
                fabricApiLink: <Link to='https://modrinth.com/mod/fabric-api'>FabricAPI</Link>,
            }}>
                {"If it is not already installed, download  and install the {fabricApiLink} mod to the same folder."}
            </Translate>
        ),
        restart_server: () => <Translate id="mdx.setup.restart_server">Restart the server.</Translate>,

        geyser_config_changes: () => <Translate id="mdx.setup.geyser_config_changes">Geyser Config Changes</Translate>,
        open_config: ({ configLocation }: { configLocation: string }) => (
            <Translate id="mdx.setup.open_config" values={{ configLocation: <InlineCode>{configLocation}</InlineCode> }}>
                {"Open your Geyser config located at {configLocation} and make these changes:"}
            </Translate>
        ),
        change_address: ({ address }: { address: string }) => (
            <Translate id="mdx.setup.change_address" values={{ address: <InlineCode>{address}</InlineCode>, addressText: <InlineCode>address</InlineCode> }}>
                {"Change the {addressText} value to {address}."}
            </Translate>
        ),
        change_port: ({ port }: { port: string }) => (
            <Translate id="mdx.setup.change_port" values={{ port: <InlineCode>{port}</InlineCode>, portText: <InlineCode>port</InlineCode> }}>
                {"Change the {portText} value to {port}."}
            </Translate>
        ),
        change_clone_remote_port: ({ port }: { port: string }) => (
            <Translate id="mdx.setup.change_clone_remote_port" values={{ port: <InlineCode>{port}</InlineCode>, portText: <InlineCode>clone-remote-port</InlineCode> }}>
                {"Change the {portText} value to {port}."}
            </Translate>
        ),

        additional_steps: () => <Translate id="mdx.setup.additional_steps">Additional Steps</Translate>,
        connecting_on_bedrock: () => <Translate id="mdx.setup.connecting_on_bedrock">Connecting on Bedrock</Translate>,
        more_information: () => <Translate id="mdx.setup.more_information">More Information</Translate>,

        hosting_provider_article: () => <Translate id="mdx.setup.hosting_provider_article">Hosting provider article</Translate>,
        hosting_provider_support: () => <Translate id="mdx.setup.hosting_provider_support">Hosting provider support</Translate>,
    }
}