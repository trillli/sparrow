import React from 'react'
import { HexColorPicker } from 'react-colorful'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import TrSliderColorPicker from 'trillli/src/components/TrSliderColorPicker'


const AlarmConfigCategoryDetailBodyLightColor: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {

    return (
        <TrSliderColorPicker {...stateControl}/>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightColor