import { Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'

const AlarmConfigCategoryDetailBodyMusicSearch: React.FC = () => {

    <Box>


        <ToggleButtonGroup
            color="primary"
            value={'song'}
            exclusive
            // onChange={eventHandlers.handleLightBrightnessTypeChange}
            aria-label="Platform"
        >
            <ToggleButton value="song">Song</ToggleButton>
            <ToggleButton value="playlist">Playlist</ToggleButton>
            <ToggleButton value="album">Album</ToggleButton>
        </ToggleButtonGroup>

        <TextField variant='filled' helperText='Search Spotify' />

        <Box>
            <div>Result 1</div>
            <div>Result 2</div>
            <div>etc</div>
        </Box>


    </Box>



}

export default AlarmConfigCategoryDetailBodyMusicSearch