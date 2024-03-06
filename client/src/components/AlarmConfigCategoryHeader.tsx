import React from 'react'
import { AccordionSummary, Box, Typography, Switch, Icon, Button } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ITrillliConfig from 'src/tr/types/ITrillliConfig';

interface AlarmConfigCategoryHeaderProps {
    appConfig: ITrillliConfig
    groupLabel: string
    icon: string
    groupEnabled: boolean
    toggleHandler: Function
}

const AlarmConfigCategoryHeader: React.FC<AlarmConfigCategoryHeaderProps> = ({ appConfig, groupLabel, icon, groupEnabled, toggleHandler }) => {

    const gradientLight1 = `linear-gradient(153deg, ${appConfig.theme.palette.secondary.dark[4]}, ${appConfig.theme.palette.tertiary.dark[4]})`


    return (

        <AccordionSummary
            className='alarm-config-category-header' 
            expandIcon={<ExpandMoreIcon />} 
            sx={{
                transition: '200ms',
                // paddingBottom: '1px',
                // paddingRight: '.5rem',
                // paddingLeft: '1rem',
                // paddingTop: '.5rem',
                // paddingBottom: '.5rem',
                // background: '#FFFFFF57',
                borderRadius: '0px',
                minHeight: '0px',
                paddingRight: '.375rem',
                paddingLeft: '.375rem',
                '&.Mui-expanded': {
                    // border: '8px solid black',
                    // background: `linear-gradient(148deg, #ff9f4e, #fef751)`
                    minHeight: '0px',

                    // width: '100%',
                    // paddingTop: '1rem',
                    '& .category-header-primary': {
                        '&>.MuiIcon-root': {
                            fontSize: '1.5rem'
                        },
                        '&>.MuiTypography-root': {
                            // fontSize: '1.25rem',
                            // fontWeight: 'bold'
                        },
                    },
                    '& .config-category-header-button': {
                        width: '100%',
                    }
                },
                '&.MuiButtonBase-root.MuiAccordionSummary-root>.MuiAccordionSummary-content': {
                    marginRight: '0px',
                    marginLeft: '0px',
                    '&.Mui-expanded': {
                        // marginTop: '0px',
                        // marginBottom: '0px',
                    }
                }
            }}
        >
            <Button 
                variant='contained'
                className='config-category-header-button' 
                color='secondary'
                startIcon={<Icon
                        sx={{
                            transition: '165ms',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '.5rem'
                        }}
                    >
                        {icon}
                    </Icon>}
                sx={{
                    transition: '200ms',
                    background: gradientLight1,
                    // width: '175px',
                    width: '150px',
                    justifyContent: 'flex-start',
                    // marginRight: '1rem',
                }}
            >
                <Typography
                    sx={{
                        transition: '165ms'

                    }}
                >{groupLabel}</Typography>
            </Button>
                {/* <Icon>{icon}</Icon>
            </Button> */}
            {/* <Box 
                sx={{
                    transition: '200s',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '.25rem'
                }}
                className='category-header-primary'>
                <Icon
                    sx={{
                        transition: '165ms',
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '.5rem'
                    }}
                >{icon}</Icon>
                <Typography
                    sx={{
                        transition: '165ms'

                    }}
                >{groupLabel}</Typography>
            </Box> */}
            <Box 
                className='category-header-secondary'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto',
                    transform: 'rotate(-90deg)'
                }}
            >
                <Switch 
                    checked={groupEnabled} 
                    onClick={toggleHandler} 
                    sx={{
                        // paddingTop: '10px',
                        // paddingBottom: '10px',
                        // paddingLeft: '9px',
                        // paddingRight: '5px',
                        '& .MuiSwitch-switchBase': {
                            // paddingTop: '6px'
                        },
                        '& .MuiSwitch-thumb': {
                            // width: '26px',
                            // height: '26px'
                        },
                        '& .Mui-checked+.MuiSwitch-track': {
                            opacity: '.55 !important',
                            background: 'lime'
                        }
                    }}
                />
            </Box>
        </AccordionSummary>

    )
}

export default AlarmConfigCategoryHeader