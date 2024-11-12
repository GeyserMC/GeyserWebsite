import React from 'react';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { faTowerCell, faFileZipper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import PaperSpigotIcon from '@site/static/img/icons/paper.png';
import VelocityIcon from '@site/static/img/icons/velocity.png';
import WaterfallBungeeCordIcon from '@site/static/img/icons/waterfall.svg';
import FabricIcon from '@site/static/img/icons/fabric.png';
import NeoForgeIcon from '@site/static/img/icons/neoforge.png';
import ViaProxyIcon from '@site/static/img/icons/viaproxy.png';
import StandaloneIcon from '@site/static/img/icons/geyser.png';
import PlatformIcon from '@site/src/components/PlatformIcon';
import { ProjectDownload } from '@site/src/components/ProjectDownload';
import { Collapsibles, Collapsible } from '@site/src/components/Collapsibles';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';

const DownloadPage: React.FC = () => (
    <>
        <HeroBanner
            title={<Translate id='pages.download.title'>Download</Translate>}
            subheading={<Translate id='pages.download.subheading'>Download the latest versions of our various projects.</Translate>}
            backgroundImage={HeroBackground}
        />

        <Tabs queryString="project">
            <TabItem value="geyser" label="Geyser" default>
                <ProjectDownload
                    projectId="geyser"
                    description={<Translate id='pages.download.description.geyser'>A bridge/proxy allowing you to connect to Minecraft: Java Edition servers with Minecraft: Bedrock Edition.</Translate>}
                    setup="/wiki/geyser/setup"
                    downloadsInfo={{
                        bungeecord: <PlatformIcon svg={WaterfallBungeeCordIcon} text="BungeeCord" />,
                        fabric: <PlatformIcon img={FabricIcon} text="Fabric" />,
                        neoforge: <PlatformIcon img={NeoForgeIcon} text="NeoForge" />,
                        spigot: <PlatformIcon img={PaperSpigotIcon} text="Spigot/Paper" />,
                        standalone: <PlatformIcon img={StandaloneIcon} text="Standalone" />,
                        velocity: <PlatformIcon img={VelocityIcon} text="Velocity" />,
                        viaproxy: <PlatformIcon img={ViaProxyIcon} text="ViaProxy" />,
                    }}
                />
            </TabItem>
            <TabItem value="floodgate" label="Floodgate">
                <ProjectDownload
                    projectId="floodgate"
                    description={<Translate id='pages.download.description.floodgate'>Hybrid mode plugin to allow for connections from Geyser to join online mode servers.</Translate>}
                    setup="/wiki/floodgate/setup"
                    downloadsInfo={{
                        bungee: <PlatformIcon svg={WaterfallBungeeCordIcon} text="BungeeCord" />,
                        spigot: <PlatformIcon img={PaperSpigotIcon} text="Spigot/Paper" />,
                        velocity: <PlatformIcon img={VelocityIcon} text="Velocity" />,
                        fabric: <PlatformIcon img={FabricIcon} text="Fabric" />,
                        neoforge: <PlatformIcon img={NeoForgeIcon} text="NeoForge" />
                    }}
                    additionalDownloads={{
                        fabric: {
                            url: "https://modrinth.com/mod/floodgate",
                            file: "floodgate-fabric.jar"
                        },
                        neoforge: {
                            url: "https://modrinth.com/mod/floodgate",
                            file: "floodgate-neoforge.jar"
                        }
                    }}
                />
            </TabItem>
            <TabItem value="other-projects" label="Other Projects">
                <Collapsibles>
                    <Collapsible
                        title='GeyserOptionalPack'
                        subtitle={<Translate id='pages.download.description.geyseroptionalpack'>An optional Bedrock resource pack to extend Geyser functionality.</Translate>}
                        id='geyseroptionalpack'
                        inner={
                            <ProjectDownload
                                projectId="geyseroptionalpack"
                                setup='/wiki/other/geyseroptionalpack'
                                downloadsInfo={{
                                    geyseroptionalpack: <><FontAwesomeIcon icon={faFileZipper} /> GeyserOptionalPack</>,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
                    <Collapsible
                        title='ThirdPartyCosmetics'
                        subtitle={<Translate id='pages.download.description.thirdpartycosmetics'>An extension that adds support for loading ears and other third party cosmetics on java players</Translate>}
                        id='thirdpartycosmetics'
                        inner={
                            <ProjectDownload
                                projectId="thirdpartycosmetics"
                                setup='/wiki/other/thirdpartycosmetics'
                                downloadsInfo={{
                                    thirdpartycosmetics: <><FontAwesomeIcon icon={faFileZipper} /> ThirdPartyCosmetics</>,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
                    <Collapsible
                        title='Hurricane'
                        subtitle={<Translate id='pages.download.description.hurricane'>A plugin with various workarounds for Geyser players that modify the server in order to achieve their goal.</Translate>}
                        id='hurricane'
                        inner={
                            <ProjectDownload
                                projectId="hurricane"
                                setup='/wiki/other/hurricane'
                                downloadsInfo={{
                                    spigot: <PlatformIcon img={PaperSpigotIcon} text="Spigot/Paper" />,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
                    <Collapsible
                        title='GeyserConnect'
                        subtitle={<Translate id='pages.download.description.geyserconnect'>A Geyser extension allowing players to connect to different Java or Geyser servers.</Translate>}
                        id='geyserconnect'
                        inner={
                            <ProjectDownload
                                projectId="geyserconnect"
                                setup='/wiki/other/geyserconnect'
                                downloadsInfo={{
                                    geyserconnect: <><FontAwesomeIcon icon={faTowerCell} /> GeyserConnect</>,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
{/*                     <Collapsible
                        title='Hydraulic'
                        subtitle={<Translate id='pages.download.description.hydraulic'>A companion mod to Geyser which allows for Bedrock players to join modded Minecraft: Java Edition servers.</Translate>}
                        id='hydraulic'
                        tags={['Beta']}
                        inner={
                            <ProjectDownload
                                projectId="hydraulic"
                                setup='/wiki/other/hydraulic'
                                downloadsInfo={{
                                    fabric: <PlatformIcon img={FabricIcon} text="Fabric" />,
                                    neoforge: <PlatformIcon img={NeoForgeIcon} text="NeoForge" />,
                                }}
                                gridColumns={1}
                            />
                        }
                    /> */}
                </Collapsibles>
            </TabItem>
        </Tabs>
    </>
);

export default function Download(): JSX.Element {
    return (
        <Layout
            title={`Download`}
            description="Download the latest versions of our various projects."
        >
            <main>
                <div className="container container--fluid margin-vert--lg">
                    <DownloadPage />
                </div>
            </main>
        </Layout>
    )
}

