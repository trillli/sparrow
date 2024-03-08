import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'

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