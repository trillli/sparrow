import React from 'react'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface TrillliNavTogglerProps {
    fnToggleHandler: Function,
    sideNavOpen: boolean,
    styling: object
}

const TrillliNavToggler: React.FC<TrillliNavTogglerProps> = ({fnToggleHandler, sideNavOpen, styling}) => {

    //Define icon to use (based on whether the side nav menu is open or not)
    let togglerIcon = (sideNavOpen) ? <ClearIcon /> : <MenuIcon />

    return (
        <Box id='nav-toggle-container' sx={styling['container']}>
            <IconButton sx={styling['icon']} onClick={fnToggleHandler} >
                {togglerIcon}
            </IconButton>
        </Box>
    )

}

export default TrillliNavToggler