import { Box } from '@mui/material'
import React from 'react'
import TrSliderColorPicker from 'src/tr/components/TrSliderColorPicker'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailContainer from './AlarmConfigCategoryDetailContainer'
import AlarmConfigCategoryDetailContents from './AlarmConfigCategoryDetailContents'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigCategoryDetailBodyLightColorProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    lightColor: number
    onColorSliderChange: Function
    onColorSliderChangeCommitted: Function
}

const AlarmConfigCategoryDetailBodyLightColor: React.FC<AlarmConfigCategoryDetailBodyLightColorProps> = ({ alarm, appConfig, lightColor, onColorSliderChange, onColorSliderChangeCommitted }) => {

    //sv

    //ef

    //ha

    //ohter

    return (
        <AlarmConfigCategoryDetailContainer appConfig={appConfig}>
            <AlarmConfigCategoryDetailHeader label={'Sunrise Light Color'} />
            <AlarmConfigCategoryDetailContents appConfig={appConfig}>
                <Box
                    sx={{
                        paddingTop: '.5rem'
                    }}
                >

                    <TrSliderColorPicker lightHue={alarm.light.color.h} onChange={onColorSliderChange} onChangeCommitted={onColorSliderChangeCommitted} />
                </Box>
            </AlarmConfigCategoryDetailContents>
        </AlarmConfigCategoryDetailContainer>
    )

}

export default AlarmConfigCategoryDetailBodyLightColor