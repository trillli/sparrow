import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface AlarmConfigGroupVibrationProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
}

const AlarmConfigGroupVibration: React.FC<AlarmConfigGroupVibrationProps> = ({alarm, appConfig, handlers, setters}) => {

    return (
        <div>this is the Vibration config group</div>
    )

}

export default AlarmConfigGroupVibration