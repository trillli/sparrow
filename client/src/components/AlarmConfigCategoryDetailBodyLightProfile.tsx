import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'

const AlarmConfigCategoryDetailBodyLightColor: React.FC<AlarmConfigSunriseProps> = ({categoryName, categoryState, eventHandlers}) => {

    return (
        <>
            <ToggleButtonGroup
                                color="primary"
                                value={categoryState.lightBrightnessType}
                                exclusive
                                onChange={eventHandlers.handleLightBrightnessTypeChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
        </>
    )



    
}

export default AlarmConfigCategoryDetailBodyLightColor