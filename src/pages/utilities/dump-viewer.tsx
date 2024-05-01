import Translate from '@docusaurus/Translate';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.jpg';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import styles from './utilities.module.css';
import { Grid } from '@site/src/components/Grid';
import CodeBlock from '@theme/CodeBlock';

const DumpViewerPage: React.FC = () => {
    const [dumpId, setDumpId] = useState('');
    const [data, setData] = useState<any>({});
    const [statusMessage, setStatusMessage] = useState('');

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
            setStatusMessage('You haven't entered an ID or URL!');
            return;
        }
        let id = dumpId;

        if (dumpId.startsWith('https://dump.geysermc.org/')) {
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
                        <h2>Enter Dump ID or URL below and click load.</h2>
                        <input id='dump-url' className='form-input no-outline' value={dumpId} onChange={(e) => setDumpId(e.target.value)} placeholder='Dump ID/URL' />
                        <button className={styles.loadButton} onClick={handleLoadClick}>Load</button>

                        {statusMessage !== '' ? (
                            <div className={styles.statusMessage}>
                                <p dangerouslySetInnerHTML={{ __html: statusMessage }} />
                            </div>
                        ) : undefined}
                    </>
                ) : (
                    <>
                        <div className='d-none' id='dumpBreakdown'>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    Versions
                                </div>
                                <div className={styles.cardBody}>
                                    <Grid elementsPerRow={3} gap='8px'>
                                        <div>
                                            <b>Geyser Version</b><br />
                                            <p id='geyserVersion'>{data.versionInfo.version}</p>
                                        </div>
                                        <div>
                                            <b>Java Version</b><br />
                                            <p id='javaVersion'>{data.versionInfo.javaVersion} ({data.versionInfo.architecture})</p>
                                        </div>
                                        <div>
                                            <b>Operating System</b><br />
                                            <p id='osVersion'>{data.versionInfo.operatingSystem} ({data.versionInfo.operatingSystemVersion})</p>
                                        </div>
                                    </Grid>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        Geyser Version
                                    </div>
                                    <div className={styles.cardBody}>
                                        <Grid elementsPerRow={3} gap='8px'>
                                            <div>
                                                <b>Build</b><br />
                                                <p id='buildNumber'>{data.gitInfo['git.build.number'] ?? data.gitInfo.buildNumber}</p>
                                            </div>
                                            <div>
                                                <b>Commit Hash</b><br />
                                                <a id='commit' target='_blank' href={'https://github.com/GeyserMC/Geyser/commit/' + data.gitInfo['git.commit.id']}>{data.gitInfo['git.commit.id.abbrev']}</a>
                                            </div>
                                            <div>
                                                <b>Branch</b><br />
                                                <p id='branch'>{data.gitInfo['git.branch']}</p>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        Platform Info
                                    </div>
                                    <div className={styles.cardBody}>
                                        <Grid elementsPerRow={5} gap='8px'>
                                            <div>
                                                <b>Platform Identifier</b><br />
                                                <p id='platformIdentifier'>{data.bootstrapInfo.platform.platformName || data.bootstrapInfo.platform}</p>
                                            </div>
                                            <div>
                                                <b>Platform Name</b><br />
                                                <p id='platformName'>{data.bootstrapInfo.platformName ?? capitalizeFirstLetter(data.bootstrapInfo.platform.toLowerCase())}</p>
                                            </div>
                                            <div>
                                                <b>Platform Version</b><br />
                                                <p id='platformVersion'>{data.bootstrapInfo.platformVersion ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <b>Platform API Version</b><br />
                                                <p id='platformAPIVersion'>{data.bootstrapInfo.platformAPIVersion ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <b>Online Mode</b><br />
                                                <p id='onlineMode'>{data.bootstrapInfo.onlineMode !== null ? data.bootstrapInfo.onlineMode ? 'true' : 'false' : 'N/A'}</p>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        Config
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