import { Box, ToggleButton, Typography } from '@mui/material'
import React from 'react'
import TrSlider from 'src/tr/components/TrSlider'
import TrToggleButtonGroup from 'src/tr/components/TrToggleButtonGroup'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import AlarmConfigCategoryDetailContents from './AlarmConfigCategoryDetailContents'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyLightBrightnessProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailBodyBrightness: React.FC<AlarmConfigCategoryDetailBodyLightBrightnessProps> = ({ appConfig, alarm, handlers }) => {

    //sv
    const [lightBrightnessProfile, setLightBrightnessProfile] = React.useState<'constant' | 'ramp'>(alarm.light.luminosity.profile)
    const [lightBrightnessMax, setLightBrightnessMax] = React.useState<number>(alarm.light.luminosity.end)
    const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(alarm.light.luminosity.end)
    const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([alarm.light.luminosity.start, alarm.light.luminosity.end])

    //ef
    React.useEffect(() => {
        setLightBrightnessConstant(lightBrightnessMax)
        setLightBrightnessRamp([lightBrightnessRamp[0], lightBrightnessMax])
    }, [lightBrightnessMax])

    React.useEffect(() => {
        alarm.light.luminosity.profile = lightBrightnessProfile
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [lightBrightnessProfile])

    //ha
    const handleLightBrightnessProfileChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: 'constant' | 'ramp' = target.value as 'constant' | 'ramp'
        setLightBrightnessProfile(value)
        alarm.light.luminosity.profile = value
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleLightBrightnessConstantChange = (event: Event, value: number | number[]) => {
        setLightBrightnessMax(value as number)
        alarm.light.luminosity.end = value as number
    }

    const handleLightBrightnessRampChange = (event: Event, value: number | number[]) => {
        const values = value as number[]
        setLightBrightnessRamp(values as number[])
        setLightBrightnessMax(values[1] as number)
        alarm.light.luminosity.end = values[1]
        alarm.light.luminosity.start = values[0]
    }

    const handleLightBrightnessConstantChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.light.luminosity.end = value
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleLightBrightnessRampChangeCommitted = (event: Event, value: number | number[]) => {
        alarm.light.luminosity.start = lightBrightnessRamp[0]
        alarm.light.luminosity.end = lightBrightnessRamp[1]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    return (
        <>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label={'Brightness Profile'} />
                <AlarmConfigCategoryDetailContents appConfig={appConfig}>

                    <TrToggleButtonGroup
                        appConfig={appConfig}
                        value={alarm.light.luminosity.profile}
                        exclusive
                        onChange={handleLightBrightnessProfileChange}
                        sx={{
                            marginTop: '.5rem',
                            borderRadius: '4px',
                        }}
                    >
                        <ToggleButton value="constant">Constant</ToggleButton>
                        <ToggleButton value="ramp">Ramp</ToggleButton>
                    </TrToggleButtonGroup>
                </AlarmConfigCategoryDetailContents>
            </AlarmConfigCategoryDetailContainer>
            <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
                <AlarmConfigCategoryDetailHeader label={'Brightness'} />
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
                                {lightBrightnessProfile == 'constant' ? (
                                    <>
                                        <Typography
                                            sx={{
                                                fontSize: '2.5rem',
                                            }}
                                        >
                                            {lightBrightnessConstant}
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
                                            {lightBrightnessRamp[0]}%
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
                                            {lightBrightnessRamp[1]}%
                                        </Typography>
                                    </>)}

                            </Box>
                        </Box>
                        {lightBrightnessProfile == 'constant' ? (
                            <TrSlider
                                value={alarm.light.luminosity.end}
                                min={0}
                                max={100}
                                onChange={handleLightBrightnessConstantChange}
                                onChangeCommitted={handleLightBrightnessConstantChangeCommitted}
                            />
                        ) : (
                            <TrSlider
                                value={[alarm.light.luminosity.start, alarm.light.luminosity.end]}
                                min={0}
                                max={100}
                                onChange={handleLightBrightnessRampChange}
                                onChangeCommitted={handleLightBrightnessRampChangeCommitted}
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

export default AlarmConfigCategoryDetailBodyBrightness