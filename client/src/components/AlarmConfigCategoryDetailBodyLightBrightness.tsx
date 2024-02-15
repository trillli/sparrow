import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'


const AlarmConfigCategoryDetailBodyBrightness: React.FC<IAlarmConfigCategoryDetailStateControl> = ({containerStyling, ...stateControl}) => {



    return (
        
        <Box sx={containerStyling} >
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
                                <TrSlider
                                    value={stateControl.vars.lightBrightnessConstant}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleLightBrightnessChangeConstant}
                                />
                            ) : (
                                <TrSlider
                                    value={stateControl.vars.lightBrightnessRamp}
                                    min={0}
                                    max={100}
                                    onChange={stateControl.handlers.handleLightBrightnessChangeRamp}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                    // sx={{
                                    //     padding: '0px',
                                    //     '@media (pointer: coarse)': {
                                    //         padding: '0px'
                                    //     }
                                    // }}
                                />
                            )}
        </Box>
        
    )



    
}

export default AlarmConfigCategoryDetailBodyBrightness