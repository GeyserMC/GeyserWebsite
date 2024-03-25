import React, { ReactSVGElement } from 'react';
import type { DocsPageData, ImageRenderer, ImageGeneratorOptions, BlogPageData, PageData } from '@kas-tle/docusaurus-og';
import { join } from 'path';
import { readFileSync } from 'fs'
import { faDownload, faHouse, faBlog, faBook, IconDefinition } from '@fortawesome/free-solid-svg-icons';

const geyserLogo = join(__dirname, '../../static/img/icons/geyser.png');
const geyserLogoBase64 = `data:image/png;base64,${readFileSync(geyserLogo).toString('base64')}`;

const titleElement = ({ children }) => React.createElement(
    'label',
    {
        style: {
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: 1,
            margin: '25px 225px 10px 0px',
            color: '#e3e3e3',
            wordBreak: 'break-word',
        }
    },
    children
);

const docsSvgElement = faSvg(faBook);
const blogSvgElement = faSvg(faBlog);
const homeSvgElement = faSvg(faHouse);
const downloadSvgElement = faSvg(faDownload);

const geyserLogoElement = React.createElement(
    'img',
    {
        src: geyserLogoBase64,
        style: {
            position: 'absolute',
            top: 20,
            right: 20,
            width: 225,
            height: 225,
            borderRadius: '50%',
            border: '10px solid #e3e3e3'
        },
    },
)

const headerElement = (header: string, svg: ReactSVGElement) => React.createElement(
    'div',
    {
        style: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 20,
            left: 40,
        },
    },
    svg,
    React.createElement(
        'label',
        {
            style: {
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: 1,
                color: '#e3e3e3',
            },
        },
        header,
    ),
)

const rootDivStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: '10px 40px',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    fontSize: 32,
    fontWeight: 400,
    backgroundColor: '#0f1b23',
    color: '#e3e3e3',
    borderBottom: '2rem solid rgb(37, 194, 160)',
};

export const docOgRenderer: ImageRenderer<DocsPageData> = async (data, context) => {
    const element = React.createElement(
        'div',
        { style: rootDivStyle },
        React.createElement(titleElement, null, data.metadata.title),
        React.createElement('div', null, data.metadata.description),
        geyserLogoElement,
        headerElement(docSectionPath(data.metadata.slug, context.siteConfig.title), docsSvgElement),
    );

    return [
        element,
        await imageGeneratorOptions(),
    ];
};

export const blogOgRenderer: ImageRenderer<BlogPageData> = async (data, context) => {
    const isPost = data.pageType === 'post';

    let posterImageElement = undefined;
    if (isPost && data.data.metadata.authors.length > 0) {
        // Create line of all author avatar images in top right corner
        const authorImages = data.data.metadata.authors.map(async author => React.createElement(
            'img',
            {
                src: await encodeRemoteImage(author.imageURL),
                style: {
                    width: 112.5,
                    height: 112.5,
                    marginRight: 10,
                    borderRadius: '50%',
                    border: '10px solid #e3e3e3',
                },
            },
        ));

        posterImageElement = React.createElement(
            'div',
            {
                style: {
                    display: 'flex',
                    position: 'absolute',
                    top: 20,
                    right: 175,
                },
            },
            ...await Promise.all(authorImages),
        );
    }
    
    const element = React.createElement(
        'div',
        { style: rootDivStyle },
        React.createElement(titleElement, null, isPost ? data.data.metadata.title : context.siteConfig.title + ' Blog'),
        React.createElement('div', null, isPost ? data.data.metadata.description : ''),
        geyserLogoElement,
        posterImageElement,
        headerElement(context.siteConfig.title + ' / Blog' + (isPost ? ` / ${new Date(data.data.metadata.date).toISOString().split('T')[0].replaceAll('-','.')}` : ''), blogSvgElement),
    );

    return [
        element,
        await imageGeneratorOptions(),
    ];
};

export const pageOgRenderer: ImageRenderer<PageData> = async (data, context) => {
    const extraTitleLength = (' ' + context.siteConfig.titleDelimiter + ' ' + context.siteConfig.title).length;
    await data.document.load();

    const title = (data.document.loaded && data.document.root.querySelector('title')?.textContent).slice(0, -extraTitleLength) || context.siteConfig.title;
    const description = (data.document.loaded && data.document.root.querySelector('meta[name="description"]').getAttribute('content')) || context.siteConfig.tagline;

    const element = React.createElement(
        'div',
        { style: rootDivStyle },
        React.createElement(titleElement, null, title),
        React.createElement('div', null, description),
        geyserLogoElement,
        headerElement(context.siteConfig.title + ' / ' + title, pageSvg(data.metadata.permalink)),
    );

    return [
        element,
        await imageGeneratorOptions(),
    ];
};

const imageGeneratorOptions = async (): Promise<ImageGeneratorOptions> => {
    return {
        width: 1200,
        height: 600,
        fonts: [
            {
                name: 'Montserrat',
                data: await getTtfFont('Montserrat', ['ital', 'wght'], [0, 400]),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Montserrat',
                data: await getTtfFont('Montserrat', ['ital', 'wght'], [0, 600]),
                weight: 600,
                style: 'normal',
            },
            {
                name: 'Montserrat',
                data: await getTtfFont('Montserrat', ['ital', 'wght'], [0, 800]),
                weight: 800,
                style: 'normal',
            },
        ],
    };
}

function docSectionPath(slug: string, title: string) {
    let section = slug.split('/')[1].toString();

    // Override some sections by slug
    switch (section) {
        case 'api':
            section = 'REST APIs';
            break;
    }
    
    section = section.charAt(0).toUpperCase() + section.slice(1);

    return `${title} / ${section}`;
}

function pageSvg(permalink: string) {
    switch (permalink.slice(1, -1)) {
        case 'download':
            return downloadSvgElement;
        default:
            return homeSvgElement;
    }
}

async function getTtfFont(family: string, axes: string[], value: number[]): Promise<ArrayBuffer> {
    const familyParam = axes.join(',') + '@' + value.join(',');

    // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure TTF is returned
    const cssCall = await fetch(`https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 Firefox/1.0',
        },
    });

    const css = await cssCall.text();
    const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

    return await fetch(ttfUrl).then(res => res.arrayBuffer());
}

async function encodeRemoteImage(url: string): Promise<string> {
    try {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer().then(buf => Buffer.from(buf));
        return `data:${res.headers.get('content-type')};base64,${buffer.toString('base64')}`;
    } catch (error) {
        return geyserLogoBase64;
    }
}

function faSvg(icon: IconDefinition): ReactSVGElement {
    // create all path elements from icon.icon[4] contents (could be string or array of strings)
    const paths = typeof icon.icon[4] === 'string' ? [icon.icon[4]] : icon.icon[4];
    const svgPaths = paths.map((path: string) => React.createElement('path', { d: path, fill: '#e3e3e3' }));
    const viewBox = '0 0 ' + icon.icon[0] + ' ' + icon.icon[1];

    const element = React.createElement('svg', {
        width: '50px',
        viewBox,
        style: { marginRight: 10 },
    }, ...svgPaths);

    return element;
}