import React from "react";
// TODO additional step vs description???

/*
 * Setup guide:
 *
 * - search by name
 *
 * - if unsupported -> end
 *
 * - if custom_install_location: show that
 * - if config present: show that
 * - show connect instructions
 *
 * - if hosting article present: show that
 * - if hosting support present: show that
 *
 * - show blue info banner
 */

export type HostingProvider = {
    name: string;
    url: string;
    hosting_article?: String; // Many hosts have their own articles for Geyser
    hosting_support?: String; // A link to the host support, can show when setup help fails
    custom_install_location?: React.ReactNode; // e.g. aternos, can skip the entire download/config process on setup guide
    config?: ConfigDetails; // If present, geyser config must be modified to function
    connect_instructions: React.ReactNode; // what players must input to connect
    additional_step?: React.ReactNode; // e.g.: must enable udp in settings/enable geyser mode
    description?: React.ReactNode; // TODO yeet
    info?: React.ReactNode; // Additional information. Displayed in info bubble.
    warn?: React.ReactNode; // shaming server hosting providers with issues.
}

// Either: clone-remote-port, or
export type ConfigDetails = {
    port?: number;
    address?: string;
    clone_remote_port?: boolean;
    port_instruction?: React.ReactNode; // Instructions on where to get a port
    address_instruction?: React.ReactNode; // Instructions on where to get the bedrock address
    other_instructions?: React.ReactNode; // Other message on which config settings can be changed
}

export type ProviderType = "built_in" | "support" | "no_support";

export type Providers = {
    built_in: HostingProvider[];
    support: HostingProvider[];
    no_support: HostingProvider[];
}
