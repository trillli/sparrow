import React from 'react'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import { Box, Typography, Slider } from '@mui/material'


const AlarmConfigCategoryDetailBodyLightStart: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {

    return (<>
        <Box className='alarm-config-field-contents'>
            <Slider
                defaultValue={stateControl.vars.lightAdvanceMinutes}
                value={stateControl.vars.lightAdvanceMinutes}
                min={0}
                max={60}
                onChange={stateControl.handlers.handleLightAdvanceMinutesSliderChange}
            />
        </Box>
    </>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightStart