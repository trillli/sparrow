import React from 'react'
import { HexColorPicker } from 'react-colorful'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import TrSliderColorPicker from 'trillli/src/components/TrSliderColorPicker'
import { Box } from '@mui/material'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'


const AlarmConfigCategoryDetailBodyLightColor: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {

    return (
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={'Sunrise Light Color'} />
        <Box className='alarm-config-category-detail-field-contents-container'>
        <TrSliderColorPicker {...stateControl}/>
        </Box>
        </Box>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightColor