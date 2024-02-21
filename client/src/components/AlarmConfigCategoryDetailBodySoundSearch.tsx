import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, TextField, Box, Typography, Button, InputAdornment, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';

interface AlarmConfigCategoryDetailBodySoundSearchProps {
    stateControl: IAlarmConfigCategoryDetailStateControl
    appConfig: ITrillliConfig
}

const AlarmConfigCategoryDetailBodySoundSearch: React.FC<AlarmConfigCategoryDetailBodySoundSearchProps> = ({ appConfig, ...stateControl}) => {

    console.log('in search component. sound type:')
    console.log(stateControl.vars.soundType)
    console.log(Array.from(stateControl.vars.soundType))

    const soundSearchResultsFormatted = {
        songs: [
            {
                name: 'Inner Cell',
                album: 'Polygondawanaland',
                artist: 'KGLW'
            },
            {
                name: 'Loyalty',
                album: 'Polygondawanaland',
                artist: 'KGLW'
            },
            {
                name: 'Horology',
                album: 'Polygondawanaland',
                artist: 'KGLW'
            },
        ],
        artists: [
            {
                name: 'KGLW'
            },
            {
                name: 'Bruce Springsteen'
            },
            {
                name: 'LCD Soundsystem'
            }
        ],
        albums: [
            {
                name: 'Polygondawanaland',
                artist: 'KGLW'
            },
            {
                name: 'Float Along Fill Your Lungs',
                artist: 'KGLW'
            },
            {
                name: 'Eyes Like the Sky',
                artist: 'KGLW'
            },
        ],
        playlists: [
            {
                name: 'Chill Mix',
                author: 'Dave Thomas'
            },
            {
                name: 'Study Playlist',
                author: 'Mary Shelley'
            },
            {
                name: 'Super Hype Tunes',
                author: 'Travis Pastrana'
            }
        ]
    }

    return (
        <>
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
                                    value={stateControl.vars.soundType}
                                    // value={['track', 'artist']}
                                    // exclusive={false}
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
                                    <ToggleButton value='track' className='alarm-day alarm-summary-day'>Song</ToggleButton>
                                    <ToggleButton value='artist' className='alarm-day alarm-summary-day'>Artist</ToggleButton>
                                    <ToggleButton value='album' className='alarm-day alarm-summary-day'>Album</ToggleButton>
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
                <Accordion >
                    <AccordionSummary >
                        Search Results
                        <Button size='small' variant='contained'><Typography>stateControl.vars.soundSearchResultsExpandAll</Typography></Button>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Box>
                            <Accordion >
                                <AccordionSummary >
                                    Songs
                                </AccordionSummary>
                                <AccordionDetails >
                                    <TableContainer >
                                        <Table
                                            size='small'
                                        >
                                            <TableBody>
                                                {soundSearchResultsFormatted.songs.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component='th' scope='row'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    columnGap: '1rem',
                                                                    rowGap: '.5rem',
                                                                    alignItems: 'flex-end'
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.name}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '1rem',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.artist}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary >
                                    Artists
                                </AccordionSummary>
                                <AccordionDetails >
                                    <TableContainer >
                                        <Table
                                            size='small'
                                        >
                                            <TableBody>
                                                {soundSearchResultsFormatted.artists.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component='th' scope='row'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    columnGap: '1rem',
                                                                    rowGap: '.5rem',
                                                                    alignItems: 'flex-end'
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.name}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary >
                                    Albums
                                </AccordionSummary>
                                <AccordionDetails >
                                    <TableContainer >
                                        <Table
                                            size='small'
                                        >
                                            <TableBody>
                                                {soundSearchResultsFormatted.albums.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component='th' scope='row'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    columnGap: '1rem',
                                                                    rowGap: '.5rem',
                                                                    alignItems: 'flex-end'
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.name}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '1rem',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.artist}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary >
                                    Playlists
                                </AccordionSummary>
                                <AccordionDetails >
                                    <TableContainer >
                                        <Table
                                            size='small'
                                        >
                                            <TableBody>
                                                {soundSearchResultsFormatted.playlists.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component='th' scope='row'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    columnGap: '1rem',
                                                                    rowGap: '.5rem',
                                                                    alignItems: 'flex-end'
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.name}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '1rem',
                                                                        lineHeight: '1.0'
                                                                    }}
                                                                >
                                                                    {row.author}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        
                    </AccordionDetails>
                </Accordion>
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
        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundSearch