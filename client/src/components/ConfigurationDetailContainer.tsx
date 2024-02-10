import { Box, Typography } from '@mui/material'
import React from 'react'
import { HexColorPicker } from 'react-colorful'


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