import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, TextField, Box, Typography, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';

interface AlarmConfigCategoryDetailBodySoundSearchProps {
    stateControl: IAlarmConfigCategoryDetailStateControl
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodySoundSearch: React.FC<AlarmConfigCategoryDetailBodySoundSearchProps> = ({ appConfig, ...stateControl}) => {

    const showSongField = stateControl.vars.soundType == 'song' ? true : false
    const showPlaylistField = stateControl.vars.soundType == 'playlist' ? true : false
    const showArtistField = stateControl.vars.soundType == 'artist' ? true : false

    return (
        <>
            {/* <ToggleButtonGroup
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

            <TextField variant='filled' helperText='Search Spotify' /> */}
            <Box className='alarm-config-category-detail-field-container'>
            <TextField
                                variant='filled'
                                placeholder='Search for music on Spotify!'
                                type='search'
                                value={stateControl.vars.soundSearchValue}
                                multiline
                                onChange={stateControl.handlers.handleSoundSearchTyping}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{<SearchIcon />}</InputAdornment>,
                                    disableUnderline: true,
                                    sx: {
                                        borderRadius: '4px',
                                        padding: '.5rem .75rem',
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
                            <Box 
                                className='search-category-filters-container'
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    // width: '100%'
                                }}
                            >
                                <ToggleButtonGroup 
                                    className='search-category-filters'
                                    value={Array.from(stateControl.vars.soundType)}
                                    onChange={stateControl.handlers.handleSoundTypeChange}
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
                                    <ToggleButton value='song' className='alarm-day alarm-summary-day'>Song</ToggleButton>
                                    <ToggleButton value='artist' className='alarm-day alarm-summary-day'>Artist</ToggleButton>
                                    <ToggleButton value='playlist' className='alarm-day alarm-summary-day'>Playlist</ToggleButton>
                                    <ToggleButtonGroup
                                    className='soundCategoryNofilter'
                                    value={stateControl.vars.soundTypeNoFilter}
                                    onClick={stateControl.handlers.handleSoundTypeNoFilterChange}
                                    sx={{
                                        height: 'fit-content',
                                        '& .MuiButtonBase-root': {
                                            borderLeft: 'none',
                                            background: 'none',
                                            padding: '0px',
                                            width: '2.5rem',
                                            borderTopLeftRadius: '0px',
                                            borderBottomLeftRadius: '0px'
                                        },
                                    }}
                                >
                                    <ToggleButton 
                                        className='alarm-day alarm-summary-day'
                                        value={true} 
                                    >
                                        <FilterListOffIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                </ToggleButtonGroup>
                            </Box>
            </Box>

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

            {/* <Button 
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
            </Button> */}

        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundSearch