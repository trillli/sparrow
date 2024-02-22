import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, SyncDisabled } from '@mui/icons-material'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';
import AlarmConfigCategoryOuter from './AlarmConfigCategoryOuter';
import AlarmConfigGroups from './AlarmConfigGroups';
import AlarmConfigGroupLight from './AlarmConfigGroupLight';
import AlarmConfigGroupSound from './AlarmConfigGroupSound';
import AlarmConfigGroupVibration from './AlarmConfigGroupVibration';


interface AlarmProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    arg4?: any
}


const Alarm: React.FC<AlarmProps> = ({ alarm, appConfig, handlers, setters }) => {

    const [alarmExpanded, setAlarmExpanded] = React.useState<boolean>(false)
    const [alarmEnabled, setAlarmEnabled] = React.useState<boolean>(alarm.enabled || false)
    const [noRepeat, setNoRepeat] = React.useState<boolean>(true)//alarm level
    type DayAbbrev = 'su' | 'm' | 'tu' | 'w' | 'th' | 'f' | 'sa'//alarm level
    const [repeatDays, setRepeatDays] = React.useState<Set<DayAbbrev>>(new Set<DayAbbrev>())//alarm level
    const [lightColor, setLightColor] = React.useState<number>(60)

    React.useEffect(() => {
        if (noRepeat) {
            setRepeatDays(new Set<DayAbbrev>())
        }
    }, [noRepeat])

    React.useEffect(() => {
        if (repeatDays.size == 0) {
            setNoRepeat(true)
        } else {
            setNoRepeat(false)
        }
    }, [repeatDays])

    const onColorSliderChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setLightColor(value)
    }

    const handleAlarmExpand = (event: React.SyntheticEvent, expanded: boolean) => {
        setAlarmExpanded(!alarmExpanded)
    }

    const handleAlarmTimeOrNameClick = (event: React.MouseEvent<HTMLElement>) => {
        setters.setTimePickerOpen(true)
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
        console.log('in handlesummarydaynorepeatchange. norepeat is:')
        console.log(noRepeat)
        event.stopPropagation()
        if (!noRepeat) {
            console.log('going to set norepeat to true')
            setNoRepeat(true)
        }
    }

    const handleToggleAlarmStatusClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmEnabled(event.target.checked)
        event.stopPropagation()
    }


    return (
        <Accordion
            elevation={0}
            key={alarm.id}
            id={`alarm_${alarm.id}`}
            className='alarm-outer'
            onChange={handleAlarmExpand}
            sx={{
                overflow: 'hidden',
                borderTop: 'none',
                background: 'linear-gradient(148deg, #ff9f4e, #fef751)',
                '&>.MuiCollapse-root': {
                    background: '#FFFFFF57',
                }
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
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        background: 'linear-gradient(148deg, #ff9f4e, #fef751)'
                    }}
                >
                    <Box
                        className='alarm-time-container'
                        alignItems='center'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            padding: '0px .75rem',
                            borderRadius: '4px',
                            color: appConfig.theme.palette.secondary.contrastText,
                        }}
                    >
                        <Typography
                            onClick={handleAlarmTimeOrNameClick}
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {alarm.timing.time}
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
                            padding: '0px .75rem'
                        }}
                    >
                        <Typography onClick={handleAlarmTimeOrNameClick}>{alarm.name}</Typography>
                    </Box>
                    <Box
                        className='alarm-status-container'
                        sx={{
                            marginRight: '-0px',
                            height: 'fit-content',
                        }}
                    >
                        <Switch checked={alarmEnabled} onClick={handleToggleAlarmStatusClick} />
                    </Box>
                </Box>
                <Box
                    className='alarm-summary'
                    sx={{
                        transition: '.2s',
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
                        }}
                    >
                        <ToggleButtonGroup
                            className='alarm-summary-days'
                            value={Array.from(repeatDays)}
                            onChange={handleSummaryDayChange}
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                height: 'fit-content',
                                borderRadius: '0px',
                                '& .MuiButtonBase-root': {
                                    border: 'none',
                                    background: 'none',
                                    padding: '0px',
                                    height: '2rem',
                                    width: '2.5rem',
                                    borderRadius: '0px'
                                },
                                '&>.MuiButtonBase-root.Mui-selected': {
                                    background: appConfig.theme.palette.shades.tertiary[8],
                                    color: 'white',
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
                                onClick={handleSummaryDayNoRepeatChange}
                                sx={{
                                    height: 'fit-content',
                                    '& .MuiButtonBase-root': {
                                        borderLeft: 'none',
                                        background: 'none',
                                        padding: '0px',
                                        height: '2rem',
                                        width: '2.5rem',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    },
                                    '&>.MuiButtonBase-root.Mui-selected': {
                                        color: 'grey',
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
                            marginRight: '6px',
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
                    padding: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <AlarmConfigGroupSound alarm={alarm} appConfig={appConfig} handlers={handlers} setters={setters} />
                <AlarmConfigGroupLight alarm={alarm} appConfig={appConfig} handlers={handlers} setters={setters} lightColor={lightColor} onColorSliderChange={onColorSliderChange} />
                <AlarmConfigGroupVibration alarm={alarm} appConfig={appConfig} handlers={handlers} setters={setters} lightColor={lightColor} />
            </AccordionDetails>
        </Accordion>
    )

}

export default Alarm