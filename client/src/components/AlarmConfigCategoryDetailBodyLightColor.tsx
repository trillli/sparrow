import React from 'react'
import { HexColorPicker } from 'react-colorful'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import TrSliderColorPicker from 'trillli/src/components/TrSliderColorPicker'
import { Box } from '@mui/material'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyLightColorProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    lightColor: number
    onColorSliderChange: Function
    onColorSliderChangeCommitted: Function
}

const AlarmConfigCategoryDetailBodyLightColor: React.FC<AlarmConfigCategoryDetailBodyLightColorProps> = ({alarm, appConfig, lightColor, onColorSliderChange, onColorSliderChangeCommitted}) => {

    // const [lightBrightnessType, setLightBrightnessType] = React.useState<'constant' | 'ramp'>('constant')
    // const [lightBrightnessMax, setLightBrightnessMax] = React.useState<number>(75)
    // const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(lightBrightnessMax)
    // const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([25, lightBrightnessMax])

    // React.useEffect(() => {
    //     setLightBrightnessConstant(lightBrightnessMax)
    //     setLightBrightnessRamp([lightBrightnessRamp[0], lightBrightnessMax])
    // }, [lightBrightnessMax])

    


    return (
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={'Sunrise Light Color'} />
        <Box className='alarm-config-category-detail-field-contents-container'>
        <TrSliderColorPicker lightHue={alarm.light.color.h} onChange={onColorSliderChange} onChangeCommitted={onColorSliderChangeCommitted} />
        </Box>
        </Box>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightColor