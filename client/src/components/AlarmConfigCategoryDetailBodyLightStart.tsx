import React from 'react'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import { Box, Typography, Slider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
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

    let fieldLabel: string
    if (lightAdvanceMinutes == 0) {
        fieldLabel = 'Begin sunrise at alarm time'
    } else {fieldLabel = 'Begin sunrise on ' + (Math.abs(lightAdvanceMinutes)) + ' ' + (Math.abs(lightAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (lightAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm time'
}

    return (<>
        <Box 
        className='alarm-config-category-detail-field-container'
        sx={{
            borderLeft: `5px solid ${appConfig.theme.palette.primary.dark[4]}`,
            paddingTop: '.375rem',
            paddingBottom: '.25rem'
        }}
        >
        <AlarmConfigCategoryDetailHeader label={fieldLabel} />
        <Box className='alarm-config-category-detail-field-contents-container'>
            <TrSlider
                value={lightAdvanceMinutes}
                min={-30}
                max={30}
                marks={[{value: 0, label: 'Alarm Time'}]}
                onChange={handleLightAdvanceMinutesSliderChange}
                onChangeCommitted={handleLightAdvanceMinutesSliderChangeCommitted}
                sx={{
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
        </Box>
        </Box>
    </>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightStart