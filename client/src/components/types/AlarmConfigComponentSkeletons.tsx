import React from "react"
import AlarmConfigCategoryDetailBodyLightColor from "../AlarmConfigCategoryDetailBodyLightBrightness"
import IAlarmConfigCategoryDetailStateControl from "./IAlarmConfigCategoryDetailStateControl"


export type IAlarmCategoryGroupName = 'sound' | 'light' |'vibration' 

export type IAlarmConfigStateControl = {
    [key in IAlarmCategoryGroupName]: IAlarmConfigCategoryDetailStateControl
}

export const alarmConfigCategoryKeysOrdered: IAlarmCategoryGroupName[] = [
    'sound',
    'light',
    'vibration'
]

type AlarmConfigCategoryFieldKeysOrdered = {
    [key in typeof alarmConfigCategoryKeysOrdered[number]] : string[]
}


const alarmConfigCategoryFieldKeysOrdered: AlarmConfigCategoryFieldKeysOrdered = {
    sound: [
        'source',
        'type',
        'title',
        'artist',
        'volume',
    ],
    light: [
        'start_relative',
        'color',
        'brightness',
    ],
    vibration: [
        'start_relative',
        'intensity'
    ]
}



export type IAlarmCategorySoundFieldName = 'source' | 'type' | 'title' | 'artist' | 'volume'
export type IAlarmCategoryLightFieldName = 'start_relative' | 'color' | 'brightness'
export type IAlarmCategoryVibrationFieldName = 'intensity'

export type IAlarmGroupMetadata = {
    label: string,
    id: string,
    fieldNamesOrdered: string[],
    fields: {
        [key: string]: IAlarmConfigCategoryDetailMetadata
    }
}

export type IAlarmGroupSoundFields = {
    source: IAlarmConfigCategoryDetailMetadata
                type: IAlarmConfigCategoryDetailMetadata
                title: IAlarmConfigCategoryDetailMetadata
                artist: IAlarmConfigCategoryDetailMetadata
                volume: IAlarmConfigCategoryDetailMetadata
}

export type IAlarmGroupLightFields = {
    start_relative: IAlarmConfigCategoryDetailMetadata
    color: IAlarmConfigCategoryDetailMetadata
    brightness: IAlarmConfigCategoryDetailMetadata
}

export type IAlarmGroupVibrationFields = {
    intensity: IAlarmConfigCategoryDetailMetadata
}




export type IAlarmConfigCategoryMetadata = {
    stateControl: IAlarmConfigStateControl,
    groups: {
        sound: {
            label: string,
            id: string,
            fieldNamesOrdered: IAlarmCategorySoundFieldName[]
            fields: IAlarmGroupSoundFields
        },
        light: {
            label: string,
            id: string,
            fieldNamesOrdered: IAlarmCategoryLightFieldName[]
            fields: IAlarmGroupLightFields
        },
        vibration: {
            label: string,
            id: string,
            fieldNamesOrdered: IAlarmCategoryVibrationFieldName[]
            fields: IAlarmGroupVibrationFields
        }
    }
}



// const alarmConfigComponentSkeletons: IAlarmConfigComponentSkeleton = {
//     sound: {
//         source: {

//         },
//         type: 'tbd',
//         title: 'tbd',
//         artist: 'tbd',
//         volume: 'tbd',
//     },
//     light: {
//         start_relative: {
//             label: 'Turn light on ' + {stateControl.light.lightAdvanceMinutes} + {stateControl.light.lightAdvanceMinutes == 1 ? 'minute' : 'minutes'} + 'before alarm time',
//             id: 'light_start',
//             showHeader: true,
//             body: <AlarmConfigCategoryDetailBodyLightStart stateControl={stateControl.light} />
//         },
//         color: {
//             label: 'Color',
//             id: 'light_color',
//             showHeader: true,
//             body: <AlarmConfigCategoryDetailBodyLightColor stateControl={stateControl.light} />
//         },
//         profile: {

//         },
//         brightness: {

//         }
//     }
// }