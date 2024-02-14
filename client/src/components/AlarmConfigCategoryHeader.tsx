import React from 'react'
import { AccordionSummary, Box, Typography, Switch, Icon } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl';


const AlarmConfigCategoryHeader: React.FC<AlarmConfigSunriseProps> = ({ groupLabel, icon, stateControl }) => {


    return (

        <AccordionSummary
            className='alarm-config-category-header' 
            expandIcon={<ExpandMoreIcon />} 
        >
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '1rem'
                }}
                className='category-header-primary'>
                <Icon
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >{icon}</Icon>
                <Typography>{groupLabel}</Typography>
            </Box>
            <Box 
                className='category-header-secondary'
                sx={{
                    marginLeft: 'auto'
                }}
            >
                <Switch onClick={stateControl.handlers.handleCategorySwitchClick} />
            </Box>
        </AccordionSummary>

    )
}

export default AlarmConfigCategoryHeader