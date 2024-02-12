import React from 'react'
import { HexColorPicker } from 'react-colorful'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'
import SliderColorPicker from 'trillli/src/components/SliderColorPicker'


const AlarmConfigCategoryDetailBodyLightColor: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {

    return (
        <SliderColorPicker {...stateControl}/>
    )
    
}

export default AlarmConfigCategoryDetailBodyLightColor