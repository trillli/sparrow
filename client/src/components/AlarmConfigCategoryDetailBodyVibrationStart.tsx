import React from 'react'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { Box, Typography, Slider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import TrSlider from 'src/tr/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import AlarmConfigCategoryDetailContents from './AlarmConfigCategoryDetailContents'

interface AlarmConfigCategoryDetailBodyVibrationStartProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: {[key: string]: Function}
    lightColor: number
}

const AlarmConfigCategoryDetailBodyVibrationStart: React.FC<AlarmConfigCategoryDetailBodyVibrationStartProps> = ({ alarm, appConfig, handlers, lightColor }) => {

    const theme = useTheme()
    const [vibrationAdvanceMinutes, setVibrationAdvanceMinutes] = React.useState<number>(alarm.vibration.timing.advance_minutes)

    const handleVibrationAdvanceMinutesChange = (event: Event) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setVibrationAdvanceMinutes(value)        
    }

    const handleVibrationAdvanceMinutesChangeCommitted = (event: React.MouseEvent<HTMLElement>) => {
        alarm.vibration.timing['advance_minutes'] = vibrationAdvanceMinutes
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    // let fieldLabel: string
    // if (vibrationAdvanceMinutes == 0) {
    //     fieldLabel = 'Begin vibration at alarm time'
    // } else {
    //     fieldLabel = 'Begin vibration ' + (Math.abs(vibrationAdvanceMinutes)) + ' ' + (Math.abs(vibrationAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (vibrationAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm time'
    // }

    // const
    let fieldLabel: string = 'Vibration Start Time'  

    return (
        <>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label={fieldLabel} />
                <AlarmConfigCategoryDetailContents appConfig={appConfig}>
                    <Box 
                        className='current-config-value-container-outer'
                        sx={{

                        }}
                    >
                            
                        <Box 
                            className='current-config-value-container'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                columnGap: vibrationAdvanceMinutes == 0 ? '0rem' : '.5rem',
                                alignItems: 'baseline'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '2.5rem',
                                    width: vibrationAdvanceMinutes == 0 ? '0px' : 'initial',
                                    height: vibrationAdvanceMinutes == 0 ? '0px' : 'initial',
                                    opacity: vibrationAdvanceMinutes == 0 ? '0' : 'initial'
                                }}
                            >
                                {Math.abs(vibrationAdvanceMinutes)}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: vibrationAdvanceMinutes == 0 ? '1.5rem' : '1.25rem'
                                }}
                            >
                                {(vibrationAdvanceMinutes == 0) ? 'When alarm starts' : (Math.abs(vibrationAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (vibrationAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm'}
                            </Typography>
                        </Box>
                    </Box>
                    <TrSlider
                        value={vibrationAdvanceMinutes}
                        min={-30}
                        max={30}
                        marks={[{ value: 0, label: 'Alarm Time' }]}
                        onChange={handleVibrationAdvanceMinutesChange}
                        onChangeCommitted={handleVibrationAdvanceMinutesChangeCommitted}
                        sx={{
                            marginTop: '.5rem',
                            '& .MuiSlider-mark': {
                                transform: 'translate(-50%, -50%)',
                                height: '20px',
                                width: '20px',
                                borderRadius: '999px',
                                opacity: 1,
                                background: `hsl(${lightColor}, 100%, 50%)`,
                                boxShadow: `0px 0px 0px 6px hsl(${lightColor}, 100%, 50%, 58%)`,
                                color: 'blue'
                            },
                            '& .MuiSlider-markLabel': {
                                color: theme.palette.primary.main,
                                fontSize: '1.125rem'
                            }
                        }}
                    />
                </AlarmConfigCategoryDetailContents>
                {/* </Box> */}
            </AlarmConfigCategoryDetailContainer>
        </>
    )

}

export default AlarmConfigCategoryDetailBodyVibrationStart