import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, Box, Typography } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'

interface AlarmConfigCategoryDetailBodySoundVolumeProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailBodySoundVolume: React.FC<AlarmConfigCategoryDetailBodySoundVolumeProps> = ({ appConfig, alarm, handlers }) => {

    const [soundVolumeProfile, setSoundVolumeProfile] = React.useState<'constant' | 'ramp'>(alarm.sound.volume.profile)
    const [soundVolumeMax, setSoundVolumeMax] = React.useState<number>(alarm.sound.volume.end)
    const [soundVolumeConstant, setSoundVolumeConstant] = React.useState<number>(alarm.sound.volume.end) //sound group level
    const [soundVolumeRamp, setSoundVolumeRamp] = React.useState<number[]>([0, alarm.sound.volume.end]) //sound group level

    React.useEffect(() => {
        setSoundVolumeConstant(soundVolumeMax)
        setSoundVolumeRamp([soundVolumeRamp[0], soundVolumeMax])
    }, [soundVolumeMax])

    React.useEffect(() => {
        alarm.sound.volume.profile = soundVolumeProfile
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [soundVolumeProfile])

    const handleSoundVolumeProfileChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: 'constant' | 'ramp' = target.value as 'constant' | 'ramp'
        setSoundVolumeProfile(value)
        alarm.sound.volume.profile = value
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleSoundVolumeConstantChange = (event: Event, value: number | number[]) => {
        setSoundVolumeMax(value as number)
        alarm.sound.volume.end = value as number
        // handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleSoundVolumeRampChange = (event: Event, value: number | number[]) => {
        const values = value as number[]
        setSoundVolumeRamp(values as number[])
        setSoundVolumeMax(values[1] as number)
        alarm.sound.volume.end = values[1]
        alarm.sound.volume.start = values[0]
        // handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleSoundVolumeConstantChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.sound.volume.end = soundVolumeConstant
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleSoundVolumeRampChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.sound.volume.start = soundVolumeRamp[0]
        alarm.sound.volume.end = soundVolumeRamp[1]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    return (
        <>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label='Volume Profile' />
                <Box className='alarm-config-category-detail-field-contents-container'>
                    <ToggleButtonGroup
                        color="primary"
                        value={alarm.sound.volume.profile}
                        exclusive
                        onChange={handleSoundVolumeProfileChange}
                        sx={{
                            marginTop: '.5rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            height: 'fit-content',
                            '& .MuiButtonBase-root': {
                                borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                                background: 'none',
                                padding: '.125rem .75rem',
                                height: '2.75rem',
                            },
                            '&>.MuiButtonBase-root.Mui-selected': {
                                background: appConfig.theme.palette.primary.dark[1],
                                fontWeight: 'bold',
                                borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
                            }
                        }}
                    >
                        <ToggleButton value="constant">Constant</ToggleButton>
                        <ToggleButton value="ramp">Ramp</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </AlarmConfigCategoryDetailContainer>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
            <AlarmConfigCategoryDetailHeader label='Volume' />
            {soundVolumeProfile == 'constant' ? (
                <TrSlider
                    value={alarm.sound.volume.end}
                    min={0}
                    max={100}
                    onChange={handleSoundVolumeConstantChange}
                    onChangeCommitted={handleSoundVolumeConstantChangeCommitted}
                />
            ) : (
                <TrSlider
                    value={[alarm.sound.volume.start, alarm.sound.volume.end]}
                    min={0}
                    max={100}
                    onChange={handleSoundVolumeRampChange}
                    onChangeCommitted={handleSoundVolumeRampChangeCommitted}
                    disableSwap
                />
            )}
            </AlarmConfigCategoryDetailContainer>
        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundVolume