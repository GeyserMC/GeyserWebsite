import SoftwareFeature from '@site/src/components/SoftwareFeature';
import SoftwareHero from '@site/src/components/SoftwareHero';
import Crossplatform0Img from '@site/static/img/site/crossplatform_0.png';
import Crossplatform1Img from '@site/static/img/site/crossplatform_1.png';
import Crossplatform2Img from '@site/static/img/site/crossplatform_2.png';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from "./software.module.css";
import SoftwareStats from '@site/src/components/SoftwareStats';

const FloodgateSoftwarePage: React.FC = () => {
    return (
        <>
            <SoftwareHero
                software="Floodgate"
                description="Floodgate is a hybrid mode plugin to allow for connections from Geyser to join online mode servers."
                downloadsUrl='/download'
                docsUrl="/wiki/floodgate"
            />

            <SoftwareStats
                githubStars="600+"
                githubCommits="400+"
                bstatsPlayers="19k+"
                bstatsServers="53k"
            />

            <div className={clsx(styles.featureSection, "container")}>
                <SoftwareFeature
                    title="What is Floodgate?"
                    image={Crossplatform2Img}
                >
                    <p>Floodgate is a server plugin that introduces features such as:</p>
                    <ul>
                        <li>Ability for clients to join Minecraft: Java Edition servers with Minecraft: Bedrock accounts without needing a paid Minecraft: Java Edition account.</li>
                        <li>Ability to see Bedrock player skins on Java edition</li>
                        <li>Ability for plugins to send bedrock forms</li>
                        <li>Allows Bedrock players to link to a Java account</li>
                    </ul>
                    <div>...and more! See the docs for full list.</div>
                </SoftwareFeature>

                <SoftwareFeature
                    title="How does it work?"
                    image={Crossplatform1Img}
                    flipped
                >
                    Floodgate sits on the server and enables additional features that are not otherwise possible. TODO
                </SoftwareFeature>

                <SoftwareFeature
                    title="Global linking"
                    image={Crossplatform0Img}
                >
                    Global Linking is a central place for servers to see if a Bedrock player has a Java Edition account linked.
                    <br/><br/>
                    TODO
                </SoftwareFeature>
            </div>
        </>
    )
}

export default function FloodgateSoftware(): JSX.Element {
    return (
        <Layout
            title={`Floodgate`}
            description='Hybrid mode plugin to allow for connections from Geyser to join online mode servers.'
        >
            <main>
                <div className='container container--fluid margin-vert--lg'>
                    <FloodgateSoftwarePage />
                </div>
            </main>
        </Layout>
    )
}