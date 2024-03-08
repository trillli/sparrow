import { Box, Typography } from '@mui/material'
import React from 'react'


interface AlarmConfigCategoryDetailHeaderProps {
    label: string,
}

const AlarmConfigCategoryDetailHeader: React.FC<AlarmConfigCategoryDetailHeaderProps> = ({ label }) => {

    //sv

    //ef

    //ha

    //other

    return (
        <Box
            className='alarm-config-category-detail-field-title-container'
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