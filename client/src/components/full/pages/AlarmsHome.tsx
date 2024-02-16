import * as React from 'react';
import { AccordionActions, Box, Button, Container, Icon, IconButton, InputAdornment, Paper, Slider, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AlarmsList from 'src/components/full/elements/AlarmsList';
import ConfigCategoryLabel from 'src/components/full/elements/ConfigCategoryLabel';
import PageBuilder from 'src/components/PageBuilder';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { IAlarmMetadata } from '../../types/IAlarmMetadata'
import { DoNotDisturbAlt, Expand, Repeat, SyncDisabled, Visibility } from '@mui/icons-material';
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
import AppConfig from 'src/AppConfig';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';

interface AlarmsHomeProps {
    appConfig: ITrillliConfig
}

const AlarmsHome: React.FC<AlarmsHomeProps> = ({appConfig}) => {

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
    const [alarmListSortDirection, setAlarmListSortDirection] = React.useState<'asc' | 'desc'>('desc')
    const [alarmListSortType, setAlarmListSortType] = React.useState<'time' | 'name'>('time')

    const [alarmExpanded, setAlarmExpanded] = React.useState<boolean>(false)
    const [noRepeat, setNoRepeat] = React.useState<boolean>(true)
    type DayAbbrev = 'su' | 'm' | 'tu' | 'w' | 'th' | 'f' | 'sa'
    const [repeatDays, setRepeatDays] = React.useState<Set<DayAbbrev>>(new Set<DayAbbrev>())


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
        console.log('in use effect of noRepeat!')
        if (noRepeat) {
            setRepeatDays(new Set<DayAbbrev>())
        }
    }, [noRepeat])

    React.useEffect(() => {
        console.log('in use effect of repeatDays!')
        if (repeatDays.size == 0) {
            setNoRepeat(true)
        } else {
            setNoRepeat(false)
        }
    }, [repeatDays])

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

    const handleDeleteAlarm = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('Handling delete alarm: Need to stop propagation and send delete request to server & rerender alarms list')
    }

    // const handleExpandAlarmClick = (event: React.MouseEvent<HTMLElement>) => {
    //     console.log('need to rotate:')
    //     console.log(event.target.parentElement.parentElement.classList.toggle('alarm-expand-rotated'))
    // }

    const handleAlarmExpand = (event: React.SyntheticEvent, expanded: boolean) => {
        // console.log('Handling expansion of an alarm; need to enlarge / emphasize timing options')
        // console.log('Expanded flag: ' + expanded)
        setAlarmExpanded(!alarmExpanded)
    }

    const handleToggleSummary = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('Handling toggle alarm summary: Need to stop propogation and switch summary visibility toggle status state variable')
    }

    const handleSummaryTimeClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling summary time click. Need to stop propogation and trigger the time picker')
        event.stopPropagation()
    }

    const handleSummaryDayChange = (event: React.MouseEvent<HTMLElement>) => {

        event.stopPropagation()
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: DayAbbrev = target.value as DayAbbrev

        let repeatDaysUpdated = new Set(repeatDays)

        if (repeatDays.has(value)) {
            repeatDaysUpdated.delete(value)
        } else {
            repeatDaysUpdated.add(value)
        }

        setRepeatDays(repeatDaysUpdated) 

    }

    const handleSummaryDayNoRepeatChange = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('Handling summary day NO REPEAT click. Need to stop propogation and style the selected/unselected dates')
        if (!noRepeat) {
            setNoRepeat(true)
        }
    }

    const handleToggleAlarmStatusClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling alarm status toggle click. Need to stop propogation and enable/disable the alarm')
        event.stopPropagation()
    }

    const handleAlarmListSortDirectionClick = () => {
        console.log('handling sort direction click: need to sort the alarms list')
    }

    const handleAlarmListSortTypeChange = () => {
        console.log('Handling sort type change: Need to sort the alarms list.')
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
                fieldNamesOrdered: ['search', 'volume'],
                fields: {
                    search: {
                        label: 'Search for music on Spotify',
                        id: 'type',
                        showHeader: true,
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
                <Accordion 
                elevation={0}
                key={alarmKey} className='alarm-container' onChange={handleAlarmExpand}
                sx={{
                    overflow: 'hidden',
                    // border: `2px solid #eebb50`,
                    borderTop: 'none',
                    background: 'linear-gradient(148deg, #ff9f4e, #fef751)'
                }}
                >
                    <AccordionSummary 
                        className='alarm-header' 
                        sx={{
                            padding: '0px',
                            '& .MuiAccordionSummary-content': {
                                margin: '0px',
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                '&.Mui-expanded': {
                                    marginTop: '0px',
                                    marginBottom: '0px'
                                }
                            }
                        }}
                    >
                        <Box 
                            className='alarm-essentials'
                            sx={{
                                // padding: '.5rem .75rem',
                                width: '100%',
                                display: 'flex',
                                // columnGap: '1rem',
                                alignItems: 'center',
                                background: 'linear-gradient(148deg, #ff9f4e, #fef751)'
                                // background: appConfig.theme.palette.shades.tertiary[4]
                                // columnGap: '1rem',
                                // border: '1px solid red'
                            }}
                        >
                            <Box
                                className='alarm-time-container'
                                alignItems='center'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                    // marginRight: '1rem',
                                    // background: appConfig.theme.palette.shades.secondary[0],
                                    // border: `2px solid ${appConfig.theme.palette.shades.primary[10]}`,
                                    // boxShadow: `4px 4px 0px ${appConfig.theme.palette.shades.primary[10]}`,
                                    padding: '0px .75rem',
                                    borderRadius: '4px',
                                    color: appConfig.theme.palette.secondary.contrastText,
                                    // background: '#FFFFFF57',
                                }}
                            >
                                <Typography 
                                    onClick={handleSummaryTimeClick}
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {alarmMetadata.timing.time}
                                </Typography>
                            </Box>
                            <Box
                                className='alarm-name-container'
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexGrow: '1',
                                    borderRadius: '4px',
                                    // background: '#FFFFFF57',
                                    padding: '0px .75rem'
                                }}
                            >
                                <Typography>{alarmName}</Typography>
                                {/* <TextField value={alarmName} variant='filled' /> */}
                            </Box>
                            <Box 
                                className='alarm-status-container'
                                sx={{
                                    // marginLeft: '3px',
                                    marginRight: '-0px',
                                    height: 'fit-content',
                                    // background: '#FFFFFF57',
                                }}    
                            >
                                <Switch onClick={handleToggleAlarmStatusClick} />
                            </Box>
                        </Box>
                        <Box 
                            className='alarm-summary'
                            sx={{
                                // padding: '.5rem .75rem',
                                display: 'flex',
                                width: '100%',
                                background: '#FFFFFF57',
                            }}
                        >
                            <Box 
                                className='alarm-summary-timing'
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    // width: '100%'
                                }}
                            >
                                <ToggleButtonGroup 
                                    className='alarm-summary-days'
                                    // value={['m', 'tu', 'th']}
                                    value={Array.from(repeatDays)}
                                    onChange={handleSummaryDayChange}
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        // width: '100%',
                                        // justifyContent: 'space-between',
                                        // columnGap: '.25rem',
                                        // rowGap: '.25rem',
                                        height: 'fit-content',
                                        borderRadius: '0px',
                                        '& .MuiButtonBase-root': {
                                            borderRadius: '9999px',
                                            border: 'none',
                                            background: 'none',
                                            padding: '0px',
                                            height: '2rem',
                                            width: '2.5rem',
                                            borderRadius: '0px'
                                        }
                                    }}
                                >
                                    <ToggleButton value='su' className='alarm-day alarm-summary-day'>Su</ToggleButton>
                                    <ToggleButton value='m' className='alarm-day alarm-summary-day'>M</ToggleButton>
                                    <ToggleButton value='tu' className='alarm-day alarm-summary-day'>Tu</ToggleButton>
                                    <ToggleButton value='w' className='alarm-day alarm-summary-day'>W</ToggleButton>
                                    <ToggleButton value='th' className='alarm-day alarm-summary-day'>Th</ToggleButton>
                                    <ToggleButton value='f' className='alarm-day alarm-summary-day'>F</ToggleButton>
                                    <ToggleButton value='sa' className='alarm-day alarm-summary-day'>Sa</ToggleButton>
                                    <ToggleButtonGroup
                                    className='alarm-summary-no-repeat'
                                    value={noRepeat}
                                    onClick={handleSummaryDayNoRepeatChange}
                                    sx={{
                                        height: 'fit-content',
                                        '& .MuiButtonBase-root': {
                                            // borderRadius: '9999px',
                                            // border: 'none',
                                            borderLeft: 'none',
                                            background: 'none',
                                            padding: '0px',
                                            height: '2rem',
                                            width: '2.5rem',
                                        }
                                    }}
                                >
                                    <ToggleButton 
                                        className='alarm-day alarm-summary-day'
                                        value={true} 
                                    >
                                        <SyncDisabled />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                </ToggleButtonGroup>
                            </Box>
                            <Box
                                className='alarm-action-btns-container'
                                sx={{
                                    marginLeft: 'auto',
                                    display: 'flex'
                                }}
                            >
                                <IconButton
                                    sx={{
                                        transition: 'rotate 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        rotate: alarmExpanded ? '180deg' : '0deg',
                                        padding: '0px'
                                    }}    
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails 
                        className='alarm-config-categories-container'
                        sx={{
                            padding: '0px'
                        }}
                    >
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
            <Box 
                id='alarms-container-outer'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '2rem'
                }}
            >
                <Paper 
                    elevation={0}
                    sx={{
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}
                >
                <Box 
                        id='alarms-list-header'
                        sx={{
                            background: 'white',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            flexWrap: 'wrap',
                            columnGap: '1rem',
                            rowGap: '1rem',
                            // padding: '1rem'
                        }}
                    >
                        <Box 
                            id='alarms-search-container'
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            <TextField
                                variant='filled'
                                placeholder='Filter'
                                type='search'
                                size='small'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{<FilterListIcon />}</InputAdornment>,
                                    disableUnderline: true,
                                    sx: {
                                        borderRadius: '4px',
                                        '& .MuiInputBase-input': {
                                            paddingTop: '4px'
                                        }
                                    }
                                }}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputLabel-root': {
                                        border: '2px solid blue',
                                        transform: 'none'
                                    }
                                }}
                            />
                        </Box>
                        <Box 
                            id='alarms-sort-container'
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                columnGap: '.25rem'
                            }}
                        >
                                                        <Box 
                                id='sort-options-container'
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <ToggleButtonGroup 
                                    value={alarmListSortType}
                                    onChange={handleAlarmListSortTypeChange}
                                    sx={{
                                        height: '2rem'
                                    }}    
                                >
                                    <ToggleButton className='btn-sort-option' value='time'>Time</ToggleButton>
                                    <ToggleButton className='btn-sort-option' value='name'>Name</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Box 
                                id='sort-direction-container'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '2rem',
                                    width: '2rem',
                                    borderRadius: '4px',
                                    background: appConfig.theme.palette.primary.main,
                                }}
                            >
                                <IconButton 
                                    className='btn-sort-direction'
                                    onClick={handleAlarmListSortDirectionClick}
                                    sx={{
                                        height: '100%',
                                        color: appConfig.theme.palette.tertiary.main
                                    }}
                                >
                                    <SwapVertIcon />
                                </IconButton>
                            </Box>

                        </Box>
                    </Box>
                </Paper>

                <Paper 
                    id='btn-new-alarm-container'
                    elevation={3}
                    sx={{
                        background: `linear-gradient(148deg, #ff9f4e, #fef751)`
                    }} 
                >
                    <Button 
                        id='btn-new-alarm' 
                        startIcon={<AddAlarmIcon />}
                        sx={{
                            width: '100%',
                            padding: '.5rem',
                            borderRadius: '4px',
                            // background: appConfig.theme.palette.primary.main,
                            background: appConfig.theme.palette.shades.primary[6],
                            color: appConfig.theme.palette.primary.contrastText,
                            // color: 'red'
                        }}
                    >
                        <Typography fontWeight={'normal'} fontSize={'1.25rem'}>New Alarm</Typography>
                    </Button>
                </Paper>
                
                <Box
                    id='paper-alarms-list>'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '2rem'
                    }}
                >
                    <Box 
                        id='alarms-list-container'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '1rem',
                            '&>.MuiPaper-root': {
                                // borderTop: `1px solid ${appConfig.theme.palette.shades.primary[10]}`,
                                borderRadius: '4px',
                                // boxShadow: 'none',
                                // border: `1px solid ${appConfig.theme.palette.shades.primary[10]}`,
                            },
                            '&>.MuiPaper-root::before': {
                                display: 'none'
                            }
                        }}    
                    >
                        {generateAlarmComponents()}
                    </Box>
                </Box>
            </Box>
        </PageBuilder>
    )

}

export default AlarmsHome