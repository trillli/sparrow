import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import { IAlarmConfigStateControl } from './types/AlarmConfigComponentSkeletons'


interface AlarmConfigCategoryDetailHeaderProps {
    label: string,
    stateControl: IAlarmConfigStateControl
}

const AlarmConfigCategoryDetailHeader: React.FC<AlarmConfigCategoryDetailHeaderProps> = ({ label, stateControl }) => {

    return (
        <Box className='alarm-config-field-header'>
            <Typography className='alarm-config-input-label' variant='pageSubtitle'>{label}</Typography>
        </Box>
    )

}

export default AlarmConfigCategoryDetailHeader