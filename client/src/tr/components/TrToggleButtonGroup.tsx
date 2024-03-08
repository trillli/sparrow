import { ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import ITrillliConfig from '../types/ITrillliConfig';

interface TrToggleButtonGroupProps extends ToggleButtonGroupProps {
    sx?: SxProps,
    appConfig: ITrillliConfig
}

const TrToggleButtonGroup: React.FC<TrToggleButtonGroupProps> = (props) => {
    return (
        <ToggleButtonGroup
            {...props}
            sx={{
                overflow: 'hidden',
                borderRadius: '4px 4px 0px 0px',
                '&>.MuiButtonBase-root': {
                    marginLeft: '0px',
                    whiteSpace: 'nowrap',
                    padding: '.5rem 1rem',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '0px',
                    color: props.appConfig.theme.palette.neutral.light[2],
                    background: props.appConfig.theme.palette.primary.dark[8],
                    '&.Mui-selected': {
                        background: props.appConfig.theme.palette.primary.dark[7],
                        color: props.appConfig.theme.palette.neutral.contrastText,
                        boxShadow: `inset 0px -4px ${props.appConfig.theme.palette.secondary.dark[4]}`
                    },
                    '&:hover': {
                        background: props.appConfig.theme.palette.primary.dark[8],
                    },
                    '&:hover.Mui-selected': {
                        background: props.appConfig.theme.palette.primary.dark[7],
                    }
                },
                ...(props.sx || {}),
            }}
        >
            {props.children}
        </ToggleButtonGroup>
    )



}

export default TrToggleButtonGroup