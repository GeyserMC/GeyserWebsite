import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import ReactMarkdown from 'react-markdown';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import { highlightedTiers, openCollaborationProviders, providerSetupLink } from '@site/src/components/Provider';
import type { HostingProvider, OpenCollaborationTier } from '@site/src/types/providers';
import styles from './hosting.module.scss';

const tierNames: Partial<Record<OpenCollaborationTier, string>> = {
    gold: translate({ id: 'pages.hosting.tier.gold', message: 'Gold supporters' }),
    silver: translate({ id: 'pages.hosting.tier.silver', message: 'Silver supporters' }),
    bronze: translate({ id: 'pages.hosting.tier.bronze', message: 'Bronze supporters' }),
};

const HostCard = ({ provider }: { provider: HostingProvider }) => (
    <div className={`${styles.card} ${styles[provider.open_collaboration.tier]}`}>
        {provider.open_collaboration.logo && (
            <div className={styles.logoPlate}>
                <img className={styles.logo} src={useBaseUrl(provider.open_collaboration.logo)} alt={provider.name} loading="lazy" />
            </div>
        )}
        <h3>{provider.name}</h3>
        {provider.open_collaboration.description && (
            <div className={styles.description}>
                <ReactMarkdown>{provider.open_collaboration.description}</ReactMarkdown>
            </div>
        )}
        <div className={styles.links}>
            <Link className="button button--primary" to={provider.url}>
                <Translate id="pages.hosting.card.website">Website</Translate>
            </Link>
            <Link className="button button--secondary" to={providerSetupLink(provider)}>
                <Translate id="pages.hosting.card.setup">Setup guide</Translate>
            </Link>
        </div>
    </div>
);

const HostingPage: React.FC = () => (
    <>
        <HeroBanner
            title={<Translate id="pages.hosting.title">Hosting Providers</Translate>}
            subheading={<Translate id="pages.hosting.subheading">Hosting providers that support the development of Geyser.</Translate>}
            backgroundImage={HeroBackground}
        />

        <section className={styles.intro}>
            <p>
                <Translate
                    id="pages.hosting.intro"
                    values={{ openCollaboration: <Link to="https://opencollaboration.dev">Open Collaboration</Link> }}
                >
                    {"The hosts below support Geyser and related projects through {openCollaboration}. Their support helps fund work on Geyser, such as keeping up with major changes to Bedrock Edition, like the switch to NetherNet. " +
                        "All hosts listed below also configure Geyser automatically when installed, making using Geyser easier than ever. We'd like to thank them all for their support."}
                </Translate>
            </p>
        </section>

        {openCollaborationProviders.length > 0 ? highlightedTiers.map(tier => {
            const hosts = openCollaborationProviders.filter(p => p.open_collaboration.tier === tier);
            return hosts.length > 0 && (
                <section key={tier} className={styles.tier}>
                    <h2>{tierNames[tier]}</h2>
                    <div className={`${styles.grid} ${styles[`${tier}Grid`]}`}>
                        {hosts.map(provider => <HostCard key={provider.name} provider={provider} />)}
                    </div>
                </section>
            );
        }) : (
            <p className={styles.empty}>
                <Translate id="pages.hosting.empty">No hosting providers are listed yet.</Translate>
            </p>
        )}

        <section className={styles.notes}>
            <h2><Translate id="pages.hosting.other.title">Using another host?</Translate></h2>
            <p>
                <Translate
                    id="pages.hosting.other.text"
                    values={{ setupGuide: <Link to="/wiki/geyser/setup/"><Translate id="pages.hosting.other.setup_guide">setup guide</Translate></Link> }}
                >
                    {"Hosts not being listed here does not mean Geyser won't run there. The {setupGuide} includes community collected notes for many other hosts, and general instructions for those not listed."}
                </Translate>
            </p>
        </section>
    </>
);

export default function Hosting(): JSX.Element {
    return (
        <Layout
            title={translate({ id: 'pages.hosting.meta.title', message: 'Hosting Providers' })}
            description={translate({ id: 'pages.hosting.meta.description', message: 'Hosting providers that support the development of Geyser through Open Collaboration.' })}
        >
            <main>
                <div className="container margin-vert--lg">
                    <HostingPage />
                </div>
            </main>
        </Layout>
    );
}
