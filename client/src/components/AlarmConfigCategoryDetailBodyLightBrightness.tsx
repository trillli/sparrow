import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider } from '@mui/material'

const AlarmConfigCategoryDetailBodyBrightness: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {



    return (
        <>
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