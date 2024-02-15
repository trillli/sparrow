import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'

const AlarmConfigCategoryDetailBodyVibration: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {



    return (
        <>
        <ToggleButtonGroup
                                color="primary"
                                value={stateControl.vars.vibrationType}
                                exclusive
                                onChange={stateControl.handlers.handleVibrationTypeChange}
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
            {stateControl.vars.vibrationType == 'constant' ? (
                                <TrSlider
                                    value={stateControl.vars.vibrationConstant}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleVibrationChangeConstant}
                                />
                            ) : (
                                <TrSlider
                                    value={stateControl.vars.vibrationRamp}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleVibrationChangeRamp}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            )}
        </>
    )



    
}

export default AlarmConfigCategoryDetailBodyVibration