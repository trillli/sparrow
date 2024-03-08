import { Box, ToggleButton, Typography } from '@mui/material'
import React from 'react'
import TrSlider from 'src/tr/components/TrSlider'
import TrToggleButtonGroup from 'src/tr/components/TrToggleButtonGroup'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import AlarmConfigCategoryDetailContents from './AlarmConfigCategoryDetailContents'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyVibrationProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailBodyVibration: React.FC<AlarmConfigCategoryDetailBodyVibrationProps> = ({ alarm, appConfig, handlers }) => {

    // State Variables & Related ------------------------------------------------------------------ //
    const [vibrationProfile, setVibrationProfile] = React.useState<'constant' | 'ramp'>(alarm.vibration.intensity.profile)
    const [vibrationMax, setVibrationMax] = React.useState<number>(alarm.vibration.intensity.end)
    const [vibrationConstant, setVibrationConstant] = React.useState<number>(alarm.vibration.intensity.end)
    const [vibrationRamp, setVibrationRamp] = React.useState<number[]>([alarm.vibration.intensity.start, alarm.vibration.intensity.end])

    // Effects & Related -------------------------------------------------------------------------- //
    React.useEffect(() => {
        setVibrationConstant(vibrationMax)
        setVibrationRamp([vibrationRamp[0], vibrationMax])
    }, [vibrationMax])

    React.useEffect(() => {
        alarm.vibration.intensity.profile = vibrationProfile
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [vibrationProfile])

    // Event Handlers & Related ------------------------------------------------------------------- //
    const handleVibrationProfileChange = (event: React.MouseEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: 'constant' | 'ramp' = target.value as 'constant' | 'ramp'
        setVibrationProfile(value)
        alarm.vibration.intensity.profile = value
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleVibrationChangeConstant = (event: Event, value: number | number[]) => {
        setVibrationMax(value as number)
        alarm.vibration.intensity.end = value as number
    }

    const handleVibrationChangeRamp = (event: Event, value: number | number[]) => {
        const values = value as number[]
        setVibrationRamp(values as number[])
        setVibrationMax(values[1] as number)
        alarm.vibration.intensity.end = values[1]
        alarm.vibration.intensity.start = values[0]
    }

    const handleVibrationConstantChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.vibration.intensity.end = vibrationConstant
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleVibrationRampChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.vibration.intensity.start = vibrationRamp[0]
        alarm.vibration.intensity.end = vibrationRamp[1]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    // Other vars, util functions, etc ------------------------------------------------------------ //


    return (
        <>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label='Vibration Profile' />
                <AlarmConfigCategoryDetailContents appConfig={appConfig}>
                    <TrToggleButtonGroup
                        appConfig={appConfig}
                        value={alarm.vibration.intensity.profile}
                        exclusive
                        onChange={handleVibrationProfileChange}
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
                <AlarmConfigCategoryDetailHeader label='Intensity' />
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
                                    flexWrap: 'wrap',
                                    columnGap: '.5rem',
                                    alignItems: 'baseline'
                                }}
                            >
                                {vibrationProfile == 'constant' ? (
                                    <>
                                        <Typography
                                            sx={{
                                                fontSize: '2.5rem',
                                            }}
                                        >
                                            {vibrationConstant}
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
                                            {vibrationRamp[0]}%
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
                                            {vibrationRamp[1]}%
                                        </Typography>
                                    </>)}

                            </Box>
                        </Box>
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
                </AlarmConfigCategoryDetailContents>
            </AlarmConfigCategoryDetailContainer>
        </>
    )




}

export default AlarmConfigCategoryDetailBodyVibration