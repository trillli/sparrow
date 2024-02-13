import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider } from '@mui/material'

const AlarmConfigCategoryDetailSoundSource: React.FC<IAlarmConfigCategoryDetailStateControl> = ({...stateControl}) => {



    return (
        <>
        <ToggleButtonGroup
                                color="primary"
                                value={stateControl.vars.soundSource}
                                exclusive
                                onChange={stateControl.handlers.handleSoundSourceChange}
                            >
                                <ToggleButton value="spotify" disabled={true}>Spotify</ToggleButton>
                            </ToggleButtonGroup>
        </>
    )



    
}

export default AlarmConfigCategoryDetailSoundSource