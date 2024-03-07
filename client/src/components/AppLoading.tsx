import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import PageBuilder from './PageBuilder'
import { Box, LinearProgress } from '@mui/material'

interface AppLoadingProps {
    appConfig: ITrillliConfig
}

const AppLoading: React.FC<AppLoadingProps> = ({ appConfig }) => {

    const customStyling: { [key: string]: any } = {
        mainContents: {
            padding: '0px',
            display: 'flex',
            justifyContents: 'center',
            alignItems: 'center',
            width: '100%',
            background: 'orange'
        }
    }

    return (
        <PageBuilder
            appConfig={appConfig}
            styling={customStyling}
            navTop={false}
            navSide={false}
        >
            {/* <div>hi</div> */}
            <Box
                className='loading-img-container'
            >
                <img src={appConfig.logos.loading} style={{width: '25%'}} />
            </Box>
            <Box 
                className='loading-indicator-container'
                sx={{ width: '75%' }}>
                <LinearProgress />
            </Box>
        </PageBuilder>

    )


}

export default AppLoading