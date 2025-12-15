import clsx from 'clsx';
import Layout from '@theme/Layout';
import Crossplatform0Img from '@site/static/img/site/crossplatform_0.png';
import Crossplatform1Img from '@site/static/img/site/crossplatform_1.png';
import Crossplatform2Img from '@site/static/img/site/crossplatform_2.png';
import Heading from '@theme/Heading';
import HeroImage from '@site/static/img/site/geyser.png';

import styles from './index.module.scss';
import Translate from '@docusaurus/Translate';
import { HomepageFeature } from '../components/HomepageFeature';

function HomepageHeader() {
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className={styles.heroContent}>
                <img src={HeroImage} alt="Geyser Logo" className={styles.heroImage} />
                <img src={HeroImage} alt="Geyser Logo" className={styles.heroImageBackgroundBlur} />
                <div className={styles.textSection}>
                    <Heading as="h1" className="hero__title">
                        <Translate id='pages.main.title'>Revolutionize Your Minecraft Server</Translate>
                    </Heading>
                    <p className="hero__subtitle">
                        <Translate id='pages.main.subtitle'>Enable clients from Minecraft Bedrock Edition to join your Minecraft Java server</Translate>
                    </p>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    return (
        <Layout
            title="Geyser"
            description="Enable clients from Minecraft Bedrock Edition to join your Minecraft Java server."
        >
            <HomepageHeader />
            
            <main>
                <div className={clsx(styles.features, "container")}>
                    <HomepageFeature
                        title="What is Geyser?"
                        image={Crossplatform2Img}
                    >
                        Geyser is a program that allows Minecraft: Bedrock Edition clients to join Minecraft: Java Edition servers, allowing for true crossplay between both editions of the game.
                        <br /><br />
                        The ultimate goal of this project is to allow Minecraft: Bedrock Edition users to join Minecraft: Java Edition servers as seamlessly as possible.
                    </HomepageFeature>

                    <HomepageFeature
                        title="How does it work?"
                        image={Crossplatform1Img}
                        flipped
                    >
                        Geyser acts as a translator which sits between the Bedrock client and the Java server. It takes data from the Bedrock client and translates it into a format the Java server understands and vice versa. Geyser works with any modern Minecraft version and can be installed either as a plugin or ran as a standalone program.
                    </HomepageFeature>

                    <HomepageFeature
                        title="Join from anywhere"
                        image={Crossplatform0Img}
                    >
                        Geyser can be joined from Bedrock clients on Windows 10/11, iOS, Android, and even consoles. Geyser works with a wide array of hosting providers, but can also be used as its own standalone proxy to join any Minecraft server!
                        <br /><br />
                        If you are a server owner, you can install our Floodgate plugin which allows Xbox Live authenticated Bedrock users to join without a Java Edition account!
                    </HomepageFeature>
                </div>
            </main>
        </Layout>
    );
}
