import Translate from '@docusaurus/Translate';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import Layout from '@theme/Layout';
import { useEffect, useRef, useState } from 'react';
import styles from './utilities.module.scss';
import { Grid } from '@site/src/components/Grid';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';

const DumpViewerPage: React.FC = () => {
    const [dumpId, setDumpId] = useState('');
    const [data, setData] = useState<any>({});
    const [statusMessage, setStatusMessage] = useState('');
    const [activePlugin, setActivePlugin] = useState<any>({});

    const pluginPopoverRef = useRef<any>(null);

    const urlReg = /^(https?:\/\/)?dump\.geysermc\.org/;

    useEffect(() => {
        const handleClickOutside = (event) => setActivePlugin({});
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [pluginPopoverRef]);

    useEffect(() => {
        // Get the ID from the URL
        let id = window.location.href.includes('?') ? window.location.href.split('?').pop() : '';
        if (id === '' || id === undefined) {
            id = window.location.hash.slice(1);
        }
        if (id !== undefined && id !== '') {
            setDumpId(id);
            handleLoad(id);
        }
    }, []);

    const handleLoadClick = () => {
        if (dumpId === '') {
            setStatusMessage('You haven\'t entered an ID or URL!');
            return;
        }
        let id = dumpId;

        if (dumpId.match(urlReg)) {
            id = dumpId.split('/').pop();
        }
        setDumpId(id);
        handleLoad(id);
    }

    const handleLoad = async (dumpId) => {
        try {
            // Construct the raw dump URL
            const url = 'https://dump.geysermc.org/raw/' + dumpId;
            const response = await fetch(url);
            const data = await response.json();

            // Check for error
            if (data.message) {
                throw new Error(data.message)
            }

            window.location.hash = '#' + dumpId;
            setData(data);
        } catch (error) {
            setStatusMessage('An error occurred while loading the dump. Please try again later.<br><br>' + error);
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const handlePluginClick = (plugin) => {
        setActivePlugin(plugin);
    }

    return (
        <>
            <HeroBanner
                title={<Translate id='pages.dumpviewer.title'>Dump Viewer</Translate>}
                subheading={<Translate id='pages.dumpviewer.subheading'>View the breakdown of your Geyser dump.</Translate>}
                backgroundImage={HeroBackground}
            />

            <div className='container' style={{ marginTop: '30px' }}>
                {Object.keys(data).length === 0 ? (
                    <>
                        <h2><Translate id='pages.dumpviewer.enterdumpid'>Enter Dump ID or URL below and click load.</Translate></h2>
                        <input id='dump-url' className={clsx(styles.formInput, styles.noOutline)} value={dumpId} onChange={(e) => setDumpId(e.target.value)} placeholder='Dump ID/URL' />
                        <button className={styles.loadButton} onClick={handleLoadClick}>
                            <Translate id='pages.dumpviewer.button.load'>Load</Translate>
                        </button>

                        {statusMessage !== '' ? (
                            <div className={styles.statusMessage}>
                                <p dangerouslySetInnerHTML={{ __html: statusMessage }} />
                            </div>
                        ) : undefined}
                    </>
                ) : (
                    <>
                        <div>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <Translate id='pages.dumpviewer.versions'>Versions</Translate>
                                </div>
                                <div className={styles.cardBody}>
                                    <Grid elementsPerRow={3} gap='8px'>
                                        <div>
                                            <b><Translate id='pages.dumpviewer.versions.geyserver'>Geyser Version</Translate></b><br />
                                            <p id='geyserVersion'>{data.versionInfo.version}</p>
                                        </div>
                                        <div>
                                            <b><Translate id='pages.dumpviewer.versions.javaver'>Java Version</Translate></b><br />
                                            <p id='javaVersion'>{data.versionInfo.javaVersion} ({data.versionInfo.architecture})</p>
                                        </div>
                                        <div>
                                            <b><Translate id='pages.dumpviewer.versions.os'>Operating System</Translate></b><br />
                                            <p id='osVersion'>{data.versionInfo.operatingSystem} ({data.versionInfo.operatingSystemVersion})</p>
                                        </div>
                                    </Grid>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <Translate id='pages.dumpviewer.geyserver'>Geyser Version</Translate>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <Grid elementsPerRow={3} gap='8px'>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.geyserver.build'>Build</Translate></b><br />
                                                <p id='buildNumber'>{data.gitInfo['git.build.number'] ?? data.gitInfo.buildNumber}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.geyserver.commit'>Commit Hash</Translate></b><br />
                                                <a id='commit' target='_blank' href={'https://github.com/GeyserMC/Geyser/commit/' + data.gitInfo['git.commit.id']}>{data.gitInfo['git.commit.id.abbrev']}</a>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.geyserver.branch'>Branch</Translate></b><br />
                                                <p id='branch'>{data.gitInfo['git.branch']}</p>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <Translate id='pages.dumpviewer.platform'>Platform Info</Translate>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <Grid elementsPerRow={5} gap='8px'>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.platform.id'>Platform Identifier</Translate></b><br />
                                                <p id='platformIdentifier'>{data.bootstrapInfo.platform.platformName || data.bootstrapInfo.platform}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.platform.name'>Platform Name</Translate></b><br />
                                                <p id='platformName'>{data.bootstrapInfo.platformName ?? capitalizeFirstLetter(data.bootstrapInfo.platform.platformName.toLowerCase())}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.platform.version'>Platform Version</Translate></b><br />
                                                <p id='platformVersion'>{data.bootstrapInfo.platformVersion ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.platform.apiver'>Platform API Version</Translate></b><br />
                                                <p id='platformAPIVersion'>{data.bootstrapInfo.platformAPIVersion ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.platform.onlinemode'>Online Mode</Translate></b><br />
                                                <p id='onlineMode'>{data.bootstrapInfo.onlineMode !== null ? data.bootstrapInfo.onlineMode ? 'true' : 'false' : 'N/A'}</p>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <Translate id='pages.dumpviewer.sysinfo'>System Info</Translate>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <Grid elementsPerRow={3} gap='8px'>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.cpucount'>CPU Count</Translate></b><br />
                                                <p id='cpuCount'>{data.cpuCount}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.cpuname'>CPU Name</Translate></b><br />
                                                <p id='cpuName'>{data.cpuName}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.ram'>RAM</Translate></b><br />
                                                <p id='ram'>{data.ramInfo.total} MB ({data.ramInfo.free} MB free)</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.javaname'>Java Name</Translate></b><br />
                                                <p id='javaName'>{data.versionInfo.javaName}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.javavendor'>Java Vendor</Translate></b><br />
                                                <p id='javaVendor'>{data.versionInfo.javaVendor}</p>
                                            </div>
                                            <div>
                                                <b><Translate id='pages.dumpviewer.dockercheck'>Uses Docker?</Translate></b><br />
                                                <p id='dockerCheck'>{data.versionInfo.network.dockerCheck ? "true" : "false"}</p>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <Translate id='pages.dumpviewer.plugins'>Plugins</Translate> ({data.bootstrapInfo.plugins?.length ?? 0})
                                    </div>
                                    <div className={styles.cardBody}>
                                        {!data.bootstrapInfo.plugins || data.bootstrapInfo.plugins.length === 0 ? (
                                            <p><Translate id='pages.dumpviewer.plugins.noplugins'>No plugins to show.</Translate></p>) : (
                                            <>
                                                <p><Translate id='pages.dumpviewer.plugins.helptext'>Click on a plugin to view more information.</Translate></p>

                                                <Grid elementsPerRow={5}>
                                                    {data.bootstrapInfo.plugins.map(plugin => (
                                                        <div>
                                                            <b onClick={() => handlePluginClick(plugin)} className={styles.pluginName}>
                                                                {plugin.name} <div className={styles.pluginEnabledIndicator} style={{ backgroundColor: plugin.enabled ? "green" : "red" }} />
                                                            </b>

                                                            {activePlugin?.main === plugin.main ? (
                                                                <div ref={pluginPopoverRef} className={styles.pluginInfoPopover}>
                                                                    <p className={styles.pluginNamePopover}>{plugin.name}</p>
                                                                    <p>{plugin.version}</p>
                                                                    <p className={styles.pluginEnabled} style={{ backgroundColor: plugin.enabled ? "green" : "red" }}>{plugin.enabled ? "Enabled" : "Disabled"}</p>

                                                                    <p className={styles.pluginAuthorsLabel}>Authors:</p>
                                                                    <ul>
                                                                        {plugin.authors.map(author => <li>{author}</li>)}
                                                                    </ul>
                                                                </div>
                                                            ) : undefined}
                                                        </div>
                                                    ))}
                                                </Grid>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <Translate id='pages.dumpviewer.config'>Config</Translate>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <CodeBlock
                                            language='json'
                                            showLineNumbers
                                        >
                                            {JSON.stringify(data.config, null, 2)}
                                        </CodeBlock>
                                    </div>
                                </div>
                            </div>

                            <a target="_blank" href={`https://dump.geysermc.org/${dumpId}`} className={styles.viewDumpSource}><Translate id="pages.dumpviewer.viewsource">View dump source</Translate> {'>'}</a>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default function DumpViewer(): JSX.Element {
    return (
        <Layout
            title={`Dump Viewer`}
            description='View the breakdown of your Geyser dump.'
        >
            <main>
                <div className='container container--fluid margin-vert--lg'>
                    <DumpViewerPage />
                </div>
            </main>
        </Layout>
    )
}