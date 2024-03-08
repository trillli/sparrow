import ClearIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

interface TrillliNavTogglerProps {
    fnToggleHandler: Function,
    sideNavOpen: boolean,
    styling: object
}

const TrillliNavToggler: React.FC<TrillliNavTogglerProps> = ({ fnToggleHandler, sideNavOpen, styling }) => {

    //sv

    //ef

    //ha

    //other

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