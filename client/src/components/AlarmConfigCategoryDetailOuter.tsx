import { Box, Typography } from '@mui/material'
import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailBody from './AlarmConfigCategoryDetailBody'
import AlarmConfigCategoryDetailBodyLightColor from './AlarmConfigCategoryDetailBodyLightColor'

interface ConfigCategoryDetailOuterProps {
    detailMetadata: IAlarmConfigCategoryDetailMetadata
}

const AlarmConfigCategoryDetailOuter: React.FC<AlarmConfigSunriseProps> = ({ detailMetadata }) => {


    return (



        <Box className='alarm-config-category-detail-outer'>
            <Box className='alarm-config-field'>

                {/* If required, render detail Header component (serves as a label to the config input; some config inputs are intuitive enough that the header can be omitted for design / ui/ux purposes, hence the showHeader flag) */}
                { detailMetadata.showHeader ? (
                    <AlarmConfigCategoryDetailHeader label={detailMetadata.label} />
                ) : (<></>)}

                {/* Render the detail Body component (contains the input field that the user will interact with */}
                {detailMetadata.body}
                
            </Box>
        </Box>


    )


}

export default AlarmConfigCategoryDetailOuter