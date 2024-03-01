import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyLightBrightnessProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailBodyBrightness: React.FC<AlarmConfigCategoryDetailBodyLightBrightnessProps> = ({appConfig, alarm, handlers}) => {

    const [lightBrightnessProfile, setLightBrightnessProfile] = React.useState<'constant' | 'ramp'>(alarm.light.luminosity.profile)
    const [lightBrightnessMax, setLightBrightnessMax] = React.useState<number>(alarm.light.luminosity.end)
    const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(alarm.light.luminosity.end)
    const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([25, alarm.light.luminosity.end])

    React.useEffect(() => {
        setLightBrightnessConstant(lightBrightnessMax)
        setLightBrightnessRamp([lightBrightnessRamp[0], lightBrightnessMax])
    }, [lightBrightnessMax])

    React.useEffect(() => {
        alarm.light.luminosity.profile = lightBrightnessProfile
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [lightBrightnessProfile])

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
        // alarm.light.luminosity.start = values[0]
        // handlers.updateAlarmsMetadata(alarm.id, alarm)
    }

    const handleLightBrightnessRampChange = (event: Event, value: number | number[]) => {
        const values = value as number[]
        // setLightBrightnessRamp(values as number[])
        // setLightBrightnessMax(values[1] as number)
        alarm.light.luminosity.end = values[1]
        alarm.light.luminosity.start = values[0]
        handlers.updateAlarmsMetadata(alarm.id, alarm)
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
        <Box className='alarm-config-category-detail-field-contents-container'></Box>


        {/* <Box sx={containerStyling} > */}
        <ToggleButtonGroup
                                color="primary"
                                value={alarm.light.luminosity.profile}
                                exclusive
                                onChange={handleLightBrightnessProfileChange}
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
        </AlarmConfigCategoryDetailContainer>
        <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
        <AlarmConfigCategoryDetailHeader label={'Brightness'} />
        <Box className='alarm-config-category-detail-field-contents-container'>
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
                                    onChangeCapture={handleLightBrightnessRampChangeCommitted}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            )}

        </Box>
        </AlarmConfigCategoryDetailContainer>
        </>
        
    )



    
}

export default AlarmConfigCategoryDetailBodyBrightness