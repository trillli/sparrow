import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'

const AlarmConfigCategoryDetailHeader: React.FC<AlarmConfigSunriseProps> = ({ detailName, categoryState, eventHandlers }) => {



    return (



        <Box className='alarm-config-field-header'>
            <Typography className='alarm-config-input-label'>{detailName} [need to replace with detailName var [part of props]</Typography>
        </Box>


    )




}

export default AlarmConfigCategoryDetailHeader