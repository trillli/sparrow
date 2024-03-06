import React from 'react'
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import ITrillliConfig from '../types/ITrillliConfig'
import TrillliPageBuilder from './TrillliPageBuilder';

interface LandingPageProps {
    appConfig: ITrillliConfig
}

const LandingPage: React.FC<LandingPageProps> = ({appConfig}) => {

    return (
        <>
        {appConfig.pages.landing.trBasic ? (
        <TrillliPageBuilder 
        appConfig={appConfig} 
        navTop={true} 
        navSide={true}
    >
        <Box>Landing page with log in / log out</Box>
            <Typography>Welcome text - comes from appConfig</Typography>
            <Typography>App logo - comes from appConfig</Typography>
            {appConfig.pages.landing.authPrompt? (
                <Typography>Auth functions; always show if top nav disabled. if top nav enabled, show if screen is xs (when the top nav options are collapsed to hamburger)</Typography>
            ):(<><div>landing page without log in / log out</div></>)}
            <Box>
                {appConfig.pages.landing.contents}
            </Box>
            
            </TrillliPageBuilder>
        ) : (
            <>{appConfig.pages.landing.contents}</>
        )}
        </>
    )


}

export default LandingPage