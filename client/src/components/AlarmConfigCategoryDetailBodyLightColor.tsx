import React from 'react'
import { HexColorPicker } from 'react-colorful'
import  IAlarmConfigCategoryDetailStateControl  from './types/IAlarmConfigCategoryDetailStateControl'


const AlarmConfigCategoryDetailBodyLightColor: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {

    return (
        <HexColorPicker color={stateControl.vars.lightColor} onChange={stateControl.handlers.handleLightColorChange} />
    )



    
}

export default AlarmConfigCategoryDetailBodyLightColor