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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Fade from '@mui/material/Fade';
import { useAuth0 } from '@auth0/auth0-react';
import { TrFetchConfig, TrFetchResult, trFetch } from 'trillli/src/components/TrApiClient';

interface AlarmsHomeProps {
    appConfig: ITrillliConfig
}

const AlarmsHome: React.FC<AlarmsHomeProps> = ({ appConfig }) => {

    //PLACEHOLDERS ---------------------------------------------------------------------------------

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
    let alarmsPageMetadataDefault: IAlarmsPageMetadata = {
        timeFormat24Hr: true,
        sorting: {
            type: 'time',
            asc: true
        },
        alarms: {}
    }
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
        sound: {
            enabled: true,
            source: 'spotify',
            type: 'playlist',
            title: 'Morning Coffee',
            artist: 'Spotify',
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
            time: '7:30 AM',
            days: []
        },
    }
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

    // let alarmsUnsorted: IAlarmMetadata[] = []
    // const allAlarmsKeys = Object.keys(alarmsPageMetadataTemp.alarms);
    // allAlarmsKeys.forEach((alarmKey) => {
    //     alarmsUnsorted.push(alarmsPageMetadataTemp.alarms[alarmKey])
    // })

    //----------------------------------------------------------------------------------------------



    //STATE VARIALES, REFS, VARIABLES  ----------------------------------------------------------------------
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [alarmsPageMetadata, setAlarmsPageMetadata] = React.useState<IAlarmsPageMetadata>()
    // const [alarmsSerialized, setAlarmsSerialized] = React.useState<String>(JSON.stringify(alarmsPageMetadataTemp.alarms))

    const [alarmsList, setAlarmsList] = React.useState<IAlarmMetadata[]>([])
    const [alarmListSortAsc, setAlarmListSortAsc] = React.useState<boolean>(true)
    const [alarmListSortType, setAlarmListSortType] = React.useState<'time' | 'name'>('time')
    const [alarmsListPendingSortOrFilter, setAlarmsListPendingSortOrFilter] = React.useState<boolean>(true)
    const [alarmsSearchValue, setAlarmsSearchValue] = React.useState<string>('')


    const [alarmExpanded, setAlarmExpanded] = React.useState<boolean>(false) //alarm level

    const [alarmName, setAlarmName] = React.useState<string>();
    const [alarmNamePlaceholder, setAlarmNamePlaceholder] = React.useState<string>(() => {
        const index = Math.floor(Math.random() * defaultAlarmNames.length)
        return (defaultAlarmNames[index] + ' alarm')
    })
    const [alarmNamePending, setAlarmNamePending] = React.useState<string>()

    const [alarmTime, setAlarmTime] = React.useState<string>('17:23')
    const [timePickerOpen, setTimePickerOpen] = React.useState<boolean>(false)
    const [timeFormat24Hr, setTimeFormat24Hr] = React.useState<boolean>(true)
    const [alarmTimePickerFormatted, setAlarmTimePickerFormatted] = React.useState<Dayjs>()
    const [timePickerMode, setTimePickerMode] = React.useState<'add' | 'edit'>()
    const [timePickerAlarmId, setTimePickerAlarmId] = React.useState<number>()






    //----------------------------------------------------------------------------------------------
    React.useEffect(() => {
        const getAlarmConfig = async () => {
            const accessToken = await getAccessTokenSilently();
            const requestConfig: TrFetchConfig = {
                accessToken: accessToken,
                method: 'GET',
                path: "/data/lazyalarm",
            }
            const result: TrFetchResult = await trFetch(requestConfig)
            // //console.log('made it back from request')
            // //console.log(result)
            // //console.log(result.error)
            // //console.log(result.ok)
            // //console.log('data is:')
            // //console.log(result.ok.data[0].alarms_page_metadata_json)
            // //console.log()
            if (result.ok.data = []) {
                // alert('empty data')
                // setAlarmsPageMetadata()
                setAlarmsPageMetadata(alarmsPageMetadataDefault)
            } else {
                setAlarmsPageMetadata(JSON.parse(result.ok.data[0].alarms_page_metadata_json))
            }
            
        }

        // //console.log('making request')
        getAlarmConfig()
        // setAlarmsPageMetadata(alarmsPageMetadataTemp)
    }, [])

    React.useEffect(() => {
        //console.log('in use effect for alarmspagemetadata')
        if (alarmsPageMetadata) {

            //console.log('alarmspagemetadata now is:')
            //console.log(alarmsPageMetadata)
            // //console.log('and the alarmspagemetadatajson is:')
            // //console.log(JSON.parse(alarmsPageMetadata.alarms_json))
            // //console.log('and the serialized metadata field is')

            if (alarmsPageMetadata.alarms) {
                let alarmsListArrayUnsorted: IAlarmMetadata[] = []
                Object.keys(alarmsPageMetadata.alarms).forEach((key, index) => {
                    alarmsListArrayUnsorted.push(alarmsPageMetadata.alarms[key])
                })
                sortAndFilterAlarmList(alarmsListArrayUnsorted)
            }



            console.log('Updated alarms page metadata and ready to post/patch to api: ')
            console.log(alarmsPageMetadata)

            

            const persistAlarmConfig = async () => {
                const testdata = {'serialization': 'mytestdata'}
                //console.log('posting:')
                //console.log(JSON.stringify(alarmsPageMetadata))
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
                //console.log('Made post request. result:')
                //console.log(result)
                //console.log(result.error)
                //console.log(result.request?.body?.getReader().read())




            }

            //console.log('WOULD BE CALLING PERSIST ALARM CONFIG HERE, PASSING ALARMSPAGEMETADATA OBJECT:')
            //console.log(alarmsPageMetadata)
            // persistAlarmConfig()

        } else {
            //console.log('in else block?')
        }

    }, [alarmsPageMetadata])

    // React.useEffect(() => {
    //     // //console.log('ALARMS SERIALIZED CHANGED; NEED TO PERSIST UPDATE TO DATABASE')
    // }, [alarmsSerialized])


    React.useEffect(() => {
        setAlarmTimePickerFormatted(dayjs(alarmTime, 'HH:mm'))
    }, [alarmTime])

    React.useEffect(() => {
        updateAlarmsPageMetadata()
    }, [alarmListSortType, alarmListSortAsc, timeFormat24Hr])

    React.useEffect(() => {

        // updateAlarmsPageMetadata()

        if (alarmsListPendingSortOrFilter) {
            // sortAndFilterAlarmList()
        } else {
            // //console.log('no longer using setalarmcomponents - instead need to implement & update an alarm state variable')
            // setAlarmComponents(generateAlarmComponents()) 
        }

    }, [alarmsList, alarmListSortType, alarmListSortAsc, alarmsSearchValue])

    //----------------------------------------------------------------------------------------------

    //HELPER FUNCTIONS
    function sortAndFilterAlarmList(unsortedAlarmsList: IAlarmMetadata[]) {

        //console.log('top of sortandfilteralarmlist. alarmlist unsorted array currently is:')
        //console.log(unsortedAlarmsList)

        let sortedAlarmsList = []

        if (alarmListSortType == 'time') {
            sortedAlarmsList = sortAndFilterAlarmListByTime(unsortedAlarmsList)
        } else {
            sortedAlarmsList = sortAndFilterAlarmListByName(unsortedAlarmsList)
        }

        //console.log('sorted the alarmslist. it now is:')
        //console.log(sortedAlarmsList)

        if (!alarmListSortAsc) {
            sortedAlarmsList.reverse()
        }

        sortedAlarmsList.forEach((alarm, index) => {
            //console.log('in sortedalarslist for each loop. current index is: ' + index)
            const alarmNameLower = alarm.name.toLowerCase()
            if (alarmsSearchValue == '' || alarmNameLower.includes(alarmsSearchValue.toLowerCase())) {
                alarm.shown = true
            } else {
                alarm.shown = false
            }
            sortedAlarmsList[index] = alarm
        })


        //console.log('filtered alarms list. about to do setalarmslist. it is:')
        //console.log(sortedAlarmsList)

        setAlarmsListPendingSortOrFilter(false)
        setAlarmsList(sortedAlarmsList)

    }

    function sortAndFilterAlarmListByTime(unsortedAlarmsList: IAlarmMetadata[]) {

        let alarmTimes: string[] = []
        let alarmsSorted = []
        let sortedAlarmsIds = new Set<number>()

        unsortedAlarmsList.forEach((alarm) => {
            let time = alarm.timing.time
            if (!timeFormat24Hr) {
                time = time12hrTo24hr(time)
            }
            alarmTimes.push(time)
        })

        alarmTimes.sort()

        //console.log('going to do the sort by time. starting values:')
        //console.log(alarmTimes)
        //console.log(unsortedAlarmsList)


        alarmTimes.forEach((alarmTime) => {

            //console.log('============= alarmTime loop: ' + alarmTime)

            unsortedAlarmsList.forEach((alarm) => {

                //console.log('alarm loop: ' + alarm.id)

                const id = alarm.id
                if (!sortedAlarmsIds.has(id)) {
                    let currentAlarmTime = alarm.timing.time
                    //console.log('going to be comparing these two times [alarmTime, currentAlarmTime]')
                    //console.log([alarmTime, currentAlarmTime])
                    if (alarm.timing.format == 12) {
                        currentAlarmTime = time12hrTo24hr(currentAlarmTime)
                    }
                    if (currentAlarmTime == alarmTime) {
                        //console.log('match found; pushing to array !!!')
                        alarmsSorted.push(alarm)
                    }
                }
            })
        })

        return alarmsSorted

    }

    function sortAndFilterAlarmListByName(unsortedAlarmsList: IAlarmMetadata[]) {

        // const alarmKeys: string[] = Object.keys(alarmsUnsorted)
        let alarmNames: string[] = []
        let alarmsSorted = []
        let sortedAlarmsIds = new Set<number>()

        unsortedAlarmsList.forEach((alarm) => {
            const name = alarm.name
            alarmNames.push(name)
        })

        alarmNames.sort()

        alarmNames.forEach((alarmName) => {
            //console.log('alarm name:')
            unsortedAlarmsList.forEach((alarm) => {
                const id = alarm.id
                if (!sortedAlarmsIds.has(id)) {
                    if (alarm.name == alarmName) {
                        alarmsSorted.push(alarm)
                    }
                }
            })
        })

        return alarmsSorted

    }

    function time12hrTo24hr(time12hr: string) {
        // Split the time string into hours, minutes, and AM/PM
        const [timeString, period] = time12hr.split(' ');
        const [hours, minutes] = timeString.split(':').map(Number);

        // Convert 12-hour time to 24-hour time
        let hours24 = hours;
        if (period === 'PM' && hours < 12) {
            hours24 += 12;
        } else if (period === 'AM' && hours === 12) {
            hours24 = 0;
        }

        // Format hours and minutes with leading zeros
        const formattedHours = String(hours24).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        // Return the time in 24-hour format
        return `${formattedHours}:${formattedMinutes}`;
    }

    function time24hrTo12hr(time24Hr: string) {

        // Split the time string into hours and minutes
        const [hours, minutes] = time24Hr.split(':').map(Number);

        // Determine the period (AM or PM) based on the hours
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        let hours12 = hours % 12;
        hours12 = hours12 || 12; // Convert 0 to 12

        // Format hours and minutes with leading zeros
        const formattedHours = String(hours12).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        // Return the time in 12-hour format
        return `${formattedHours}:${formattedMinutes} ${period}`;
    }

    //----------------------------------------------------------------------------------------------



    //EVENT HANDLERS

    const updateAlarmsPageMetadata = (field: string, value: any) => {
        // //console.log('in updatealarmspagemetadata')
        setAlarmsPageMetadata(prevState => {
            //console.log('here in updatealarmspage metadata. prevState is:')
            //console.log(prevState)
            if (prevState) {
                let alarmsPageMetadataUpdated = { ...prevState }
                if (field) {
                    alarmsPageMetadataUpdated = { ...prevState, [field]: value }
                }
                alarmsPageMetadataUpdated.sorting.asc = alarmListSortAsc
                alarmsPageMetadataUpdated.sorting.type = alarmListSortType
                alarmsPageMetadataUpdated.timeFormat24Hr = timeFormat24Hr
                //also handle add / delete of alarm here, or in updateAlarmsMetadata
                // //console.log('alarmspagemetadataupdated is: ')
                // //console.log(alarmsPageMetadataUpdated)
                return alarmsPageMetadataUpdated
            }
        })
    }


    const updateAlarmsMetadata = (alarmId: number, alarmMetadata: IAlarmMetadata) => {
        setAlarmsPageMetadata(prevState => {
            // //console.log('here in updatealarmspage metadata. prevState is:')
            // //console.log(prevState)
            if (prevState) {
                // //console.log('made it into if prevState')
                const prevAlarms = { ...prevState.alarms }
                // //console.log('prevAlarms is:')
                // //console.log(prevAlarms)
                const alarmsUpdated = { ...prevAlarms, [alarmId]: alarmMetadata }
                // //console.log('alarmsUpdated is: ')
                // //console.log(alarmsUpdated)
                const alarmsPageMetadataUpdated = { ...prevState, 'alarms': alarmsUpdated };
                // //console.log('alarmsPageMetadataUpdated is: ')
                // //console.log(alarmsPageMetadataUpdated)
                return alarmsPageMetadataUpdated
            }
        });
    }

    const handleDeleteAlarm = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        //console.log('Handling delete alarm: Need to stop propagation and send delete request to server & rerender alarms list')
    }

    //alarm level
    const handleAlarmExpand = (event: React.SyntheticEvent, expanded: boolean) => {
        setAlarmExpanded(!alarmExpanded)
    }

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
        // setTimePickerMode('add')
        setTimePickerOpen(true)
    }

    const handleTimePickerChangeDoneClick = (event) => {
        //console.log('time to save details of alarm')
        //console.log(alarmTimePickerFormatted)
        //console.log(alarmName)
        //console.log(alarmNamePending)
        //console.log(event.target.classList)

        //If editing an existing alarm, we want to keep the changes whether the time picker was closed
        //via a click on the Done button or on the modal backdrop
        let keepChange = timePickerMode == 'edit' ? true : false

        //If creating a new alarm, we want to keep the changes only if the time picker was closed via
        //a click on the Done button
        if (event.target) {
            if (event.target.classList) {
                const targetClassList = Array.from(event.target.classList)
                if (targetClassList.includes('accept-alarm-time-and-name')) {
                    keepChange = true
                }
            }
        }

        setTimePickerOpen(false)

        if (keepChange) {
            //console.log('keeping change')
            // const currentAlarms = alarmsPageMetadata.alarms

                //check to see if this alarm exists
                //only relevant for edit mode
                let alarmId;
                let alarmMetadata: IAlarmMetadata
                // if (timePickerMode == 'add') {
                    //console.log('add mode')
                    alarmMetadata = {}
                // } else {
                //     //console.log('edit mode')
                //     //need to get alarm id (alarm.id)
                //     alarmId = timePickerAlarmId
                //     alarmMetadata = alarmsPageMetadata.alarms.alarmId
                // }


                


            


            const dateNow = Date.now()
            alarmMetadata.id = Math.floor(Math.random() * 10000000)
            alarmMetadata.name = alarmNamePending || alarmNamePlaceholder
            alarmMetadata.created = alarmMetadata.created || dateNow
            alarmMetadata.edited = alarmMetadata.edited || []
            alarmMetadata.edited.push(dateNow)
            alarmMetadata.shown = true,
            alarmMetadata.enabled = alarmMetadata.enabled || true
            alarmMetadata.timing = alarmMetadata.timing || alarmMetadataDefault.timing
            alarmMetadata.timing.time = alarmTime
            alarmMetadata.light = alarmMetadata.light || alarmMetadataDefault.light
            alarmMetadata.sound = alarmMetadata.sound || alarmMetadataDefault.sound
            alarmMetadata.vibration = alarmMetadata.vibration || alarmMetadataDefault.vibration


            //console.log('now time to update alarmpagemetadata and send to db. going to call updateAlarmsMetadata')
            updateAlarmsMetadata(alarmMetadata.id, alarmMetadata)



        } else {
            //console.log('discarding change')
            return
        }
        
        
        // if (alarmNamePending == '') {
        //     if (!alarmName) {
        //         setAlarmName(alarmNamePlaceholder)
        //         setAlarmNamePending(alarmNamePlaceholder)
        //     } else {
        //         setAlarmNamePending(alarmName)
        //     }
        // } else if (alarmNamePending) {
        //     setAlarmName(alarmNamePending)
        // } else {
        //     setAlarmName(alarmNamePlaceholder)
        //     setAlarmNamePending(alarmNamePlaceholder)
        // }
        // setAlarmNamePlaceholder('')

        // setTimePickerOpen(false)

    }

    const handleAlarmTimeChanged = (value) => {

        const hours = value.$H
        const minutes = value.$m

        let timeString: string
        if (timeFormat24Hr) {
            timeString = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0')
        } else {
            timeString = time24hrTo12hr(hours + ':' + minutes)
        }

        setAlarmTime(timeString)

    }

    const handleTimeFormatToggle = (event: React.MouseEvent<HTMLElement>, value: boolean) => {
        if (value != null) {
            setTimeFormat24Hr(value)
        }
    }

    const handleAlarmTimeOrNameClick = (event: React.MouseEvent<HTMLElement>) => {
        setTimePickerOpen(true)
        event.stopPropagation()
    }

    const handleAlarmListSortDirectionClick = () => {
        setAlarmsListPendingSortOrFilter(true)
        setAlarmListSortAsc(!alarmListSortAsc)
    }

    const handleAlarmListSortTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmListSortType(event.target.value)
        // const value: 'time' | 'name' = event.target.value as 'time' | 'name'
        // if (alarmListSortType != value) {
        //     setAlarmsListPendingSortOrFilter(true)
        //     setAlarmListSortType(value)
        // }

    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmsListPendingSortOrFilter(true)
        setAlarmsSearchValue(event.target.value)
    }

    // const updateAlarmsObject = (key: string, alarm: IAlarmMetadata)

    const handlers = {
        handleAlarmTimeOrNameClick: handleAlarmTimeOrNameClick,
        updateAlarmsMetadata: updateAlarmsMetadata
    }

    const setters = {
        setTimePickerOpen: setTimePickerOpen,
        // setAlarmsSerialized: setAlarmsSerialized
    }

    //----------------------------------------------------------------------------------------------

    return (
        <PageBuilder navSide={false}>
            <Box
                id='alarms-container-outer'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1rem',
                    height: '100%',
                    justifyContent: alarmsList.length > 0 ? 'initial' : 'center',
                    paddingBottom: alarmsList.length > 0 ? '0px' : '95px',
                }}
            >
                <Box
                    id='btn-new-alarm-container'
                    sx={{
                        // background: `linear-gradient(148deg, #ff9f4e, #fef751)`,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
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
                                background: appConfig.theme.palette.shades.primary[6],
                                color: appConfig.theme.palette.primary.contrastText,
                            }}
                        >
                            <Typography fontWeight={'normal'} fontSize={'1.25rem'}>New Alarm</Typography>
                        </Button>) : (
                        <Button
                            id='btn-first-alarm'
                            startIcon={<AddAlarmIcon />}
                            onClick={handleBtnNewAlarmClick}
                            sx={{
                                // width: '100%',
                                // marginLeft: 'auto',
                                width: '75vw',
                                maxWidth: '250px',
                                height: '75vw',
                                maxHeight: '250px',
                                padding: '.5rem',
                                borderRadius: '4px',
                                boxShadow: '0px 0px 10px 5px #00000047',
                                background: appConfig.theme.palette.shades.primary[6],
                                color: appConfig.theme.palette.primary.contrastText,
                            }}
                        >
                            <Typography fontWeight={'normal'} fontSize={'1.25rem'}>New Alarm</Typography>
                        </Button>
                    )}
                </Box>
                <Box
                    id='alarms-list-organization-control-container'
                    sx={{
                        marginTop: '2rem',
                        marginBottom: '1rem',
                        display: alarmsList.length > 0 ? 'flex' : 'none',
                        rowGap: '.5rem',
                        columnGap: '.5rem',
                        flexWrap: 'wrap'
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
                            onChange={handleSearch}
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
                        id='time-format-toggle-container'
                    >
                        <ToggleButtonGroup
                            value={timeFormat24Hr}
                            exclusive={true}
                            onChange={handleTimeFormatToggle}
                            sx={{
                                height: '2rem',
                                '&>.MuiButtonBase-root.Mui-selected': {
                                    background: appConfig.theme.palette.shades.tertiary[2],
                                }
                            }}
                        >
                            <ToggleButton className='btn-sort-option' value={false}
                            >AM:PM</ToggleButton>
                            <ToggleButton className='btn-sort-option' value={true}>24hr</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box
                        id='alarms-sort-container'
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'no-wrap',
                            alignItems: 'center',
                            marginLeft: 'auto'
                        }}
                    >
                        <Box
                            id='sort-direction-container'
                            sx={{

                                display: 'flex',
                                justifyContent: 'center',
                                height: '2rem',
                                borderRadius: '4px',
                                borderTopRightRadius: '0px',
                                borderBottomRightRadius: '0px',
                                overflow: 'hidden',
                                background: appConfig.theme.palette.primary.main,
                            }}
                        >
                            <IconButton
                                className='btn-sort-direction'
                                onClick={handleAlarmListSortDirectionClick}
                                sx={{
                                    height: '100%',
                                    color: appConfig.theme.palette.tertiary.main,
                                    background: appConfig.theme.palette.shades.primary[8],
                                    borderRadius: '0px'
                                }}
                            >
                                <SwapVertIcon
                                    sx={{
                                        transition: '200ms',
                                        transform: alarmListSortAsc ? 'none' : 'rotate(180deg)'
                                    }}
                                />
                                <SortIcon />
                            </IconButton>
                        </Box>
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
                                    height: '2rem',
                                    '&>.MuiButtonBase-root.Mui-selected': {
                                        background: appConfig.theme.palette.shades.tertiary[2],
                                    }
                                }}
                            >
                                <ToggleButton className='btn-sort-option' value='time'
                                    sx={{
                                        borderTopLeftRadius: '0px',
                                        borderBottomLeftRadius: '0px'
                                    }}
                                >Time</ToggleButton>
                                <ToggleButton className='btn-sort-option' value='name'>Name</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                </Box>

                <AlarmsList
                    alarms={alarmsList}
                    appConfig={appConfig}
                    handlers={handlers}
                    setters={setters}
                />
            </Box>


            <Modal
                className='name-and-time-modal'
                open={timePickerOpen}
                onClose={handleTimePickerChangeDoneClick}
                sx={{
                    background: '#000000cc'
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
                            background: appConfig.theme.palette.shades.primary[10],
                            padding: '1rem 2rem 2rem 2rem',
                            borderRadius: '4px'
                        }}
                        className='name-and-time-modal-contents'
                    >

                        <Box
                            className='time-input-container'
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* TODO: Research LocalizationProvider - should wrap whole page? */}
                                <DemoContainer components={['TimePicker']}>
                                    <StaticTimePicker
                                        ampm={!timeFormat24Hr}
                                        value={alarmTimePickerFormatted || dayjs('12:00', 'HH:mm')}
                                        onChange={handleAlarmTimeChanged}

                                        sx={{
                                            background: 'none',
                                            width: 'fit-content',
                                            color: 'yellow',
                                            '& span': {
                                                color: appConfig.theme.palette.shades.tertiary[3],
                                                '&.Mui-selected': {
                                                    color: appConfig.theme.palette.shades.tertiary[1],
                                                }
                                            },
                                        }}
                                        slotProps={{
                                            actionBar: {
                                                sx: {
                                                    display: 'none',
                                                    flexDirection: 'column-reverse',
                                                    rowGap: '1rem',
                                                    '& .MuiButtonBase-root': {
                                                        width: '100%',
                                                        border: `1px solid ${appConfig.theme.palette.shades.tertiary[1]}`,
                                                        margin: '0px',
                                                        padding: '.5rem',
                                                        fontSize: '1rem',
                                                        '&:last-child': {
                                                            background: `${appConfig.theme.palette.shades.tertiary[3]}`
                                                        }
                                                    }
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
                                                    '& .MuiTimePickerToolbar-ampmSelection': {
                                                        marginRight: '0px'
                                                    }
                                                }
                                            },
                                            layout: {
                                                sx: {
                                                    '& .MuiPickersLayout-contentWrapper': {
                                                        gridRow: '1 !important',    //see above
                                                    },
                                                }
                                            }
                                        }}
                                    />

                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box id='name-input-container'>
                            <TextField
                                variant='filled'
                                label='Alarm Name'
                                placeholder={alarmNamePlaceholder}
                                value={alarmNamePending || ''}
                                onChange={handleAlarmNameTyping}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{
                                    width: '100%',
                                    color: 'white',
                                    background: 'white'
                                }}
                            />
                        </Box>
                        <Box
                            className='accept-alarm-time-and-name'
                        >
                            <Button
                                variant='contained'
                                className='accept-alarm-time-and-name'
                                onClick={handleTimePickerChangeDoneClick}
                                sx={{
                                    width: '100%'
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