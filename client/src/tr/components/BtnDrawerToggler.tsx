import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import React from 'react';



const BtnDrawerToggler = ({handlerDrawerToggle, drawerOpen = false}) => {
    
    let ariaLabel = 'open sidebar navigation menu'
    let sxIcon = {
        mr: 2,
        display: {
            sm: 'none'
        },
        position: 'absolute',
        right: '0',
        zIndex: '99999999'
    }

    let icon = <ClearIcon />
    if (!drawerOpen) {
        ariaLabel = 'close sidebar navigation menu'
        sxIcon['position'] = 'absolute',
        icon = <MenuIcon />
    }

    return (
        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handlerDrawerToggle}
                        sx={{...sxIcon}}
                    >
                        {/* <MenuIcon />
                        <ClearIcon /> */}
                        {icon}
                    </IconButton>
    )
}

export default BtnDrawerToggler;