import * as React from 'react';
import PageBuilder from './PageBuilder';
import TrillliPageBuilder from 'trillli/src/components/TrillliPageBuilder';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AlarmIcon from '@mui/icons-material/Alarm';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPageStep from './LandingPageStep';
import { ExpandMore, QuestionMarkOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom'

interface AppSplashProps {
    appConfig: ITrillliConfig
}

const AppSplash: React.FC<AppSplashProps> = ({ appConfig }) => {

    const customStyling: { [key: string]: any } = {
        mainContents: {
            padding: '0px',
            position: 'absolute',
            top: '0px',
            display: 'flex',
            justifyContents: 'center',
            width: '100%'
        }
    }

    const gradientLight1 = `linear-gradient(153deg, ${appConfig.theme.palette.secondary.dark[4]}, ${appConfig.theme.palette.tertiary.dark[4]})`

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    // const [loginBtnCopy, setLoginBtnCopy] = React.useState<string>('Log In / Sign Up to Get Started')
    // const [loginBtnIcon, setLoginBtnIcon] = React.useState<React.ReactNode>(<LoginIcon />)
    
    const refHowItWorks = React.useRef(null)
    let loginBtnCopy: string
    let loginBtnIcon: React.ReactNode

    if (isAuthenticated) {
        console.log('authenticated!')
        loginBtnCopy = 'My Alarms'
        loginBtnIcon = (<AlarmIcon />)
    } else {
        loginBtnCopy = 'Log In / Sign Up to Get Started'
        loginBtnIcon = (<LoginIcon />)
    }

    const scrollToHowItWorks = () => {
        if (refHowItWorks.current) {
            refHowItWorks.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <PageBuilder navTop={isAuthenticated} navSide={false} appConfig={appConfig} styling={customStyling}>
            <Box id='landing-page-container'
                sx={{
                    color: appConfig.theme.palette.neutral.dark[4],
                    width: '100%'
                }}
            >
                <Box
                    id='landing-page-bg-container'
                    sx={{
                        height: '100vh',
                        width: '100vw',
                        background: "url('/src/assets/media/img/landingImg2.simon-berger.unsplash.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'fixed',
                        top: '0px'
                    }}
                >
                    <Box
                        id='landing-page-contents'
                        sx={{
                            position: 'fixed',
                            top: '0px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            background: '#ffffff45',
                        }}
                    >
                        <Box
                            id='landing-page-header-container'
                            sx={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '475px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',

                            }}
                        >
                            <Box
                                id='landing-page-logo-container'
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <img src='/src/assets/logos/v1_fullLight_padNo_bgNo.png'
                                    style={{
                                        width: '100%',
                                        padding: '2rem',
                                        background: '#000000b5',
                                        borderRadius: '4px',
                                        borderBottom: `5px solid ${appConfig.theme.palette.secondary.dark[4]}`,
                                    }}
                                />
                            </Box>
                            <Box
                                        id='get-started-prompt-container'
                                        sx={{
                                            display: 'flex',
                                            width: '100%'
                                        }}
                                    >
                                        <Button
                                            id='get-started-prompt'
                                            startIcon={loginBtnIcon}
                                            component={Link}
                                            to={'/alarms'}
                                            sx={{
                                                transition: '200ms',
                                                marginLeft: 'auto',
                                                width: '100%',
                                                padding: '.5rem .25rem',
                                                background: gradientLight1,
                                                boxShadow: appConfig.theme.shadows[2],
                                                borderBottom: `3px solid ${appConfig.theme.palette.neutral.dark[3]}`,
                                                borderRadius: '4px',
                                                '&>.MuiButton-startIcon': {
                                                    padding: '.5rem',
                                                    borderRadius: '4px',
                                                    margin: '0px',
                                                    marginRight: '.5rem',
                                                    '&>.MuiSvgIcon-root': {
                                                        fontSize: '2rem'
                                                    }
                                                },
                                                '&:hover': {
                                                    transform: 'scale(1.02)'
                                                }
                                            }}
                                        >
                                            <Typography>
                                                {loginBtnCopy}
                                            </Typography>
                                        </Button>
                                    </Box>
                            <Box
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <Box
                                    className='subtitle-container'
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        rowGap: '1.5rem',
                                        background: '#00000055',
                                        padding: '1.5rem 2rem',
                                        textAlign: 'center',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        color: appConfig.theme.palette.primary.dark[3]
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        DayBreakr is an ultra-customizable sunrise alarm clock.
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        Choose your favorite wake-up music, adjust your sunrise & vibration settings, and break in the day your way!
                                    </Typography>
                                    <Box
                                sx={{
                                    width: '100%',
                                    maxWidth: '475px'
                                }}
                            >
                                <Button
                                    id='get-started-prompt'
                                    startIcon={<HelpOutlineIcon />}
                                    onClick={scrollToHowItWorks}
                                    sx={{
                                        transition: '200ms',
                                        padding: '1rem 1rem',
                                        background: gradientLight1,
                                        color: appConfig.theme.palette.neutral.dark[3],
                                        borderBottom: `3px solid ${appConfig.theme.palette.neutral.dark[3]}`,
                                        boxShadow: appConfig.theme.shadows[2],
                                        borderRadius: '4px',
                                        width: '100%',
                                        '&>.MuiButton-startIcon': {
                                            borderRadius: '4px',
                                            margin: '0px',
                                            marginRight: '.5rem',
                                            '&>.MuiSvgIcon-root': {
                                                fontSize: '2rem'
                                            }
                                        },
                                        '&:hover': {
                                            transform: 'scale(1.02)'
                                        }
                                    }}
                                >
                                    <Typography>
                                        So, how does it work?
                                    </Typography>
                                </Button>
                            </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    id='landing-page-body-container'
                    ref={refHowItWorks}
                    sx={{
                        position: 'relative',
                        marginTop: '100vh',
                        padding: '5rem 6%',
                        // background: appConfig.theme.palette.primary.dark[4],
                        // background: `linear-gradient(151deg, #c2c2ff, #fe7e7e)`,
                        background: `linear-gradient(151deg, ${appConfig.theme.palette.primary.dark[4]} 15%, ${appConfig.theme.palette.secondary.dark[2]})`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: appConfig.theme.palette.secondary.dark[4],
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '650px',
                        }}
                        id='daybreakr-info-container-outer'
                    >
                        <Box
                            className='daybreaker-info-container'
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    marginBottom: '3rem',
                                    color: appConfig.theme.palette.neutral.dark[3],
                                    background: appConfig.theme.palette.primary.dark[2],
                                    padding: '1rem 2rem',
                                    borderRadius: '4px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Getting Started with DayBreakr
                            </Typography>
                            <Box
                                className='how-it-works-steps-container'
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '4rem',
                                }}
                            >
                                <LandingPageStep
                                    appConfig={appConfig}
                                    align='left'
                                    number={1}
                                    title='Configure your alarms'
                                    imgSrc='/temp'
                                >
                                    <Typography className='step-copy'>Use the DayBreakr web interface to customize and configure your alarms.</Typography>
                                    <Typography className='step-copy'>Schedule recurring alarms, choose the music you want to wake up to, customize the sunrise effect, and more.</Typography>
                                </LandingPageStep>
                                <LandingPageStep
                                    appConfig={appConfig}
                                    align='right'
                                    number={1}
                                    title='Build your alarm device'
                                    imgSrc='/temp'
                                >
                                    <Typography className='step-copy'>Grab a RaspberryPi and some peripherals and put your alarm together.</Typography>
                                    <Accordion
                                        sx={{
                                            background: appConfig.theme.palette.primary.dark[0],
                                            color: appConfig.theme.palette.neutral.dark[3]
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            sx={{
                                                '& .MuiAccordionSummary-content': {
                                                    justifyContent: 'center',
                                                },
                                                '&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded>.Mui-expanded': {
                                                    margin: '12px 0px'
                                                },
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '.5rem', 
                                                    '& svg': {
                                                        color: appConfig.theme.palette.secondary.dark[5],
                                                        fontSize: '1.75rem',
                                                    }
                                                }
                                            }}
                                        >
                                            <Button
                                                startIcon={<HelpOutlineIcon />}
                                            >
                                                <Typography>
                                                    Wait a second. I have to build my own alarm?
                                                </Typography>
                                            </Button>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            sx={{
                                                textAlign: 'left',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                rowGap: '.5rem'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    width: '100%',
                                                    padding: '.5rem',
                                                    background: appConfig.theme.palette.secondary.dark[2],
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    borderRadius: '4px',
                                                    marginBottom: '1rem'
                                                }}
                                            >
                                                Yeah, but that's part of the fun... right?
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                                sx={{
                                                    borderBottom: `3px solid ${appConfig.theme.palette.secondary.dark[3]}`,
                                                    marginBottom: '.5rem',
                                                    textTransform: 'uppercase',
                                                    fontSize: '1.25rem'
                                                }}
                                            >
                                                Why do I have to build my own alarm device?
                                            </Typography>
                                            <Typography>
                                                DayBreakr is still in an early prototype phase. Eventually it will be made into an iOS & Android app and integrated with phone hardware so that you can simply use your phone. But for now, you'll have to get your hands dirty!
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                                sx={{
                                                    borderBottom: `3px solid ${appConfig.theme.palette.secondary.dark[3]}`,
                                                    marginTop: '1rem',
                                                    marginBottom: '.5rem',
                                                    textTransform: 'uppercase',
                                                    fontSize: '1.25rem'
                                                }}
                                            >
                                                Okay, so how do I build it?
                                            </Typography>
                                            <Typography>
                                                This step requires a RaspberyPi, three peripherals (controllable lights, a vibration motor, and speakers) and a python script.
                                            </Typography>
                                            <Typography>
                                                The RaspberryPi serves as the alarm device, using the peripherals to produce the sound, sunlight, and vibration for your alarm.
                                            </Typography>
                                            <Typography>
                                                The Python script controls the RaspberryPi. It reaches out to the DayBreaker API to retrieve your alarm configurations, and triggers the RaspberryPi to play music, engage the lights, and power the vibration motor according to those configurations.
                                            </Typography>
                                            <Typography>
                                                The script reaches out to the Daybreakr API on the web, grabs your alarm configurations, and it triggers your RaspberryPi to play music, engage the lights, and power the vibration motor according to your alarm settings.
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                A full tutorial and a downloadable Python script is coming soon - check back here for updates!
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </LandingPageStep>
                                <LandingPageStep
                                    appConfig={appConfig}
                                    align='left'
                                    number={1}
                                    title='Go to sleep...'
                                    imgSrc='/temp'
                                >
                                    <Typography className='step-copy'>And then wake up to your custom alarm, ready to crush the day... your way!</Typography>
                                </LandingPageStep>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    id='landing-page-footer'
                    sx={{
                        width: '100%',
                        padding: '5rem 5%',
                        paddingBottom: '.75rem',
                        position: 'relative',
                        background: appConfig.theme.palette.neutral.dark[6],
                        borderTop: `3px solid ${appConfig.theme.palette.secondary.dark[4]}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box id='daybreakr-footer-info-container'
                        sx={{
                            maxWidth: '650px',
                            color: appConfig.theme.palette.secondary.dark[0],
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '3rem',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            className='daybreakr-footer-info'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '3rem',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '1rem',
                                    borderRadius: '4px',
                                    padding: '5% 8%',
                                    background: '#ffffff25'
                                }}
                            >
                                <Typography
                                >
                                    DayBreakr is a passion project by Tim Johnston under the brand moniker Trillli
                                </Typography>
                                <Typography>
                                    DayBreakr is built with React, Django, and Postgres and is deployed using Docker, Docker Compose, and AWS Lightsail
                                </Typography>
                                <Button
                                    startIcon={<GitHubIcon />}
                                    sx={{
                                        transition: '200ms',
                                        padding: '.5rem 2rem',
                                        width: 'fit-content',
                                        color: appConfig.theme.palette.neutral.dark[3],
                                        background: gradientLight1,
                                        '&:hover': {
                                            transition: '200ms',
                                            color: appConfig.theme.palette.neutral.dark[3],
                                        background: gradientLight1,
                                        transform: 'scale(1.02)'
                                        },
                                        '& .MuiButton-startIcon': {
                                            marginRight: '1rem',
                                            '& svg': {
                                                fontSize: '1.5rem'
                                            }
                                        }
                                    }}
                                >
                                    <Typography>Source code</Typography>
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '1rem',
                                    borderRadius: '4px',
                                    padding: '5% 8%',
                                    background: '#ffffff25'
                                }}
                            >
                                <Typography>
                                    You can learn a bit more about me and my other projects by visiting my website
                                </Typography>
                                <Button
                                    startIcon={<GitHubIcon />}
                                    sx={{
                                        transition: '200ms',
                                        padding: '.5rem 2rem',
                                        width: 'fit-content',
                                        color: appConfig.theme.palette.neutral.dark[3],
                                        background: gradientLight1,
                                        '&:hover': {
                                            transition: '200ms',
                                            color: appConfig.theme.palette.neutral.dark[3],
                                        background: gradientLight1,
                                        transform: 'scale(1.02)'
                                        },
                                        '& .MuiButton-startIcon': {
                                            marginRight: '1rem',
                                            '& svg': {
                                                fontSize: '1.5rem'
                                            }
                                        }
                                    }}
                                >
                                    <Typography>My Website</Typography>
                                </Button>
                            </Box>
                        </Box>
                        <Typography
                        sx={{
                            color: appConfig.theme.palette.secondary.dark[0],
                        }}
                    >
                        Background photo by 
                            <a 
                                href="https://unsplash.com/@8moments?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                                style={{
                                    border: `1px solid ${appConfig.theme.palette.primary.dark[5]}`,
                                    padding: '.5rem .5rem',
                                    marginLeft: '.5rem',
                                    marginRight: '.5rem',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                            Simon Berger
                            </a>on Unsplash
                    </Typography>
                    <Box id='daybreakr-footer-copyright-container' sx={{marginTop: '1rem'}}>
                        Copyright Trillli 2024
                    </Box>
                    </Box>
                </Box>
            </Box>
        </PageBuilder>
    )
}

export default AppSplash