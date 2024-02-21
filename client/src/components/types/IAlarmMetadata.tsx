export type IAlarmMetadata = {
    name: string
    created: number
    edited?: number[],
    id: number,
    enabled: boolean,
    light?: {
        color: string
        timing: {
            advance_minutes: number
        }
        luminosity?: {
            start?: number
            end?: number
            profile?: string
        }
    }
    sound?: {
        source: string
        type: 'song' | 'album' | 'playlist'
        title: string
        artist: string
        volume?: {
            start?: number
            end?: number
            ramp_seconds?: number
        }
    },
    vibration?: {
        timing?: {
            advance_seconds?: number
        }
    },
    timing: {
        time: string
        days?: {
            m?: boolean
            tu?: boolean
            w?: boolean
            th?: boolean
            f?: boolean
            sa?: boolean
            su?: boolean
        }
    }
}