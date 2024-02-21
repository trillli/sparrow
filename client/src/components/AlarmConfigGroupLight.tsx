import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface AlarmConfigGroupLightProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
}

const AlarmConfigGroupLight: React.FC<AlarmConfigGroupLightProps> = ({alarm, appConfig, handlers, setters}) => {

    return (
        <div>this is the Light config group</div>
    )

}

export default AlarmConfigGroupLight