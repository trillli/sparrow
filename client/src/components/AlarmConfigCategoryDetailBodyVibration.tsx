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
}

const AlarmConfigCategoryDetailBodyVibration: React.FC<AlarmConfigCategoryDetailBodyVibrationProps> = ({ alarm, appConfig }) => {

    const [vibrationType, setVibrationType] = React.useState<'constant' | 'ramp'>('constant')
    const [vibrationEnd, setVibrationEnd] = React.useState<number>(75)
    const [vibrationConstant, setVibrationConstant] = React.useState<number>(vibrationEnd)
    const [vibrationRamp, setVibrationRamp] = React.useState<number[]>([0, vibrationEnd])

    React.useEffect(() => {
        setVibrationConstant(vibrationEnd)
        setVibrationRamp([vibrationRamp[0], vibrationEnd])
    }, [vibrationEnd])

    //vibration group level
    const handleVibrationTypeChange = (event: React.MouseEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: string = target.value
        setVibrationType(value)
    }

    //vibration group level
    const handleVibrationChangeConstant = (event: Event, value: number | number[]) => {
        setVibrationEnd(value as number)
    }

    //vibration group level
    const handleVibrationChangeRamp = (event: Event, value: number | number[]) => {
        const values = value as number[]
        setVibrationRamp(values as number[])
        setVibrationEnd(values[1] as number)
    }


    return (
        <>
            <Box className='alarm-config-category-detail-field-container'>
                <AlarmConfigCategoryDetailHeader label='Vibration Profile' />
                <Box className='alarm-config-category-detail-field-contents-container'>
                    <ToggleButtonGroup
                        color="primary"
                        value={vibrationType}
                        exclusive
                        onChange={handleVibrationTypeChange}
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
                                background: appConfig.theme.palette.shades.tertiary[4],
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
                {vibrationType == 'constant' ? (
                    <TrSlider
                        value={vibrationConstant}
                        min={0}
                        max={100}
                        onChange={handleVibrationChangeConstant}
                    />
                ) : (
                    <TrSlider
                        value={vibrationRamp}
                        min={0}
                        max={100}
                        onChange={handleVibrationChangeRamp}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                )}
            </Box>
        </>
    )




}

export default AlarmConfigCategoryDetailBodyVibration