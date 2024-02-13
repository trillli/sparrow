import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider } from '@mui/material'

const AlarmConfigCategoryDetailBodySoundVolume: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {



    return (
        <>
        <ToggleButtonGroup
                                color="primary"
                                value={stateControl.vars.soundVolumeProfile}
                                exclusive
                                onChange={stateControl.handlers.handleSoundVolumeProfileChange}
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
            {stateControl.vars.vibrationType == 'constant' ? (
                                <Slider
                                    value={stateControl.vars.soundVolumeConstant}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleSoundVolumeConstantChange}
                                />
                            ) : (
                                <Slider
                                    value={stateControl.vars.soundVolumeRamp}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleSoundVolumeRampChange}
                                    disableSwap
                                />
                            )}
        </>
    )



    
}

export default AlarmConfigCategoryDetailBodySoundVolume