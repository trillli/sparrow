import { Box, Typography } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface LandingPageStepProps {
    appConfig: ITrillliConfig
    align: 'left' | 'right',
    imgSrc: string
    number: number,
    title: string,
    children: React.ReactNode
}

const LandingPageStep: React.FC<LandingPageStepProps> = ({ appConfig, align, imgSrc, number, title, children }) => {


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '.75rem',
                alignItems: align == 'left' ? 'flex-start' : 'flex-end',
                color: appConfig.theme.palette.neutral.contrastText,
                background: appConfig.theme.palette.primary.dark[2],
                padding: '1.5rem 2rem',
                borderLeft: align == 'left' ? `5px solid ${appConfig.theme.palette.neutral.dark[3]}` : 'none',
                    borderRight: align == 'right' ? `5px solid ${appConfig.theme.palette.neutral.dark[3]}` : 'none',
                borderRadius: '4px'
                // padding: '.1rem',
                // borderLeft: align == 'left' ? `4px solid ${appConfig.theme.palette.secondary.dark[4]}` : 'none',
                // borderRight: align == 'right' ? `4px solid ${appConfig.theme.palette.secondary.dark[4]}` : 'none',
            }}
        >
            <Box
                sx={{
                    // borderLeft: align == 'left' ? `5px solid ${appConfig.theme.palette.secondary.dark[4]}` : 'none',
                    // borderRight: align == 'right' ? `5px solid ${appConfig.theme.palette.secondary.dark[4]}` : 'none',
                    // padding: '.25rem 1rem'
                }}
            >
                <Typography 
                    className='step-title'
                    sx={{
                        textAlign: align,
                        fontSize: '1.875rem',
                        textTransform: 'uppercase',
                        color: appConfig.theme.palette.neutral.dark[6],
                        // fontWeight: 'bold'
                    }}
                >{
                    title}
                </Typography>
            </Box>
            <img src=''></img>
            <Box
                sx={{
                    textAlign: align,
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '.75rem',
                    color: appConfig.theme.palette.neutral.dark[0],
                }}
            >
                {children}
            </Box>
        </Box>
    )



}

export default LandingPageStep