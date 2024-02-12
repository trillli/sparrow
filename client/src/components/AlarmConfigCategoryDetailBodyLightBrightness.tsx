import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider } from '@mui/material'

const AlarmConfigCategoryDetailBodyBrightness: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {



    return (
        <>
        <ToggleButtonGroup
                                color="primary"
                                value={stateControl.vars.lightBrightnessType}
                                exclusive
                                onChange={stateControl.handlers.handleLightBrightnessTypeChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
            {stateControl.vars.lightBrightnessType == 'constant' ? (
                                <Slider
                                    value={stateControl.vars.lightBrightnessConstant}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleLightBrightnessChangeConstant}
                                />
                            ) : (
                                <Slider
                                    value={stateControl.vars.lightBrightnessRamp}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleLightBrightnessChangeRamp}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            )}
        </>
    )



    
}

export default AlarmConfigCategoryDetailBodyBrightness