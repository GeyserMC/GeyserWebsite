import SoftwareFeature from '@site/src/components/SoftwareFeature';
import SoftwareHero from '@site/src/components/SoftwareHero';
import Crossplatform0Img from '@site/static/img/site/crossplatform_0.png';
import Crossplatform1Img from '@site/static/img/site/crossplatform_1.png';
import Crossplatform2Img from '@site/static/img/site/crossplatform_2.png';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from "./software.module.css";
import SoftwareStats from '@site/src/components/SoftwareStats';

const GeyserSoftwarePage: React.FC = () => {
    return (
        <>
            <SoftwareHero
                icon="/img/icons/geyser.png"
                software="Geyser"
                tagline="Revolutionize your Minecraft server"
                description="Geyser is a software that enables players from Minecraft Bedrock Edition to join Java Edition servers."
                downloadsUrl='/download'
                docsUrl="/wiki/geyser"
            />

            <SoftwareStats 
                githubStars="5.4k"
                githubCommits="4.5k"
                bstatsPlayers="19k+"
                bstatsServers="50k"
            />

            <div className={clsx(styles.featureSection, "container")}>
                <SoftwareFeature
                    title="What is Geyser?"
                    image={Crossplatform2Img}
                >
                    Geyser is a program that allows Minecraft: Bedrock Edition clients to join Minecraft: Java Edition servers, allowing for true crossplay between both editions of the game.
                    <br /><br />
                    The ultimate goal of this project is to allow Minecraft: Bedrock Edition users to join Minecraft: Java Edition servers as seamlessly as possible.
                </SoftwareFeature>

                <SoftwareFeature
                    title="How does it work?"
                    image={Crossplatform1Img}
                    flipped
                >
                    Geyser acts as a translator which sits between the Bedrock client and the Java server. It takes data from the Bedrock client and translates it into a format the Java server understands and vice versa. Geyser works with any modern Minecraft version and can be installed either as a plugin or ran as a standalone program.
                </SoftwareFeature>

                <SoftwareFeature
                    title="Join from anywhere"
                    image={Crossplatform0Img}
                >
                    Geyser can be joined from Bedrock clients on Windows 10/11, iOS, Android, and even consoles. Geyser works with a wide array of hosting providers, but can also be used as its own standalone proxy to join any Minecraft server!
                    <br /><br />
                    If you are a server owner, you can install our Floodgate plugin which allows Xbox Live authenticated Bedrock users to join without a Java Edition account!
                </SoftwareFeature>
            </div>
        </>
    )
}

export default function GeyserSoftware(): JSX.Element {
    return (
        <Layout
            title={`Geyser`}
            description='A bridge/proxy allowing you to connect to Minecraft: Java Edition servers with Minecraft: Bedrock Edition.'
        >
            <main>
                <div className='container container--fluid margin-vert--lg'>
                    <GeyserSoftwarePage />
                </div>
            </main>
        </Layout>
    )
}