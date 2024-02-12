import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

const AlarmConfigCategoryDetailBodyLightProfile: React.FC<IAlarmConfigCategoryDetailStateControl> = ({vars, handlers}) => {

    return (
        <>
            <ToggleButtonGroup
                                color="primary"
                                value={vars.lightBrightnessType}
                                exclusive
                                onChange={handlers.handleLightBrightnessTypeChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
        </>
    )



    
}

export default AlarmConfigCategoryDetailBodyLightProfile