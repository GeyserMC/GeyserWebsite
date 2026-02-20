import { PropsWithChildren } from 'react';
import styles from "./styles.module.scss";
import clsx from 'clsx';

interface SoftwareFeatureProps {
    title: string;
    image?: string;
    flipped?: boolean;
}

export default function SoftwareFeature({ title, image, flipped, children }: PropsWithChildren<SoftwareFeatureProps>) {
    return (
        <div className={clsx(styles.feature, { [styles.flipped]: flipped })}>
            <div className={clsx(styles.content, "text--left padding-horiz--md")}>
                <h3 className={styles.title}>{title}</h3>
                {children}
            </div>
            {image && (
                <div>
                    <img src={image} alt={title} />
                </div>
            )}
        </div>
    );
}