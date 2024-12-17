import Translate from '@docusaurus/Translate';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import Layout from '@theme/Layout';
import styles from './utilities.module.scss';
import {useRef, useState} from 'react';

const ConfigEditorPage: React.FC = () => {
    const [config, setConfig] = useState('');
    const [parsedConfig, setParsedConfig] = useState<any>({});
    // match optional key
    const keyReg = /^#? ?[^:\sA-Z]+:(?!\S)/
    const editedConfig = useRef<any>({});
    const uploadRef = useRef<any>(null);

    const loadDefault = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/GeyserMC/Geyser/master/core/src/main/resources/config.yml');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            handleConfigLoad(text);
        } catch (error) {
            console.error('Failed to fetch default config:', error);
        }
    }

    const handleUpload = async (e) => {
        const fileName = e.target.files[0];

        // Makse sure the file is a .yml file
        if (!fileName.name.endsWith('.yml')) {
            alert('Please select a .yml config file!');
            return;
        }

        // Read the file
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            handleConfigLoad(e.target.result as string);
        }
        fileReader.readAsText(fileName);
    }

    const handleConfigLoad = (config: string) => {
        setConfig(config);
        setParsedConfig(loadConfig(config));
    }

    const loadConfig = (config: string) => {
        const lines = config.split('\n');
        let currentSection = '';
        let currentComment = '';

        const newConfig = {"": {}};

        let ignore = false;

        // Parse each line of the config
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            // Reset the section if we are no indented
            if (!line.startsWith('  ')) {
                currentSection = '';
            }

            // Ignore any empty lines
            line = line.trim()
            if (line === '') {
                currentComment = '';
                continue;
            }

            const commented = line.startsWith('#');

            const match = line.match(keyReg);
            if (match === null) {
                // Check if we are in a comment
                if (commented) {
                    currentComment += line.replace(/^# ?/i, '') + '<br>';
                }
                continue;
            }

            // Check if we are in a new section
            if (line.endsWith(':')) {
                currentSection = line.replace(':', '');

                // Ignore user auths section
                if (currentSection === 'saved-user-logins') {
                    ignore = true;
                    continue;
                }
                ignore = false;
                if (commented) {
                    currentComment += '<strong>Note: This option is commented out by default. It will be automatically uncommented if modified.</strong>' + '<br>';
                }

                currentComment = currentComment.replace(URL_REGEX, function ($0) {
                    return '<a href="' + $0 + '">' + $0 + '</a>';
                })
                newConfig[currentSection] = {sectionDesc0: currentComment};
                currentComment = '';
                continue;
            }

            if (ignore) {
                continue;
            }

            // Get the key and value
            const splitLine = line.split(':');
            splitLine[0] = splitLine[0].trim();
            let val = '';
            for (let j = 1; j < splitLine.length; j++) {
                val += splitLine[j];
            }
            val = val.trim();

            if (splitLine[0].includes('proxy-protocol-whitelisted-ips')) {
                currentComment = '';
                continue;
            }

            if (commented) {
                currentComment += '<strong>Note: This option is commented out by default. It will be automatically uncommented if modified.</strong>' + '<br>';
            }

            currentComment = currentComment.replace(URL_REGEX, function ($0) {
                return '<a href="' + $0 + '">' + $0 + '</a>';
            })

            // Add the config option to the config object
            newConfig[currentSection][splitLine[0]] = {
                desc: currentComment,
                value: val,
                line: i
            };

            // Reset the comment
            currentComment = '';
        }
        return newConfig;
    }

    const generateHTML = (config: any) => {
        return Object.keys(config).map(configKey => (
            <div key={configKey} className={styles.card}>
                <div className={styles.cardHeader}>{configKey === '' ? 'Root' : configKey}</div>
                <div className={styles.cardBody}>
                    {Object.keys(config[configKey]).map(configOption => {
                        const configOptionInfo = config[configKey][configOption];
                        if (configOption == "sectionDesc0") {
                            if (configOptionInfo === "") {
                                return;
                            }
                            return (
                                <div className={styles.configOption}>
                                    <p dangerouslySetInnerHTML={{__html: configOptionInfo}}/>
                                </div>
                            )
                        }
                        const configOptionKey = configKey === '' ? configOption : `${configKey}.${configOption}`;
                        const showOptionName = configOption.replace('#', '').trim()
                        return (
                            <div key={configOptionKey} className={styles.configOption}>
                                <h3>{showOptionName}</h3>
                                <p dangerouslySetInnerHTML={{__html: configOptionInfo.desc}}/>
                                {getInput(configOptionKey, configOptionInfo.value)}
                            </div>
                        )
                    })}
                </div>
            </div>
        ))
    }

    const URL_REGEX = /https?:\/\/(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%\/.\-_]*)?(\?[0-9a-z=&%_\-]*)?(#[0-9a-z=&%_\-]*)?/ig;

    const handleExport = () => {
        let newConfig = config;
        const lines = newConfig.split('\n');
        Object.entries(editedConfig.current).forEach(([key, value]) => {
            const keys = key.split('.');
            let currentObj = parsedConfig;

            keys.forEach((nestedKey, index) => {
                if (currentObj.hasOwnProperty(nestedKey)) {
                    if (index === keys.length - 1) {
                        const option = currentObj[nestedKey];
                        const oldValue = option.value;
                        const index = option.line;
                        const newKey = nestedKey.replace('#', '').trim();
                        lines[index] = lines[index].replace(`  ${nestedKey}: ${oldValue}`, `  ${newKey}: ${value}`);
                    } else {
                        currentObj = currentObj[nestedKey];
                    }
                }
            });
        });
        newConfig = lines.join('\n');

        // Trigger a download of the final config
        downloadString(newConfig, 'text/plain', 'config.yml');
    }

    function getInput(name, value) {
        const handleChange = (event) => {
            const {id, value, type, checked} = event.target;

            editedConfig.current = {
                ...editedConfig.current,
                [id]: type === 'checkbox' ? checked.toString() : value
            };
        }

        switch (name) {
            // Handle all the dropdowns
            case 'remote.auth-type':
                return (
                    <select key={name} className={styles.formInput} id={name} defaultValue={value}
                            onChange={handleChange}>
                        <option value='offline'>offline</option>
                        <option value='online'>online</option>
                        <option value='floodgate'>floodgate</option>
                    </select>
                );
            case 'show-cooldown':
                return (
                    <select key={name} className={styles.formInput} id={name} defaultValue={value}
                            onChange={handleChange}>
                        <option value='title'>title</option>
                        <option value='actionbar'>actionbar</option>
                        <option value='false'>false</option>
                    </select>
                );
            case 'emote-offhand-workaround':
                return (
                    <select key={name} className={styles.formInput} id={name} defaultValue={value}
                            onChange={handleChange}>
                        <option value='disabled'>disabled</option>
                        <option value='no-emotes'>no-emotes</option>
                        <option value='emotes-and-offhand'>emotes-and-offhand</option>
                    </select>
                );
            case 'config-version':
                return <input key={name} className={styles.formInput} type='text' disabled
                              defaultValue={value.replace(/"/g, '')}/>;
            case 'metrics.uuid':
                return <input key={name} className={styles.formInput} id={name} type='text' disabled
                              defaultValue={value === 'generateduuid' ? crypto.randomUUID() : value}/>;

            default:
                // Handle all the other inputs
                if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                    // Boolean
                    return (
                        <div key={name}>
                            <input className={styles.checkbox} type='checkbox' id={name}
                                   defaultChecked={value.toLowerCase() === 'true'} onChange={handleChange}/>
                        </div>
                    );
                } else if (!isNaN(value)) {
                    // Number
                    return <input key={name} className={styles.formInput} type='number' defaultValue={value}
                                  id={name} onChange={handleChange}/>;
                } else {
                    // String
                    return <input key={name} className={styles.formInput} type='text'
                                  defaultValue={value.replace(/"/g, '')} id={name} onChange={handleChange}/>;
                }
        }
    }

    // From https://gist.github.com/danallison/3ec9d5314788b337b682
    function downloadString(text, fileType, fileName) {
        const blob = new Blob([text], {type: fileType})

        const a = document.createElement('a')
        a.download = fileName
        a.href = URL.createObjectURL(blob)
        a.dataset.downloadurl = [fileType, a.download, a.href].join(':')
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        setTimeout(() => {
            URL.revokeObjectURL(a.href)
        }, 1500)
    }

    const NoConfigSection = () => (
        <>
            <h1><Translate id='pages.configeditor.noconfigselected.heading'>No config selected.</Translate></h1>
            <h3 className={styles.fontNormal}><Translate id='pages.configeditor.noconfigselected.subheading'>Upload a
                file or get started with the default config!</Translate></h3>

            <div className={styles.buttonsContainer}>
                <button className={styles.button} onClick={loadDefault}>
                    <Translate id='pages.configeditor.button.defaultconfig'>Default</Translate>
                </button>

                <button className={styles.button} onClick={() => uploadRef.current.click()}>
                    <input
                        ref={uploadRef}
                        type='file'
                        className={styles.hidden}
                        accept='.yml'
                        onChange={handleUpload}
                    />
                    <Translate id='pages.configeditor.button.upload'>Upload</Translate>
                </button>
            </div>
        </>
    )

    const EditorView = () => (
        <>
            <div className={styles.buttonsContainer} style={{marginBottom: '30px'}}>
                <button className={styles.button} onClick={handleExport}>
                    <Translate id='pages.configeditor.button.export'>Export</Translate>
                </button>
            </div>
            {generateHTML(parsedConfig)}
        </>
    )

    return (
        <>
            <HeroBanner
                title={<Translate id='pages.configeditor.title'>Config Editor</Translate>}
                subheading={<Translate id='pages.configeditor.subheading'>Edit your Geyser configuration.</Translate>}
                backgroundImage={HeroBackground}
            />

            <div className='container' style={{marginTop: '30px'}}>
                {Object.keys(parsedConfig).length === 0 ? <NoConfigSection/> : <EditorView/>}
            </div>


            <section id='config-options'></section>
        </>
    )
}

export default function ConfigEditor(): JSX.Element {
    return (
        <Layout
            title={`Config Editor`}
            description='Edit your Geyser configuration.'
        >
            <main>
                <div className='container container--fluid margin-vert--lg'>
                    <ConfigEditorPage/>
                </div>
            </main>
        </Layout>
    )
}
