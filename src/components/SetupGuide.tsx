import React from 'react';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import { MDXTranslatable } from './MDXTranslatable';
import { ProviderGeyserSetup, SelfHostConfig, SetupSteps, Step } from './Provider';

const t = MDXTranslatable.setup;

export type PlatformId = 'paper-spigot' | 'fabric' | 'neoforge' | 'velocity' | 'bungeecord' | 'viaproxy' | 'standalone';

type Platform = {
    name: string;
    jarName: string;
    jarDirectory: string;
    configLocation: string;
    notice?: React.ReactNode; // shown above the steps
    versionStep?: React.ReactNode;
    installFirst?: React.ReactNode; // an item before downloading Geyser, e.g. setting up the program it runs in
    installNote?: React.ReactNode; // an extra item in the install step
    configNotes?: React.ReactNode; // extra paragraphs in the configure step when self-hosting
    restart: React.ReactNode; // the last install item when self-hosting
}

// Everything that differs between platforms; the guides below are the same for all of them
const platforms: Record<Exclude<PlatformId, 'standalone'>, Platform> = {
    'paper-spigot': {
        name: 'Paper / Spigot',
        jarName: 'Geyser-Spigot.jar',
        jarDirectory: 'plugins',
        configLocation: '/plugins/Geyser-Spigot/config.yml',
        versionStep: <t.version_step_viaversion />,
        restart: <t.restart_server />,
    },
    fabric: {
        name: 'Fabric',
        restart: <t.restart_server />,
        jarName: 'Geyser-Fabric.jar',
        jarDirectory: 'mods',
        configLocation: '/config/Geyser-Fabric/config.yml',
        notice: <Admonition type="caution"><t.modded_requirements jarName="Geyser-Fabric" /></Admonition>,
        installNote: <t.fabric_dependency />,
    },
    neoforge: {
        name: 'NeoForge',
        restart: <t.restart_server />,
        jarName: 'Geyser-NeoForge.jar',
        jarDirectory: 'mods',
        configLocation: '/config/Geyser-NeoForge/config.yml',
        notice: <Admonition type="caution"><t.modded_requirements jarName="Geyser-NeoForge" /></Admonition>,
    },
    velocity: {
        name: 'Velocity',
        restart: <t.restart_velocity />,
        jarName: 'Geyser-Velocity.jar',
        jarDirectory: 'plugins',
        configLocation: '/plugins/Geyser-Velocity/config.yml',
        notice: <Admonition type="info"><t.proxy_install_only proxy="Velocity" /></Admonition>,
        versionStep: <t.version_step_proxy />,
    },
    bungeecord: {
        name: 'BungeeCord',
        restart: <t.restart_bungeecord />,
        jarName: 'Geyser-BungeeCord.jar',
        jarDirectory: 'plugins',
        configLocation: '/plugins/Geyser-BungeeCord/config.yml',
        notice: <Admonition type="info"><t.proxy_install_only proxy="BungeeCord" /></Admonition>,
        versionStep: <t.version_step_proxy />,
    },
    viaproxy: {
        name: 'ViaProxy',
        restart: <t.restart_viaproxy />,
        jarName: 'Geyser-ViaProxy.jar',
        jarDirectory: 'plugins',
        configLocation: '/plugins/Geyser/config.yml',
        notice: <Admonition type="warning" title={<t.viaproxy_not_plugin_title />}><t.viaproxy_not_plugin /></Admonition>,
        installFirst: <t.viaproxy_setup />,
        configNotes: (
            <>
                <p><t.viaproxy_accounts /></p>
                <p><t.viaproxy_auth_type /></p>
            </>
        ),
    },
};

// The setup guide for a server at a hosting provider. Reads the host from SelectedProvider.
export const HostedGuide = ({ platform }: { platform: Exclude<PlatformId, 'viaproxy' | 'standalone'> }) => {
    const { jarName, jarDirectory, configLocation, notice, versionStep, installNote } = platforms[platform];
    return <ProviderGeyserSetup jarName={jarName} jarDirectory={jarDirectory} configLocation={configLocation}
        notice={notice} versionStep={versionStep} installNote={installNote} />;
}

const ConnectStep = ({ lan = false }: { lan?: boolean }) => (
    <Step id="connecting-on-bedrock" title={<t.connecting_on_bedrock />}>
        <p>
            <strong><t.connect_local_title /></strong><br />
            <t.connect_local />{lan && <> <t.connect_lan /></>}
        </p>
        <p>
            <strong><t.connect_remote_title /></strong><br />
            <t.connect_remote />
        </p>
        <Admonition type="caution"><t.connect_tcp_udp /></Admonition>
        <p><t.connect_options /></p>
        <ul>
            <li><t.connect_port_forwarding /></li>
            <li><t.connect_playit /></li>
        </ul>
    </Step>
);

const HttpsStep = () => (
    <Step id="setting-up-https" title={<t.https_step_title />}>
        <p><t.https_step /></p>
    </Step>
);

const StandaloneGuide = () => (
    <>
        <Admonition type="info"><t.standalone_java /></Admonition>
        <Admonition type="caution"><t.standalone_not_plugin /></Admonition>
        <SetupSteps>
            <Step id="installing-geyser" title={<t.installing_geyser />}>
                <ul>
                    <li><t.standalone_download /></li>
                    <li><t.standalone_folder /></li>
                    <li>
                        <t.standalone_start />
                        <ul>
                            <li><t.standalone_gui /></li>
                            <li><t.standalone_console /></li>
                        </ul>
                    </li>
                </ul>
            </Step>
            <Step id="configuring-geyser" title={<t.configuring_geyser />}>
                <SelfHostConfig configLocation="config.yml" standalone />
                <p><t.self_port_choice_standalone /></p>
                <p><t.self_port_sharing /></p>
                <p><t.standalone_remote_intro /></p>
                <CodeBlock language="yaml">{[
                    'java:',
                    '  # The IP address of the Java Edition server.',
                    '  address: 127.0.0.1',
                    '',
                    '  # The port of the Java Edition server.',
                    '  port: 25565',
                    '',
                    '  # What type of authentication Bedrock players will be checked against when logging into the Java server.',
                    '  # Can be "floodgate" (see https://wiki.geysermc.org/floodgate/), "online", or "offline".',
                    '  auth-type: online',
                ].join('\n')}</CodeBlock>
                <p><t.standalone_remote /></p>
            </Step>
            <ConnectStep lan />
            <HttpsStep />
        </SetupSteps>

        <h4 id="running-geyser-standalone-on-android"><t.standalone_android_title /></h4>
        <Admonition type="caution"><t.standalone_android_caution /></Admonition>
        <ol>
            <li><t.standalone_termux_install /></li>
            <li><t.run_command command="pkg install openjdk-21" /></li>
            <li><t.run_command command="wget -O Geyser-Standalone.jar https://download.geysermc.org/v2/projects/geyser/versions/latest/builds/latest/downloads/standalone" /></li>
            <li><t.run_command command="java -jar Geyser-Standalone.jar" /></li>
        </ol>
        <p><t.standalone_termux_script /></p>
        <CodeBlock language="bash">curl https://gist.githubusercontent.com/rtm516/e3e07d6595ee41e05a38b03c0f4d7a80/raw/install.sh | bash</CodeBlock>
    </>
);

// The setup guide for a server you host yourself
export const SelfHostGuide = ({ platform }: { platform: PlatformId }) => {
    if (platform === 'standalone') {
        return <StandaloneGuide />;
    }
    const { name, jarName, jarDirectory, configLocation, notice, versionStep, installFirst, installNote, configNotes, restart } = platforms[platform];
    return (
        <>
            {notice}
            <SetupSteps>
                {versionStep && (
                    <Step id="checking-server-version" title={<t.checking_server_version />}>
                        <p>{versionStep}</p>
                    </Step>
                )}
                <Step id="installing-geyser" title={<t.installing_geyser />}>
                    <ul>
                        {installFirst && <li>{installFirst}</li>}
                        <li><t.download_jar jarName={jarName} /></li>
                        <li><t.place_jar jarName={jarName} jarDirectory={jarDirectory} /></li>
                        {installNote && <li>{installNote}</li>}
                        <li>{restart}</li>
                    </ul>
                </Step>
                <Step id="configuring-geyser" title={<t.configuring_geyser />}>
                    <SelfHostConfig configLocation={configLocation} />
                    <p><t.self_port_choice platform={name} /></p>
                    <p><t.self_port_sharing /></p>
                    {configNotes}
                </Step>
                <ConnectStep />
                <HttpsStep />
            </SetupSteps>
            <Admonition type="info"><t.floodgate_info /></Admonition>
        </>
    );
}
