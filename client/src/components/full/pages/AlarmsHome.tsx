import * as React from 'react';
import {
    Box, Button, IconButton, InputAdornment, Modal, TextField,
    ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';
import AlarmsList from 'src/components/AlarmsList'
import PageBuilder from 'src/components/PageBuilder';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { IAlarmMetadata } from '../../types/IAlarmMetadata'
import { fnTime12hrTo24hr, fnTime24hrTo12hr } from 'src/tr/components/utils/TimeAndDateUtils'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ITrillliConfig from 'src/tr/types/ITrillliConfig';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Fade from '@mui/material/Fade';
import { useAuth0 } from '@auth0/auth0-react';
import { TrFetchConfig, TrFetchResult, trFetch } from 'src/tr/components/TrApiClient';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/material'
import TrToggleButtonGroup from 'src/tr/components/TrToggleButtonGroup'

interface AlarmsHomeProps {
    appConfig: ITrillliConfig
}

const AlarmsHome: React.FC<AlarmsHomeProps> = ({ appConfig }) => {

    //TODO: type
    const gradientLight1 = `linear-gradient(153deg, ${appConfig.theme.palette.secondary.dark[4]}, ${appConfig.theme.palette.tertiary.dark[4]})`

    //TODO: type
    const defaultAlarmNames = [
        "Golfing",
        "Swimming",
        "Hiking",
        "Running",
        "Cycling",
        "Camping",
        "Fishing",
        "Boating",
        "Skiing",
        "Snowboarding",
        "Skateboarding",
        "Surfing",
        "Rock climbing",
        "Yoga",
        "Pilates",
        "Aerobics",
        "Zumba",
        "Martial arts",
        "Tennis",
        "Badminton",
        "Squash",
        "Table tennis",
        "Basketball",
        "Volleyball",
        "Soccer",
        "Football",
        "Baseball",
        "Softball",
        "Cricket",
        "Rugby",
        "Hockey",
        "Gymnastics",
        "Cheerleading",
        "Dance",
        "Ballet",
        "Tap dancing",
        "Jazz dancing",
        "Hip hop dancing",
        "Ballroom dancing",
        "Salsa dancing",
        "Tango",
        "Line dancing",
        "Square dancing",
        "Waltzing",
        "Polka",
        "Folk dancing",
        "Irish dancing",
        "Scottish dancing",
        "Karaoke",
        "Singing",
        "Choir",
        "Orchestra",
        "Band",
        "DJing",
        "Painting",
        "Drawing",
        "Sketching",
        "Sculpting",
        "Pottery",
        "Ceramics",
        "Woodworking",
        "Metalworking",
        "Jewelry making",
        "Embroidery",
        "Cross-stitching",
        "Knitting",
        "Crocheting",
        "Sewing",
        "Quilting",
        "Origami",
        "Calligraphy",
        "Photography",
        "Videography",
        "Cooking",
        "Baking",
        "Grilling",
        "Barbecuing",
        "Picnicking",
        "Wine tasting",
        "Beer brewing",
        "Cocktail making",
        "Gardening",
        "Planting",
        "Landscaping",
        "Birdwatching",
        "Stargazing",
        "Journaling",
        "Scrapbooking",
        "Kayaking",
        "Canoeing",
        "Paddleboarding",
        "Rowing",
        "Surf fishing",
        "Fly fishing",
        "Ice fishing",
        "Whitewater rafting",
        "Bungee jumping",
        "Skydiving",
        "Parasailing",
        "Hang gliding",
        "Kite surfing",
        "Zip lining",
        "Trampoline jumping",
        "Parkour",
        "Freerunning",
        "BMX biking",
        "Motocross",
        "Go-karting",
        "Horseback riding",
        "Trail riding",
        "Rodeo",
        "Barrel racing",
        "Bull riding",
        "Dog sledding",
        "Sled dog racing",
        "Cross-country skiing",
        "Biathlon",
        "Dog grooming",
        "Pet sitting",
        "Pet training",
        "Pet photography",
        "Scuba diving",
        "Snorkeling",
        "Water skiing",
        "Wakeboarding",
        "Tubing",
        "Kayak fishing",
        "Cave diving",
        "Underwater photography"
    ]

    //Paceholder: for const [alarms, setAalrms] = React.useState(), data type something like {[key: string]: AlarmMetadata}, AlarmMetadata should be a custom type with key=alarm name and then fields holding the alarm config
    // In fact, may make Alarm objet, with methods like getLightColor, getVibrationTiming, etc, so astract all the checks for undefined etc
    //TODO: type
    type IAlarmsPageMetadata = {
        timeFormat24Hr: boolean
        sorting: {
            type: 'time' | 'name'
            asc: boolean
        }
        alarms: {
            [key: string]: IAlarmMetadata
        }
    }
    //TODO: type
    let alarmsPageMetadataDefault: IAlarmsPageMetadata = {
        timeFormat24Hr: true,
        sorting: {
            type: 'time',
            asc: true
        },
        alarms: {}
    }
    //TODO: type
    let alarmMetadataDefault: IAlarmMetadata = {
        name: '',
        created: 0,
        edited: [],
        shown: true,
        enabled: true,
        light: {
            enabled: true,
            color: {
                h: 60,
                s: 100,
                l: 50
            },
            timing: {
                advance_minutes: 15
            },
            luminosity: {
                start: 0,
                end: 100,
                profile: 'ramp'
            }
        },
        sound: JSON.parse('{"enabled":true,"source":"spotify","type":"track","title":"The River","artist":["Bruce Springsteen"],"uri":"https://abc/def","shuffle":true,"volume":{"profile":"ramp","start":30,"end":75,"ramp_seconds":300},"image":"https://i.scdn.co/image/ab67616d0000b2730e987064364e2b62ae1925b4"}'),
        vibration: {
            enabled: true,
            timing: {
                advance_minutes: 3
            },
            intensity: {
                profile: 'constant',
                start: 50,
                end: 75,
                ramp_seconds: 300
            }
        },
        timing: {
            time: '7:30 AM',
            days: []
        },
    }
    //todo: type
    let alarmsPageMetadataTemp: IAlarmsPageMetadata = {
        timeFormat24Hr: true,
        sorting: {
            type: 'name',
            asc: false
        },
        alarms: {
            45423563181: {
                name: 'Work Morning',
                created: 1707533238,
                edited: [
                    1707539001,
                    1707540123,
                ],
                id: 45423563181,
                shown: true,
                light: {
                    color: {
                        h: 60,
                        s: 100,
                        l: 50
                    },
                    timing: {
                        advance_minutes: 15
                    },
                    luminosity: {
                        start: 0,
                        end: 100,
                        profile: 'ramp'
                    }
                },
                sound: {
                    source: 'spotify',
                    type: 'playlist',
                    title: 'Rattlesnake',
                    artist: 'King Gizzard and the Wizard Lizard',
                    uri: 'https://abc/def',
                    shuffle: true,
                    volume: {
                        profile: 'ramp',
                        start: 30,
                        end: 75,
                        ramp_seconds: 300
                    }
                },
                vibration: {
                    enabled: true,
                    timing: {
                        advance_minutes: 3
                    },
                    intensity: {
                        profile: 'constant',
                        start: 50,
                        end: 75,
                        ramp_seconds: 300
                    }
                },
                timing: {
                    time: '7:00 AM',
                    days: ['m', 'tu', 'w', 'th', 'f']
                },
            },
            45423563182: {
                name: 'Work Morning 2',
                created: 1707533238,
                edited: [
                    1707539001,
                    1707540123,
                ],
                id: 45423563182,
                shown: true,
                light: {
                    color: {
                        h: 60,
                        s: 100,
                        l: 50
                    },
                    timing: {
                        advance_minutes: 15
                    },
                    luminosity: {
                        start: 0,
                        end: 100,
                        profile: 'ramp'
                    }
                },
                sound: {
                    source: 'spotify',
                    type: 'playlist',
                    title: 'Rattlesnake',
                    artist: 'King Gizzard and the Wizard Lizard',
                    uri: 'https://abc/def',
                    shuffle: true,
                    volume: {
                        profile: 'ramp',
                        start: 30,
                        end: 75,
                        ramp_seconds: 300
                    }
                },
                vibration: {
                    enabled: true,
                    timing: {
                        advance_minutes: 3
                    },
                    intensity: {
                        profile: 'constant',
                        start: 50,
                        end: 75,
                        ramp_seconds: 300
                    }
                },
                timing: {
                    time: '7:00 AM',
                    days: ['m', 'tu', 'w', 'th', 'f']
                },
            },
        }
    }





    // State Variables & Related ------------------------------------------------------------------ //
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [alarmsPageMetadata, setAlarmsPageMetadata] = React.useState<IAlarmsPageMetadata>()
    const [alarmsList, setAlarmsList] = React.useState<IAlarmMetadata[]>([])
    const [alarmListSortAsc, setAlarmListSortAsc] = React.useState<boolean>(true)
    const [alarmListSortType, setAlarmListSortType] = React.useState<'time' | 'name'>('time')
    const [alarmsSearchValue, setAlarmsSearchValue] = React.useState<string>('')
    const [alarmNamePending, setAlarmNamePending] = React.useState<string>()
    const [alarmId, setAlarmId] = React.useState<number>()
    const [alarmTime, setAlarmTime] = React.useState<string>('12:00')
    const [timePickerOpen, setTimePickerOpen] = React.useState<boolean>(false)
    const [timeFormat24Hr, setTimeFormat24Hr] = React.useState<boolean>(true)
    const [alarmTimePickerFormatted, setAlarmTimePickerFormatted] = React.useState<Dayjs>()

    function getRandomDefaultAlarmName(): string {
        const index = Math.floor(Math.random() * defaultAlarmNames.length)
        return (defaultAlarmNames[index] + ' alarm')
    }
    const [alarmNamePlaceholder, setAlarmNamePlaceholder] = React.useState<string>(getRandomDefaultAlarmName())

    // Effects & Related -------------------------------------------------------------------------- //
    React.useEffect(() => {
        const getAlarmConfig = async () => {
            const accessToken = await getAccessTokenSilently();
            const requestConfig: TrFetchConfig = {
                accessToken: accessToken,
                method: 'GET',
                path: "/data/lazyalarm",
            }
            const result: TrFetchResult = await trFetch(requestConfig)

            if (result == undefined) {
                alert('Error contacting the DayBreakr server! If this issue persists, please contact DayBreakr/Trillli support at trillli.dev@gmail.com')
            }

            if (result.ok.data.length == 0) {
                setAlarmsPageMetadata(alarmsPageMetadataDefault)
            } else {
                setAlarmsPageMetadata(JSON.parse(result.ok.data[0].alarms_json))
            }

        }

        getAlarmConfig()

    }, [])

    React.useEffect(() => {

        if (alarmsPageMetadata) {



            sortAndFilterAlarmList()

            const persistAlarmConfig = async () => {
                const accessToken = await getAccessTokenSilently();
                const requestConfig: TrFetchConfig = {
                    accessToken: accessToken,
                    method: 'PUT',
                    path: "/data/lazyalarm",
                    payload: JSON.stringify({
                        'alarms_json': JSON.stringify(alarmsPageMetadata)
                    })
                }
                const result: TrFetchResult = await trFetch(requestConfig);
            }

            persistAlarmConfig()

        } else {
        }

    }, [alarmsPageMetadata])

    React.useEffect(() => {
        setAlarmTimePickerFormatted(dayjs(alarmTime, 'HH:mm'))
    }, [alarmTime])

    React.useEffect(() => {
        updateAlarmsPageMetadata()
    }, [alarmListSortType, alarmListSortAsc, timeFormat24Hr])

    React.useEffect(() => {
        sortAndFilterAlarmList()
    }, [alarmsSearchValue])

    // Event Handlers & Related ------------------------------------------------------------------- //
    const handleAlarmNameTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value
        const alarmNamePending = value
        if (!alarmNamePending) {
            setAlarmNamePending('')
        } else {
            setAlarmNamePending(alarmNamePending)
        }

    }

    const handleBtnNewAlarmClick = () => {
        setAlarmNamePending('')
        setTimePickerOpen(true)
    }

    const handleTimePickerChangeDoneClick = (event) => {


        setTimePickerOpen(false)


        let alarmMetadata: IAlarmMetadata

        if (alarmId && alarmsPageMetadata?.alarms[alarmId]) {
            alarmMetadata = alarmsPageMetadata.alarms[alarmId]
        } else {
            alarmMetadata = {}
        }





        const dateNow = Date.now()
        alarmMetadata.id = alarmMetadata.id || Math.floor(Math.random() * 10000000)
        alarmMetadata.name = alarmNamePending || alarmNamePlaceholder
        alarmMetadata.created = alarmMetadata.created || dateNow
        alarmMetadata.edited = alarmMetadata.edited || []
        alarmMetadata.edited.push(dateNow)
        alarmMetadata.shown = alarmMetadata.shown || true
        alarmMetadata.enabled = alarmMetadata.enabled || true
        alarmMetadata.timing = alarmMetadata.timing || alarmMetadataDefault.timing
        alarmMetadata.timing.time = alarmTime
        alarmMetadata.light = alarmMetadata.light || alarmMetadataDefault.light
        alarmMetadata.sound = alarmMetadata.sound || alarmMetadataDefault.sound
        alarmMetadata.vibration = alarmMetadata.vibration || alarmMetadataDefault.vibration

        //Reset to defauls
        setAlarmId()
        setAlarmTime('12:00')
        setAlarmNamePlaceholder()
        setAlarmNamePlaceholder(getRandomDefaultAlarmName())
        updateAlarmsMetadata(alarmMetadata.id, alarmMetadata)




    }

    const handleAlarmTimeChanged = (value) => {

        const hours = value.$H
        const minutes = value.$m

        let timeString: string
        if (timeFormat24Hr) {
            timeString = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0')
        } else {
            timeString = fnTime12hrTo24hr(hours + ':' + minutes)
        }

        setAlarmTime(timeString)

    }

    const handleTimeFormatToggle = (event: React.MouseEvent<HTMLElement>, value: boolean) => {
        if (value != null) {
            setTimeFormat24Hr(value)
        }
    }

    const handleAlarmTimeOrNameClick = (event: React.MouseEvent<HTMLElement>, alarmId: number) => {
        const editingAlarm = alarmsPageMetadata.alarms[alarmId]
        setAlarmNamePending(editingAlarm.name)
        setAlarmId(alarmId)
        setAlarmTime(editingAlarm.timing.time)
        setTimePickerOpen(true)
        event.stopPropagation()
    }

    const handleAlarmListSortDirectionClick = () => {
        setAlarmListSortAsc(!alarmListSortAsc)
    }

    const handleAlarmListSortTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmListSortType(event.target.value)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmsSearchValue(event.target.value)
    }

    // Other vars, util functions, etc ------------------------------------------------------------ //

    function sortAndFilterAlarmList() {

        let unsortedAlarmsList: IAlarmMetadata[] = []
        if (alarmsPageMetadata && alarmsPageMetadata.alarms) {
            Object.keys(alarmsPageMetadata.alarms).forEach((key, index) => {
                unsortedAlarmsList.push(alarmsPageMetadata.alarms[key])
            })
        }

        let sortedAlarmsList = []

        if (alarmListSortType == 'time') {
            sortedAlarmsList = sortAndFilterAlarmListByTime(unsortedAlarmsList)
        } else {
            sortedAlarmsList = sortAndFilterAlarmListByName(unsortedAlarmsList)
        }

        if (!alarmListSortAsc) {
            sortedAlarmsList.reverse()
        }

        sortedAlarmsList.forEach((alarm, index) => {

            const alarmNameLower = alarm.name.toLowerCase()

            if (alarmsSearchValue == '' || alarmNameLower.includes(alarmsSearchValue.toLowerCase())) {
                alarm.shown = true
            } else {
                alarm.shown = false
            }
            sortedAlarmsList[index] = alarm
        })

        setAlarmsList(sortedAlarmsList)

    }

    function sortAndFilterAlarmListByTime(unsortedAlarmsList: IAlarmMetadata[]) {

        let alarmTimes: string[] = []
        let alarmsSorted = []
        let sortedAlarmsIds = new Set<number>()

        unsortedAlarmsList.forEach((alarm) => {

            let time = alarm.timing.time

            if (!timeFormat24Hr) {
                time = fnTime12hrTo24hr(time)
            }
            alarmTimes.push(time)
        })

        alarmTimes.sort()

        alarmTimes.forEach((alarmTime) => {


            unsortedAlarmsList.forEach((alarm) => {


                const id = alarm.id
                if (!sortedAlarmsIds.has(id)) {
                    let currentAlarmTime = alarm.timing.time

                    if (alarm.timing.format == 12) {
                        currentAlarmTime = fnTime12hrTo24hr(currentAlarmTime)
                    }
                    if (currentAlarmTime == alarmTime) {
                        alarmsSorted.push(alarm)
                        sortedAlarmsIds.add(id) //to avoid duplicate additions, since we're allowing alarms to share names/times
                    }
                }
            })
        })

        return alarmsSorted

    }

    function sortAndFilterAlarmListByName(unsortedAlarmsList: IAlarmMetadata[]) {

        let alarmNames: string[] = []
        let alarmsSorted = []
        let sortedAlarmsIds = new Set<number>()

        unsortedAlarmsList.forEach((alarm) => {
            const name = alarm.name
            alarmNames.push(name)
        })

        //Custom sorting to ignore priority of capital letters
        alarmNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        alarmNames.forEach((alarmName) => {
            unsortedAlarmsList.forEach((alarm) => {
                const id = alarm.id
                if (!sortedAlarmsIds.has(id)) {
                    if (alarm.name == alarmName) {
                        alarmsSorted.push(alarm)
                        sortedAlarmsIds.add(alarm.id) //to avoid duplicate additions, since we're allowing alarms to share names/times
                    }
                }
            })
        })

        return alarmsSorted

    }

    const updateAlarmsPageMetadata = (field: string, value: any) => {
        setAlarmsPageMetadata(prevState => {
            if (prevState) {
                let alarmsPageMetadataUpdated = { ...prevState }
                if (field) {
                    alarmsPageMetadataUpdated = { ...prevState, [field]: value }
                }
                alarmsPageMetadataUpdated.sorting.asc = alarmListSortAsc
                alarmsPageMetadataUpdated.sorting.type = alarmListSortType
                alarmsPageMetadataUpdated.timeFormat24Hr = timeFormat24Hr
                alarmsPageMetadataUpdated.alarms = alarmsList
                return alarmsPageMetadataUpdated
            }
        })
    }


    const updateAlarmsMetadata = (alarmId: number, alarmMetadata: IAlarmMetadata, remove: boolean = false) => {
        setAlarmsPageMetadata(prevState => {
            if (prevState) {
                let alarmsUpdated: { [key: string]: IAlarmMetadata } = {}
                if (remove) {
                    const prevAlarmKeys = Object.keys(prevState.alarms)
                    prevAlarmKeys.forEach((prevAlarmKey) => {
                        if (prevState.alarms[prevAlarmKey].id != alarmId) {
                            alarmsUpdated[prevAlarmKey] = prevState.alarms[prevAlarmKey]
                        }
                    })
                } else {
                    let prevAlarms = { ...prevState.alarms }
                    prevAlarms = { ...prevState.alarms }
                    alarmsUpdated = { ...prevAlarms, [alarmId]: alarmMetadata }
                }
                const alarmsPageMetadataUpdated = { ...prevState, 'alarms': alarmsUpdated };
                return alarmsPageMetadataUpdated
            }
        });
    }



    const handlers = {
        handleAlarmTimeOrNameClick: handleAlarmTimeOrNameClick,
        updateAlarmsMetadata: updateAlarmsMetadata
    }

    const setters = {
        setTimePickerOpen: setTimePickerOpen,
    }

    return (
        <PageBuilder navTop={true} navSide={false} appConfig={appConfig}>
            <Box
                id='alarms-container-outer'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1rem',
                    height: '100%',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    justifyContent: alarmsList.length > 0 ? 'initial' : 'center',
                    paddingBottom: alarmsList.length > 0 ? '0px' : '95px',

                }}
            >
                <Box
                    id='time-format-toggle-container'
                    sx={{
                        marginLeft: 'auto'
                    }}
                >
                    <TrToggleButtonGroup
                        appConfig={appConfig}
                        value={timeFormat24Hr}
                        exclusive={true}
                        onChange={handleTimeFormatToggle}
                        sx={{
                            display: alarmsList.length > 0 ? 'flex' : 'none',
                            height: '2.5rem',
                        }}
                    >
                        <ToggleButton className='btn-sort-option' value={false}>AM:PM</ToggleButton>
                        <ToggleButton className='btn-sort-option' value={true}>24hr</ToggleButton>
                    </TrToggleButtonGroup>
                </Box>

                <Box
                    id='btn-new-alarm-container'
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        height: alarmsList.length > 0 ? 'fit-content' : '100%'
                    }}
                >
                    {alarmsList.length > 0 ? (
                        <Button
                            id='btn-new-alarm'
                            startIcon={<AddAlarmIcon />}
                            onClick={handleBtnNewAlarmClick}
                            sx={{
                                width: '100%',
                                padding: '.5rem',
                                borderRadius: '4px',
                                background: gradientLight1,
                                color: appConfig.theme.palette.primary.contrastText,
                                '& .MuiButton-startIcon>.MuiSvgIcon-root': {
                                    fontSize: '1.5rem',
                                    color: appConfig.theme.palette.neutral.dark[8]
                                }
                            }}
                        >
                            <Typography fontWeight={'bold'} fontSize={'1.25rem'}>New Alarm</Typography>
                        </Button>) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: '3rem',
                                alignItems: 'center',
                                rowGap: '3.5rem',
                                position: 'relative'
                            }}
                        >
                            <TrToggleButtonGroup
                                appConfig={appConfig}
                                value={timeFormat24Hr}
                                exclusive={true}
                                fullWidth={true}
                                onChange={handleTimeFormatToggle}
                            >
                                <ToggleButton className='btn-sort-option' value={false}
                                >am:pm</ToggleButton>
                                <ToggleButton className='btn-sort-option' value={true}>24hr</ToggleButton>
                            </TrToggleButtonGroup>
                            <Button
                                id='btn-first-alarm'
                                startIcon={<AddAlarmIcon />}
                                onClick={handleBtnNewAlarmClick}
                                sx={{
                                    width: '85vw',
                                    maxWidth: '300px',
                                    padding: '1rem 2rem',
                                    borderRadius: '4px',
                                    background: gradientLight1,
                                    color: appConfig.theme.palette.neutral.dark[8],
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: '1rem',
                                    rowGap: '1rem',
                                    flexWrap: 'wrap',
                                    '& .MuiButton-startIcon>.MuiSvgIcon-root': {
                                        fontSize: '1.75rem',
                                        color: appConfig.theme.palette.neutral.dark[8]
                                    }
                                }}
                            >
                                <Typography
                                    fontWeight={'bold'}
                                    fontSize={'1.25rem'}

                                >
                                    New Alarm
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box
                    id='alarms-list-organization-control-container'
                    sx={{
                        display: alarmsList.length > 0 ? 'flex' : 'none',
                        rowGap: '1rem',
                        columnGap: '.5rem',
                        flexWrap: 'wrap',
                        marginTop: '3rem'
                    }}
                >
                    <Box
                        id='alarms-display-config-container'
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 'inherit',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Box
                            id='alarms-sort-container'
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                columnGap: '1rem',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                id='sort-direction-container'
                                sx={{

                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    columnGap: '1rem',
                                    height: '2.5rem',
                                    borderRadius: '4px',
                                    borderTopRightRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    overflow: 'hidden',
                                    color: appConfig.theme.palette.secondary.dark[4],
                                }}
                            >
                                <SortIcon
                                    sx={{
                                        height: '2rem',
                                        fontSize: '1.75rem',
                                        paddingBottom: '3px'
                                    }}
                                />
                                <IconButton
                                    className='btn-sort-direction'
                                    onClick={handleAlarmListSortDirectionClick}
                                    sx={{
                                        height: '100%',
                                        color: appConfig.theme.palette.secondary.dark[4],
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        columnGap: '1rem',
                                        padding: '0px'
                                    }}
                                >
                                    <SwapVertIcon
                                        sx={{
                                            transition: '200ms',
                                            transform: alarmListSortAsc ? 'none' : 'rotate(180deg)',
                                            borderRadius: '4px',
                                            background: appConfig.theme.palette.primary.dark[8],
                                            width: '2.125rem',
                                            height: '2rem',
                                            padding: '4px'
                                        }}
                                    />
                                </IconButton>
                            </Box>
                            <Box
                                id='sort-options-container'
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <TrToggleButtonGroup
                                    appConfig={appConfig}
                                    value={alarmListSortType}
                                    exclusive={true}
                                    onChange={handleAlarmListSortTypeChange}
                                    sx={{
                                        height: '2.5rem',
                                    }}
                                >
                                    <ToggleButton className='btn-sort-option' value='time'>Time</ToggleButton>
                                    <ToggleButton className='btn-sort-option' value='name'>Name</ToggleButton>
                                </TrToggleButtonGroup>
                            </Box>
                        </Box>
                        <Box
                            id='alarms-search-container'
                            sx={{
                                width: '100%'
                            }}
                        >
                            <TextField
                                variant='filled'
                                placeholder='Filter'
                                size='small'
                                onChange={handleSearch}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{<FilterListIcon />}</InputAdornment>,
                                    disableUnderline: true,
                                    sx: {
                                        transition: '200ms',
                                        height: '2.5rem',
                                        background: appConfig.theme.palette.primary.dark[8],
                                        boxShadow: `inset 0px -4px ${appConfig.theme.palette.secondary.dark[5]}`,
                                        borderRadius: '4px 4px 0px 0px',
                                        color: appConfig.theme.palette.primary.dark[1],
                                        '& .MuiSvgIcon-root': {
                                            color: appConfig.theme.palette.secondary.dark[5]
                                        },
                                        '& .MuiInputBase-input': {
                                            paddingTop: '4px'
                                        },
                                        '&:hover, &:focus-within': {
                                            background: appConfig.theme.palette.primary.dark[8],
                                            boxShadow: `inset 0px -6px ${appConfig.theme.palette.secondary.dark[4]}`,
                                            '& .MuiSvgIcon-root': {
                                                color: appConfig.theme.palette.secondary.dark[3]
                                            },
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
                    </Box>
                </Box>

                <AlarmsList
                    alarms={alarmsList}
                    appConfig={appConfig}
                    handlers={handlers}
                    setters={setters}
                    timeFormat24Hr={timeFormat24Hr}
                />
            </Box>


            <Modal
                className='name-and-time-modal'
                open={timePickerOpen}
                onClose={handleTimePickerChangeDoneClick}
                sx={{
                    background: '#000000a8'
                }}
            >
                <Fade
                    in={timePickerOpen}
                    timeout={100}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '3rem',
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: appConfig.theme.palette.primary.dark[8],
                            padding: '1rem 0rem 2rem 0rem',
                            borderRadius: '4px',
                        }}
                        className='name-and-time-modal-contents'
                    >

                        <Box
                            className='time-input-container'
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <StaticTimePicker
                                        ampm={!timeFormat24Hr}
                                        value={alarmTimePickerFormatted || dayjs('12:00', 'HH:mm')}
                                        onChange={handleAlarmTimeChanged}
                                        sx={{
                                            background: 'none',
                                            width: 'fit-content',
                                            '& span': {
                                                color: appConfig.theme.palette.secondary.dark[4],
                                                '&.Mui-selected': {
                                                    color: appConfig.theme.palette.primary.dark[2],
                                                }
                                            },
                                            '& .MuiClock-clock': {
                                                background: '#1c1e24',
                                            },
                                            '& .MuiPickersArrowSwitcher-button': {
                                                color: appConfig.theme.palette.secondary.dark[4],
                                                '&:disabled': {
                                                    color: appConfig.theme.palette.primary.dark[7]
                                                }
                                            },
                                            '& .MuiClock-pin': {
                                                background: appConfig.theme.palette.neutral.dark[6]
                                            },
                                            '& .MuiClockPointer-root': {
                                                background: appConfig.theme.palette.neutral.dark[6]
                                            },
                                            '& .MuiClockPointer-root .MuiClockPointer-thumb': {
                                                background: appConfig.theme.palette.neutral.light[6],
                                                border: `16px solid ${appConfig.theme.palette.neutral.dark[6]}`
                                            }
                                        }}
                                        slotProps={{
                                            actionBar: {
                                                sx: {
                                                    display: 'none',
                                                }
                                            },
                                            toolbar: {
                                                sx: {
                                                    gridRow: '2 !important',    //sue me
                                                    '&>.MuiTypography-root': {
                                                        display: 'none'
                                                    },
                                                    '& .MuiPickersToolbar-content': {
                                                        justifyContent: 'center'
                                                    },
                                                    '& .MuiTimePickerToolbar-hourMinuteLabel .MuiTypography-root': {
                                                        color: appConfig.theme.palette.primary.dark[6],
                                                        '&.Mui-selected': {
                                                            color: appConfig.theme.palette.secondary.dark[4],
                                                        }
                                                    },
                                                    '& .MuiTimePickerToolbar-ampmSelection': {
                                                        marginRight: '0px',
                                                        '& .MuiTimePickerToolbar-ampmLabel': {
                                                            color: appConfig.theme.palette.primary.dark[6],
                                                            '&.Mui-selected': {
                                                                color: appConfig.theme.palette.secondary.dark[4]
                                                            }
                                                        },
                                                    }
                                                }
                                            },
                                            layout: {
                                                sx: {
                                                    '& .MuiPickersLayout-contentWrapper': {
                                                        gridRow: '1 !important',    //see above, regarding suing me
                                                    },
                                                }
                                            }
                                        }}
                                    />

                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box id='name-input-container' fontSize={18}
                            sx={{
                                paddingLeft: '2rem',
                                paddingRight: '2rem',
                            }}
                        >
                            <TextField
                                variant='filled'
                                label='Alarm Name'
                                placeholder={alarmNamePlaceholder}
                                value={alarmNamePending || ''}
                                onChange={handleAlarmNameTyping}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        fontSize: '1.35rem',
                                        fontWeight: 'bold',
                                        color: appConfig.theme.palette.secondary.dark[3],
                                        top: '2px',
                                        '&.Mui-focused': {
                                            color: appConfig.theme.palette.secondary.dark[3],
                                        }
                                    }
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {
                                        height: '4.5rem',
                                        transition: '.2s',
                                        alignItems: 'flex-end',
                                        color: appConfig.theme.palette.primary.dark[0],
                                        paddingBottom: '2px',
                                        '&::before': {
                                            display: 'none'
                                        },
                                    }
                                }}
                                sx={{
                                    width: '100%',
                                    background: '#00000047',
                                    transition: '.2s',
                                    boxShadow: `inset 0px -4px ${appConfig.theme.palette.secondary.dark[3]}`,
                                    borderRadius: '4px 4px 0px 0px',
                                    overflow: 'hidden',
                                    '&>.MuiInputBase-root': {
                                        background: 'none',
                                    },
                                    '& ::before': {
                                        display: 'none'
                                    },
                                    '& ::after': {
                                        display: 'none'
                                    },
                                    '&:hover, :active, :focus, :focus-within': {
                                        boxShadow: `inset 0px -6px ${appConfig.theme.palette.secondary.dark[4]}`,
                                        background: '#00000063',

                                    }
                                }}

                            />
                        </Box>
                        <Box
                            className='btn-accept-alarm-time-and-name-container'
                            sx={{
                                paddingLeft: '2rem',
                                paddingRight: '2rem',
                            }}
                        >
                            <Button
                                variant='contained'
                                className='btn-accept-alarm-time-and-name'
                                size='large'
                                onClick={handleTimePickerChangeDoneClick}
                                sx={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    paddingLeft: '2rem',
                                    paddingRight: '2rem',
                                    background: gradientLight1,
                                    color: appConfig.theme.palette.neutral.dark[6],
                                    boxShadow: appConfig.theme.shadows[8]
                                }}
                            >Done</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </PageBuilder>
    )

}

export default AlarmsHome