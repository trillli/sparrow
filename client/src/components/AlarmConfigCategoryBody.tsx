import React from 'react'
import { AccordionDetails, Box, Typography, Slider, ToggleButtonGroup, ToggleButton, colors } from '@mui/material'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailsStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import AlarmConfigCategoryDetailOuter from './AlarmConfigCategoryDetailOuter'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailBody from './AlarmConfigCategoryDetailBody'
import AlarmConfigCategoryDetailBodyLightColor from './AlarmConfigCategoryDetailBodyLightColor'
import { IAlarmConfigCategoryMetadata, IAlarmGroupMetadata } from './types/AlarmConfigComponentSkeletons'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'


interface AlarmConfigCategoryBodyProps {
    appConfig: ITrillliConfig,
    groupMetadata: IAlarmGroupMetadata,
    stateControl: IAlarmConfigCategoryDetailsStateControl
}

const AlarmConfigCategoryBody: React.FC<AlarmConfigCategoryBodyProps> = ({ appConfig, groupMetadata, stateControl }) => {


    let alarmConfigCategoryDetailsComponents: React.ReactNode[] = []

    const fieldNamesOrdered: typeof groupMetadata.fieldNamesOrdered = groupMetadata.fieldNamesOrdered




    fieldNamesOrdered.forEach((fieldName, index) => {
        alarmConfigCategoryDetailsComponents.push(
            <AlarmConfigCategoryDetailOuter key={index} appConfig={appConfig} detailMetadata={groupMetadata.fields[fieldName]} stateControl={stateControl} />
        )
    })

















    return (
        <AccordionDetails className='alarm-config-container'
            sx={{
                // background: '#FFFFFF57',
                // padding: '1.25rem 1rem',
            }}
        >    
            <Box className='configuration-details-container'
                sx={{
                    // padding: '1.25rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '2rem'
                }}
            >

                {alarmConfigCategoryDetailsComponents}

            </Box>
        </AccordionDetails>

    )
}

export default AlarmConfigCategoryBody