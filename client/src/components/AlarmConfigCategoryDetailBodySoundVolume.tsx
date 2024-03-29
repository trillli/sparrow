import { Box, ToggleButton, Typography } from '@mui/material'
import React from 'react'
import TrSlider from 'src/tr/components/TrSlider'
import TrToggleButtonGroup from 'src/tr/components/TrToggleButtonGroup'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import AlarmConfigCategoryDetailContents from './AlarmConfigCategoryDetailContents'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodySoundVolumeProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailBodySoundVolume: React.FC<AlarmConfigCategoryDetailBodySoundVolumeProps> = ({ appConfig, alarm, handlers }) => {

    // State Variables & Related ------------------------------------------------------------------ //
    const [soundVolumeProfile, setSoundVolumeProfile] = React.useState<'constant' | 'ramp'>(alarm.sound.volume.profile)
    const [soundVolumeMax, setSoundVolumeMax] = React.useState<number>(alarm.sound.volume.end)
    const [soundVolumeConstant, setSoundVolumeConstant] = React.useState<number>(alarm.sound.volume.end)
    const [soundVolumeRamp, setSoundVolumeRamp] = React.useState<number[]>([alarm.sound.volume.start, alarm.sound.volume.end])

    // Effects & Related -------------------------------------------------------------------------- //
    React.useEffect(() => {
        setSoundVolumeConstant(soundVolumeMax)
        setSoundVolumeRamp([soundVolumeRamp[0], soundVolumeMax])
    }, [soundVolumeMax])

    React.useEffect(() => {
        alarm.sound.volume.profile = soundVolumeProfile
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [soundVolumeProfile])

    // Event Handlers & Related ------------------------------------------------------------------- //
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
    }

    const handleSoundVolumeRampChange = (event: Event, value: number | number[]) => {
        const values = value as number[]
        setSoundVolumeRamp(values as number[])
        setSoundVolumeMax(values[1] as number)
        alarm.sound.volume.end = values[1]
        alarm.sound.volume.start = values[0]
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

    // Other vars, util functions, etc ------------------------------------------------------------ //

    return (
        <>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label='Volume Profile' />
                <AlarmConfigCategoryDetailContents appConfig={appConfig}>
                    <TrToggleButtonGroup
                        appConfig={appConfig}
                        value={alarm.sound.volume.profile}
                        exclusive
                        onChange={handleSoundVolumeProfileChange}
                        sx={{
                            marginTop: '.5rem',
                            borderRadius: '4px'
                        }}
                    >
                        <ToggleButton value="constant">Constant</ToggleButton>
                        <ToggleButton value="ramp">Ramp</ToggleButton>
                    </TrToggleButtonGroup>
                </AlarmConfigCategoryDetailContents>
            </AlarmConfigCategoryDetailContainer>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label='Volume' />
                <AlarmConfigCategoryDetailContents appConfig={appConfig}>
                    <Box
                    >
                        <Box
                            className='current-config-value-container-outer'
                            sx={{

                            }}
                        >

                            <Box
                                className='current-config-value-container'
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: '.5rem',
                                    alignItems: 'baseline'
                                }}
                            >
                                {soundVolumeProfile == 'constant' ? (
                                    <>
                                        <Typography
                                            sx={{
                                                fontSize: '2.5rem',
                                            }}
                                        >
                                            {soundVolumeConstant}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '1.25rem'
                                            }}
                                        >
                                            %
                                        </Typography>
                                    </>) : (<>
                                        <Typography
                                            sx={{
                                                fontSize: '2.5rem',
                                            }}
                                        >
                                            {soundVolumeRamp[0]}%
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '1.25rem'
                                            }}
                                        >
                                            ramping to
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '2.5rem',
                                            }}
                                        >
                                            {soundVolumeRamp[1]}%
                                        </Typography>
                                    </>)}

                            </Box>
                        </Box>
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
                    </Box>
                </AlarmConfigCategoryDetailContents>
            </AlarmConfigCategoryDetailContainer>
        </>
    )

}

export default AlarmConfigCategoryDetailBodySoundVolume