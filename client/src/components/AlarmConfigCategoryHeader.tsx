import React from 'react'
import { AccordionSummary, Box, Typography, Switch } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl';


const AlarmConfigCategoryHeader: React.FC<AlarmConfigSunriseProps> = ({ categoryName, categoryState, eventHandlers }) => {


    return (

        <AccordionSummary className='alarm-config-category-header' expandIcon={<ExpandMoreIcon />} >
            <Box className='category-header-primary'>
                <WbTwilightIcon />
                <Typography>{categoryName}</Typography>
            </Box>
            <Box className='category-header-secondary'>
                <Switch onClick={eventHandlers.handleCategorySwitchClick} />
            </Box>
        </AccordionSummary>

    )
}

export default AlarmConfigCategoryHeader