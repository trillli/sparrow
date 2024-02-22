export type IAlarmMetadata = {
    name: string
    created: number
    edited: number[],
    id: number,
    enabled: boolean,
    light: {
        enabled: boolean
        color: string
        timing: {
            advance_minutes: number
        }
        luminosity: {
            start: number
            end: number
            profile: 'constant' | 'ramp'
        }
    }
    sound: {
        enabled: boolean
        source: string
        type: 'track' | 'album' | 'artist' | 'playlist'
        title: string
        artist: string
        volume: {
            profile: 'constant' | 'ramp'
            start: number
            end: number
            ramp_seconds: number
        }
    },
    vibration: {
        enabled: boolean
        timing: {
            advance_minutes: number
        },
        intensity: {
            profile: 'constant' | 'ramp'
            start: number,
            end: number,
            ramp_seconds: number
        }
    },
    timing: {
        time: string
        days: []
    }
}