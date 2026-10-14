import type { GeyserConfig, HostingProvider, OpenCollaborationTier, PortSource } from "@site/src/types/providers";
import React, { createContext, useContext, useEffect, useState } from 'react';
import Translate, { translate } from "@docusaurus/Translate";
import { providersData } from "../data/providers";
import Admonition from '@theme/Admonition';
import { MDXTranslatable } from "./MDXTranslatable";
import ReactMarkdown from 'react-markdown';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import clsx from 'clsx';
import styles from './Provider.module.scss';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGlobe, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export const noP = (props: { children: any; }) => {
    const { children } = props;
    return children;
}

// Ports for hosts we have no notes on. The setup guide offers both, as tabs.
const notListedPorts: Record<'allocated' | 'javaOnly', HostingProvider['config']> = {
    // One allocated port, open for both TCP and UDP, used for signaling and gameplay
    allocated: {
        udp: {
            obtain: translate({
                id: 'providers.provider.not_listed.allocate_port',
                message: "Allocate a port in your server panel, open for both TCP and UDP."
            })
        },
        builtin_signaling: 'same_as_udp'
    },
    // Only the Java server port: gameplay shares it over UDP, and players find the server through external signaling
    javaOnly: {
        udp: 'java'
    }
}

const notListed: HostingProvider = {
    name: 'Not listed',
    url: null,
    config: { ...notListedPorts.allocated, confirmed: false },
    notices: {
        info: translate({
            id: 'providers.provider.not_listed.info',
            message: "For VPS/KVM servers, please follow the self-hosting steps."
        })
    }
}

// The two "Not listed" options, shown as tabs that switch together in the config and connect steps
const notListedVariants = [
    {
        value: 'allocated',
        label: translate({ id: 'mdx.setup.not_listed.tab_allocated', message: 'I can allocate ports' }),
        provider: { ...notListed, config: notListedPorts.allocated }
    },
    {
        value: 'java-only',
        label: translate({ id: 'mdx.setup.not_listed.tab_java_only', message: 'I only have the Java server port' }),
        provider: { ...notListed, config: notListedPorts.javaOnly }
    }
];

// What a self-hosted server looks like to the config builder: one port, open for both TCP and UDP
const selfHosted: HostingProvider = {
    name: 'Self-hosted',
    url: null,
    config: { udp: 19132, builtin_signaling: 'same_as_udp' }
}

// Open Collaboration tiers that are highlighted, highest first. Bronze hosts are listed like any other host.
export const highlightedTiers: OpenCollaborationTier[] = ['gold', 'silver'];
export const isHighlighted = (provider: HostingProvider) => highlightedTiers.includes(provider.open_collaboration?.tier);

const byName = (a: HostingProvider, b: HostingProvider) => a.name.localeCompare(b.name);
const byTierThenName = (a: HostingProvider, b: HostingProvider) =>
    highlightedTiers.indexOf(a.open_collaboration.tier) - highlightedTiers.indexOf(b.open_collaboration.tier) || byName(a, b);
export const openCollaborationProviders: HostingProvider[] = providersData.filter(isHighlighted).sort(byTierThenName);
const otherProviders: HostingProvider[] = providersData.filter(p => !isHighlighted(p)).sort(byName);

// Whether the host configures Geyser itself. A type guard, so the other branch knows the config has ports.
export const isPreconfigured = (config: GeyserConfig): config is Extract<GeyserConfig, { preconfigured: true }> => config.preconfigured === true;

// NetherNet details count as confirmed unless the host is marked with `confirmed: false`
export const isConfirmed = (provider: HostingProvider) => provider.config.confirmed !== false;

// Links to the setup guide with a provider selected
export const providerSetupLink = (provider: HostingProvider) => `/wiki/geyser/setup/?provider=${encodeURIComponent(provider.name)}`;

export const ProviderSelector = ({ setProvider }) => {
    const providers: HostingProvider[] = [notListed, ...openCollaborationProviders, ...otherProviders];

    const [selectedProvider, setSelectedProvider] = useState<HostingProvider>(null);

    const select = (name: string) => {
        const provider = providers.find(p => p.name === name) ?? null;
        setSelectedProvider(provider);
        setProvider(provider);
    }

    useEffect(() => {
        const name = new URLSearchParams(window.location.search).get('provider');
        if (name) {
            select(name);
        }
    }, []);

    const option = (provider: HostingProvider) => (
        <option key={provider.name} value={provider.name}>
            {provider.name}
        </option>
    );

    return (
        <div className="host-select">
            <select value={selectedProvider?.name ?? 'none'} onChange={event => select(event.target.value)}>
                <option value="none">Select a provider</option>
                {option(notListed)}
                {openCollaborationProviders.length > 0 && (
                    <optgroup label={translate({ id: 'components.provider.open_collaboration_group', message: 'Hosts that support Geyser development' })}>
                        {openCollaborationProviders.map(option)}
                    </optgroup>
                )}
                <optgroup label={translate({ id: 'components.provider.other_group', message: 'Other providers' })}>
                    {otherProviders.map(option)}
                </optgroup>
            </select>
        </div>
    );
}

/**
 * Picks the signaling setup for a provider: built-in signaling when the host gives Geyser a TCP port, external signaling otherwise.
 */
const signalingSetup = (provider: HostingProvider) => {
    const { config } = provider;
    if (isPreconfigured(config)) {
        // The host runs signaling itself; players connect with the port it gives them.
        return { builtin: false, external: true, separateTcp: false, bedrockPort: config.port };
    }
    const { udp, builtin_signaling, external_signaling } = config;
    const builtin = builtin_signaling !== undefined;
    const external = external_signaling !== false;
    // The TCP port built-in signaling uses is the Bedrock `port`, so it is also the port players connect with.
    // Without built-in signaling, `port` is only used as the UDP port.
    const separateTcp = builtin && builtin_signaling !== 'same_as_udp';
    const bedrockPort: PortSource = separateTcp ? builtin_signaling as PortSource : udp;
    return { builtin, external, separateTcp, bedrockPort };
}

type Transport = 'nethernet' | 'both';

type ConfigNote = {
    placeholder?: string; // shown in the placeholder column; notes without one are shown below the table
    text: React.ReactNode;
}

/**
 * Builds the `bedrock` section of the Geyser config for a provider, and the notes explaining its placeholders.
 */
const buildConfig = (provider: HostingProvider, transport: Transport, selfHost: boolean) => {
    const { config } = provider;
    if (isPreconfigured(config)) {
        throw new Error(`${provider.name} is preconfigured, so it has no config to build`);
    }
    const { udp, external_signaling, notes: configNotes = [] } = config;
    const { builtin, separateTcp, bedrockPort } = signalingSetup(provider);
    const lines = ['bedrock:'];
    const notes: ConfigNote[] = [];

    const portValue = (source: PortSource, placeholder: string): string => {
        if (source === 'java') {
            notes.push({ placeholder, text: <MDXTranslatable.setup.placeholder_java_port /> });
            return placeholder;
        }
        if (typeof source === 'number') {
            return String(source);
        }
        notes.push({ placeholder, text: <ReactMarkdown components={{ p: noP }}>{source.obtain}</ReactMarkdown> });
        return placeholder;
    }

    if (bedrockPort === 'java') {
        lines.push('  clone-remote-port: true');
    } else {
        // Many hosts used to preset clone-remote-port, which makes Geyser ignore `port`
        if (!selfHost) {
            lines.push('  clone-remote-port: false');
        }
        lines.push(`  port: ${portValue(bedrockPort, separateTcp ? 'TCP_PORT' : 'TCP_UDP_PORT')}`);
    }

    if (separateTcp) {
        lines.push(`  webrtc-port: ${portValue(udp, 'UDP_PORT')}`);
        if (transport === 'both') {
            notes.push({ text: <MDXTranslatable.setup.raknet_on_port /> });
        }
    } else if (transport === 'both' && !selfHost) {
        // RakNet stays on `port`. The Java server only uses its port over TCP, so NetherNet can use it over UDP
        // without the user having to get another port.
        lines.push('  webrtc-port: UDP_PORT');
        notes.push({ placeholder: 'UDP_PORT', text: <MDXTranslatable.setup.placeholder_java_port_udp /> });
    } else if (transport === 'both') {
        lines.push('  webrtc-port: UDP_PORT');
        notes.push({ placeholder: 'UDP_PORT', text: <MDXTranslatable.setup.placeholder_second_free_port /> });
    }

    lines.push(`  transport: ${transport}`);

    // Built-in signaling is the default, so the signaling section only needs changes for hosts that confirmed something else
    if (isConfirmed(provider) && !builtin) {
        lines.push('  signaling:', '    mode: nxs');
        if (external_signaling) {
            lines.push('    nxs:', `      endpoint: ${external_signaling.endpoint}`);
            if (external_signaling.token_instruction) {
                lines.push('      token: YOUR_TOKEN');
                notes.push({ placeholder: 'YOUR_TOKEN', text: <ReactMarkdown components={{ p: noP }}>{external_signaling.token_instruction}</ReactMarkdown> });
            }
        }
    }

    for (const note of configNotes) {
        notes.push({ text: <ReactMarkdown components={{ p: noP }}>{note}</ReactMarkdown> });
    }

    return { yaml: lines.join('\n'), notes };
}

const ConfigSnippet = ({ provider, transport, configLocation, selfHost, explain = true }: { provider: HostingProvider, transport: Transport, configLocation: string, selfHost: boolean, explain?: boolean }) => {
    const { yaml, notes } = buildConfig(provider, transport, selfHost);
    const placeholders = notes.filter(note => note.placeholder);
    const others = notes.filter(note => !note.placeholder);
    return (
        <>
            {explain && (
                <p className={styles.transportExplainer}>
                    {transport === 'nethernet' && <MDXTranslatable.setup.transport_nethernet_explainer />}
                    {transport === 'both' && <MDXTranslatable.setup.transport_both_explainer />}
                </p>
            )}
            <CodeBlock language="yaml" title={configLocation}>{yaml}</CodeBlock>
            {placeholders.length > 0 && (
                <table className={styles.placeholders}>
                    <thead>
                        <tr>
                            <th><MDXTranslatable.setup.placeholder /></th>
                            <th><MDXTranslatable.setup.replace_with /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {placeholders.map(note => (
                            <tr key={note.placeholder}>
                                <td><code>{note.placeholder}</code></td>
                                <td>{note.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {others.map((note, i) => <p key={i}>{note.text}</p>)}
        </>
    );
}

const ConnectInstructions = ({ provider }: { provider: HostingProvider }) => {
    if (provider.connect) {
        return <ReactMarkdown>{provider.connect}</ReactMarkdown>;
    }
    const { bedrockPort } = signalingSetup(provider);
    const preconfigured = isPreconfigured(provider.config);
    // Sharing the Java server's port leaves no TCP port for built-in signaling, so Geyser switches to external signaling,
    // which gives the server its own address. Hosts that configure Geyser themselves may run signaling another way.
    if (bedrockPort === 'java' && !preconfigured) {
        return (
            <p>
                <Translate id="providers.provider.not_listed.java_only_connect" values={{ warden: <Link to="https://warden.cloud">Warden</Link> }}>
                    {"Players do not connect with the Java server's address. After Geyser starts, it shows the address and port to use in the console, provided by the external signaling service ({warden} by default). Share these with your players."}
                </Translate>
            </p>
        );
    }
    let port: React.ReactNode;
    if (bedrockPort === 'java') {
        port = <Translate id="mdx.setup.connect.port_java">Your Java server's port</Translate>;
    } else if (typeof bedrockPort === 'number') {
        port = String(bedrockPort);
    } else if (preconfigured) {
        // There is no config step to refer to, so show where the port comes from
        port = <ReactMarkdown components={{ p: noP }}>{bedrockPort.obtain}</ReactMarkdown>;
    } else {
        port = <Translate id="mdx.setup.connect.port_config_step">The port you set in "Configuring Geyser"</Translate>;
    }
    return (
        <>
            <p>
                <Translate id="mdx.setup.connect.intro">
                    In Minecraft: Bedrock Edition, go to Play, then Servers, and select Add Server. Fill it in like this:
                </Translate>
            </p>
            <div className={styles.addServer} aria-hidden="true">
                <div className={styles.addServerTitle}><Translate id="mdx.setup.connect.add_server">Add Server</Translate></div>
                <label><Translate id="mdx.setup.connect.server_name">Server Name</Translate></label>
                <div className={styles.addServerField}><Translate id="mdx.setup.connect.server_name_value">Anything you like</Translate></div>
                <label><Translate id="mdx.setup.connect.server_address">Server Address</Translate></label>
                <div className={styles.addServerField}><Translate id="mdx.setup.connect.server_address_value">Your Java server's address</Translate></div>
                <label><Translate id="mdx.setup.connect.port">Port</Translate></label>
                <div className={styles.addServerField}>{port}</div>
            </div>
        </>
    );
}

/**
 * A compact bar at the top of the guide: who the host is, and what it supports.
 */
const HostSummary = ({ provider }: { provider: HostingProvider }) => {
    const { i18n } = useDocusaurusContext();
    const confirmed = isConfirmed(provider);
    const tier = isHighlighted(provider) ? provider.open_collaboration.tier : null;
    const logo = useBaseUrl(provider.open_collaboration?.logo ?? '');
    // The host's own guide is the main action, so it is the filled button
    const links = [
        provider.links?.article && { to: provider.links.article, icon: faBook, primary: true, label: <MDXTranslatable.setup.hosting_provider_article /> },
        { to: provider.url, icon: faGlobe, label: <MDXTranslatable.setup.hosting_provider_website /> },
        provider.links?.support && { to: provider.links.support, icon: faHeadset, label: <MDXTranslatable.setup.hosting_provider_support /> },
        provider.links?.discord && { to: provider.links.discord, icon: faDiscord, label: <MDXTranslatable.setup.hosting_provider_discord /> },
    ].filter(Boolean);

    // The provider list is crowd-sourced, so this is worded as a report rather than a guarantee
    const reported = confirmed && <MDXTranslatable.setup.summary_nethernet_reported />;

    // Dates are stored as YYYY-MM-DD; format them in UTC so they do not shift by a day in other time zones
    const updated = provider.updated && new Date(`${provider.updated}T00:00:00Z`)
        .toLocaleDateString(i18n.currentLocale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

    return (
        <div className={clsx(styles.summary, tier && styles[tier])}>
            <div className={styles.summaryRow}>
                {tier && provider.open_collaboration.logo && (
                    <span className={styles.summaryLogo}><img src={logo} alt="" /></span>
                )}
                <strong className={styles.summaryName}>{provider.name}</strong>
                {tier && (
                    <Link to="/hosting" className={clsx(styles.pill, styles.tierBadge, styles[tier])}>
                        {tier === 'gold' ? <MDXTranslatable.setup.badge_gold /> : <MDXTranslatable.setup.badge_silver />}
                    </Link>
                )}
            </div>
            {tier ? (
                // Supporting hosts configure Geyser for their users, so the crowd-sourced details do not apply
                <div className={styles.summaryMeta}>
                    <MDXTranslatable.setup.summary_supporter_configures name={provider.name} />
                </div>
            ) : (updated || reported) && (
                <div className={styles.summaryMeta}>
                    {updated && <MDXTranslatable.setup.summary_updated date={updated} />}
                    {updated && reported && ' · '}
                    {reported}
                </div>
            )}
            <div className={styles.summaryLinks}>
                {links.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={clsx('button button--sm button--primary', !link.primary && 'button--outline')}
                    >
                        <FontAwesomeIcon icon={link.icon} fixedWidth />
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

/**
 * Shown first, above the host summary: the steps below may not work if NetherNet is not confirmed for this host.
 */
const UnconfirmedNotice = ({ provider }: { provider: HostingProvider }) => {
    // The fallback is "Not listed" with only the Java server's port, which uses external signaling (Warden).
    // Keep the platform the user is on.
    const platform = new URLSearchParams(useLocation().search).get('platform');
    const notListedLink = useBaseUrl(`${providerSetupLink(notListed)}&ports=java-only${platform ? `&platform=${encodeURIComponent(platform)}` : ''}`);
    // "Not listed" has no instructions to check, so it gets no notice; its steps cover both options instead
    if (isConfirmed(provider) || provider === notListed) {
        return null;
    }
    return (
        <Admonition type="caution" title={<MDXTranslatable.setup.unconfirmed_title />}>
            <p>
                <MDXTranslatable.setup.unconfirmed name={provider.name} />
            </p>
            {/* A plain link, so the page reloads and the selector picks up the provider from the URL */}
            <p><MDXTranslatable.setup.try_not_listed link={notListedLink} /></p>
        </Admonition>
    );
}

/**
 * Host-specific warnings, shown below the host summary with the platform notices.
 */
const HostNotice = ({ provider }: { provider: HostingProvider }) => {
    const { builtin, external } = signalingSetup(provider);
    if (!builtin && !external) {
        return (
            <Admonition type="danger">
                <MDXTranslatable.setup.no_signaling name={provider.name} />
            </Admonition>
        );
    }
    const warn = provider.notices?.warn;
    if (!warn) {
        return null;
    }
    return (
        <Admonition type="caution" title={<MDXTranslatable.setup.warning_title />}>
            <ReactMarkdown>{warn}</ReactMarkdown>
        </Admonition>
    );
}

// Numbered setup steps, shared by the hosted provider and self-hosted guides
export const SetupSteps = ({ children }: { children: React.ReactNode }) => (
    <ol className={styles.steps}>{children}</ol>
);

// Markdown pages leave out the title and start the step with a `#### Title \{#id}` heading instead, so Crowdin can
// translate it. Level 4 keeps step titles out of the table of contents, which only lists levels 2 and 3.
export const Step = ({ title, id, children }: { title?: React.ReactNode, id?: string, children: React.ReactNode }) => (
    <li className={styles.step}>
        {title && <Heading as="h4" id={id} className={styles.stepTitle}>{title}</Heading>}
        <div className={styles.stepBody}>{children}</div>
    </li>
);

/**
 * The config changes for a server, with a tab for NetherNet only and one that also accepts RakNet.
 */
const ConfigTabs = ({ provider, configLocation, selfHost = false, standalone = false }: { provider: HostingProvider, configLocation: string, selfHost?: boolean, standalone?: boolean }) => {
    // With only the Java server's port, there is no second UDP port for RakNet, so only NetherNet is possible
    if (!isPreconfigured(provider.config) && provider.config.udp === 'java') {
        return (
            <>
                <p><MDXTranslatable.setup.open_config_match configLocation={configLocation} /></p>
                <ConfigSnippet provider={provider} transport="nethernet" configLocation={configLocation} selfHost={selfHost} explain={false} />
                <p>{standalone ? <MDXTranslatable.setup.restart_geyser /> : <MDXTranslatable.setup.restart_server />}</p>
            </>
        );
    }
    return (
        <>
            <p><MDXTranslatable.setup.open_config_match configLocation={configLocation} /></p>
            <Tabs groupId="geyser-transport">
                <TabItem value="nethernet" label={translate({ id: 'mdx.setup.transport_nethernet_tab', message: 'NetherNet' })} default>
                    <ConfigSnippet provider={provider} transport="nethernet" configLocation={configLocation} selfHost={selfHost} />
                </TabItem>
                <TabItem value="both" label={translate({ id: 'mdx.setup.transport_both_tab', message: 'NetherNet and RakNet' })}>
                    <ConfigSnippet provider={provider} transport="both" configLocation={configLocation} selfHost={selfHost} />
                </TabItem>
            </Tabs>
            <p>{standalone ? <MDXTranslatable.setup.restart_geyser /> : <MDXTranslatable.setup.restart_server />}</p>
        </>
    );
}

// The config step for self-hosted servers, for use in the self-hosting pages
export const SelfHostConfig = ({ configLocation, standalone }: { configLocation: string, standalone?: boolean }) => (
    <ConfigTabs provider={selfHosted} configLocation={configLocation} selfHost standalone={standalone} />
);

const ConnectStep = ({ provider }: { provider: HostingProvider }) => (
    <>
        <ConnectInstructions provider={provider} />
        {/* Unconfirmed hosts get the default built-in signaling, which is the one that can use HTTPS,
            unless they share the Java server's port, where Geyser uses external signaling instead */}
        {!isPreconfigured(provider.config) && provider.config.udp !== 'java' && (signalingSetup(provider).builtin || !isConfirmed(provider)) && (
            <p><MDXTranslatable.setup.https_note /></p>
        )}
    </>
);

// The provider picked in the setup guide. Platform pages read it from here rather than through props,
// so they only need simple JSX that survives translation on Crowdin.
export const SelectedProvider = createContext<HostingProvider>(null);

// Parts of the hosted guide that platform pages write in Markdown, as children of ProviderGeyserSetup.
// The first step, e.g. which plugin older server versions need:
export const VersionStep = ({ children }: { children: React.ReactNode }) => <>{children}</>;
// An extra item in the install step, e.g. a required dependency:
export const InstallNote = ({ children }: { children: React.ReactNode }) => <>{children}</>;

interface ProviderGeyserSetupProps {
    jarName: string;
    jarDirectory: string;
    configLocation: string;
    // Platform notices, shown below the host summary so the host comes first, plus an optional VersionStep and InstallNote
    children?: React.ReactNode;
}

export const ProviderGeyserSetup: React.FC<ProviderGeyserSetupProps> = ({ jarName, jarDirectory, configLocation, children }) => {
    const provider = useContext(SelectedProvider);
    if (!provider) {
        return null;
    }

    const parts = React.Children.toArray(children);
    const slot = (type: React.FC<{ children: React.ReactNode }>) =>
        parts.find(part => React.isValidElement(part) && part.type === type);
    const versionStep = slot(VersionStep);
    const installNote = slot(InstallNote);
    const notices = parts.filter(part => part !== versionStep && part !== installNote);

    return (
        <>
            <UnconfirmedNotice provider={provider} />

            {provider.url && <HostSummary provider={provider} />}

            {notices}

            <HostNotice provider={provider} />

            <SetupSteps>
                {versionStep && (
                    <Step id="checking-server-version" title={<MDXTranslatable.setup.checking_server_version />}>
                        {versionStep}
                    </Step>
                )}

                <Step id="installing-geyser" title={<MDXTranslatable.setup.installing_geyser />}>
                    {provider.install ? (
                        <ReactMarkdown>{provider.install}</ReactMarkdown>
                    ) : (
                        <ul>
                            <li><MDXTranslatable.setup.download_jar jarName={jarName} /></li>
                            <li><MDXTranslatable.setup.place_jar jarName={jarName} jarDirectory={jarDirectory} /></li>
                            {installNote && <li className={styles.installNote}>{installNote}</li>}
                            <li><MDXTranslatable.setup.restart_server /></li>
                        </ul>
                    )}
                </Step>

                <Step id="configuring-geyser" title={<MDXTranslatable.setup.configuring_geyser />}>
                    {provider === notListed ? (
                        <Tabs groupId="not-listed-ports" queryString="ports">
                            {notListedVariants.map((variant, i) => (
                                <TabItem key={variant.value} value={variant.value} label={variant.label} default={i === 0}>
                                    <ConfigTabs provider={variant.provider} configLocation={configLocation} />
                                </TabItem>
                            ))}
                        </Tabs>
                    ) : provider.config.preconfigured ? (
                        <p><MDXTranslatable.setup.preconfigured name={provider.name} /></p>
                    ) : (
                        <ConfigTabs provider={provider} configLocation={configLocation} />
                    )}
                </Step>

                {provider.extra_step && (
                    <Step id="additional-steps" title={<MDXTranslatable.setup.additional_steps />}>
                        <ReactMarkdown>{provider.extra_step}</ReactMarkdown>
                    </Step>
                )}

                <Step id="connecting-on-bedrock" title={<MDXTranslatable.setup.connecting_on_bedrock />}>
                    {provider === notListed ? (
                        // Same groupId as the config step, so both switch together
                        <Tabs groupId="not-listed-ports" queryString="ports">
                            {notListedVariants.map((variant, i) => (
                                <TabItem key={variant.value} value={variant.value} label={variant.label} default={i === 0}>
                                    <ConnectStep provider={variant.provider} />
                                </TabItem>
                            ))}
                        </Tabs>
                    ) : (
                        <ConnectStep provider={provider} />
                    )}
                </Step>
            </SetupSteps>

            {provider.notices?.info && (
                <div className={styles.hostNote}>
                    <ReactMarkdown>{provider.notices.info}</ReactMarkdown>
                </div>
            )}
        </>
    )
}
