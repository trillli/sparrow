import React from 'react'
import { AccordionSummary, Box, Typography, Switch, Icon } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl';

interface AlarmConfigCategoryHeaderProps {
    groupLabel: string
    icon: string
    groupEnabled: boolean
    toggleHandler: Function
}

const AlarmConfigCategoryHeader: React.FC<AlarmConfigSunriseProps> = ({ groupLabel, icon, groupEnabled, toggleHandler }) => {


    return (

        <AccordionSummary
            className='alarm-config-category-header' 
            expandIcon={<ExpandMoreIcon />} 
            sx={{
                transition: '100ms',
                paddingBottom: '1px',
                background: '#FFFFFF57',
                borderRadius: '0px',
                minHeight: '0px',
                '&.Mui-expanded': {
                    // border: '8px solid black',
                    // background: `linear-gradient(148deg, #ff9f4e, #fef751)`
                    minHeight: '0px',
                    paddingTop: '1rem',
                    '& .category-header-primary': {
                        '&>.MuiIcon-root': {
                            fontSize: '2rem'
                        },
                        '&>.MuiTypography-root': {
                            fontSize: '1.25rem',
                            fontWeight: 'bold'
                        },
                    }
                },
                '& .MuiAccordionSummary-content': {
                    '&.Mui-expanded': {
                        marginTop: '0px',
                        marginBottom: '0px',
                    }
                }
            }}
        >
            <Box 
                sx={{
                    transition: '200s',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '1rem'
                }}
                className='category-header-primary'>
                <Icon
                    sx={{
                        transition: '165ms',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >{icon}</Icon>
                <Typography
                    sx={{
                        transition: '165ms'

                    }}
                >{groupLabel}</Typography>
            </Box>
            <Box 
                className='category-header-secondary'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto'
                    
                }}
            >
                <Switch checked={groupEnabled} onClick={toggleHandler} />
            </Box>
        </AccordionSummary>

    )
}

export default AlarmConfigCategoryHeader