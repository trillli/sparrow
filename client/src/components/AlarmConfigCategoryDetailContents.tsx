import { Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailContentsProps {
    appConfig: ITrillliConfig
    children: React.ReactNode
    // handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailContents: React.FC<AlarmConfigCategoryDetailContentsProps> = ({appConfig, children}) => {


    return (

        <Box 
        className='alarm-config-category-detail-field-contents-container'
        sx={{
            paddingLeft: '.5rem',
            // border: '1px solid red'
        }}
        >
        {children}
        </Box>



    )



}

export default AlarmConfigCategoryDetailContents


