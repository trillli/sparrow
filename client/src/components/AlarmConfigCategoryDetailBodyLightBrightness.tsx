import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import TrSlider from 'trillli/src/components/TrSlider'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyLightBrightnessProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodyBrightness: React.FC<AlarmConfigCategoryDetailBodyLightBrightnessProps> = ({appConfig, alarm}) => {

    const [lightBrightnessType, setLightBrightnessType] = React.useState<'constant' | 'ramp'>('constant')
    const [lightBrightnessMax, setLightBrightnessMax] = React.useState<number>(75)
    const [lightBrightnessConstant, setLightBrightnessConstant] = React.useState<number>(lightBrightnessMax)
    const [lightBrightnessRamp, setLightBrightnessRamp] = React.useState<number[]>([25, lightBrightnessMax])

    React.useEffect(() => {
        setLightBrightnessConstant(lightBrightnessMax)
        setLightBrightnessRamp([lightBrightnessRamp[0], lightBrightnessMax])
    }, [lightBrightnessMax])

    const handleLightBrightnessTypeChange = (event: React.MouseEvent<HTMLElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        let value: string = target.value
        const valueTyped: 'constant' | 'ramp' = ((value == 'string' || value == 'ramp') ? value : 'constant') as 'constant' | 'ramp'
        setLightBrightnessType(valueTyped)
    }

    //light group level
    const handleLightBrightnessChangeConstant = (event: Event, value: number | number[]) => {
        setLightBrightnessMax(value as number)
    }

    //light group level
    const handleLightBrightnessChangeRamp = (event: Event, value: number | number[]) => {
        const values = value as number[]
        setLightBrightnessRamp(values as number[])
        setLightBrightnessMax(values[1] as number)
    }


    return (
        <>
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={'Brightness Profile'} />
        <Box className='alarm-config-category-detail-field-contents-container'></Box>


        {/* <Box sx={containerStyling} > */}
        <ToggleButtonGroup
                                color="primary"
                                value={lightBrightnessType}
                                exclusive
                                onChange={handleLightBrightnessTypeChange}
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
        <Box className='alarm-config-category-detail-field-container'>
        <AlarmConfigCategoryDetailHeader label={'Brightness'} />
        <Box className='alarm-config-category-detail-field-contents-container'>
        {lightBrightnessType == 'constant' ? (
                                <TrSlider
                                    value={lightBrightnessConstant}
                                    min={0}
                                    max={100}
                                    onChange={handleLightBrightnessChangeConstant}
                                />
                            ) : (
                                <TrSlider
                                    value={lightBrightnessRamp}
                                    min={0}
                                    max={100}
                                    onChange={handleLightBrightnessChangeRamp}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            )}

        </Box>
        </Box>
        </>
        
    )



    
}

export default AlarmConfigCategoryDetailBodyBrightness