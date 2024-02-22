import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, Box, Typography } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodySoundVolumeProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodySoundVolume: React.FC<AlarmConfigCategoryDetailBodySoundVolumeProps> = ({ appConfig, alarm }) => {

    const [soundVolumeProfile, setSoundVolumeProfile] = React.useState<'constant' | 'ramp'>('constant') //sound group level
    const [soundVolumeMax, setSoundVolumeMax] = React.useState<number>(50) //sound group level
    const [soundVolumeConstant, setSoundVolumeConstant] = React.useState<number>(soundVolumeMax) //sound group level
    const [soundVolumeRamp, setSoundVolumeRamp] = React.useState<number[]>([0, soundVolumeMax]) //sound group level

    //Sound group level
    React.useEffect(() => {
        setSoundVolumeConstant(soundVolumeMax)
        setSoundVolumeRamp([soundVolumeRamp[0], soundVolumeMax])
    }, [soundVolumeMax])


    const handleSoundVolumeProfileChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        let value: string = target.value
        const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'
        setSoundVolumeProfile(valueTyped)
    }

    //sound vol group level
    const handleSoundVolumeConstantChange = (event: Event, value: number | number[]) => {
        setSoundVolumeMax(value as number)
    }

    //sound vol group level
    const handleSoundVolumeRampChange = (event: Event, value: number | number[]) => {
        const valueTyped = value as number[]
        setSoundVolumeRamp(valueTyped)
    }


    return (
        <>
            <Box className='alarm-config-category-detail-field-container'>
                <AlarmConfigCategoryDetailHeader label='Volume Profile' />
                <Box className='alarm-config-category-detail-field-contents-container'>
                    <ToggleButtonGroup
                        color="primary"
                        value={soundVolumeProfile}
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
            <AlarmConfigCategoryDetailHeader label='Volume' />
            {soundVolumeProfile == 'constant' ? (
                <TrSlider
                    value={soundVolumeConstant}
                    min={0}
                    max={100}
                    onChange={handleSoundVolumeConstantChange}
                />
            ) : (
                <TrSlider
                    value={soundVolumeRamp}
                    min={0}
                    max={100}
                    onChange={handleSoundVolumeRampChange}
                    disableSwap
                />
            )}
            </Box>
        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundVolume