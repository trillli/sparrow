import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import { IAlarmConfigStateControl } from './types/AlarmConfigComponentSkeletons'


interface AlarmConfigCategoryDetailHeaderProps {
    label: string,
    stateControl?: IAlarmConfigStateControl
}

const AlarmConfigCategoryDetailHeader: React.FC<AlarmConfigCategoryDetailHeaderProps> = ({ label, stateControl }) => {

    return (
        <Box className='alarm-config-category-detail-field-title-container'>
            <Typography 
                className='alarm-config-category-detail-field-title'
                sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(129deg, #df844e87, transparent 85%)',
                    marginBottom: '.75rem',
                    padding: '.5rem 1rem',
                    borderRadius: '4px'
                }}
            >
                {label}
            </Typography>
        </Box>
    )

}

export default AlarmConfigCategoryDetailHeader