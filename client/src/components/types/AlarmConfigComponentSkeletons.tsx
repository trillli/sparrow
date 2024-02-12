import React from "react"
import AlarmConfigCategoryDetailBodyLightColor from "../AlarmConfigCategoryDetailBodyLightBrightness"

const alarmConfigCategoryKeysOrdered: string[] = [
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
        'profile',
        'brightness',
    ],
    vibration: [
        'start_relative',
        'intensity'
    ]
}

export type IAlarmConfigComponentSkeleton = {
    sound: {
        source: IAlarmConfigCategoryDetailMetadata
        type: IAlarmConfigCategoryDetailMetadata
        title: IAlarmConfigCategoryDetailMetadata
        artist: IAlarmConfigCategoryDetailMetadata
        volume: IAlarmConfigCategoryDetailMetadata
    },
    light: {
        start_relative: IAlarmConfigCategoryDetailMetadata
        color: IAlarmConfigCategoryDetailMetadata
        profile: IAlarmConfigCategoryDetailMetadata
        brightness: IAlarmConfigCategoryDetailMetadata
    }
}



const alarmConfigComponentSkeletons: IAlarmConfigComponentSkeleton = {
    sound: {
        source: {

        },
        type: 'tbd',
        title: 'tbd',
        artist: 'tbd',
        volume: 'tbd',
    },
    light: {
        start_relative: {
            label: 'Turn light on ' + {stateControl.light.lightAdvanceMinutes} + {stateControl.light.lightAdvanceMinutes == 1 ? 'minute' : 'minutes'} + 'before alarm time',
            id: 'light_start',
            showHeader: true,
            body: <AlarmConfigCategoryDetailBodyLightStart stateControl={stateControl.light} />
        },
        color: {
            label: 'Color',
            id: 'light_color',
            showHeader: true,
            body: <AlarmConfigCategoryDetailBodyLightColor stateControl={stateControl.light} />
        },
        profile: {

        },
        brightness: {

        }
    }
}