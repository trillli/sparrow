import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, Box } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface AlarmConfigCategoryDetailBodyVibrationProps {
    stateControl: IAlarmConfigCategoryDetailStateControl
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodyVibration: React.FC<AlarmConfigCategoryDetailBodyVibrationProps> = ({ appConfig, ...stateControl }) => {



    return (
        <>
            <Box className='alarm-config-category-detail-field-container'>
                <AlarmConfigCategoryDetailHeader label='Vibration Profile' />
                <Box className='alarm-config-category-detail-field-contents-container'>
                    <ToggleButtonGroup
                        color="primary"
                        value={stateControl.vars.vibrationType}
                        exclusive
                        onChange={stateControl.handlers.handleVibrationTypeChange}
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
                </Box>
                <Box className='alarm-config-category-detail-field-container'>
                    <AlarmConfigCategoryDetailHeader label='Volume' />
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
                </Box>
        </>
    )




}

export default AlarmConfigCategoryDetailBodyVibration