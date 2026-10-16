import React from 'react';

type PlatformIconProps = {
    img?: string | null;
    svg?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
    text: string;
    width?: string;
    height?: string;
};

const PlatformIcon = ({ img = null, svg: SvgComponent = null, text="", width = '20px', height = '20px' }: PlatformIconProps) => {
    return (
        img != null ?
            <>
                <img src={img} style={{ width, height, position: 'relative', top: '3px', right: '3px' }}/>
                {text}&nbsp;
            </> :
        SvgComponent != null ?
            <>
                <SvgComponent style={{ width, height, position: 'relative', top: '3px', right: '3px' }}/>
                {text}&nbsp;
            </> : null
    );
};

export default PlatformIcon;