import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Box, Icon, Paper, Typography } from '@mui/material';
import React from 'react';
import ITrillliConfig from '../types/ITrillliConfig';

interface TrBasicNoteProps {
    appConfig: ITrillliConfig
    text: string
    icon?: string | React.ReactNode
}

//MUI icons have a gap between their body and their full width / height, so in order to give the icon background a color and the icon foreground a color, you need to layer it over an icon with an identical shape but a solid background. See the 'announcement' and 'chatbubble' defaults for an example. So, icon can be left blank to use the default 'announcement' version, it can be a string icon  name in which case the layering won't be able to be done automatically, or it can be a react component to allow for a custom layered icon
const TrPageNote: React.FC<TrBasicNoteProps> = ({ appConfig, text, icon = 'announcement' }) => {

    // State Variables & Related ------------------------------------------------------------------ //

    // Effects & Related -------------------------------------------------------------------------- //

    // Event Handlers & Related ------------------------------------------------------------------- //

    // Other vars, util functions, etc ------------------------------------------------------------ //

    let iconComponent: React.ReactNode
    if (typeof (icon) === 'string') {
        if (icon === 'announcement') {
            iconComponent = (
                <><ChatBubbleIcon sx={{
                    position: 'absolute',
                    zIndex: '1',
                    fontSize: '2.5rem',
                    color: appConfig.theme.palette.tertiary.main
                }} />
                    <Icon sx={{
                        zIndex: '2',
                        fontSize: '2.5rem',
                        color: appConfig.theme.palette.primary.main
                    }}>{icon}</Icon>
                </>
            )
        } else {
            iconComponent = (
                <Icon sx={{
                    zIndex: '2',
                    fontSize: '2.5rem',
                    color: appConfig.theme.palette.primary.main
                }}>{icon}</Icon>
            )
        }
    } else {
        iconComponent = icon
    }

    return (
        <Paper elevation={3} sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '15px',
            padding: '15px 25px',
            marginBottom: '2.75rem',
            borderBottom: '5px solid ' + appConfig.theme.palette.primary.main
        }}>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '45px',
                height: '45px',
            }}>
                {iconComponent}
            </Box>
            <Typography>{text}</Typography>
        </Paper>
    )

}

export default TrPageNote