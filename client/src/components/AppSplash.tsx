import * as React from 'react';
import PageBuilder from './PageBuilder';
import TrillliPageBuilder from 'trillli/src/components/TrillliPageBuilder';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';

interface AppSplashProps {
    appConfig: ITrillliConfig
}

const AppSplash: React.FC<AppSplashProps> = ({appConfig}) => {

    const customStyling: {[key: string]: any} = {
        mainContents: {
            padding: '0px'
        }
    }

    return (
        <PageBuilder navTop navSide appConfig={appConfig} styling={customStyling}>
            <Box id='landing-page-container'
                sx={{
                    color: appConfig.theme.palette.primary.dark[4]
                }}
            >
                <Box id='landing-page-contents'>
                    <Box id='landing-page-header-container'>
                        <Box>
                            daybreaker
                        </Box>
                        <Box>
                            a new way to break in the day
                        </Box>
                    </Box>
                    <Box id='get-started-prompt-container'>
                        <Button id='get-started-prompt'>
                            <Typography>
                                log in or sign up to get started
                            </Typography>
                        </Button>
                    </Box>
                    <Box id='daybreakr-info-container-outer'>
                        <Box 
                            className='daybreaker-info-container'
                        >
                            daybreaker is a customizable alarm clock
                        </Box>
                        <Box 
                            className='daybreaker-info-container'
                        >
                            <Box className='how-it-works-container how-it-works-title'>
                                So, how does it work
                            </Box>
                            <Box className='how-it-works-steps-container'>
                                <Box className='step'>
                                    <Typography className='step-title'>Configure your alarms</Typography>
                                    <img src=''></img>
                                    <Typography className='step-copy'>Use the DayBreakr web interface to customize and configure your alarms</Typography>
                                    <Typography className='step-copy'>Set recurring times, choose the music you want to wake up to, customize the sunrise effect, and more.</Typography>
                                </Box>
                                <Box className='step'>
                                    <Typography className='step-title'>Build your alarm</Typography>
                                    <img src=''></img>
                                    <Typography className='step-copy'>Grab a raspberry pi and some peripherals and put your alarm together</Typography>
                                    <Accordion>
                                        <AccordionSummary>
                                            <Button>
                                                <Typography>
                                                    Wait... I have to build my own alarm?
                                                </Typography>
                                            </Button>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Yeah, but that's the fun part... right?
                                            </Typography>
                                            <Typography>
                                                DayBreakr is still in it's early prototype phase. Eventually it will be made into an iOS & Android app so that you can simply use your phone. But for now, you'll have to get your hands dirty!
                                            </Typography>
                                            <Typography>
                                                This step involves a RaspberyPi, three peripherals (controllable lights, a vibration motor, and speakers) and a python script. The script reaches out to the Daybreakr API on the web, grabs your alarm configurations, and then triggers the RaspberryPi to play music, engage the lights, and power the vibration motor according to your alarm settings.
                                            </Typography>
                                            <Typography>
                                                Tutorial and downloadable Python script coming soon!
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Typography className='step-copy'>Set recurring times, choose the music you want to wake up to, customize the sunrise effect, and more.</Typography>
                                </Box>
                                <Box className='step'>
                                    <Typography className='step-title'>Wake up and crush the day... your way!</Typography>
                                    <img src='/src/assets/media/img/langingImg1.ian-stauffer.unsplash.jpg'></img>
                                    Photo by <a href="https://unsplash.com/@ianstauffer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ian Stauffer</a> on <a href="https://unsplash.com/photos/man-sitting-on-mountain-cliff-facing-white-clouds-rising-one-hand-at-golden-hour-bH7kZ0yazB0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box id='landing-page-footer'>
                        <Box id='daybreakr-footer-info-container'>
                            <Box
                                className='daybreakr-footer-info'
                            >
                                <Typography>
                                    DayBreakr is a passion project by Tim Johnston under the brand moniker Trillli
                                </Typography>
                                <Typography>
                                    DayBreakr is built with React, Django, and Postgres and is deployed using Docker, Docker Compose, and AWS Lightsail
                                </Typography>
                                <Button
                                    startIcon={<GitHubIcon />}
                                >
                                    <Typography>Source code</Typography>
                                </Button>
                                <Typography>
                                    Learn a bit more about me here!
                                </Typography>
                            </Box>
                        </Box>
                        <Box id='daybreakr-footer-copyright-container'>
                            Copyright Trillli 2024
                        </Box>
                    </Box>
                </Box>
            </Box>
        </PageBuilder>
    )
}

export default AppSplash