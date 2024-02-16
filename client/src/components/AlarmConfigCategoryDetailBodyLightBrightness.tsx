import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface AlarmConfigCategoryDetailBodyLightBrightnessProps {
    stateControl: IAlarmConfigCategoryDetailStateControl
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodyBrightness: React.FC<AlarmConfigCategoryDetailBodyLightBrightnessProps> = ({appConfig, ...stateControl}) => {



    return (
        <>
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={'Brightness Profile'} />
        <Box className='alarm-config-category-detail-field-contents-container'></Box>


        {/* <Box sx={containerStyling} > */}
        <ToggleButtonGroup
                                color="primary"
                                value={stateControl.vars.lightBrightnessType}
                                exclusive
                                onChange={stateControl.handlers.handleLightBrightnessTypeChange}
                                sx={{
                                    marginTop: '.5rem',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    height: 'fit-content',
                                    '& .MuiButtonBase-root': {
                                        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                                        background: 'none',
                                        padding: '.125rem .75rem',
                                        height: '2.75rem',
                                    },
                                    '&>.MuiButtonBase-root.Mui-selected': {
                                        background: appConfig.theme.palette.shades.tertiary[4],
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
                                    }
                                }}
                            >
                                <ToggleButton value="constant">Constant</ToggleButton>
                                <ToggleButton value="ramp">Ramp</ToggleButton>
                            </ToggleButtonGroup>
        </Box>
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={'Brightness'} />
        <Box className='alarm-config-category-detail-field-contents-container'>
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
                                />
                            )}

        </Box>
        </Box>
        </>
        
    )



    
}

export default AlarmConfigCategoryDetailBodyBrightness