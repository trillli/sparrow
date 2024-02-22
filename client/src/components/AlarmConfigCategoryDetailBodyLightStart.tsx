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
    lightColor: number
}

const AlarmConfigCategoryDetailBodyLightStart: React.FC<AlarmConfigCategoryDetailBodyLightStartProps> = ({alarm, appConfig, lightColor}) => {

    const theme = useTheme()
    const [lightAdvanceMinutes, setLightAdvanceMinutes] = React.useState<number>(-15)

    const handleLightAdvanceMinutesSliderChange = (event: Event) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: number = Number(target.value)
        setLightAdvanceMinutes(value)
    }

    const fieldLabel = 'Turn light on ' + (Math.abs(lightAdvanceMinutes)) + ' ' + (Math.abs(lightAdvanceMinutes) == 1 ? 'minute' : 'minutes') + ' ' + (lightAdvanceMinutes > 0 ? 'after' : 'before') + ' alarm time'

    return (<>
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={fieldLabel} />
        <Box className='alarm-config-category-detail-field-contents-container'>
            <TrSlider
                defaultValue={lightAdvanceMinutes}
                value={lightAdvanceMinutes}
                min={-30}
                max={30}
                marks={[{value: 0, label: 'Alarm Time'}]}
                onChange={handleLightAdvanceMinutesSliderChange}
                sx={{
                    '& .MuiSlider-mark': {
                        transform: 'translate(-50%, -50%)',
                        height: '20px',
                        width: '10px',
                        borderRadius: '999px',
                        opacity: 1,
                        background: `hsl(${lightColor}, 100%, 50%)`,
                        boxShadow: '0px 0px 4px 4px #0000003d',
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