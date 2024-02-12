import React from 'react'
import { HexColorPicker } from 'react-colorful'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'

interface testprops {
    vars: {
        [key: string]: any
    }
    handlers: {
        [key: string]: Function
    },
}

const AlarmConfigCategoryDetailBodyLightColor: React.FC<IAlarmConfigCategoryDetailStateControl> = ({vars, handlers}) => {

    return (
        <HexColorPicker color={stateControl.vars.lightColor} onChange={stateControl.handlers.handleLightColorChange} />
    )



    
}

export default AlarmConfigCategoryDetailBodyLightColor