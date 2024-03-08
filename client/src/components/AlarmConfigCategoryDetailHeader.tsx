import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import { IAlarmConfigStateControl } from './types/AlarmConfigComponentSkeletons'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'


interface AlarmConfigCategoryDetailHeaderProps {
    label: string,
    // appConfig: ITrillliConfig
    stateControl?: IAlarmConfigStateControl
}

const AlarmConfigCategoryDetailHeader: React.FC<AlarmConfigCategoryDetailHeaderProps> = ({ label, stateControl }) => {

    return (
        <Box 
            className='alarm-config-category-detail-field-title-container'
            sx={{
                // borderLeft: `5px solid ${appConfig.theme.palette.primary.dark[4]}`
                // borderLeft: `5px solid blue`
            }}    
        >
            <Typography 
                className='alarm-config-category-detail-field-title'
                sx={{
                    textTransform: 'uppercase',
                    width: 'fit-content',
                    fontSize: '1.375rem',
                    padding: '0rem'
                }}
            >
                {label}
            </Typography>
        </Box>
    )

}

export default AlarmConfigCategoryDetailHeader