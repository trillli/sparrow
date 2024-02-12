import { Box, Typography } from '@mui/material'
import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import AlarmConfigCategoryBody from './AlarmConfigCategoryBody'

interface testProps<AlarmConfigSunriseProps> {
    children: React.ReactNode
    
}


const AlarmConfigCategoryDetailBody: React.FC<AlarmConfigSunriseProps> = ({ categoryName, categoryState, eventHandlers, children }) => {


    return (


        <Box className='alarm-config-field-contents'>
            {children}
        </Box>



    )


}

export default AlarmConfigCategoryDetailBody
