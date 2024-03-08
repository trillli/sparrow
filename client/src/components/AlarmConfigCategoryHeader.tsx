import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary, Box, Button, Icon, Switch, Typography } from '@mui/material';
import React from 'react';
import ITrillliConfig from 'src/tr/types/ITrillliConfig';

interface AlarmConfigCategoryHeaderProps {
    appConfig: ITrillliConfig
    groupLabel: string
    icon: string
    groupEnabled: boolean
    toggleHandler: Function
}

const AlarmConfigCategoryHeader: React.FC<AlarmConfigCategoryHeaderProps> = ({ appConfig, groupLabel, icon, groupEnabled, toggleHandler }) => {

    // State Variables & Related ------------------------------------------------------------------ //

    // Effects & Related -------------------------------------------------------------------------- //

    // Event Handlers & Related ------------------------------------------------------------------- //

    // Other vars, util functions, etc ------------------------------------------------------------ //

    const gradientLight1 = `linear-gradient(153deg, ${appConfig.theme.palette.secondary.dark[4]}, ${appConfig.theme.palette.tertiary.dark[4]})`


    return (

        <AccordionSummary
            className='alarm-config-category-header'
            expandIcon={<ExpandMoreIcon />}
            sx={{
                transition: '200ms',
                borderRadius: '0px',
                minHeight: '0px',
                paddingRight: '.375rem',
                paddingLeft: '.375rem',
                '&.Mui-expanded': {
                    minHeight: '0px',
                    '& .category-header-primary': {
                        '&>.MuiIcon-root': {
                            fontSize: '1.5rem'
                        },
                    },
                    '& .config-category-header-button': {
                        width: '100%',
                    }
                },
                '&.MuiButtonBase-root.MuiAccordionSummary-root>.MuiAccordionSummary-content': {
                    marginRight: '0px',
                    marginLeft: '0px',
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
                    width: '150px',
                    justifyContent: 'flex-start',
                }}
            >
                <Typography
                    sx={{
                        transition: '165ms'

                    }}
                >{groupLabel}</Typography>
            </Button>
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