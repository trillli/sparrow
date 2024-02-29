import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl from './types/IAlarmConfigCategoryDetailStateControl'
import { ToggleButtonGroup, ToggleButton, Slider, TextField, Box, Typography, Button, InputAdornment, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import ITrillliConfig from 'trillli/src/types/ITrillliConfig';
import { IAlarmMetadata } from './types/IAlarmMetadata';
import { useAuth0 } from '@auth0/auth0-react';
import { TrFetchConfig, TrFetchResult, trFetch } from 'trillli/src/components/TrApiClient';
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader';
import { Shuffle, ShuffleOn } from '@mui/icons-material';

interface AlarmConfigCategoryDetailBodySoundSearchProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
}

const AlarmConfigCategoryDetailBodySoundSearch: React.FC<AlarmConfigCategoryDetailBodySoundSearchProps> = ({ alarm, appConfig, handlers }) => {

    type SoundType = 'track' | 'album' | 'artist' | 'playlist'
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [soundSearchValue, setSoundSearchValue] = React.useState<string>('')
    const [soundSearchResults, setSoundSearchResults] = React.useState({
        tracks: [],
        albums: [],
        artists: [],
        playlists: []
    })
    const [soundType, setSoundType] = React.useState<SoundType[]>([])
    const [soundTypeNoFilter, setSoundTypeNoFilter] = React.useState<boolean>(true)
    const [currentSoundTitle, setCurrentSoundTitle] = React.useState<string>(alarm.sound.title)
    const [currentSoundArtist, setCurrentSoundArtist] = React.useState<string>(alarm.sound.artist)
    const [currentSoundUri, setCurrentSoundUri] = React.useState<string>(alarm.sound.uri)
    const [currentSoundType, setCurrentSoundType] = React.useState<SoundType>(alarm.sound.type)
    const [currentSoundShuffle, setCurrentSoundShuffle] = React.useState<boolean>(alarm.sound.shuffle)

    React.useEffect(() => {
        if (soundTypeNoFilter) {
            setSoundType([])
        }
    }, [soundTypeNoFilter])

    React.useEffect(() => {
        if (soundType.length == 0) {
            setSoundTypeNoFilter(true)
        } else {
            setSoundTypeNoFilter(false)
        }
    }, [soundType])

    React.useEffect(() => {
        alarm.sound.title = currentSoundTitle
        alarm.sound.artist = currentSoundArtist
        alarm.sound.type = currentSoundType
        alarm.sound.uri = currentSoundUri
        alarm.sound.shuffle = currentSoundShuffle
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [currentSoundTitle, currentSoundArtist, currentSoundUri, currentSoundType, currentSoundShuffle])

    function executeSearchRequest() {

        if (soundSearchValue == undefined || soundSearchValue == '') {
            setSoundSearchResults({
                tracks: [],
                albums: [],
                artists: [],
                playlists: []
            })
            return;
        }

        const searchParams = {
            queryString: soundSearchValue,
            queryTypes: soundType
        }

        const getSoundSearchResults = async () => {
            const accessToken = await getAccessTokenSilently();
            const requestConfig: TrFetchConfig = {
                accessToken: accessToken,
                method: 'POST',
                path: "/sound/search",
                payload: JSON.stringify(searchParams)
            }
            const result: TrFetchResult = await trFetch(requestConfig);

            const spotifySearchResults = result.ok?.data
            const songs: any[] = spotifySearchResults.tracks?.items || []
            const albums: any[] = spotifySearchResults.albums?.items || []
            const artists: any[] = spotifySearchResults.artists?.items || []
            const playlists: any[] = spotifySearchResults.playlists?.items || []

            let soundSearchResultsFormatted = {
                tracks: [] as any[],
                albums: [] as any[],
                artists: [] as any[],
                playlists: [] as any[]
            }

            songs.forEach((song) => {
                const songName: string = song.name
                const songAlbum: string = song.album.name
                const songArtists: any[] = song.artists
                let songArtistNames: string[] = []
                songArtists.forEach((songArtist) => {
                    songArtistNames.push(songArtist.name)
                })
                const songPreviewUrl: string = song.preview_url
                soundSearchResultsFormatted.tracks.push({
                    type: 'track',
                    title: songName,
                    album: songAlbum,
                    artist: songArtistNames,
                    previewUrl: songPreviewUrl
                })
            })

            albums.forEach((album) => {
                const albumName: string = album.name
                const albumArtists: any[] = album.artists
                let albumArtistNames: string[] = []
                albumArtists.forEach((albumArtist) => {
                    albumArtistNames.push(albumArtist.name)
                })
                soundSearchResultsFormatted.albums.push({
                    type: 'album',
                    title: albumName,
                    artist: albumArtistNames
                })
            })

            artists.forEach((artist) => {
                const artistName: string = artist.name
                soundSearchResultsFormatted.artists.push({
                    type: 'artist',
                    title: '',
                    artist: artistName
                })
            })

            playlists.forEach((playlist) => {
                const playlistName: string = playlist.name
                const playlistAuthor: string = playlist.owner.display_name
                soundSearchResultsFormatted.playlists.push({
                    type: 'playlist',
                    title: playlistName,
                    artist: playlistAuthor
                })
            })

            setSoundSearchResults(soundSearchResultsFormatted)

        }

        getSoundSearchResults()
    }

    React.useEffect(() => {
        executeSearchRequest()
    }, [soundSearchValue, soundType])

    const handleShuffleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setCurrentSoundShuffle(!currentSoundShuffle)
    }

    const handleSoundSearchTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoundSearchValue(event.target.value)
    }

    const handleSoundTypeChange = (event: React.MouseEvent<HTMLElement>, value) => {
        setSoundType(value)
    }

    const handleSoundTypeNoFilterChange = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        if (!soundTypeNoFilter) {
            setSoundTypeNoFilter(true)
        }
    }

    const handleSearchResultSelection = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget
        const selectionData = (JSON.parse(target.getAttribute('selection')))
        const selectedRows: any[] = document.querySelectorAll('.MuiTableRow-root.Mui-selected')
        console.log(selectedRows)
        selectedRows.forEach((selectedRow) => {
            console.log('a row was selected')
            selectedRow.classList.remove('Mui-selected')
        })
        target.classList.add('Mui-selected')
        setCurrentSoundTitle(selectionData.title)
        setCurrentSoundArtist(selectionData.artist)
        setCurrentSoundType(selectionData.type)
    }

    // function getCurrentSoundSelection() {

    // }

    return (
        <>
            <Box className='alarm-config-category-detail-field-container'>
                <Box
                    className='music-selection'
                >
                    <AlarmConfigCategoryDetailHeader label='Music Selection' appConfig={appConfig} />
                    <Box
                        className='current-music-selection'
                    >
                        {currentSoundType == 'track' ? (
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
                                    {currentSoundTitle}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: '1.0'
                                    }}
                                >
                                    {currentSoundArtist}
                                </Typography>
                            </Box>
                        ) : currentSoundType == 'artist' ? (
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
                                    {currentSoundArtist}
                                </Typography>
                                <Box>
                                    <IconButton onClick={handleShuffleToggle}>
                                        {currentSoundShuffle ? (
                                            <ShuffleOn />
                                        ) : (
                                            <Shuffle />
                                        )}
                                    </IconButton>

                                    {currentSoundShuffle ? (
                                        <Typography
                                            sx={{
                                                fontStyle: 'italic'
                                            }}
                                        >Shuffle on</Typography>
                                    ) : <></>}

                                </Box>
                            </Box>
                        ) : currentSoundType == 'album' ? (
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
                                    {currentSoundTitle}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: '1.0'
                                    }}
                                >
                                    {currentSoundArtist}
                                </Typography>
                                <Box>
                                    <IconButton onClick={handleShuffleToggle}>
                                        {currentSoundShuffle ? (
                                            <ShuffleOn />
                                        ) : (
                                            <Shuffle />
                                        )}
                                    </IconButton>

                                    {currentSoundShuffle ? (
                                        <Typography
                                            sx={{
                                                fontStyle: 'italic'
                                            }}
                                        >Shuffle on</Typography>
                                    ) : <></>}

                                </Box>
                            </Box>
                        ) : currentSoundType == 'playlist' ? (
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
                                    {currentSoundTitle}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: '1.0'
                                    }}
                                >
                                    {currentSoundArtist}
                                </Typography>
                                <Box>
                                    <IconButton onClick={handleShuffleToggle}>
                                        {currentSoundShuffle ? (
                                            <ShuffleOn />
                                        ) : (
                                            <Shuffle />
                                        )}
                                    </IconButton>

                                    {currentSoundShuffle ? (
                                        <Typography
                                            sx={{
                                                fontStyle: 'italic'
                                            }}
                                        >Shuffle on</Typography>
                                    ) : <></>}

                                </Box>
                            </Box>

                        ) : <></>}
                    </Box>
                </Box>
                <TextField
                    variant='filled'
                    placeholder='Search for music on Spotify!'
                    type='search'
                    value={soundSearchValue}
                    multiline
                    onChange={handleSoundSearchTyping}
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
                        value={soundType}
                        onChange={handleSoundTypeChange}
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
                                background: appConfig.theme.palette.primary.dark[1],
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
                            value={soundTypeNoFilter}
                            onClick={handleSoundTypeNoFilterChange}
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
                    </AccordionSummary>
                    <AccordionDetails >

                        <Box>
                            {soundType.includes('track') || soundTypeNoFilter ? (
                                <Accordion>
                                    <AccordionSummary >
                                        Songs
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <TableContainer >
                                            <Table
                                                size='small'
                                            >
                                                <TableBody>
                                                    {soundSearchResults.tracks.map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            hover
                                                            selection={JSON.stringify(row)}
                                                            onClick={handleSearchResultSelection}
                                                        >
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
                                                                        {row.title}
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
                            ) : (<></>)}
                            {soundType.includes('artist') || soundTypeNoFilter ? (
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
                                                    {soundSearchResults.artists.map((row, index) => (
                                                        <TableRow key={index}
                                                            hover
                                                            selection={JSON.stringify(row)}
                                                            onClick={handleSearchResultSelection}
                                                        >
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
                            ) : (<></>)}
                            {soundType.includes('album') || soundTypeNoFilter ? (
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
                                                    {soundSearchResults.albums.map((row, index) => (
                                                        <TableRow key={index}
                                                            hover
                                                            selection={JSON.stringify(row)}
                                                            onClick={handleSearchResultSelection}
                                                        >
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
                                                                        {row.title}
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
                            ) : (<></>)}
                            {soundType.includes('playlist') || soundTypeNoFilter ? (
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
                                                    {soundSearchResults.playlists.map((row, index) => (
                                                        <TableRow key={index}
                                                            hover
                                                            selection={JSON.stringify(row)}
                                                            onClick={handleSearchResultSelection}
                                                        >
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
                                                                        {row.title}
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
                            ) : (<></>)}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    )




}

export default AlarmConfigCategoryDetailBodySoundSearch