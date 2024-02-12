import React from 'react'
import { Accordion, AccordionSummary, Box, Typography, Switch, AccordionDetails, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import { HexColorPicker } from 'react-colorful'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader';
import AlarmConfigCategoryBody from './AlarmConfigCategoryBody';
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl';


const AlarmConfigCategoryOuter: React.FC<AlarmConfigSunriseProps> = ({categoryName, categoryState, eventHandlers }) => {

    return (

        <Accordion elevation={1} className='alarm-config-category-container'>

            <AlarmConfigCategoryHeader categoryName={categoryName} categoryState={categoryState} eventHandlers={eventHandlers} />
            <AlarmConfigCategoryBody categoryName={categoryName} categoryState={categoryState} eventHandlers={eventHandlers} />





            {/* <AccordionDetails className='alarm-config-container'>
                <Box className='configuration-details-container'>
                    <Box className='lighting-color-container'>
                        <Box className='alarm-config-field'>
                            <Box className='alarm-config-field-header'>
                                <Typography className='alarm-config-input-label'>Color</Typography>
                            </Box>
                            <Box className='alarm-config-field-contents'>
                                <HexColorPicker color={categoryState.lightColor} onChange={eventHandlers.handleLightColorChange} />
                            </Box>
                        </Box>
                    </Box>
                    <Box className='lighting-timing-container'>
                        <Box className='alarm-config-field'>
                            <Box className='alarm-config-field-header'>
                                <Typography className='alarm-config-input-label'>Turn light on {categoryState.lightAdvanceMinutes} {categoryState.lightAdvanceMinutes == 1 ? 'minute' : 'minutes'} before alarm time</Typography>
                            </Box>
                            <Box className='alarm-config-field-contents'>
                                <Slider
                                    defaultValue={categoryState.lightAdvanceMinutes}
                                    value={categoryState.lightAdvanceMinutes}
                                    min={0}
                                    max={60}
                                    onChange={eventHandlers.handleLightAdvanceMinutesSliderChange}
                                />
                            </Box>
                        </Box>
                        <Box className='alarm-config-field'>
                            <ToggleButtonGroup
                                color="primary"
                                value={categoryState.lightBrightnessType}
                                exclusive
                                onChange={eventHandlers.handleLightBrightnessTypeChange}
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


                                {categoryState.lightBrightnessType == 'constant' ? (
                                    <Slider
                                        value={categoryState.lightBrightnessConstant}
                                        min={0}
                                        max={100}
                                        onChange={eventHandlers.handleLightBrightnessChangeConstant}
                                    />
                                ) : (
                                    <Slider
                                        value={categoryState.lightBrightnessRamp}
                                        min={0}
                                        max={100}
                                        onChange={eventHandlers.handleLightBrightnessChangeRamp}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                    />
                                )}


                            </Box>
                        </Box>
                    </Box>
                </Box>
            </AccordionDetails> */}
        </Accordion>


    )

}

export default AlarmConfigCategoryOuter