import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, Box } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyVibrationProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function}
}

const AlarmConfigCategoryDetailBodyVibration: React.FC<AlarmConfigCategoryDetailBodyVibrationProps> = ({ alarm, appConfig, handlers }) => {

    const [vibrationProfile, setVibrationProfile] = React.useState<'constant' | 'ramp'>(alarm.vibration.intensity.profile)
    const [vibrationMax, setVibrationMax] = React.useState<number>(alarm.vibration.intensity.end)
    const [vibrationConstant, setVibrationConstant] = React.useState<number>(alarm.vibration.intensity.end)
    const [vibrationRamp, setVibrationRamp] = React.useState<number[]>([0, alarm.vibration.intensity.end])

    React.useEffect(() => {
        setVibrationConstant(vibrationMax)
        setVibrationRamp([vibrationRamp[0], vibrationMax])
    }, [vibrationMax])

    React.useEffect(() => {
        alarm.vibration.intensity.profile = vibrationProfile
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [vibrationProfile])

    const handleVibrationProfileChange = (event: React.MouseEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: 'constant' | 'ramp' = target.value as 'constant' | 'ramp'
        setVibrationProfile(value)
        alarm.vibration.intensity.profile = value
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleVibrationChangeConstant = (event: Event, value: number | number[]) => {
        // setVibrationMax(value as number)
        alarm.vibration.intensity.end = value as number
        // alarm.vibration.intensity.start = values[0]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleVibrationChangeRamp = (event: Event, value: number | number[]) => {
        const values = value as number[]
        // setVibrationRamp(values as number[])
        // setVibrationMax(values[1] as number)
        alarm.vibration.intensity.end = values[1]
        alarm.vibration.intensity.start = values[0]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleVibrationConstantChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.light.luminosity.end = vibrationConstant
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleVibrationRampChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.light.luminosity.start = vibrationRamp[0]
        alarm.light.luminosity.end = vibrationRamp[1]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }


    return (
        <>
            <Box className='alarm-config-category-detail-field-container'>
                <AlarmConfigCategoryDetailHeader label='Vibration Profile' />
                <Box className='alarm-config-category-detail-field-contents-container'>
                    <ToggleButtonGroup
                        color="primary"
                        value={alarm.vibration.intensity.profile}
                        exclusive
                        onChange={handleVibrationProfileChange}
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
            </Box>
            <Box className='alarm-config-category-detail-field-container'>
                <AlarmConfigCategoryDetailHeader label='Intensity' />
                {vibrationProfile == 'constant' ? (
                    <TrSlider
                        value={alarm.vibration.intensity.end}
                        min={0}
                        max={100}
                        onChange={handleVibrationChangeConstant}
                        onChangeCommitted={handleVibrationConstantChangeCommitted}
                    />
                ) : (
                    <TrSlider
                        value={[alarm.vibration.intensity.start, alarm.vibration.intensity.end]}
                        min={0}
                        max={100}
                        onChange={handleVibrationChangeRamp}
                        onChangeCommitted={handleVibrationRampChangeCommitted}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                )}
            </Box>
        </>
    )




}

export default AlarmConfigCategoryDetailBodyVibration