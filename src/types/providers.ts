// Where a port comes from: either same as java server, a number, or instructions to obtain it.
export type PortSource = 'java' | number | { obtain: string };

// The Geyser config changes a user makes on a host that does not configure Geyser itself.
export type ManualConfig = {
    preconfigured?: false;
    // The UDP port NetherNet (WebRTC) traffic uses. This is required for any NetherNet connection.
    udp: PortSource;
    // The TCP port Geyser can run built-in signaling on. Omit if the host does not give out a TCP port that is free
    // for Geyser; players then connect through an external signaling service instead.
    // This cannot be the Java port. Use 'same_as_udp' when the UDP port above is also open on TCP (e.g. Pterodactyl allocations).
    builtin_signaling?: Exclude<PortSource, 'java'> | 'same_as_udp';
    // External signaling (NXS). Geyser uses Warden (https://warden.cloud) by default.
    // Set an object if the host runs its own NXS-compatible signaling service, or false if the host blocks external signaling.
    external_signaling?: false | {
        endpoint: string;
        token_instruction?: string; // how to get the token for this endpoint
    };
}

// The host configures transport, signaling and ports itself (e.g. through system properties), so no config changes are needed.
export type Preconfigured = {
    preconfigured: true;
    port: PortSource; // The port players connect with
}

export type GeyserConfig = (ManualConfig | Preconfigured) & {
    confirmed?: false; // Set while the host has not confirmed these details; leave it out once they have.
    notes?: string[]; // Shown below the config, e.g. which Bedrock address to use, or alternatives to the default port
}

export type OpenCollaborationTier = 'bronze' | 'silver' | 'gold';

// Properties are grouped in the order the setup guide shows them.
export type HostingProvider = {
    name: string;
    url: string;
    updated?: string; // When these instructions were last added or edited, as 'YYYY-MM-DD'. Shown at the top of the setup guide.
    links?: { // All optional
        article?: string; // host article for Geyser
        support?: string; // link to host support, can show when setup help fails
        discord?: string; // host discord server
    };
    // Set for hosts that support Geyser through Open Collaboration.
    // Silver and gold hosts are highlighted on /hosting and in the setup guide
    open_collaboration?: {
        tier: OpenCollaborationTier;
        logo?: string; // e.g. '/img/hosts/example.webp', placed in static/img/hosts
        description?: string; // a short blurb for the hosting page
    };
    install?: string; // Step 1: replaces the download steps, e.g. aternos installs Geyser through its plugin list
    config: GeyserConfig; // Step 2: NetherNet network details, and what to change in the Geyser config
    extra_step?: string; // Step 3: e.g.: must enable udp in settings/enable geyser mode, usually some step in panel
    connect?: string; // Step 4: overrides the generated instructions on what players must input to connect
    notices?: {
        info?: string; // Additional information. Displayed in info bubble.
        warn?: string; // shaming server hosting providers with issues.
        unsupported?: string; // If set, Geyser does not work on this host, and this is the reason.
    };
    proxies_banned?: boolean; // If the provider does not allow proxies, we hide proxy setup instructions (e.g. Aternos)
}
