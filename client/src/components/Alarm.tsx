import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlarmOff, AlarmOn, Delete, ExpandMore, SyncDisabled } from '@mui/icons-material'
import ITrillliConfig from 'src/tr/types/ITrillliConfig';
import AlarmConfigCategoryOuter from './AlarmConfigCategoryOuter';
import AlarmConfigGroups from './AlarmConfigGroups';
import AlarmConfigGroupLight from './AlarmConfigGroupLight';
import AlarmConfigGroupSound from './AlarmConfigGroupSound';
import AlarmConfigGroupVibration from './AlarmConfigGroupVibration';
import { fnTime12hrTo24hr, fnTime24hrTo12hr } from 'src/tr/components/utils/TimeAndDateUtils'


interface AlarmProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    timeFormat24Hr: boolean
}


const Alarm: React.FC<AlarmProps> = ({ alarm, appConfig, handlers, setters, timeFormat24Hr }) => {

    //console.log('alarm timing length')
    //console.log(alarm.timing.days)
    //console.log(alarm.timing.days.length)

    const [alarmSerialized, setAlarmSerialized] = React.useState<string>(JSON.stringify(alarm))
    const [alarmExpanded, setAlarmExpanded] = React.useState<boolean>(false)
    const [alarmEnabled, setAlarmEnabled] = React.useState<boolean>(alarm.enabled || false)
    const [noRepeat, setNoRepeat] = React.useState<boolean>()
    type DayAbbrev = 'su' | 'm' | 'tu' | 'w' | 'th' | 'f' | 'sa'
    const [repeatDays, setRepeatDays] = React.useState<DayAbbrev[]>(alarm.timing.days)
    const [lightColor, setLightColor] = React.useState<number>(alarm.light?.color.h)

    // //console.log('Generating this alarm!')
    // //console.log(alarm)
    // //console.log('but repeat days is:')
    // //console.log(repeatDays)

    React.useEffect(() => {
        // setRepeatDays(new Set(alarm.timing.days))
    }, [])

    React.useEffect(() => {
        // //console.log('in norepeat useeffect')
        if (noRepeat) {
            // setRepeatDays(new Set<DayAbbrev>())
            setRepeatDays([])
        }
    }, [noRepeat])

    React.useEffect(() => {
        // //console.log('in alarmenabled useeffect')
        alarm.enabled = alarmEnabled
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [alarmEnabled])

    React.useEffect(() => {
        // //console.log('in repeatdata useeffect')
        if (repeatDays.length == 0) {
            setNoRepeat(true)
        } else {

            setNoRepeat(false)
        }

        alarm.timing.days = repeatDays
        handlers.updateAlarmsMetadata(alarm.id, alarm)

    }, [repeatDays])

    const onColorSliderChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        alarm.light.color.h = value
        setLightColor(value)
    }

    const onColorSliderChangeCommitted = (event: React.MouseEvent<HTMLElement>) => {
        alarm.light.color.h = lightColor
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleAlarmExpand = (event: React.SyntheticEvent, expanded: boolean) => {
        setAlarmExpanded(!alarmExpanded)
    }

    // const handleAlarmTimeOrNameClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setters.setTimePickerOpen(true)
    //     event.stopPropagation()
    // }

    const handleSummaryDayChange = (event: React.MouseEvent<HTMLElement>) => {

        event.stopPropagation()
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: DayAbbrev = target.value as DayAbbrev

        let repeatDaysSet = new Set(repeatDays)
        let repeatDaysUpdatedSet = new Set(repeatDays)

        if (repeatDaysSet.has(value)) {
            repeatDaysUpdatedSet.delete(value)
        } else {
            repeatDaysUpdatedSet.add(value)
        }

        setRepeatDays(Array.from(repeatDaysUpdatedSet))

    }

    const handleSummaryDayNoRepeatChange = (event: React.MouseEvent<HTMLElement>) => {
        ////console.log('in handlesummarydaynorepeatchange. norepeat is:')
        ////console.log(noRepeat)
        event.stopPropagation()
        if (!noRepeat) {
            ////console.log('going to set norepeat to true')
            setNoRepeat(true)
        }
    }

    const handleToggleAlarmStatusClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setAlarmEnabled(event.target.checked)
        setAlarmEnabled(!alarmEnabled)
        event.stopPropagation()
    }

    const handleAlarmDeleteBtnClick = (event: React.MouseEvent<HTMLElement>) => {
        handlers.updateAlarmsMetadata(alarm.id, null, true)
        event.stopPropagation()
    }

    // //console.log('going to format time: ' + alarm.timing.time)
    // const formattedTime = timeFormat24Hr ? alarm.timing.time : fnTime24hrTo12hr(alarm.timing.time)
    let formattedTime
    let formattedTimeAm: boolean = false
    if (timeFormat24Hr) {
        // //console.log('in the imeformat24hr block')
        formattedTime = alarm.timing.time
    } else {
        // //console.log('--------------------converting to 12hr------------------------')
        formattedTime = fnTime24hrTo12hr(alarm.timing.time)
        if (formattedTime.includes('AM')) {
            formattedTimeAm = true
        }
        formattedTime = formattedTime.split(' ')[0]
        if (formattedTime[0] == '0') {
            formattedTime = formattedTime.slice(1)
        }
    }
    // //console.log('formatted time:' + formattedTime)

    if (alarm.shown) {


        //console.log('norepeat is:')
        //console.log(noRepeat)
        return (
            <Accordion
                elevation={0}
                key={alarm.id}
                id={`alarm_${alarm.id}`}
                // square={true}
                disableGutters={true}
                className='alarm-outer'
                onChange={handleAlarmExpand}
                sx={{
                    overflow: 'hidden',
                    borderTop: 'none',
                    // border: `1px solid ${appConfig.theme.palette.secondary.light[4]}`,
                    // borderLeft: `6px solid ${appConfig.theme.palette.secondary.dark[4]}`,
                    // borderBottom: `0px solid ${appConfig.theme.palette.secondary.dark[4]}`,
                    // boxShadow: `inset 6px 0px ${appConfig.theme.palette.secondary.dark[4]}, inset 0px -2px ${appConfig.theme.palette.primary.dark[6]}`,
                    // borderRadius: '0px 10px 14px 0px',
                    // background: 'linear-gradient(148deg, #ff9f4e, #fef751)',
                    // background: appConfig.theme.palette.neutral.dark[6],
                    // background: appConfig.theme.palette.primary.dark[7],
                    background: 'linear-gradient(131deg, #fe7e7e, #c2c2ff42)',
                    // background: 'none',
                    '&.MuiPaper-root': {
                        // borderRadius: '0px 4px 0px 0px',
                    },
                    '&>.MuiCollapse-root': {
                        // background: '#FFFFFF57',
                    },
                    // transition: '4s',
                    // opacity: alarm.shown? '1' : '.2',
                    // maxHeight: alarm.shown ? '2500px' : '0px'
                }}
            >
                <AccordionSummary
                    className='alarm-header'
                    sx={{
                        padding: '0px',
                        // paddingRight: '1rem',
                        color: appConfig.theme.palette.neutral.contrastText,
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
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                // border: '2px solid red',
                                display: 'flex',
                                alignItems: 'baseline',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Box
                                className='alarm-time-container'
                                alignItems='center'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    columnGap: '.25rem',
                                    // height: '100%',
                                    padding: '0px .75rem',
                                    borderRadius: '4px',
                                    color: appConfig.theme.palette.neutral.dark[3],
                                }}
                            >
                                <Typography
                                    onClick={(event) => handlers.handleAlarmTimeOrNameClick(event, alarm.id)}
                                    sx={{
                                        fontSize: '3rem',
                                        lineHeight: '1.125'
                                    }}
                                >
                                    {formattedTime}
                                </Typography>
                                {timeFormat24Hr ? (<></>) : (
                                    <Typography
                                        sx={{
                                            textTransform: 'uppercase',
                                            lineHeight: '1.125'
                                        }}
                                    >
                                        {formattedTimeAm ? 'am' : 'pm'}
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                className='alarm-name-container'
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexGrow: '1',
                                    borderRadius: '4px',
                                    padding: '0px .75rem',
                                    paddingBottom: '.375rem',
                                }}
                            >
                                <Typography
                                    onClick={(event) => handlers.handleAlarmTimeOrNameClick(event, alarm.id)}
                                    sx={{
                                        color: appConfig.theme.palette.neutral.dark[3],
                                        fontSize: '1.25rem',
                                        // fontWeight: 'bold'
                                        lineHeight: '1.5'
                                    }}
                                >
                                    {alarm.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            className='alarm-controls-container'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                transform: 'rotate(-90deg)',
                                marginLeft: 'auto',
                                marginRight: '-9px'
                            }}
                        >
                            <Box
                                className='alarm-status-container'
                                sx={{
                                    // height: '100%',
                                    // width: '4.5rem',
                                    // display: 'flex',
                                    // alignItems: 'center',
                                    // paddingBottom: '.125rem'
                                }}
                            >
                                <Switch
                                    checked={alarm.enabled}
                                    onClick={handleToggleAlarmStatusClick}
                                    sx={{
                                        '& .MuiSwitch-switchBase': {
                                        },
                                        '& .MuiSwitch-thumb': {
                                        },
                                        '& .Mui-checked+.MuiSwitch-track': {
                                            opacity: '.75 !important',
                                            background: 'lime'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        className='alarm-summary'
                        sx={{
                            transition: '.2s',
                            display: 'flex',
                            width: '100%',
                            padding: '.375rem'
                        }}
                    >
                        <Box
                            className='alarm-summary-timing'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                // height: '100%'
                            }}
                        >
                            <ToggleButtonGroup
                                className='alarm-summary-days'
                                value={Array.from(alarm.timing.days)}
                                onChange={handleSummaryDayChange}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    height: 'fit-content',
                                    borderRadius: '0px',
                                    rowGap: '.375rem',
                                    // height: '100%',
                                    '& .MuiButtonBase-root': {
                                        border: 'none',
                                        background: 'none',
                                        padding: '0px',
                                        // height: '2rem',
                                        width: '2.5rem',
                                        borderRadius: '0px'
                                    },
                                    '&>.MuiButtonBase-root.Mui-selected': {
                                        background: '#ffffff25',
                                        // color: 'white',
                                        fontWeight: 'bold',
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
                                    // value={alarm.timing.days.size > 0 ? false : true}
                                    onClick={handleSummaryDayNoRepeatChange}
                                    sx={{
                                        height: '100%',
                                        '& .MuiButtonBase-root': {
                                            borderLeft: 'none',
                                            background: 'none',
                                            padding: '0px',
                                            height: '100%',
                                            width: '2.5rem',
                                            // fontWeight: 'bold',
                                            color: '#00000090'
                                        },
                                        '&>.MuiButtonBase-root.Mui-selected': {
                                            background: '#ffffff25',
                                            color: appConfig.theme.palette.neutral.dark[3]
                                        }
                                    }}
                                >
                                    <ToggleButton
                                        className='alarm-day alarm-summary-day'
                                        value={true}
                                    // sx={{
                                    //     height: '100%'
                                    // }}
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
                                // width: '4.5rem',
                                display: 'flex',
                                flexWrap: 'nowrap',
                                columnGap: '.25rem',
                                alignItems: 'flex-start'
                                // border: '1px solid red'
                            }}
                        >
                            <Box
                                className='btn-delete-alarm-container'
                                sx={{
                                    // // background: '#00000025'
                                    // // border: '1px solid yellow',
                                    // // borderRadius: '4px'
                                    // paddingBottom
                                    // width: '50%'
                                    // width: '2.5rem',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <IconButton
                                    onClick={handleAlarmDeleteBtnClick}
                                    sx={{
                                        // color: alarm.enabled ? 'lime' : 'grey',
                                        width: '2.5rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        // height: '100%',
                                        // width: '2.5rem',
                                        padding: '0px',
                                        color: appConfig.theme.palette.neutral.dark[3],
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.75rem'
                                        }
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                            <IconButton
                                sx={{
                                    // transition: 'rotate 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                    // rotate: alarmExpanded ? '180deg' : '0deg',
                                    transition: '200ms',
                                    padding: '0px',
                                    background: appConfig.theme.palette.secondary.dark[4],
                                    color: appConfig.theme.palette.neutral.dark[3],
                                    // background: '#ffffff55',
                                    // borderRadius: alarmExpanded ? '4px 0px 0px 4px' : '4px 0px 4px 0px',
                                    borderRadius: '4px',
                                    // width: '2.5rem',
                                    // height: '2.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        background: appConfig.theme.palette.secondary.dark[3]
                                    }
                                    // width: '50%',
                                    // marginLeft: '50px'
                                }}
                            >
                                <ExpandMoreIcon
                                    sx={{
                                        transition: 'rotate 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        rotate: alarmExpanded ? '180deg' : '0deg',
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                </AccordionSummary>
                <AccordionDetails
                    className='alarm-config-categories-container'
                    // disableGutters={true}
                    sx={{
                        padding: '1rem 0rem',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                    }}
                >
                    <AlarmConfigGroupSound alarm={alarm} appConfig={appConfig} handlers={handlers} setters={setters} />
                    <AlarmConfigGroupLight alarm={alarm} appConfig={appConfig} handlers={handlers} setters={setters} lightColor={lightColor} onColorSliderChange={onColorSliderChange} onColorSliderChangeCommitted={onColorSliderChangeCommitted} />
                    <AlarmConfigGroupVibration alarm={alarm} appConfig={appConfig} handlers={handlers} setters={setters} lightColor={lightColor} />
                </AccordionDetails>
            </Accordion>
        )
    } else {
        return
    }

}

export default Alarm