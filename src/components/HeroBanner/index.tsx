import React from 'react';
import styles from './styles.module.scss';

interface HeroBannerProps {
    title: React.ReactNode;
    subheading: React.ReactNode;
    backgroundImage: string;
}

const HeroBanner = ({ title, subheading, backgroundImage }: HeroBannerProps) => {
    return (
        <div
            className={styles.heroBanner}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.textSection}>
                <h1>{title}</h1>
                <p>{subheading}</p>
            </div>
        </div>
    );
};

export default HeroBanner;