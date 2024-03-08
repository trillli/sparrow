import { Delete, SyncDisabled } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { fnTime24hrTo12hr } from 'src/tr/components/utils/TimeAndDateUtils';
import ITrillliConfig from 'src/tr/types/ITrillliConfig';
import AlarmConfigGroupLight from './AlarmConfigGroupLight';
import AlarmConfigGroupSound from './AlarmConfigGroupSound';
import AlarmConfigGroupVibration from './AlarmConfigGroupVibration';
import { IAlarmMetadata } from './types/IAlarmMetadata';


interface AlarmProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    timeFormat24Hr: boolean
}


const Alarm: React.FC<AlarmProps> = ({ alarm, appConfig, handlers, setters, timeFormat24Hr }) => {

    //TODO: TYPE
    type DayAbbrev = 'su' | 'm' | 'tu' | 'w' | 'th' | 'f' | 'sa'

    // State Variables & Related ------------------------------------------------------------------ //
    const [alarmExpanded, setAlarmExpanded] = React.useState<boolean>(false)
    const [alarmEnabled, setAlarmEnabled] = React.useState<boolean>(alarm.enabled || false)
    const [lightColor, setLightColor] = React.useState<number>(alarm.light?.color.h)

    // Effects & Related -------------------------------------------------------------------------- //
    React.useEffect(() => {
        alarm.enabled = alarmEnabled
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [alarmEnabled])

    // Event Handlers & Related ------------------------------------------------------------------- //
    const onColorSliderChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        alarm.light.color.h = value
        setLightColor(value)
    }

    const onColorSliderChangeCommitted = () => {
        alarm.light.color.h = lightColor
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleAlarmExpand = () => {
        setAlarmExpanded(!alarmExpanded)
    }

    const handleSummaryDayChange = (event: React.MouseEvent<HTMLElement>) => {

        event.stopPropagation()
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: DayAbbrev = target.value as DayAbbrev

        let repeatDaysSet = new Set(alarm.timing.days)
        let repeatDaysUpdatedSet = new Set(alarm.timing.days)

        if (repeatDaysSet.has(value)) {
            repeatDaysUpdatedSet.delete(value)
        } else {
            repeatDaysUpdatedSet.add(value)
        }

        alarm.timing.days = Array.from(repeatDaysUpdatedSet)

        handlers.updateAlarmsMetadata(alarm.id, alarm)

    }

    const handleSummaryDayNoRepeatClick = (event: React.MouseEvent<HTMLElement>) => {

        event.stopPropagation()

        alarm.timing.days = []
        handlers.updateAlarmsMetadata(alarm.id, alarm)

    }

    const handleToggleAlarmStatusClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmEnabled(!alarmEnabled)
        event.stopPropagation()
    }

    const handleAlarmDeleteBtnClick = (event: React.MouseEvent<HTMLElement>) => {
        handlers.updateAlarmsMetadata(alarm.id, null, true)
        event.stopPropagation()
    }

    // Other vars, util functions, etc ------------------------------------------------------------ //
    let formattedTime
    let formattedTimeAm: boolean = false
    if (timeFormat24Hr) {
        formattedTime = alarm.timing.time
    } else {
        formattedTime = fnTime24hrTo12hr(alarm.timing.time)
        if (formattedTime.includes('AM')) {
            formattedTimeAm = true
        }
        formattedTime = formattedTime.split(' ')[0]
        if (formattedTime[0] == '0') {
            formattedTime = formattedTime.slice(1)
        }
    }

    if (alarm.shown) {

        return (
            <Accordion
                elevation={0}
                key={alarm.id}
                id={`alarm_${alarm.id}`}
                disableGutters={true}
                className='alarm-outer'
                onChange={handleAlarmExpand}
                sx={{
                    overflow: 'hidden',
                    borderTop: 'none',
                    background: 'linear-gradient(131deg, #fe7e7e, #c2c2ff42)',
                }}
            >
                <AccordionSummary
                    className='alarm-header'
                    sx={{
                        padding: '0px',
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
                                display: 'flex',
                                alignItems: 'center',
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
                                    paddingTop: '.125rem',
                                }}
                            >
                                <Typography
                                    onClick={(event) => handlers.handleAlarmTimeOrNameClick(event, alarm.id)}
                                    sx={{
                                        color: appConfig.theme.palette.neutral.dark[3],
                                        fontSize: '1.25rem',
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
                            }}
                        >
                            <ToggleButtonGroup
                                className='alarm-summary-days'
                                value={alarm.timing.days}
                                onChange={handleSummaryDayChange}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    height: 'fit-content',
                                    borderRadius: '0px',
                                    rowGap: '.375rem',
                                    '& .MuiButtonBase-root': {
                                        border: 'none',
                                        background: 'none',
                                        padding: '0px',
                                        width: '2.5rem',
                                        borderRadius: '0px'
                                    },
                                    '&>.MuiButtonBase-root.Mui-selected': {
                                        background: '#ffffff25',
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
                                    value={alarm.timing.days.length == 0}
                                    onClick={handleSummaryDayNoRepeatClick}
                                    sx={{
                                        height: '100%',
                                        '& .MuiButtonBase-root': {
                                            borderLeft: 'none',
                                            background: 'none',
                                            padding: '0px',
                                            height: '100%',
                                            width: '2.5rem',
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
                                display: 'flex',
                                flexWrap: 'nowrap',
                                columnGap: '.25rem',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Box
                                className='btn-delete-alarm-container'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <IconButton
                                    onClick={handleAlarmDeleteBtnClick}
                                    sx={{
                                        width: '2.5rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
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
                                    transition: '200ms',
                                    padding: '0px',
                                    background: appConfig.theme.palette.secondary.dark[4],
                                    color: appConfig.theme.palette.neutral.dark[3],
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        background: appConfig.theme.palette.secondary.dark[3]
                                    }
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