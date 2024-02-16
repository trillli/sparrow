import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, Box, Typography } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface AlarmConfigCategoryDetailBodySoundVolumeProps {
    stateControl: IAlarmConfigCategoryDetailStateControl
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodySoundVolume: React.FC<AlarmConfigCategoryDetailBodySoundVolumeProps> = ({ appConfig, ...stateControl }) => {



    return (
        <>
            <Box className='alarm-config-category-detail-field-container'>
                <AlarmConfigCategoryDetailHeader label='Volume Profile' />
                <Box className='alarm-config-category-detail-field-contents-container'>
                    <ToggleButtonGroup
                        color="primary"
                        value={stateControl.vars.soundVolumeProfile}
                        exclusive
                        onChange={stateControl.handlers.handleSoundVolumeProfileChange}
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
                    value={stateControl.vars.soundVolumeConstant}
                    min={0}
                    max={100}
                    onChange={stateControl.handlers.handleSoundVolumeConstantChange}
                />
            ) : (
                <TrSlider
                    value={stateControl.vars.soundVolumeRamp}
                    min={0}
                    max={100}
                    onChange={stateControl.handlers.handleSoundVolumeRampChange}
                    disableSwap
                />
            )}
            </Box>
        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundVolume