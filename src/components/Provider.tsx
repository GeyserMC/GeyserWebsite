import type { HostingProvider, ProviderType } from "@site/src/types/providers";
import ReactMarkdown from "react-markdown";
import React, { useState } from 'react';
import { translate } from "@docusaurus/Translate";
import { providersData } from "../data/providers";

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
                    {provider.description != null ? (
                        <ReactMarkdown children={`&nbsp;&hyphen; ${provider.description}`} components={{ p: noP }} />
                    ) : (
                        ''
                    )}
                </li>
            ))}</ul>
        </div>
    )
}

export const ProviderSelector = ({setProvider}) => {
    const providers: HostingProvider[] = [
        ...Object.values(providersData.built_in),
        ...Object.values(providersData.support), 
        ...Object.values(providersData.no_support)
    ].flat().sort((a, b) => a.name.localeCompare(b.name));

    providers.unshift({
        name: 'Not listed',
        description: translate({
            id: 'providers.provider.not_listed.description',
            message: "If your hosting provider is not listed, try enabling the `clone-remote-port` option in the config. Then, restart the server, and try connecting with the same IP and port as on Java Edition. <br> If this does not work, ask your server hosting provider for a UDP port, and use that. For VPS/KVM servers please follow the self-hosting steps."
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
