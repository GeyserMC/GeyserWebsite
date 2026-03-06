import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.scss';

interface SoftwareStatsProps {
    githubStars: string;
    githubCommits: string;
    bstatsServers?: string;
    bstatsPlayers?: string;
}

const SoftwareStats: React.FC<SoftwareStatsProps> = ({ githubStars, githubCommits, bstatsServers, bstatsPlayers }) => {
    return (
        <div className={styles.statsSection}>
            <div className="container">
                <div className={styles.flex}>
                    <Stat
                        label="GitHub Stars"
                        value={githubStars}
                        whiteIcon="/img/icons/github-white.svg"
                        darkIcon="/img/icons/github-dark.svg"
                    />

                    <Stat
                        label="Commits"
                        value={githubCommits}
                        whiteIcon="/img/icons/commit-white.svg"
                        darkIcon="/img/icons/commit-dark.svg"
                    />

                    {bstatsServers && (
                        <Stat
                            label="Total Servers"
                            value={bstatsServers}
                            whiteIcon="/img/icons/server-white.svg"
                            darkIcon="/img/icons/server-dark.svg"
                        />
                    )}

                    {bstatsPlayers && (
                        <Stat
                            label="Total Players"
                            value={bstatsPlayers}
                            whiteIcon="/img/icons/user-white.svg"
                            darkIcon="/img/icons/user-dark.svg"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const Stat = ({ label, whiteIcon, darkIcon, value }) => {
    const { colorMode } = useColorMode();
    const icon = colorMode === 'dark' ? whiteIcon : darkIcon;

    return (
        <div className={styles.stat}>
            <img src={icon} className={styles.statImage} />
            <div className={styles.statContent}>
                <div className={styles.statLabel}>{label}</div>
                <div className={styles.statValue}>{value}</div>
            </div>
        </div>
    )
}

export default SoftwareStats;