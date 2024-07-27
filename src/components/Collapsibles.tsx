import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export const Collapsibles = ({ children }) => {
    return (
        <div className="collapsible">
            {children}
        </div>
    );
};

interface CollapsibleProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    tags?: string[];
    inner: React.ReactNode;
    id: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ title, subtitle, inner, tags = [], id }) => {
    const query = useQuery();
    const history = useHistory();

    const initialExpandedState = query.get(id) === 'expanded';
    const [isInnerVisible, setIsInnerVisible] = useState(initialExpandedState);
    const innerRef = useRef<HTMLDivElement>(null);
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (innerRef.current) {
                setInnerHeight(isInnerVisible ? innerRef.current.scrollHeight : 0);
            }
        };

        updateHeight();

        const observer = new MutationObserver(updateHeight);
        if (innerRef.current) {
            observer.observe(innerRef.current, { childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
        };
    }, [isInnerVisible]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (isInnerVisible) {
            params.set(id, 'expanded');
        } else {
            params.delete(id);
        }
        history.replace({ search: params.toString() });
    }, [isInnerVisible, id, history]);

    const toggleVisibility = () => {
        setIsInnerVisible(!isInnerVisible);
    };

    return (
        <div className="collapsible">
            <div className="collapsible-header" onClick={toggleVisibility}>
                <p>
                    <span className="collapsible-title">
                        {title}
                        {tags.map((tag, index) => (
                            <span key={index} className='badge badge--primary' style={{ marginLeft: "0.25rem" }}>{tag}</span>
                        ))}
                    </span>
                    {subtitle && <span className="collapsible-subtitle"><br />{subtitle}</span>}
                </p>
                <span className={isInnerVisible ? 'collapsible-arrow expanded' : 'collapsible-arrow'}></span>
            </div>
            <div className="collapsible-line"></div>
            <div className="inner" ref={innerRef} style={{ height: `${innerHeight}px` }}>
                <div className="inner-content">
                    {inner}
                </div>
            </div>
        </div>
    );
};