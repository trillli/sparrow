import { Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailContainer {
    appConfig: ITrillliConfig
    children: React.ReactNode
    // handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailContainer: React.FC<AlarmConfigCategoryDetailContainer> = ({appConfig, children}) => {


    return (

        <Box 
        className='alarm-config-category-detail-field-container'
        sx={{
            // borderLeft: `5px solid ${appConfig.theme.palette.neutral.dark[3]}`,
            // paddingLeft: '1rem',
            // paddingTop: '.375rem',
            // paddingBottom: '.25rem',
            // background: appConfig.theme.palette.secondary.dark[4],
            // borderRadius: '4px'
            paddingLeft: '1rem',
            paddingTop: '.5rem',
            paddingBottom: '.5rem',
            borderLeft: `3px solid ${appConfig.theme.palette.secondary.dark[4]}`
        }}
        >

        {children}
        </Box>



    )



}

export default AlarmConfigCategoryDetailContainer


