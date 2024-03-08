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



export type IAlarmCategorySoundFieldName = 'search' | 'volume'
export type IAlarmCategoryLightFieldName = 'start_relative' | 'color' | 'brightness'
export type IAlarmCategoryVibrationFieldName = 'start_relative' | 'intensity'

export type IAlarmGroupMetadata = {
    label: string,
    id: string,
    fieldNamesOrdered: string[],
    fields: {
        [key: string]: IAlarmConfigCategoryDetailMetadata
    }
}

export type IAlarmGroupSoundFields = {
                search: IAlarmConfigCategoryDetailMetadata
                volume: IAlarmConfigCategoryDetailMetadata
}

export type IAlarmGroupLightFields = {
    start_relative: IAlarmConfigCategoryDetailMetadata
    color: IAlarmConfigCategoryDetailMetadata
    brightness: IAlarmConfigCategoryDetailMetadata
}

export type IAlarmGroupVibrationFields = {
    start_relative: IAlarmConfigCategoryDetailMetadata
    intensity: IAlarmConfigCategoryDetailMetadata
}




export type IAlarmConfigCategoryMetadata = {
    stateControl: IAlarmConfigStateControl,
    groups: {
        sound: {
            label: string,
            id: string,
            icon: string,
            fieldNamesOrdered: IAlarmCategorySoundFieldName[]
            fields: IAlarmGroupSoundFields
        },
        light: {
            label: string,
            id: string,
            icon: string,
            fieldNamesOrdered: IAlarmCategoryLightFieldName[]
            fields: IAlarmGroupLightFields
        },
        vibration: {
            label: string,
            id: string,
            icon: string
            fieldNamesOrdered: IAlarmCategoryVibrationFieldName[]
            fields: IAlarmGroupVibrationFields
        }
    }
}
