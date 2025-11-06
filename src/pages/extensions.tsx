import React from 'react';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import Layout from '@theme/Layout';
import Admonition from '@theme/Admonition';
import Translate from '@docusaurus/Translate';
import extensionsData from '@site/src/data/extensions.json';

type Extension = {
    name: string;
    description: string;
    author: string;
    official: boolean;
    url: string;
};

const extensions: Extension[] = extensionsData as Extension[];

const ExtensionsPage: React.FC = () => (
    <>
        <HeroBanner
            title={<Translate id='pages.extensions.title'>Extensions</Translate>}
            subheading={<Translate id='pages.extensions.subheading'>A list of known Geyser extensions.</Translate>}
            backgroundImage={HeroBackground}
        />

        <Admonition type="warning" className="mt-20">
            Some of these extensions are not maintained by the GeyserMC team and as such should be used with caution. Extensions marked "Official Extension" are maintained by at least one member of the core GeyserMC team.
        </Admonition>

        <div className="mt-20">
            {extensions.map((extension) => (
                <a key={extension.name} href={extension.url} className="extension-button">
                    <div className="extension-button-header">
                        <span className="extension-name">{extension.name}</span>
                        <span className="extension-author">by {extension.author}</span>
                    </div>
                    {extension.official && <span className="extension-badge">Official Extension</span>}
                    <div className="extension-description">{extension.description}</div>
                </a>
            ))}
        </div>
    </>
);

export default function Extensions(): JSX.Element {
    return (
        <Layout
            title={`Extensions`}
            description="A list of Geyser extensions."
        >
            <main>
                <div className="container container--fluid margin-vert--lg">
                    <ExtensionsPage />
                </div>
            </main>
        </Layout>
    )
}

