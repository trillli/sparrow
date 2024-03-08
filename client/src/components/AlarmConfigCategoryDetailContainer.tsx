import { Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'

interface AlarmConfigCategoryDetailContainer {
    appConfig: ITrillliConfig
    children: React.ReactNode
}

const AlarmConfigCategoryDetailContainer: React.FC<AlarmConfigCategoryDetailContainer> = ({ appConfig, children }) => {

    //sv

    //ef

    //ha

    //other

    return (

        <Box
            className='alarm-config-category-detail-field-container'
            sx={{
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


