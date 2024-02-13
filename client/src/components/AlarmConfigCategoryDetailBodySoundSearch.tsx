import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, TextField, Box, Typography, Button } from '@mui/material'

const AlarmConfigCategoryDetailBodySoundSearch: React.FC<IAlarmConfigCategoryDetailStateControl> = ({ ...stateControl }) => {

    const showSongField = stateControl.vars.soundType == 'song' ? true : false
    const showPlaylistField = stateControl.vars.soundType == 'playlist' ? true : false
    const showArtistField = stateControl.vars.soundType == 'artist' ? true : false

    console.log('vars:')
    console.log(stateControl.vars)
    // stateControl.vars.soundSong = ''

    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={stateControl.vars.soundType}
                exclusive
                onChange={stateControl.handlers.handleSoundTypeChange}
            >
                <ToggleButton value="song">Song</ToggleButton>
                <ToggleButton value="playlist">Playlist</ToggleButton>
                <ToggleButton value="artist">Artist</ToggleButton>
            </ToggleButtonGroup>

            {showSongField ? (
                <TextField
                    label='Song Title'
                    defaultValue={stateControl.vars.soundSong}
                    name='song'
                    variant='filled'
                    onChange={stateControl.handlers.handleSoundSongChange}
                />
            ) : (<></>)}

            {showPlaylistField ? (
                <TextField
                    label='Playlist Name'
                    value={stateControl.vars.soundPlaylist}
                    name='playlist'
                    variant='filled'
                    onChange={stateControl.handlers.handleSoundPlaylistChange}
                />
            ) : (<></>)}

            {showArtistField ? (
                <TextField
                    label='Artist Name'
                    value={stateControl.vars.soundArtist}
                    name='artist'
                    variant='filled'
                    onChange={stateControl.handlers.handleSoundArtistChange}
                />
            ) : (<></>)}

            <Box className='sound-search-results-outer'>
                <Typography>
                    Search Results
                </Typography>
                <Box className='sound-search-results-list'>
                    {/* https://mui.com/material-ui/react-table/ */}
                    <Typography>Result 1</Typography>
                    <Typography>Result 2</Typography>
                    <Typography>Result 3</Typography>
                    <Typography>Result 4</Typography>
                    <Typography>Result 5</Typography>
                </Box>
            </Box>

            <Button 
                variant='contained'
                sx={{
                    flexDirection: 'column'
                }}
            >
                <Box>
                    <Typography>Confirm Alarm Sound:</Typography>
                </Box>
                <Box>
                    <Typography>value from selection here</Typography>
                </Box>
            </Button>

        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundSearch