import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import TrSlider from 'src/tr/components/TrSlider'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import AlarmConfigCategoryDetailContents from './AlarmConfigCategoryDetailContents'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyLightStartProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    lightColor: number
}

const AlarmConfigCategoryDetailBodyLightStart: React.FC<AlarmConfigCategoryDetailBodyLightStartProps> = ({alarm, appConfig, handlers, lightColor}) => {

    const theme = useTheme()
    const [lightAdvanceMinutes, setLightAdvanceMinutes] = React.useState<number>(alarm.light.timing.advance_minutes)

    const handleLightAdvanceMinutesSliderChange = (event: Event) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setLightAdvanceMinutes(value)
    }

    const handleLightAdvanceMinutesSliderChangeCommitted = (event: React.MouseEvent<HTMLElement>) => {
        alarm.light.timing['advance_minutes'] = lightAdvanceMinutes
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    // let fieldLabel: string
    // if (lightAdvanceMinutes == 0) {
    //     fieldLabel = 'Begin sunrise at alarm time'
    // } else {
    //     fieldLabel = 'Begin sunrise on ' + (Math.abs(lightAdvanceMinutes)) + ' ' + (Math.abs(lightAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (lightAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm time'
    // }
    

    let fieldLabel: string = 'Sunlight Start Time'  




    return (<>
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
                                columnGap: lightAdvanceMinutes == 0 ? '0rem' : '.5rem',
                                alignItems: 'baseline'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '2.5rem',
                                    width: lightAdvanceMinutes == 0 ? '0px' : 'initial',
                                    height: lightAdvanceMinutes == 0 ? '0px' : 'initial',
                                    opacity: lightAdvanceMinutes == 0 ? '0' : 'initial'
                                }}
                            >
                                {Math.abs(lightAdvanceMinutes)}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: lightAdvanceMinutes == 0 ? '1.5rem' : '1.25rem'
                                }}
                            >
                                {(lightAdvanceMinutes == 0) ? 'When alarm starts' : (Math.abs(lightAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (lightAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm'}
                            </Typography>
                        </Box>
                    </Box>
                <TrSlider
                    value={lightAdvanceMinutes}
                    min={-30}
                    max={30}
                    marks={[{value: 0, label: 'Alarm Time'}]}
                    onChange={handleLightAdvanceMinutesSliderChange}
                    onChangeCommitted={handleLightAdvanceMinutesSliderChangeCommitted}
                    sx={{
                        marginTop: '.5rem',
                        '& .MuiSlider-mark': {
                            transform: 'translate(-50%, -50%)',
                            height: '20px',
                            width: '20px',
                            borderRadius: '999px',
                            opacity: 1,
                            background: `hsl(${alarm.light.color.h}, 100%, 50%)`,
                            boxShadow: `0px 0px 0px 6px hsl(${alarm.light.color.h}, 100%, 50%, 58%)`,
                            color: 'blue'
                        },
                        '& .MuiSlider-markLabel': {
                            color: theme.palette.primary.main,
                            fontSize: '1.125rem'
                        }
                    }}
                />
            </AlarmConfigCategoryDetailContents>
        </AlarmConfigCategoryDetailContainer>
    </>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightStart