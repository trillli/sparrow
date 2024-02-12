import React from 'react'
import { AccordionDetails, Box, Typography, Slider, ToggleButtonGroup, ToggleButton, colors } from '@mui/material'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailsStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import AlarmConfigCategoryDetailOuter from './AlarmConfigCategoryDetailOuter'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailBody from './AlarmConfigCategoryDetailBody'
import AlarmConfigCategoryDetailBodyLightColor from './AlarmConfigCategoryDetailBodyLightColor'
import { IAlarmConfigCategoryMetadata, IAlarmGroupMetadata } from './types/AlarmConfigComponentSkeletons'


interface AlarmConfigCategoryBodyProps {
    groupMetadata: IAlarmGroupMetadata,
    stateControl: IAlarmConfigCategoryDetailsStateControl
}

const AlarmConfigCategoryBody: React.FC<AlarmConfigCategoryBodyProps> = ({ groupMetadata, stateControl }) => {


    let alarmConfigCategoryDetailsComponents: React.ReactNode[] = []

    const fieldNamesOrdered: typeof groupMetadata.fieldNamesOrdered = groupMetadata.fieldNamesOrdered




    fieldNamesOrdered.forEach((fieldName, index) => {
        alarmConfigCategoryDetailsComponents.push(
            <AlarmConfigCategoryDetailOuter detailMetadata={groupMetadata.fields[fieldName]} stateControl={stateControl} />
        )
    })

















    return (
        <AccordionDetails className='alarm-config-container'>
            <Box className='configuration-details-container'>

                {alarmConfigCategoryDetailsComponents}





                {/* <AlarmConfigCategoryDetailOuter 
                    detailMetadata={detailMetadata}
                />
                    
                    { if (showHeader == true) {
                        <AlarmConfigCategoryDetailHeader detailName={detailMetadata.color.name} />
                    } (
                    
                    ) : (<></>) }

                    <AlarmConfigCategoryDetailBody 
                        categoryName={categoryName} 
                        categoryState={categoryState} 
                        eventHandlers={eventHandlers} 
                    >

                        <AlarmConfigCategoryDetailBodyLightColor 
                            categoryName={categoryName} 
                            categoryState={categoryState} 
                            eventHandlers={eventHandlers} 
                        />

                    </AlarmConfigCategoryDetailBody>

                </AlarmConfigCategoryDetailOuter> */}


                {/* <Box className='lighting-color-container'>
                    
                

                    <Box className='alarm-config-field'>
                        <Box className='alarm-config-field-header'>
                            <Typography className='alarm-config-input-label'>{detailName}</Typography>
                        </Box>
                        <Box className='alarm-config-field-contents'>
                            <HexColorPicker color={categoryState.lightColor} onChange={eventHandlers.handleLightColorChange} />
                        </Box>
                    </Box>

                </Box> */}



                
                {/* <Box className='lighting-timing-container'>

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
                </Box> */}
            </Box>
        </AccordionDetails>

    )
}

export default AlarmConfigCategoryBody