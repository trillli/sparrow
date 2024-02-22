import * as React from 'react';
import { AccordionActions, Box, Button, Container, Icon, IconButton, InputAdornment, Modal, Paper, Slider, Switch, TextField, 
    ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { trFetch, TrFetchConfig, TrFetchResult } from "trillli/src/components/TrApiClient";
import AlarmsList from 'src/components/AlarmsList'
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
import SortIcon from '@mui/icons-material/Sort';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { IAlarmMetadata } from '../../types/IAlarmMetadata'
import { DoNotDisturbAlt, Expand, Repeat, SyncDisabled, Visibility } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'
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
import { TIME_VALIDATION_PROP_NAMES } from '@mui/x-date-pickers/internals/utils/validation/extractValidationProps';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { PickersActionBarProps } from '@mui/x-date-pickers';
import Fade from '@mui/material/Fade';
import { useAuth0 } from '@auth0/auth0-react';

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
    let alarms: { [key: string]: IAlarmMetadata } = {
        alarm_1: {
            name: 'Work Morning',
            created: 1707533238,
            edited: [
                1707539001,
                1707540123,
            ],
            id: 45423563181,
            shown: true,
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
                time: '7:00 AM',
                format: 12,
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
        }
    }

    let alarmsUnsorted: IAlarmMetadata[] = []
    const allAlarmsKeys = Object.keys(alarms);
    allAlarmsKeys.forEach((alarmKey) => {
        alarmsUnsorted.push(alarms[alarmKey])
    })

    //----------------------------------------------------------------------------------------------



    //STATE VARIALES, REFS, VARIABLES  ----------------------------------------------------------------------
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [alarmComponents, setAlarmComponents] = React.useState<React.ReactNode>(<></>)

    const [alarmsList, setAlarmsList] = React.useState<IAlarmMetadata[]>(alarmsUnsorted)
    const [alarmListSortAsc, setAlarmListSortAsc] = React.useState<boolean>(true)
    const [alarmListSortType, setAlarmListSortType] = React.useState<'time' | 'name'>('time')
    const [alarmsListPendingSortOrFilter, setAlarmsListPendingSortOrFilter] = React.useState<boolean>(true)
    const [alarmsSearchValue, setAlarmsSearchValue] = React.useState<string>('')

    
    const [alarmExpanded, setAlarmExpanded] = React.useState<boolean>(false) //alarm level
    const [noRepeat, setNoRepeat] = React.useState<boolean>(true)//alarm level
    type DayAbbrev = 'su' | 'm' | 'tu' | 'w' | 'th' | 'f' | 'sa'//alarm level
    const [repeatDays, setRepeatDays] = React.useState<Set<DayAbbrev>>(new Set<DayAbbrev>())//alarm level

    const [alarmName, setAlarmName] = React.useState<string>();
    const [alarmNamePlaceholder, setAlarmNamePlaceholder] = React.useState<string>(() => {
        const index = Math.floor(Math.random() * defaultAlarmNames.length)
        return (defaultAlarmNames[index] + ' alarm')
    })
    const [alarmNamePending, setAlarmNamePending] = React.useState<string>()

    const [alarmTime, setAlarmTime] = React.useState<string>('17:23')
    const [timePickerOpen, setTimePickerOpen] = React.useState<boolean>(false)
    const [timeFormat24Hr, setTimeFormat24Hr] = React.useState<boolean>(false)
    const [alarmTimePickerFormatted, setAlarmTimePickerFormatted] = React.useState<Dayjs>()

    
    // const [soundEnabled, setSoundEnabled] = React.useState<boolean>(false) //sound group level
    // const [soundSource, setSoundSource] = React.useState<string>('spotify') //sound group level
    // const [soundSearchValue, setSoundSearchValue] = React.useState<string>('') //sound group level
    // type SoundType = 'track' | 'album' | 'artist' | 'playlist' //sound group level
    // const [soundType, setSoundType] = React.useState<SoundType[]>([]) //sound group level
    // const [soundTypeNoFilter, setSoundTypeNoFilter] = React.useState<boolean>(true) //sound group level
    // const [soundSong, setSoundSong] = React.useState<string>('') //sound group level
    // const [soundPlaylist, setSoundPlaylist] = React.useState<string>('') //sound group level
    // const [soundArtist, setSoundArtist] = React.useState<string>('') //sound group level
    // const [soundVolumeProfile, setSoundVolumeProfile] = React.useState<'constant' | 'ramp'>('constant') //sound group level
    // const [soundVolumeMax, setSoundVolumeMax] = React.useState<number>(50) //sound group level
    // const [soundVolumeConstant, setSoundVolumeConstant] = React.useState<number>(soundVolumeMax) //sound group level
    // const [soundVolumeRamp, setSoundVolumeRamp] = React.useState<number[]>([0, soundVolumeMax]) //sound group level

    // const [lightEnabled, setLightEnabled] = React.useState<boolean>(true)
    // const [lightAdvanceMinutes, setLightAdvanceMinutes] = React.useState<number>(-15)
    // const [lightColor, setLightColor] = React.useState<number>(60);
    // const [lightBrightnessType, setLightBrightnessType] = React.useState<'constant' | 'ramp'>('constant')
    // const [lightBrightnessMax, setLightBrightnessMax] = React.useState<number>(75)
    // const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(lightBrightnessMax)
    // const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([25, lightBrightnessMax])

    // const [vibrationEnabled, setVibrationEnabled] = React.useState<boolean>(false)
    // const [vibrationStartTime, setVibrationStartTime] = React.useState<number>(0)
    // const [vibrationType, setVibrationType] = React.useState<'constant' | 'ramp'>('constant')
    // const [vibrationEnd, setVibrationEnd] = React.useState<number>(75)
    // const [vibrationConstant, setVibrationConstant] = React.useState<number>(vibrationEnd)
    // const [vibrationRamp, setVibrationRamp] = React.useState<number[]>([0, vibrationEnd])



    //----------------------------------------------------------------------------------------------
    React.useEffect(() => {
        // setVibrationConstant(99)
        setAlarmTimePickerFormatted(dayjs(alarmTime, 'HH:mm'))
    }, [alarmTime])

    React.useEffect(() => {

        if (alarmsListPendingSortOrFilter) {
            sortAndFilterAlarmList()
        } else {
            // console.log('no longer using setalarmcomponents - instead need to implement & update an alarm state variable')
            // setAlarmComponents(generateAlarmComponents()) 
        }

    }, [alarmsList, alarmListSortType, alarmListSortAsc, alarmsSearchValue])

    // //Alarm level
    // React.useEffect(() => {
    //     if (noRepeat) {
    //         setRepeatDays(new Set<DayAbbrev>())
    //     } 
    // }, [noRepeat])

    // //Alarm level
    // React.useEffect(() => {
    //     if (repeatDays.size == 0) {
    //         setNoRepeat(true)
    //     } else {
    //         setNoRepeat(false)
    //     }
    // }, [repeatDays])

    // //sound group level
    // React.useEffect(() => {
    //     if (soundTypeNoFilter) {
    //         setSoundType([])
    //     }
    // }, [soundTypeNoFilter])

    //sound group level
    // React.useEffect(() => {

    //     // let testset = new Set<SoundType>()
    //     // testset.add('artist')
    //     // testset.add('track')
    //     // console.log(testset)

    //     const searchParams = {
    //         queryString: soundSearchValue,
    //         queryTypes: soundType
    //     }

    //     const getSoundSearchResults = async () => {
    //         const accessToken = await getAccessTokenSilently();
    //         const requestConfig: TrFetchConfig = {
    //             accessToken: accessToken,
    //             method: 'POST',
    //             path: "/api/sound_search",
    //             payload: JSON.stringify(searchParams)
    //         }
    //         const result: TrFetchResult = await trFetch(requestConfig);

    //         const spotifySearchResults = result.ok?.data
    //         const songs: any[] = spotifySearchResults.tracks?.items || []
    //         const albums: any[] = spotifySearchResults.albums?.items || []
    //         const artists: any[] = spotifySearchResults.artists?.items || []
    //         const playlists: any[] = spotifySearchResults.playlists?.items || []

    //         let soundSearchResultsFormatted = {
    //             songs: [] as any[],
    //             albums: [] as any[],
    //             artists: [] as any[],
    //             playlists: [] as any[]
    //         }

    //         songs.forEach((song) => {
    //             const songName: string = song.name
    //             const songAlbum: string = song.album.name
    //             const songArtists: any[] = song.artists
    //             let songArtistNames: string[] = []
    //             songArtists.forEach((songArtist) => {
    //                 songArtistNames.push(songArtist.name)
    //             })
    //             const songPreviewUrl: string = song.preview_url
    //             soundSearchResultsFormatted.songs.push({
    //                 name: songName,
    //                 album: songAlbum,
    //                 artist: songArtistNames,
    //                 previewUrl: songPreviewUrl
    //             })
    //         })

    //         albums.forEach((album) => {
    //             const albumName: string = album.name
    //             const albumArtists: any[] = album.artists
    //             let albumArtistNames: string[] = []
    //             albumArtists.forEach((albumArtist) => {
    //                 albumArtistNames.push(albumArtist.name)
    //             })
    //             soundSearchResultsFormatted.albums.push({
    //                 name: albumName,
    //                 artist: albumArtistNames
    //             })
    //         })

    //         artists.forEach((artist) => {
    //             const artistName: string = artist.name
    //             soundSearchResultsFormatted.artists.push({
    //                 name: artistName
    //             })
    //         })

    //         playlists.forEach((playlist) => {
    //             const playlistName: string = playlist.name
    //             const playlistAuthor: string = playlist.owner
    //             soundSearchResultsFormatted.playlists.push({
    //                 name: playlistName,
    //                 author: playlistAuthor
    //             })
    //         })

    //     }

    //     // getSoundSearchResults()

    // }, [soundSearchValue, soundType])

    // //Sound group level
    // React.useEffect(() => {
    //     setSoundVolumeConstant(soundVolumeMax)
    //     setSoundVolumeRamp([soundVolumeRamp[0], soundVolumeMax])
    // }, [soundVolumeMax])

    //Light group level
    // React.useEffect(() => {
    //     setLightBrightnessConstant(lightBrightnessMax)
    //     setLightBrightnessRamp([lightBrightnessRamp[0], lightBrightnessMax])
    // }, [lightBrightnessMax])

    //Vibration group level
    // React.useEffect(() => {
    //     setVibrationConstant(vibrationEnd)
    //     setVibrationRamp([vibrationRamp[0], vibrationEnd])
    // }, [vibrationEnd])

    //----------------------------------------------------------------------------------------------

    //HELPER FUNCTIONS
    function sortAndFilterAlarmList() {

        let sortedAlarmsList = []

        if (alarmListSortType == 'time') {
            sortedAlarmsList = sortAndFilterAlarmListByTime()
        } else {
            sortedAlarmsList = sortAndFilterAlarmListByName()
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

        setAlarmsListPendingSortOrFilter(false)
        setAlarmsList(sortedAlarmsList)

    }

    function sortAndFilterAlarmListByTime() {

        let alarmTimes: string[] = []
        let alarmsSorted = []
        let sortedAlarmsIds = new Set<number>()

        alarmsList.forEach((alarm) => {
            let time = alarm.timing.time
            if (alarm.timing.format == 12) {
                time = time12hrTo24hr(time)
            }
            alarmTimes.push(time)
        })

        alarmTimes.sort()


        alarmTimes.forEach((alarmTime) => {

            alarmsList.forEach((alarm) => {

                const id = alarm.id
                if (!sortedAlarmsIds.has(id)) {
                    let currentAlarmTime = alarm.timing.time
                    if (alarm.timing.format == 12) {
                        currentAlarmTime = time12hrTo24hr(currentAlarmTime)
                    }
                    if (currentAlarmTime == alarmTime) {
                        alarmsSorted.push(alarm)
                    }
                }
            })
        })

        return alarmsSorted

    }

    function sortAndFilterAlarmListByName() {

        const alarmKeys: string[] = Object.keys(alarmsUnsorted)
        let alarmNames: string[] = []
        let alarmsSorted = []
        let sortedAlarmsIds = new Set<number>()

        alarmsList.forEach((alarm) => {
            const name = alarm.name
            alarmNames.push(name)
        })

        alarmNames.sort()

        alarmNames.forEach((alarmName) => {
            console.log('alarm name:')
            alarmsList.forEach((alarm) => {
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

    function getEarlier24HrTime(times24Hr: [string, string]) {

        // Split the time strings into hours and minutes
        const [hours1, minutes1] = times24Hr[0].split(':').map(Number);
        const [hours2, minutes2] = times24Hr[1].split(':').map(Number);

        // Compare hours
        if (hours1 < hours2) {
            return -1; // time1 comes before time2
        } else if (hours1 > hours2) {
            return 1; // time1 comes after time2
        } else {
            // If hours are the same, compare minutes
            if (minutes1 < minutes2) {
                return -1; // time1 comes before time2
            } else if (minutes1 > minutes2) {
                return 1; // time1 comes after time2
            } else {
                return 0; // Both times are equal
            }
        }
    }
    //----------------------------------------------------------------------------------------------



    //EVENT HANDLERS
    const handleDeleteAlarm = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        console.log('Handling delete alarm: Need to stop propagation and send delete request to server & rerender alarms list')
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
        setTimePickerOpen(true)
    }

    const handleTimePickerChangeDoneClick = () => {
        if (alarmNamePending == '') {
            if (!alarmName) {
                setAlarmName(alarmNamePlaceholder)
                setAlarmNamePending(alarmNamePlaceholder)
            } else {
                setAlarmNamePending(alarmName)
            }
        } else if (alarmNamePending) {
            setAlarmName(alarmNamePending)
        } else {
            setAlarmName(alarmNamePlaceholder)
            setAlarmNamePending(alarmNamePlaceholder)
        }
        setAlarmNamePlaceholder('')

        setTimePickerOpen(false)

    }

    const testChange = (value) => {

        const hours = value.$H
        const minutes = value.$m

        let timeString = hours + ':' + minutes
        if (timeFormat24Hr) {

        } else {
            timeString = time24hrTo12hr(timeString)
        }

        setAlarmTime(timeString)

    }

    const handleTimeFormatToggle = (event: React.MouseEvent<HTMLElement>, value: boolean) => {
        if (value != null) {
            setTimeFormat24Hr(value)
        }
    }

    // //alarm level
    const handleAlarmTimeOrNameClick = (event: React.MouseEvent<HTMLElement>) => {
        setTimePickerOpen(true)
        event.stopPropagation()
    }

    // //alarm level
    // const handleSummaryDayChange = (event: React.MouseEvent<HTMLElement>) => {

    //     event.stopPropagation()
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     const value: DayAbbrev = target.value as DayAbbrev

    //     let repeatDaysUpdated = new Set(repeatDays)

    //     if (repeatDays.has(value)) {
    //         repeatDaysUpdated.delete(value)
    //     } else {
    //         repeatDaysUpdated.add(value)
    //     }

    //     setRepeatDays(repeatDaysUpdated)

    // }

    // //alarm level
    // const handleSummaryDayNoRepeatChange = (event: React.MouseEvent<HTMLElement>) => {
    //     event.stopPropagation()
    //     if (!noRepeat) {
    //         setNoRepeat(true)
    //     }
    // }

    // //alarm level
    // const handleToggleAlarmStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    //     event.stopPropagation()
    // }


    const handleAlarmListSortDirectionClick = () => {
        setAlarmsListPendingSortOrFilter(true)
        setAlarmListSortAsc(!alarmListSortAsc)
    }

    const handleAlarmListSortTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: 'time' | 'name' = event.target.value as 'time' | 'name'
        if (alarmListSortType != value) {
            setAlarmsListPendingSortOrFilter(true)
            setAlarmListSortType(value)
        }

    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmsListPendingSortOrFilter(true)
        setAlarmsSearchValue(event.target.value)
    }

    //alarm group level
    // const handleSoundSourceChange = (event: React.MouseEvent<HTMLElement>) => {

    // }

    //alarm group level
    // const handleSoundSearchTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSoundSearchValue(event.target.value)
    // }

    //alarm group level
    // const handleSoundTypeChange = (event: React.MouseEvent<HTMLElement>, value) => {
    //     setSoundType(value)

    // }

    //alarm group level
    // const handleSoundTypeNoFilterChange = (event: React.MouseEvent<HTMLElement>) => {
    //     event.stopPropagation()
    //     if (!soundTypeNoFilter) {
    //         setSoundTypeNoFilter(true)
    //     }
    // }

    // const handleSoundSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSoundSong(event.target.value)
    // }

    // const handleSoundPlaylistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSoundPlaylist(event.target.value)
    // }

    // const handleSoundArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSoundArtist(event.target.value)
    // }

    //sound vol group level
    // const handleSoundVolumeProfileChange = (event: React.MouseEvent<HTMLElement>) => {
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     let value: string = target.value
    //     const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'
    //     setSoundVolumeProfile(valueTyped)
    // }

    // //sound vol group level
    // const handleSoundVolumeConstantChange = (event: Event, value: number | number[]) => {
    //     setSoundVolumeMax(value as number)
    // }

    // //sound vol group level
    // const handleSoundVolumeRampChange = (event: Event, value: number | number[]) => {
    //     const valueTyped = value as number[]
    //     setSoundVolumeRamp(valueTyped)
    // }

    //sound group level
    // const handleCategorySoundSwitchClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.stopPropagation()
    //     const checked: boolean = event.target.checked
    //     setSoundEnabled(checked)

    // }

    //light group level
    // const handleCategoryLightSwitchClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.stopPropagation()
    //     const checked: boolean = event.target.checked
    //     setLightEnabled(checked)

    // }

    //vibration group level
    // const handleCategoryVibrationSwitchClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.stopPropagation()
    //     const checked: boolean = event.target.checked
    //     setVibrationEnabled(checked)

    // }

    //light group level
    // const handleLightAdvanceMinutesSliderChange = (event: Event) => {
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     const value: number = Number(target.value)
    //     setLightAdvanceMinutes(value)
    // }

    //light group level
    // const handleLightColorChange = (event: React.MouseEvent<HTMLElement>) => {
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     const value: number = Number(target.value)
    //     setLightColor(value)
    // }

    //light group level
    // const handleLightBrightnessTypeChange = (event: React.MouseEvent<HTMLElement>) => {
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     let value: string = target.value
    //     const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'
    //     setLightBrightnessType(valueTyped)
    // }

    // //light group level
    // const handleLightBrightnessChangeConstant = (event: Event, value: number | number[]) => {
    //     setLightBrightnessMax(value as number)
    // }

    // //light group level
    // const handleLightBrightnessChangeRamp = (event: Event, value: number | number[]) => {
    //     const values = value as number[]
    //     setLightBrightnessRamp(values as number[])
    //     setLightBrightnessMax(values[1] as number)
    // }

    //vibration group level
    // const handleVibrationStartTimeChange = (event: Event) => {
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     const value: number = Number(target.value)
    //     setVibrationStartTime(value)
    // }

    // //vibration group level
    // const handleVibrationTypeChange = (event: React.MouseEvent<HTMLInputElement>) => {
    //     const target: HTMLInputElement = event.target as HTMLInputElement
    //     const value: string = target.value
    //     setVibrationType(value)
    // }

    // //vibration group level
    // const handleVibrationChangeConstant = (event: Event, value: number | number[]) => {
    //     setVibrationEnd(value as number)
    // }

    // //vibration group level
    // const handleVibrationChangeRamp = (event: Event, value: number | number[]) => {
    //     const values = value as number[]
    //     setVibrationRamp(values as number[])
    //     setVibrationEnd(values[1] as number)
    // }

    // const alarmConfigStateControl: IAlarmConfigStateControl = {
    //     sound: {
    //         vars: {
    //             // categoryEnabled: soundEnabled,
    //             // soundSource: soundSource,
    //             // soundType: soundType,
    //             // soundTypeNoFilter: soundTypeNoFilter,
    //             // soundSong: soundSong,
    //             // soundPlaylist: soundPlaylist,
    //             // soundArtist: soundArtist,
    //             // soundVolumeProfile: soundVolumeProfile,
    //             // soundVolumeConstant: soundVolumeConstant,
    //             // soundVolumeRamp: soundVolumeRamp
    //         },
    //         handlers: {
    //             // handleCategorySwitchClick: handleCategorySoundSwitchClick,
    //             // handleSoundSourceChange: handleSoundSourceChange,
    //             // handleSoundTypeChange: handleSoundTypeChange,
    //             // handleSoundSearchTyping: handleSoundSearchTyping,
    //             // handleSoundTypeNoFilterChange: handleSoundTypeNoFilterChange,
    //             // handleSoundSongChange: handleSoundSongChange,
    //             // handleSoundPlaylistChange: handleSoundPlaylistChange,
    //             // handleSoundArtistChange: handleSoundArtistChange,
    //             // handleSoundVolumeProfileChange: handleSoundVolumeProfileChange,
    //             // handleSoundVolumeConstantChange: handleSoundVolumeConstantChange,
    //             // handleSoundVolumeRampChange: handleSoundVolumeRampChange
    //         }
    //     },
    //     light: {
    //         vars: {
    //             // categoryEnabled: lightEnabled,
    //             // lightAdvanceMinutes: lightAdvanceMinutes,
    //             // lightColor: lightColor,
    //             // lightBrightnessType: lightBrightnessType,
    //             // lightBrightnessConstant: lightBrightnessConstant,
    //             // lightBrightnessRamp: lightBrightnessRamp
    //         },
    //         handlers: {
    //             // handleCategorySwitchClick: handleCategoryLightSwitchClick,
    //             // handleLightAdvanceMinutesSliderChange: handleLightAdvanceMinutesSliderChange,
    //             // handleLightColorChange: handleLightColorChange,
    //             // handleLightBrightnessTypeChange: handleLightBrightnessTypeChange,
    //             // handleLightBrightnessChangeConstant: handleLightBrightnessChangeConstant,
    //             // handleLightBrightnessChangeRamp: handleLightBrightnessChangeRamp,
    //         }
    //     },
    //     vibration: {
    //         vars: {
    //             // categoryEnabled: vibrationEnabled,
    //             // lightColor: lightColor,
    //             // vibrationStartTime,
    //             // vibrationType: vibrationType,
    //             // vibrationConstant: vibrationConstant,
    //             // vibrationRamp: vibrationRamp,
    //         },
    //         handlers: {
    //             // handleCategorySwitchClick: handleCategoryVibrationSwitchClick,
    //             // handleVibrationStartTimeChange: handleVibrationStartTimeChange,
    //             // handleVibrationChangeConstant: handleVibrationChangeConstant,
    //             // handleVibrationChangeRamp: handleVibrationChangeRamp,
    //             // handleVibrationTypeChange: handleVibrationTypeChange
    //         }
    //     }
    // }

    // const alarmConfigCategoryMetadata: IAlarmConfigCategoryMetadata = {
    //     stateControl: alarmConfigStateControl,
    //     appConfig: appConfig,
    //     groups: {
    //         sound: {
    //             label: 'Music',
    //             id: 'sound',
    //             icon: 'music_note',
    //             fieldNamesOrdered: ['search', 'volume'],
    //             fields: {
    //                 search: {
    //                     label: 'Search for music on Spotify',
    //                     id: 'type',
    //                     showHeader: false,
    //                     body: <AlarmConfigCategoryDetailBodySoundSearch {...alarmConfigStateControl.sound} />
    //                 },
    //                 volume: {
    //                     label: 'Volume',
    //                     id: 'volume',
    //                     // showHeader: true,
    //                     body: <AlarmConfigCategoryDetailBodySoundVolume {...alarmConfigStateControl.sound} />
    //                 },
    //             }
    //         },
    //         light: {
    //             label: 'Sunlight',
    //             id: 'light',
    //             icon: 'wb_twilight',
    //             fieldNamesOrdered: ['start_relative', 'color', 'brightness'],
    //             fields: {
    //                 start_relative: {
    //                     label: 'Turn light on ' + (Math.abs(alarmConfigStateControl.light.vars.lightAdvanceMinutes)) + ' ' + (Math.abs(alarmConfigStateControl.light.vars.lightAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (alarmConfigStateControl.light.vars.lightAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm time',
    //                     id: 'start',
    //                     showHeader: false,
    //                     body: <AlarmConfigCategoryDetailBodyLightStart {...alarmConfigStateControl.light} />
    //                 },
    //                 color: {
    //                     label: 'Color',
    //                     id: 'color',
    //                     showHeader: false,
    //                     body: <AlarmConfigCategoryDetailBodyLightColor {...alarmConfigStateControl.light} />
    //                 },
    //                 brightness: {
    //                     label: 'Brightness',
    //                     id: 'brightness',
    //                     showHeader: false,
    //                     body: <AlarmConfigCategoryDetailBodyLightBrightness {...alarmConfigStateControl.light} />
    //                 }
    //             }
    //         },
    //         vibration: {
    //             label: 'Vibration',
    //             id: 'vibration',
    //             icon: 'vibration',
    //             fieldNamesOrdered: ['start_relative', 'intensity'],
    //             fields: {
    //                 start_relative: {
    //                     label: 'Begin vibration ' + (Math.abs(alarmConfigStateControl.vibration.vars.vibrationStartTime)) + ' ' + (Math.abs(alarmConfigStateControl.vibration.vars.vibrationStartTime) == 1 ? 'minute' : 'minutes') + ' ' + (alarmConfigStateControl.vibration.vars.vibrationStartTime > 0 ? 'after' : 'before') + ' alarm time',
    //                     id: 'start',
    //                     showHeader: false,
    //                     body: <AlarmConfigCategoryDetailBodyVibrationStart {...alarmConfigStateControl.vibration} />
    //                 },
    //                 intensity: {
    //                     label: 'Intensity',
    //                     id: 'intensity',
    //                     showHeader: false,
    //                     body: <AlarmConfigCategoryDetailBodyVibration {...alarmConfigStateControl.vibration} />
    //                 }
    //             }
    //         }
    //     }
    // }


    //----------------------------------------------------------------------------------------------

    //COMPONENT GENERATION
    // const generateAlarmComponents = () => {

    //     //Loop over all alarms; for each one, generate their config components
    //     let alarmComponentsList: React.ReactNode[] = []
    //     alarmsList.forEach((alarmMetadata: IAlarmMetadata) => {

    //         if (alarmMetadata.shown) {

    //             //Get alarm metadata
    //             // const alarmMetadata: IAlarmMetadata = alarms[alarmKey]
    //             const alarmName = alarmMetadata.name

    //             const alarmItemContent =
    //                 <Accordion
    //                     elevation={0}
    //                     prop_alarm_name={alarmMetadata.name}
    //                     prop_alarm_time={alarmMetadata.timing.time}
    //                     key={alarmMetadata.id}
    //                     className='alarm-container'
    //                     onChange={handleAlarmExpand}
    //                     sx={{
    //                         overflow: 'hidden',
    //                         // border: `2px solid #eebb50`,
    //                         borderTop: 'none',
    //                         background: 'linear-gradient(148deg, #ff9f4e, #fef751)',
    //                         '&>.MuiCollapse-root': {
    //                             background: '#FFFFFF57',
    //                             // padding: '.5rem'
    //                         }
    //                     }}
    //                 >
    //                     <AccordionSummary
    //                         className='alarm-header'
    //                         sx={{
    //                             padding: '0px',
    //                             '& .MuiAccordionSummary-content': {
    //                                 margin: '0px',
    //                                 display: 'flex',
    //                                 flexDirection: 'row',
    //                                 flexWrap: 'wrap',
    //                                 '&.Mui-expanded': {
    //                                     marginTop: '0px',
    //                                     marginBottom: '0px'
    //                                 }
    //                             }
    //                         }}
    //                     >



    //                         <Box
    //                             className='alarm-essentials'
    //                             sx={{
    //                                 width: '100%',
    //                                 display: 'flex',
    //                                 alignItems: 'center',
    //                                 background: 'linear-gradient(148deg, #ff9f4e, #fef751)'
    //                             }}
    //                         >
    //                             <Box
    //                                 className='alarm-time-container'
    //                                 alignItems='center'
    //                                 sx={{
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     height: '100%',
    //                                     padding: '0px .75rem',
    //                                     borderRadius: '4px',
    //                                     color: appConfig.theme.palette.secondary.contrastText,
    //                                 }}
    //                             >
    //                                 <Typography
    //                                     onClick={handleAlarmTimeOrNameClick}
    //                                     sx={{
    //                                         fontSize: '1.25rem',
    //                                         fontWeight: 'bold'
    //                                     }}
    //                                 >
    //                                     {alarmMetadata.timing.time}
    //                                 </Typography>
    //                             </Box>
    //                             <Box
    //                                 className='alarm-name-container'
    //                                 sx={{
    //                                     whiteSpace: 'pre-wrap',
    //                                     wordBreak: 'break-word',
    //                                     height: '100%',
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     flexGrow: '1',
    //                                     borderRadius: '4px',
    //                                     padding: '0px .75rem'
    //                                 }}
    //                             >
    //                                 <Typography onClick={handleAlarmTimeOrNameClick}>{alarmMetadata.name}</Typography>
    //                             </Box>
    //                             <Box
    //                                 className='alarm-status-container'
    //                                 sx={{
    //                                     marginRight: '-0px',
    //                                     height: 'fit-content',
    //                                 }}
    //                             >
    //                                 <Switch onClick={handleToggleAlarmStatusClick} />
    //                             </Box>
    //                         </Box>
    //                         <Box
    //                             className='alarm-summary'
    //                             sx={{
    //                                 transition: '.2s',
    //                                 display: 'flex',
    //                                 width: '100%',
    //                                 background: '#FFFFFF57',
    //                             }}
    //                         >
    //                             <Box
    //                                 className='alarm-summary-timing'
    //                                 sx={{
    //                                     display: 'flex',
    //                                     flexWrap: 'wrap',
    //                                 }}
    //                             >
    //                                 <ToggleButtonGroup
    //                                     className='alarm-summary-days'
    //                                     value={Array.from(repeatDays)}
    //                                     onChange={handleSummaryDayChange}
    //                                     sx={{
    //                                         display: 'flex',
    //                                         flexWrap: 'wrap',
    //                                         height: 'fit-content',
    //                                         borderRadius: '0px',
    //                                         '& .MuiButtonBase-root': {
    //                                             border: 'none',
    //                                             background: 'none',
    //                                             padding: '0px',
    //                                             height: '2rem',
    //                                             width: '2.5rem',
    //                                             borderRadius: '0px'
    //                                         },
    //                                         '&>.MuiButtonBase-root.Mui-selected': {
    //                                             background: appConfig.theme.palette.shades.tertiary[8],
    //                                             color: 'white',
    //                                             fontWeight: 'bold',
    //                                         }
    //                                     }}
    //                                 >
    //                                     <ToggleButton value='su' className='alarm-day alarm-summary-day'>Su</ToggleButton>
    //                                     <ToggleButton value='m' className='alarm-day alarm-summary-day'>M</ToggleButton>
    //                                     <ToggleButton value='tu' className='alarm-day alarm-summary-day'>Tu</ToggleButton>
    //                                     <ToggleButton value='w' className='alarm-day alarm-summary-day'>W</ToggleButton>
    //                                     <ToggleButton value='th' className='alarm-day alarm-summary-day'>Th</ToggleButton>
    //                                     <ToggleButton value='f' className='alarm-day alarm-summary-day'>F</ToggleButton>
    //                                     <ToggleButton value='sa' className='alarm-day alarm-summary-day'>Sa</ToggleButton>
    //                                     <ToggleButtonGroup
    //                                         className='alarm-summary-no-repeat'
    //                                         value={noRepeat}
    //                                         onClick={handleSummaryDayNoRepeatChange}
    //                                         sx={{
    //                                             height: 'fit-content',
    //                                             '& .MuiButtonBase-root': {
    //                                                 borderLeft: 'none',
    //                                                 background: 'none',
    //                                                 padding: '0px',
    //                                                 height: '2rem',
    //                                                 width: '2.5rem',
    //                                             },
    //                                         }}
    //                                     >
    //                                         <ToggleButton
    //                                             className='alarm-day alarm-summary-day'
    //                                             value={true}
    //                                         >
    //                                             <SyncDisabled />
    //                                         </ToggleButton>
    //                                     </ToggleButtonGroup>
    //                                 </ToggleButtonGroup>
    //                             </Box>
    //                             <Box
    //                                 className='alarm-action-btns-container'
    //                                 sx={{
    //                                     marginLeft: 'auto',
    //                                     marginRight: '6px',
    //                                     display: 'flex'
    //                                 }}
    //                             >
    //                                 <IconButton
    //                                     sx={{
    //                                         transition: 'rotate 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    //                                         rotate: alarmExpanded ? '180deg' : '0deg',
    //                                         padding: '0px'
    //                                     }}
    //                                 >
    //                                     <ExpandMoreIcon />
    //                                 </IconButton>
    //                             </Box>
    //                         </Box>
    //                     </AccordionSummary>
    //                     <AccordionDetails
    //                         className='alarm-config-categories-container'
    //                         sx={{
    //                             padding: '0px',
    //                             display: 'flex',
    //                             flexDirection: 'column',
    //                         }}
    //                     >
    //                         <AlarmConfigCategoryOuter alarmConfigCategoryMetadata={alarmConfigCategoryMetadata} />
    //                     </AccordionDetails>
    //                 </Accordion>

    //             alarmComponentsList.push(alarmItemContent)

    //         }

    //     })

    //     return alarmComponentsList

    // }

    const handlers = {
        handleAlarmTimeOrNameClick: handleAlarmTimeOrNameClick
    }

    const setters = {
        setTimePickerOpen: setTimePickerOpen
    }

    //----------------------------------------------------------------------------------------------

    return (
        <PageBuilder navSide={false}>
            <Box
                id='alarms-container-outer'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1rem'
                }}
            >
                <Box
                    id='btn-new-alarm-container'
                    sx={{
                        background: `linear-gradient(148deg, #ff9f4e, #fef751)`,
                        width: '100%'
                    }}
                >
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
                    </Button>
                </Box>
                <Box
                    id='alarms-list-organization-control-container'
                    sx={{
                        marginTop: '2rem',
                        marginBottom: '1rem',
                        display: 'flex',
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
                    alarms={alarmsUnsorted} 
                    appConfig={appConfig} 
                    handlers={handlers}
                    setters={setters}
                />

                {/* <Box
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
                                borderRadius: '4px',
                            },
                            '&>.MuiPaper-root::before': {
                                display: 'none'
                            }
                        }}
                    >
                        {alarmComponents}
                    </Box>
                </Box> */}
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
                                onChange={testChange}

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
                    className='btn-accept-alarm-time-and-name-container'
                >
                    <Button
                        variant='contained'
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