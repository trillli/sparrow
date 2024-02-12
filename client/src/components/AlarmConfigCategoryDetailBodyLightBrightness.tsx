import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'

const AlarmConfigCategoryDetailBodyLightColor: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {



    return (
        <>
            <ToggleButtonGroup
                                color="primary"
                                value={stateControl.vars.lightBrightnessType}
                                exclusive
                                onChange={stateControl.eventHandlers.handleLightBrightnessTypeChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
        </>
    )



    
}

export default AlarmConfigCategoryDetailBodyLightColor