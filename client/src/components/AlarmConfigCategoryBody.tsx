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
            <AlarmConfigCategoryDetailOuter key={index} detailMetadata={groupMetadata.fields[fieldName]} stateControl={stateControl} />
        )
    })

















    return (
        <AccordionDetails className='alarm-config-container'
            sx={{
                // paddingTop: '0px',
                // paddingBottom: '0px',
                padding: '0px',
                // border: '1px solid blue'
            }}
        >    
            <Box className='configuration-details-container'
                sx={{
                    padding: '1rem 0px'
                }}
            >

                {alarmConfigCategoryDetailsComponents}

            </Box>
        </AccordionDetails>

    )
}

export default AlarmConfigCategoryBody