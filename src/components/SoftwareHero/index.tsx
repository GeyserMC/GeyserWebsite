import React from 'react';
import styles from './styles.module.scss';

interface SoftwareHeroProps {
    icon?: string;
    software: string;
    tagline?: string;
    description: string;
    downloadsUrl: string;
    docsUrl: string;
}

const SoftwareHero: React.FC<SoftwareHeroProps> = ({ icon, software, tagline, description, downloadsUrl, docsUrl }) => {
    return (
        <div className={styles.heroBanner}>
            <div className="container">
                {icon && <img src={icon} className={styles.icon} />}

                <h1 className={styles.software}>{software}</h1>
                <p className={styles.tagline}>{tagline}</p>
                <p className={styles.description}>{description}</p>

                <div className={styles.buttons}>
                    <a href={downloadsUrl} className={styles.button}>
                        Downloads
                    </a>
                    <a href={docsUrl} className={styles.button}>
                        Documentation
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SoftwareHero;