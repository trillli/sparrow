import { Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'

interface AlarmConfigCategoryDetailContentsProps {
    appConfig: ITrillliConfig
    children: React.ReactNode
}

const AlarmConfigCategoryDetailContents: React.FC<AlarmConfigCategoryDetailContentsProps> = ({ appConfig, children }) => {

    //sv

    //ef

    //ha

    //other

    return (

        <Box
            className='alarm-config-category-detail-field-contents-container'
        >
            {children}
        </Box>



    )



}

export default AlarmConfigCategoryDetailContents


