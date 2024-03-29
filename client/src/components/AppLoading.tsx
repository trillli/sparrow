import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import PageBuilder from './PageBuilder'

interface AppLoadingProps {
    appConfig: ITrillliConfig
}

const AppLoading: React.FC<AppLoadingProps> = ({ appConfig }) => {

    // State Variables & Related ------------------------------------------------------------------ //

    // Effects & Related -------------------------------------------------------------------------- //

    // Event Handlers & Related ------------------------------------------------------------------- //

    // Other vars, util functions, etc ------------------------------------------------------------ //
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
            <Box
                className='loading-img-container'
            >
                <img src={appConfig.logos.loading} style={{ width: '25%' }} />
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