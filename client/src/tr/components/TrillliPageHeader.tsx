import { Box, Typography } from '@mui/material';
import React from 'react';
import ITrillliConfig from '../types/ITrillliConfig';

interface TrillliPageHeaderProps {
    appConfig: ITrillliConfig
    title: string
    subtitles?: string[]
}

const TrillliPageHeader: React.FC<TrillliPageHeaderProps> = ({appConfig, title, subtitles = []}) => {

    //Define styling
    let styles: {
        [pageHeader:string]: any
    } = {}
    
    //Box that contains the title and subtitles
    styles.pageHeader = {
        marginBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        color: appConfig.theme.palette.neutral.dark[3],
        // padding: '1rem 2rem',
        // borderRadius: '4px',
        // overflow: 'hidden',
        // background: appConfig.theme.palette.primary.dark[0],
    }

    let components: {[key: string]: React.ReactNode} = {}
    components.title = <Typography className='page-title' variant='pageTitle'>{title}</Typography>
    components.subtitles = <></>

    if (subtitles.length > 0) {

        let subtitleComponents: React.ReactNode[] = []

        subtitles.forEach((subtitle, index) => {
            let subtitleComponent = <Typography className='page-subtitle' key={index} variant='pageSubtitle'>{subtitle}</Typography>
            subtitleComponents.push(subtitleComponent)
        })

        components.subtitles = <Box className='page-subtitles-container'>{subtitleComponents}</Box>


    }


    
    


    return (
        <Box className='page-header' sx={styles.pageHeader}>
            {components.title}
            {components.subtitles}
        </Box>
    )

}


export default TrillliPageHeader