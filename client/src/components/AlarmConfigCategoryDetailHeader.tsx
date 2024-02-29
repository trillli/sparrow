import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import { IAlarmConfigStateControl } from './types/AlarmConfigComponentSkeletons'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'


interface AlarmConfigCategoryDetailHeaderProps {
    label: string,
    appConfig: ITrillliConfig
    stateControl?: IAlarmConfigStateControl
}

const AlarmConfigCategoryDetailHeader: React.FC<AlarmConfigCategoryDetailHeaderProps> = ({ label, appConfig, stateControl }) => {

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
                    fontWeight: 'bold',
                    // background: 'linear-gradient(129deg, #df844e87, transparent 85%)',
                    // marginBottom: '.75rem',
                    padding: '0rem 1rem',
                    borderRadius: '4px',
                    marginBottom: '.5rem'
                }}
            >
                {label}
            </Typography>
        </Box>
    )

}

export default AlarmConfigCategoryDetailHeader