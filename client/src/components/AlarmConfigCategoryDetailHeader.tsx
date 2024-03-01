import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import { IAlarmConfigStateControl } from './types/AlarmConfigComponentSkeletons'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'


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
                    // fontWeight: 'bold',
                    // background: 'linear-gradient(129deg, #df844e87, transparent 85%)',
                    // marginBottom: '.75rem',
                    textTransform: 'uppercase',
                    // fontSize: '1.25rem',
                    // padding: '0rem 1rem',
                    // borderRadius: '4px 4px 0px 0px',
                    // marginBottom: '.5rem',
                    // borderBottom: '3px solid #000033',
                    width: 'fit-content',
                    // borderRadius: '0px'
                    // padding: '.25rem .5rem',
                    // paddingLeft: '0px',
                    // borderLeft: '3px solid #0000338c',
                    width: 'fit-content',
                    fontSize: '1.375rem',
                    // paddingBottom: '0rem',
                    // paddingLeft: '0rem',
                    // paddingTop: '0rem',
                    padding: '0rem'
                }}
            >
                {label}
            </Typography>
        </Box>
    )

}

export default AlarmConfigCategoryDetailHeader