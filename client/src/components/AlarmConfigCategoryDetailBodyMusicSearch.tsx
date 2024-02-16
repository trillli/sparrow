import React from 'react'
import { Box, InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


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
        <TextField
                                variant='filled'
                                placeholder='Filter'
                                type='search'
                                size='small'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{<SearchIcon />}</InputAdornment>,
                                    disableUnderline: true,
                                    sx: {
                                        borderRadius: '4px',
                                        '& .MuiInputBase-input': {
                                            paddingTop: '4px'
                                        }
                                    }
                                }}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputLabel-root': {
                                        border: '2px solid blue',
                                        transform: 'none'
                                    }
                                }}
                            />

        <TextField variant='filled' helperText='Search Spotify' />

        <Box>
            <div>Result 1</div>
            <div>Result 2</div>
            <div>etc</div>
        </Box>


    </Box>



}

export default AlarmConfigCategoryDetailBodyMusicSearch