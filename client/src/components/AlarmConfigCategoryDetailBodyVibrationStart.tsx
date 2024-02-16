import React from 'react'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import { Box, Typography, Slider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'


const AlarmConfigCategoryDetailBodyVibrationStart: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {

    const theme = useTheme()

    const fieldLabel = 'Begin vibration ' + (Math.abs(stateControl.vars.vibrationStartTime)) + ' ' + (Math.abs(stateControl.vars.vibrationStartTime) == 1 ? 'minute' : 'minutes') + ' ' + (stateControl.vars.vibrationStartTime > 0 ? 'after' : 'before') + ' alarm time'

    return (
    <>
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={fieldLabel} />
        <Box className='alarm-config-category-detail-field-contents-container'>
            <TrSlider
                value={stateControl.vars.vibrationStartTime}
                min={-30}
                max={30}
                marks={[{value: 0, label: 'Alarm Time'}]}
                onChange={stateControl.handlers.handleVibrationStartTimeChange}
                sx={{
                    '& .MuiSlider-mark': {
                        transform: 'translate(-50%, -50%)',
                        height: '20px',
                        width: '10px',
                        borderRadius: '999px',
                        opacity: 1,
                        background: `hsl(${stateControl.vars.lightColor}, 100%, 50%)`,
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

export default AlarmConfigCategoryDetailBodyVibrationStart