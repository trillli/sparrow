import { Box, Typography, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material'
import React from 'react'
import { HexColorPicker } from 'react-colorful'

<Box className='configuration-details-container'>
                                <Box className='lighting-color-container'>
                                    <Box className='alarm-config-field'>
                                        <Box className='alarm-config-field-header'>
                                            <Typography className='alarm-config-input-label'>Color</Typography>    
                                        </Box> 
                                        <Box className='alarm-config-field-contents'>
                                            <HexColorPicker color={lightColor} onChange={handleLightColorChange} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className='lighting-timing-container'>
                                    <Box className='alarm-config-field'>
                                        <Box className='alarm-config-field-header'>
                                            <Typography className='alarm-config-input-label'>Turn light on {lightAdvanceMinutes} {lightAdvanceMinutes == 1 ? 'minute' : 'minutes'} before alarm time</Typography>
                                        </Box>
                                        <Box className='alarm-config-field-contents'>
                                            <Slider
                                                defaultValue={lightAdvanceMinutes}
                                                value={lightAdvanceMinutes}
                                                min={0}
                                                max={60}
                                                onChange={handleLightAdvanceMinutesSliderChange}
                                            />
                                        </Box>
                                    </Box>
                                    <Box className='alarm-config-field'>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={lightBrightnessType}
                                            exclusive
                                            onChange={handleLightBrightnessTypeChange}
                                            aria-label="Platform"
                                        >
                                            <ToggleButton value="constant">Constant</ToggleButton>
                                            <ToggleButton value="ramp">Ramp</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                    <Box className='alarm-config-field'>
                                        <Box className='alarm-config-field-header'>
                                            <Typography className='alarm-config-input-label'>Brightness</Typography>
                                        </Box>
                                        <Box className='alarm-config-field-contents'>


                                            {lightBrightnessType == 'constant' ? (
                                                <Slider
                                                    value={lightBrightnessConstant}
                                                    min={0}
                                                    max={100}
                                                    onChange={handleLightBrightnessChangeConstant}
                                                />
                                                ):(
                                                <Slider
                                                    value={lightBrightnessRamp}
                                                    min={0}
                                                    max={100}
                                                    onChange={handleLightBrightnessChangeRamp}
                                                    valueLabelDisplay="auto"
                                                    disableSwap
                                                />
                                            )}
                                            
                                            
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>