import * as React from 'react';
import { AccordionActions, Box, Button, Container, Icon, IconButton, InputAdornment, Paper, Slider, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AlarmsList from 'src/components/full/elements/AlarmsList';
import ConfigCategoryLabel from 'src/components/full/elements/ConfigCategoryLabel';
import PageBuilder from 'src/components/PageBuilder';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { IAlarmMetadata } from '../../types/IAlarmMetadata'
import { Expand, Visibility } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { HexColorPicker } from "react-colorful";
import AlarmConfigCategoryOuter from 'src/components/AlarmConfigCategoryOuter';
import SliderColorPicker from 'trillli/src/components/SliderColorPicker'
import { IAlarmCategoryGroupName, IAlarmConfigCategoryMetadata, IAlarmConfigComponentSkeleton, IAlarmConfigStateControl } from 'src/components/types/AlarmConfigComponentSkeletons';
import AlarmConfigCategoryDetailBodyLightColor from 'src/components/AlarmConfigCategoryDetailBodyLightColor';
import IAlarmConfigCategoryDetailStateControl from 'src/components/types/IAlarmConfigCategoryDetailStateControl';
import AlarmConfigCategoryDetailBodyLightStart from 'src/components/AlarmConfigCategoryDetailBodyLightStart';
import AlarmConfigCategoryDetailBodyLightBrightness from 'src/components/AlarmConfigCategoryDetailBodyLightBrightness';
import AlarmConfigCategoryDetailBodyLightBrightnessProfile from 'src/components/AlarmConfigCategoryDetailBodyLightBrightness';
import AlarmConfigCategoryDetailBodyLightProfile from 'src/components/AlarmConfigCategoryDetailBodyLightProfile';
import AlarmConfigCategoryDetailBodyVibration from 'src/components/AlarmConfigCategoryDetailBodyVibration';
import AlarmConfigCategoryDetailBodyVibrationStart from 'src/components/AlarmConfigCategoryDetailBodyVibrationStart';
import AlarmConfigCategoryDetailSoundSource from 'src/components/AlarmConfigCategoryDetailSoundSource';
import AlarmConfigCategoryDetailBodySoundSearch from 'src/components/AlarmConfigCategoryDetailBodySoundSearch';
import AlarmConfigCategoryDetailBodySoundVolume from 'src/components/AlarmConfigCategoryDetailBodySoundVolume';


const AlarmsHome: React.FC = () => {

    //PLACEHOLDERS ---------------------------------------------------------------------------------

    //Paceholder: for const [alarms, setAalrms] = React.useState(), data type something like {[key: string]: AlarmMetadata}, AlarmMetadata should be a custom type with key=alarm name and then fields holding the alarm config
    // In fact, may make Alarm objet, with methods like getLightColor, getVibrationTiming, etc, so astract all the checks for undefined etc
    let alarms: { [key: string]: IAlarmMetadata } = {
        alarm_1: {
            name: 'Work Morning',
            created: 1707533238,
            edited: [
                1707539001,
                1707540123,
            ],
            light: {
                color: 'orange',
                timing: {
                    advance_seconds: 1800
                },
                luminosity: {
                    start: 0,
                    end: 100,
                    profile: 'linear'
                }
            },
            sound: {
                source: 'spotify',
                type: 'songg',
                title: 'Rattlesnake',
                artist: 'King Gizzard and the Wizard Lizard',
                volume: {
                    start: 30,
                    end: 100,
                    ramp_seconds: '300'
                }
            },
            vibration: {
                timing: {
                    advance_seconds: -300
                }
            },
            timing: {
                time: '6:00am',
                days: {
                    m: true,
                    tu: true,
                    w: true,
                    th: true,
                    f: true,
                    sa: false,
                    su: false
                },
            },
        },
        alarm_2: {
            name: 'Easy Morning Wakeup',
            created: 1707534238,
            light: {
                color: 'blue',
                timing: {
                    advance_seconds: 600
                },
                luminosity: {
                    end: 100,
                }
            },
            sound: {
                source: 'spotify',
                type: 'playlist',
                title: 'Beep Boop',
                artist: 'Tim Johnston',
                volume: {
                    end: 100,
                }
            },
            timing: {
                time: '8:30am',
                days: {
                    m: false,
                    tu: false,
                    w: false,
                    th: false,
                    f: false,
                    sa: true,
                    su: true
                },
            },
        },
        alarm_3: {
            name: 'D&D',
            created: 1707033238,
            edited: [
                1707531001,
            ],
            sound: {
                source: 'spotify',
                type: 'album',
                title: 'Baldur\'s Gate 3 (Original Game Soundtrack)',
                artist: 'Borislav Slavov',
                volume: {
                    start: 50,
                    end: 75,
                    ramp_seconds: 1800
                }
            },
            timing: {
                time: '6:30pm',
                days: {
                    m: false,
                    tu: true,
                    w: false,
                    th: false,
                    f: false,
                    sa: false,
                    su: false
                },
            },
        }
    }

    //----------------------------------------------------------------------------------------------



    //STATE VARIALES, REFS, VARIABLES  ----------------------------------------------------------------------
    const [soundSource, setSoundSource] = React.useState<string>('spotify')
    const [soundType, setSoundType] = React.useState<'song' | 'playlist' | 'artist'>('song')
    const [soundSong, setSoundSong] = React.useState<string>('')
    const [soundPlaylist, setSoundPlaylist] = React.useState<string>('')
    const [soundArtist, setSoundArtist] = React.useState<string>('')
    const [soundVolumeProfile, setSoundVolumeProfile] = React.useState<'constant' | 'ramp'>('constant')
    const [soundVolumeMax, setSoundVolumeMax] = React.useState<number>(50)
    const [soundVolumeConstant, setSoundVolumeConstant] = React.useState<number>(soundVolumeMax)
    const [soundVolumeRamp, setSoundVolumeRamp] = React.useState<number[]>([0, soundVolumeMax])
    // const [soundVolumeRampDuration, setSoundVolumeRampDuration] = React.useState<number>(30)

    const [lightAdvanceMinutes, setLightAdvanceMinutes] = React.useState<number>(-15)
    const [lightColor, setLightColor] = React.useState<number>(60);
    const [lightBrightnessType, setLightBrightnessType] = React.useState<'constant' | 'ramp'>('constant')
    const [lightBrightnessMax, setLightBrightnessMax] = React.useState<number>(75)
    const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(lightBrightnessMax)
    const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([25, lightBrightnessMax])

    const [vibrationStartTime, setVibrationStartTime] = React.useState<number>(0)
    const [vibrationType, setVibrationType] = React.useState<'constant' | 'ramp'>('constant')
    const [vibrationEnd, setVibrationEnd] = React.useState<number>(75)
    const [vibrationConstant, setVibrationConstant] = React.useState<number>(vibrationEnd)
    const [vibrationRamp, setVibrationRamp] = React.useState<number[]>([0, vibrationEnd]) 



    //----------------------------------------------------------------------------------------------

    React.useEffect(() => {
        setSoundVolumeConstant(soundVolumeMax)
        setSoundVolumeRamp([soundVolumeRamp[0], soundVolumeMax])
    }, [soundVolumeMax])

    React.useEffect(() => {
        setLightBrightnessConstant(lightBrightnessMax)
        setLightBrightnessRamp([lightBrightnessRamp[0], lightBrightnessMax])
    }, [lightBrightnessMax])

    React.useEffect(() => {
        setVibrationConstant(vibrationEnd)
        setVibrationRamp([vibrationRamp[0], vibrationEnd])
    }, [vibrationEnd])

    //----------------------------------------------------------------------------------------------

    //HELPER FUNCTIONS

    function searchForSound() {
        console.log('searching for sound. should have a state variable tracking whether any search fetch requests are still out, and if so keep the results visible but grayed out')
    }

    //----------------------------------------------------------------------------------------------



    //EVENT HANDLERS
    const handleAddAlarm = () => {
        console.log('Handling add alarm: Need to create empty alarm config')
    }

    const handleSaveAlarm = () => {
        console.log('Handling save alarm: Need to post alarm to server')
    }

    const handleDeleteAalrm = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('Handling delete alarm: Need to stop propagation and send delete request to server & rerender alarms list')
    }

    const handleAlarmExpand = (event: React.SyntheticEvent, expanded: boolean) => {
        console.log('Handling expansion of an alarm; need to enlarge / emphasize timing options')
        console.log('Expanded flag: ' + expanded)
    }

    const handleToggleSummary = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('Handling toggle alarm summary: Need to stop propogation and switch summary visibility toggle status state variable')
    }

    const handleSummaryTimeClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling summary time click. Need to stop propogation and trigger the time picker')
        event.stopPropagation()
    }

    const handleSummaryDayClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling summary day click. Need to stop propogation and style the selected/unselected dates')
        event.stopPropagation()
    }

    const handleToggleAlarmStatusClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling alarm status toggle click. Need to stop propogation and enable/disable the alarm')
        event.stopPropagation()
    }

    const handleSort = () => {
        console.log('Handling sort: Need to sort the alarms list.')
    }

    const handleSearch = () => {
        console.log('Handling search: Need to search / filter the alarms list.')
    }

    const handleSoundSourceChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log('TODO')
    }

    const handleSoundTypeChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        let value: string = target.value
        const valueTyped: 'song' | 'playlist' | 'artist' = ((['song', 'playlist', 'artist'].includes(value)) ? value : 'constant') as 'song' | 'playlist' | 'artist'
        setSoundType(valueTyped)
    }

    const handleSoundSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoundSong(event.target.value)
    }

    const handleSoundPlaylistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handling sound playlist change')
        setSoundPlaylist(event.target.value)
    }

    const handleSoundArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handling sound artist change')
        setSoundArtist(event.target.value)
    }

    const handleSoundVolumeProfileChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        let value: string = target.value
        const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'
    }

    const handleSoundVolumeConstantChange = (event: Event, value: number | number[]) => {
        setSoundVolumeMax(value as number)
    }

    const handleSoundVolumeRampChange = (event: Event, value: number | number[]) => {
        const valueTyped = value as number[]
        setSoundVolumeRamp(valueTyped)
    }

    const handleCategorySwitchClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling category switch click; Need to toggle category status and stop propogation')
        event.stopPropagation()
    }

    const handleLightAdvanceMinutesSliderChange = (event: Event) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        console.log('handling light advance minutes change')
        setLightAdvanceMinutes(value)
    }

    const handleLightColorChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log('handling light color change; need to modify lightColor state variable')
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setLightColor(value)
    }

    const handleLightBrightnessTypeChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling light brightness toggler change. need to change corresponding state variable and show/hide other input elements based on that selection')
        const target: HTMLInputElement = event.target as HTMLInputElement
        let value: string = target.value
        const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'

        setLightBrightnessType(valueTyped)
    }

    const handleLightBrightnessChangeConstant = (event: Event, value: number | number[]) => {
        console.log('Handling light brightness constant slider change')
        setLightBrightnessMax(value as number)
    }

    const handleLightBrightnessChangeRamp = (event: Event, value: number | number[]) => {
        console.log('Handling light brightness ramp slider change')
        const values = value as number[]
        setLightBrightnessRamp(values as number[])
        setLightBrightnessMax(values[1] as number)
    }

    const handleVibrationStartTimeChange = (event: Event) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setVibrationStartTime(value)
    }

    const handleVibrationTypeChange = (event: React.MouseEvent<HTMLInputElement>) => {
        console.log('handling vibration type toggler change')
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: string = target.value
        setVibrationType(value)
    }

    const handleVibrationChangeConstant = (event: Event, value: number | number[]) => {
        console.log('Handling vibration constant slider change')
        setVibrationEnd(value as number)
    }

    const handleVibrationChangeRamp = (event: Event, value: number | number[]) => {
        console.log('Handling vibration constant slider change')
        const values = value as number[]
        setVibrationRamp(values as number[])
        setVibrationEnd(values[1] as number)
    }


    const alarmConfigStateControl: IAlarmConfigStateControl = {
        sound: {
            vars: {
                soundSource: soundSource,
                soundType: soundType,
                soundSong: soundSong,
                soundPlaylist: soundPlaylist,
                soundArtist: soundArtist,
                soundVolumeProfile: soundVolumeProfile,
                soundVolumeConstant: soundVolumeConstant,
                soundVolumeRamp: soundVolumeRamp
            },
            handlers: {
                handleSoundSourceChange: handleSoundSourceChange,
                handleSoundTypeChange: handleSoundTypeChange,
                handleSoundSongChange: handleSoundSongChange,
                handleSoundPlaylistChange: handleSoundPlaylistChange,
                handleSoundArtistChange: handleSoundArtistChange,
                handleSoundVolumeProfileChange: handleSoundVolumeProfileChange,
                handleSoundVolumeConstantChange: handleSoundVolumeConstantChange,
                handleSoundVolumeRampChange: handleSoundVolumeRampChange
            }
        },
        light: {
            vars: {
                lightAdvanceMinutes: lightAdvanceMinutes,
                lightColor: lightColor,
                lightBrightnessType: lightBrightnessType,
                lightBrightnessConstant: lightBrightnessConstant,
                lightBrightnessRamp: lightBrightnessRamp
            },
            handlers: {
                handleCategorySwitchClick: handleCategorySwitchClick,
                handleLightAdvanceMinutesSliderChange: handleLightAdvanceMinutesSliderChange,
                handleLightColorChange: handleLightColorChange,
                handleLightBrightnessTypeChange: handleLightBrightnessTypeChange,
                handleLightBrightnessChangeConstant: handleLightBrightnessChangeConstant,
                handleLightBrightnessChangeRamp: handleLightBrightnessChangeRamp,
            }
        },
        vibration: {
            vars: {
                lightColor: lightColor,
                vibrationStartTime,
                vibrationType: vibrationType,
                vibrationConstant: vibrationConstant,
                vibrationRamp: vibrationRamp,
            },
            handlers: {
                handleVibrationStartTimeChange: handleVibrationStartTimeChange,
                handleVibrationChangeConstant: handleVibrationChangeConstant,
                handleVibrationChangeRamp: handleVibrationChangeRamp,
                handleVibrationTypeChange: handleVibrationTypeChange
            }
        }
    }

    const alarmConfigCategoryMetadata: IAlarmConfigCategoryMetadata = {
        stateControl: alarmConfigStateControl,
        groups: {
            sound: {
                label: 'Music',
                id: 'sound',
                icon: 'music_note',
                fieldNamesOrdered: ['source', 'search', 'volume'],
                fields: {
                    source: {
                        label: 'Sound Source',
                        id: 'source',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailSoundSource {...alarmConfigStateControl.sound} />
                    },
                    search: {
                        label: 'Select You Alarm Music',
                        id: 'type',
                        showHeader: false,
                        body: <AlarmConfigCategoryDetailBodySoundSearch {...alarmConfigStateControl.sound} />
                    },
                    volume: {
                        label: 'Volume',
                        id: 'volume',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailBodySoundVolume {...alarmConfigStateControl.sound} />
                    },
                }
            },
            light: {
                label: 'Sunlight',
                id: 'light',
                icon: 'wb_twilight',
                fieldNamesOrdered: ['start_relative', 'color', 'brightness'],
                fields: {
                    start_relative: {
                        label: 'Turn light on ' + (Math.abs(alarmConfigStateControl.light.vars.lightAdvanceMinutes)) + ' ' + (Math.abs(alarmConfigStateControl.light.vars.lightAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (alarmConfigStateControl.light.vars.lightAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm time',
                        id: 'start',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailBodyLightStart {...alarmConfigStateControl.light} />
                    },
                    color: {
                        label: 'Color',
                        id: 'color',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailBodyLightColor {...alarmConfigStateControl.light} />
                    },
                    brightness: {
                        label: 'Brightness',
                        id: 'brightness',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailBodyLightBrightness {...alarmConfigStateControl.light} />
                    }
                }
            },
            vibration: {
                label: 'Vibration',
                id: 'vibration',
                icon: 'vibration',
                fieldNamesOrdered: ['start_relative', 'intensity'],
                fields: {
                    start_relative: {
                        label: 'Begin vibration ' + (Math.abs(alarmConfigStateControl.vibration.vars.vibrationStartTime)) + ' ' + (Math.abs(alarmConfigStateControl.vibration.vars.vibrationStartTime) == 1 ? 'minute' : 'minutes') + ' ' + (alarmConfigStateControl.vibration.vars.vibrationStartTime > 0 ? 'after' : 'before') + ' alarm time',
                        id: 'start',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailBodyVibrationStart {...alarmConfigStateControl.vibration} />
                    },
                    intensity: {
                        label: 'Intensity',
                        id: 'intensity',
                        showHeader: true,
                        body: <AlarmConfigCategoryDetailBodyVibration {...alarmConfigStateControl.vibration} />
                    }
                }
            }
        }
    }


    //----------------------------------------------------------------------------------------------

    //COMPONENT GENERATION
    const generateAlarmComponents = () => {

        const alarmNames: string[] = Object.keys(alarms)

        //Loop over all alarms; for each one, generate their config components
        let alarmComponentsList: React.ReactNode[] = []
        alarmNames.forEach((alarmKey) => {

            //Get alarm metadata
            const alarmMetadata: IAlarmMetadata = alarms[alarmKey]
            const alarmName = alarmMetadata.name

            const alarmItemContent =
                <Accordion key={alarmKey} className='alarm-container' onChange={handleAlarmExpand}>
                    <AccordionSummary className='alarm-header' expandIcon={<ExpandMoreIcon />}>
                        <Box className='alarm-essentials'>
                            <Box className='alarm-title'>
                                <Typography>{alarmName}</Typography>
                            </Box>
                            <Box className='alarm-status'>
                                <Switch onClick={handleToggleAlarmStatusClick} />
                            </Box>
                        </Box>
                        <Box className='alarm-summary'>
                            <Box className='alarm-summary-timing'>
                                <Typography onClick={handleSummaryTimeClick}>{alarmMetadata.timing.time}</Typography>
                                <Box className='alarm-summary-days'>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>Su</Button>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>M</Button>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>Tu</Button>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>W</Button>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>Th</Button>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>F</Button>
                                    <Button onClick={handleSummaryDayClick} className='alarm-day alarm-summary-day'>Sa</Button>
                                </Box>
                            </Box>
                            <IconButton onClick={handleDeleteAalrm}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails className='alarm-config-categories-container'>
                        <AlarmConfigCategoryOuter alarmConfigCategoryMetadata={alarmConfigCategoryMetadata} />
                    </AccordionDetails>
                </Accordion>

            alarmComponentsList.push(alarmItemContent)

        })

        return alarmComponentsList

    }

    //----------------------------------------------------------------------------------------------

    return (
        <PageBuilder navSide={false}>
            <Box id='alarms-container-outer'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="Basic time picker" />
                    </DemoContainer>
                </LocalizationProvider>
                <Paper id='alarms-container-title' elevation={3}>
                    Your alarms
                </Paper>
                <Paper id='paper-btn-new-alarm'>
                    <Button id='btn-new-alarm' startIcon={<AddAlarmIcon />}>New Alarm</Button>
                </Paper>
                <Paper id='paper-alarms-list>'>
                    <Box id='alarms-list-header'>
                        <Box id='alarms-search-container'>
                            <TextField
                                variant='filled'
                                label='Search'
                                type='search'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{<SearchIcon />}</InputAdornment>,
                                }}
                            />
                        </Box>
                        <Box id='alarms-sort-container'>
                            <Box id='sort-direction-container'>
                                <IconButton className='btn-sort-direction'><SwapVertIcon /></IconButton>
                            </Box>
                            <Box id='sort-options-container'>
                                <Button className='btn-sort-option'>Created</Button>
                                <Button className='btn-sort-option'>Name</Button>
                                <Button className='btn-sort-option'>Time</Button>
                            </Box>
                        </Box>
                        <Box id='summary-visibility-toggler-container'>
                            <Button variant='contained' onClick={handleToggleSummary} startIcon={<VisibilityIcon />}>Summary</Button>
                        </Box>
                    </Box>
                    <Box id='alarms-list-container'>
                        {generateAlarmComponents()}
                    </Box>
                </Paper>
            </Box>
        </PageBuilder>
    )

}

export default AlarmsHome