import type { HostingProvider, ProviderType } from "@site/src/types/providers";
import React, { useState } from 'react';
import { translate } from "@docusaurus/Translate";
import { providersData } from "../data/providers";
import Admonition from '@theme/Admonition';
import { MDXTranslatable } from "./MDXTranslatable";
import ReactMarkdown from 'react-markdown';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

export const noP = (props: { children: any; }) => {
    const { children } = props;
    return children;
}

export const Provider = ({ type }) => {
    const hostingProviders: HostingProvider[] = providersData[type as ProviderType]

    return (
        <div>
            <ul>{hostingProviders.map((provider: HostingProvider) => (
                <li>
                    <a href={provider.url}>{provider.name}</a>
                </li>
            ))}</ul>
        </div>
    )
}

export const ProviderSelector = ({ setProvider }) => {
    const providers: HostingProvider[] = [
        ...Object.values(providersData.built_in),
        ...Object.values(providersData.support),
        ...Object.values(providersData.no_support)
    ].flat().sort((a, b) => a.name.localeCompare(b.name));

    providers.unshift({
        name: 'Not listed',
        url: null,
        config: {
            clone_remote_port: true
        },
        connect_instructions: translate({
            id: 'providers.connect.templates.java_ip_port',
            message: 'Connect with the Java server IP and Java server port.'
        }),
        info: translate({
            id: 'providers.provider.not_listed.info',
            message: "If these instructions do not work, contact your server hosting provider and ask for a UDP port. Then, set clone-remote-port to false, and set `port` under the `bedrock` section to the port you got. For VPS/KVM servers, please follow the self-hosting steps."
        })
    } as HostingProvider);


    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleSelectionChange = (event) => {
        const selectedName = event.target.value;
        const provider = providers.find(p => p.name === selectedName);
        setSelectedProvider(provider);
        setProvider(provider);
    }

    return (
        <div className="host-select">
            <select onChange={handleSelectionChange}>
                <option value="none">Select a provider</option>
                {providers.map((provider) => (
                    <option key={provider.name} value={provider.name}>
                        {provider.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

interface ProviderGeyserSetupProps {
    provider: {
        warn?: string;
        custom_install_location?: string;
        config?: {
            address?: string;
            port?: string;
            clone_remote_port?: string;
            port_instruction?: string;
            address_instruction: string;
            other_instructions?: string;
        }
        additional_step?: string;
        connect_instructions?: string;
        info?: string;
        hosting_article?: string;
        hosting_support?: string;
    };
    jarName: string;
    jarDirectory: string;
    configLocation: string;
    dependencyTranslation?: () => React.JSX.Element;
}

export const ProviderGeyserSetup: React.FC<ProviderGeyserSetupProps> = ({ provider, jarName, jarDirectory, configLocation, dependencyTranslation }) => {
    return (
        <>
            { provider && (
                <>
                    {provider.warn && (
                        <Admonition type="warning">
                            <ReactMarkdown>
                                {provider.warn}
                            </ReactMarkdown>
                        </Admonition>
                    )}

                    {provider.custom_install_location ? (
                        <>
                            <Heading as="h2" id="installing-geyser">
                                <MDXTranslatable.setup.installing_geyser />
                            </Heading>
                            <ReactMarkdown>
                                {provider.custom_install_location}
                            </ReactMarkdown>
                        </>
                    ) : (
                        <>
                            <Heading as="h2" id="installing-geyser">
                                <MDXTranslatable.setup.installing_geyser />
                            </Heading>
                            <ol>
                                <li>
                                    <MDXTranslatable.setup.download_jar jarName={jarName} />
                                </li>
                                <li>
                                    <MDXTranslatable.setup.place_jar jarName={jarName} jarDirectory={jarDirectory}/>
                                </li>
                                {dependencyTranslation && (
                                    <li>
                                        {dependencyTranslation()}
                                    </li>
                                )}
                                <li>
                                    <MDXTranslatable.setup.restart_server />
                                </li>
                            </ol>
                        </>
                    )}

                    {provider.config && (
                        <>
                            <Heading as="h2" id="geyser-config-changes">
                                <MDXTranslatable.setup.geyser_config_changes />
                            </Heading>
                            <MDXTranslatable.setup.open_config configLocation={configLocation} />
                            <ul>
                                {provider.config.address && (
                                    <li>
                                        <MDXTranslatable.setup.change_address address={provider.config.address} />
                                    </li>
                                )}
                                {provider.config.port && (
                                    <li>
                                        <MDXTranslatable.setup.change_port port={provider.config.port} />
                                    </li>
                                )}
                                {provider.config.clone_remote_port && (
                                    <li>
                                        <MDXTranslatable.setup.change_clone_remote_port port={'true'} />
                                    </li>
                                )}
                                {provider.config.port_instruction && (
                                    <li>
                                        <ReactMarkdown>
                                            {provider.config.port_instruction}
                                        </ReactMarkdown>
                                    </li>
                                )}
                                {provider.config.address_instruction && (
                                    <li>
                                        <ReactMarkdown>
                                            {provider.config.address_instruction}
                                        </ReactMarkdown>
                                    </li>
                                )}
                                {provider.config.other_instructions && (
                                    <li>
                                        <ReactMarkdown>
                                            {provider.config.other_instructions}
                                        </ReactMarkdown>
                                    </li>
                                )}
                            </ul>
                        </>
                    )}

                    {provider.additional_step && (
                        <>
                            <Heading as="h2" id="additional-steps">
                                <MDXTranslatable.setup.additional_steps />
                            </Heading>
                            <ReactMarkdown>
                                {provider.additional_step}
                            </ReactMarkdown>
                        </>
                    )}


                    {provider.connect_instructions && (
                        <>
                            <Heading as="h2" id="connecting-on-bedrock">
                                <MDXTranslatable.setup.connecting_on_bedrock />
                            </Heading>
                            <ReactMarkdown>
                                {provider.connect_instructions}
                            </ReactMarkdown>
                        </>
                    )}

                    {provider.info && (
                        <>
                            <Admonition type="info">
                                <ReactMarkdown>
                                    {provider.info}
                                </ReactMarkdown>
                            </Admonition>
                        </>
                    )}


                    {(provider.hosting_article || provider.hosting_support) && (
                        <>
                            <Heading as="h2" id="more-information">
                                <MDXTranslatable.setup.more_information />
                            </Heading>
                            <ul>
                                {provider.hosting_article && (
                                    <li>
                                        <Link to={provider.hosting_article}>
                                            <MDXTranslatable.setup.hosting_provider_article />
                                        </Link>
                                    </li>
                                )}
                                {provider.hosting_support && (
                                    <li>
                                        <Link to={provider.hosting_support}>
                                            <MDXTranslatable.setup.hosting_provider_support />
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </>
                    )}
                </>
            )}
        </>
    )
}