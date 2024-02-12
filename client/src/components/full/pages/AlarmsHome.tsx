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
import { IAlarmConfigComponentSkeleton } from 'src/components/types/AlarmConfigComponentSkeletons';
import AlarmConfigCategoryDetailBodyLightColor from 'src/components/AlarmConfigCategoryDetailBodyLightColor';
import IAlarmConfigCategoryDetailStateControl from 'src/components/types/IAlarmConfigCategoryDetailStateControl';


const AlarmsHome: React.FC = () => {

    //PLACEHOLDERS ---------------------------------------------------------------------------------

    //Paceholder: for const [alarms, setAalrms] = React.useState(), data type something like {[key: string]: AlarmMetadata}, AlarmMetadata should be a custom type with key=alarm name and then fields holding the alarm config
    // In fact, may make Alarm objet, with methods like getLightColor, getVibrationTiming, etc, so astract all the checks for undefined etc
    let alarms: {[key: string]: IAlarmMetadata} = {
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
    // const [color, setColor] = React.useState("#aabbcc");
    const [lightAdvanceMinutes, setLightAdvanceMinutes] = React.useState<number>(30)
    const [lightBrightnessType, setLightBrightnessType] = React.useState<'constant' | 'ramp'>('constant')
    const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(75)
    const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([25, 75])
    const [lightColor, setLightColor] = React.useState<string>("#ffffff");



    //----------------------------------------------------------------------------------------------



    //SIDE EFFECTS

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

    const handleCategorySwitchClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling category switch click; Need to toggle category status and stop propogation')
        event.stopPropagation()
    }

    const handleLightAdvanceMinutesSliderChange = (event: Event) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setLightAdvanceMinutes(value)
    }

    const handleLightBrightnessTypeChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling light brightness toggler change. need to change corresponding state variable and show/hide other input elements based on that selection')
        const target: HTMLInputElement = event.target as HTMLInputElement
        let value: string = target.value
        const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'

        setLightBrightnessType(valueTyped)
    }

    const handleLightBrightnessChangeConstant = (event: Event) => {
        console.log('Handling light brightness constant slider change')
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setLightBrightnessConstant(value)
    }

    const handleLightBrightnessChangeRamp = (event: Event, values: number | number[]) => {
        console.log('Handling light brightness ramp slider change')
        setLightBrightnessRamp(values as number[])
    }

    const handleLightColorChange = (value: string) => {
        console.log('handling light color change; need to modify lightColor state variable')
        setLightColor(value)
    }

    type statecontollz = {
        light: IAlarmConfigCategoryDetailStateControl
    }

    const stateControl: statecontollz = {
        light: {
            vars: {
                lightAdvanceMinutes: lightAdvanceMinutes,
                lightColor: lightColor,
                lightBrightnessType: lightBrightnessType,
                lightBrightnessConstant: lightBrightnessConstant,
                lightBrightnessRamp: lightBrightnessRamp
            },
            handlers: {
                handleLightAdvanceMinutesSliderChange: handleLightAdvanceMinutesSliderChange,
                handleLightColorChange: handleLightColorChange
            }
        },
    }

    const alarmConfigComponentSkeletons: IAlarmConfigComponentSkeleton = {
        sound: {
            source: {
    
            },
            type: 'tbd',
            title: 'tbd',
            artist: 'tbd',
            volume: 'tbd',
        },
        light: {
            start_relative: {
                label: 'Turn light on ' + {stateControl.light.lightAdvanceMinutes} + {stateControl.light.lightAdvanceMinutes == 1 ? 'minute' : 'minutes'} + 'before alarm time',
                id: 'light_start',
                showHeader: true,
                body: <AlarmConfigCategoryDetailBodyLightStart stateControl={stateControl.light} />
            },
            color: {
                label: 'Color',
                id: 'light_color',
                showHeader: true,
                // body: <AlarmConfigCategoryDetailBodyLightColor vars={stateControl.light.vars} handlers={stateControl.light.handlers} />
                body: <AlarmConfigCategoryDetailBodyLightColor {...stateControl.light} />
            },
            profile: {
    
            },
            brightness: {
    
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
            <Accordion className='alarm-container' onChange={handleAlarmExpand}>
                <AccordionSummary className='alarm-header'expandIcon={<ExpandMoreIcon />}>
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
                            <DeleteIcon  />
                        </IconButton>
                    </Box>
                </AccordionSummary>
                <AccordionDetails className='alarm-config-categories-container'>




                    {/* Replace with AlarmConfigCategoryOuter component */}
                    <Accordion elevation={1} className='alarm-config-category-container'>
                        <AccordionSummary className='alarm-config-category-header' expandIcon={<ExpandMoreIcon />} >
                        
                            <MusicNoteIcon />
                            <Typography>Music</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='alarm-config-container'>
                            <Typography>Use spotify api to search for songs/playlists/etc</Typography>
                        </AccordionDetails>
                    </Accordion>


                    {/* Need one of these for:
                        alarm.music
                        alarm.sunlight
                        alarm.vibration


                        for each one, need to pass the correct categoryName, categoryState, and eventHandlers

                        to do this, can probably create an object that stores the info under keys 'sunlight', 'music', and 'vibration'

                        like:
                            sunlight.categoryName, sunlight.categoryState, etc

                        will also need the individual fields of each category in some object. for example:
                            sunlight.color
                            sunlight.brightness

                            each of those will be their own AlarmConfigCategoryDetailHeader & Body
                                for header, just need to pass the name; for body, need to create a component since it will be unique & non-generic to the other config categories


                    */}
                    <AlarmConfigCategoryOuter
                        categoryName='Sunlight Component Test'
                        categoryState={{
                            lightAdvanceMinutes: lightAdvanceMinutes,
                            lightBrightnessType: lightBrightnessType,
                            lightBrightnessConstant: lightBrightnessConstant,
                            lightBrightnessRamp: lightBrightnessRamp,
                            lightColor: lightColor
                        }}
                        eventHandlers={{
                            'handleCategorySwitchClick': handleCategorySwitchClick,
                            'handleLightAdvanceMinutesSliderChange': handleLightAdvanceMinutesSliderChange,
                            'handleLightBrightnessTypeChange': handleLightBrightnessTypeChange,
                            'handleLightBrightnessChangeConstant': handleLightBrightnessChangeConstant,
                            'handleLightBrightnessChangeRamp': handleLightBrightnessChangeRamp,
                            'handleLightColorChange': handleLightColorChange
                        }}
                    />




                    {/* Replace with AlarmConfigCategoryOuter component */}
                    <Accordion elevation={1} className='alarm-config-category-container'>
                        <AccordionSummary className='alarm-config-category-header' expandIcon={<ExpandMoreIcon />} >
                        
                            <VibrationIcon />
                            <Typography>Vibration</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='alarm-config-container'>
                            <Typography>Set vibration config options</Typography>
                        </AccordionDetails>






                    </Accordion>
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
            {/* <DeviceConfig /> */}
        </PageBuilder>
    )




}

export default AlarmsHome