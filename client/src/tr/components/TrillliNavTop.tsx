import { useAuth0 } from '@auth0/auth0-react'
import { AppBar, Box, Icon, Tab, Tabs } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import ITrillliConfig from '../types/ITrillliConfig'
import TrillliMenu from '../types/TrillliMenu'
import useAuth0LogIn from './useAuth0LogIn'
import useAuth0LogOut from './useAuth0LogOut'

interface TrillliNavTopProps {
    appConfig: ITrillliConfig,
    styling: { [key: string]: any }
}

const TrillliNavTop: React.FC<TrillliNavTopProps> = ({ appConfig, styling }) => {

    // State Variables & Related ------------------------------------------------------------------ //
    const { isAuthenticated, isLoading } = useAuth0();
    const { auth0LogIn } = useAuth0LogIn();
    const { auth0LogOut } = useAuth0LogOut();
    const [value, setValue] = React.useState(false);

    // Effects & Related -------------------------------------------------------------------------- //


    // Event Handlers & Related ------------------------------------------------------------------- //
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setValue(newValue);
        }
    };


    // Other vars, util functions, etc ------------------------------------------------------------ //

    function samePageLinkNavigation(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        if (
            event.defaultPrevented ||
            event.button !== 0 || // ignore everything but left-click
            event.metaKey ||
            event.ctrlKey ||
            event.altKey ||
            event.shiftKey
        ) {
            return false;
        }
        return true;
    }

    const menuAll: TrillliMenu = {
        top: [...appConfig.menuApp.top, ...appConfig.menuBase.top],
        side: [...appConfig.menuBase.side, ...appConfig.menuApp.side],
        bottom: [...appConfig.menuBase.bottom, ...appConfig.menuApp.bottom]
    }

    let menuItemComponents: React.ReactNode[] = []
    let tabValue: number = 0
    let activeValue: number, boolean = false

    menuAll.top.forEach((item) => {

        let useItem = !isLoading && ((isAuthenticated && !item.hideAuthed) || (!isAuthenticated && !item.hideUnauthed))


        if (useItem) {

            if (item.link == window.location.pathname) {
                activeValue = tabValue
            }


            const menuItemComponment =
                <>
                    <Icon sx={styling['itemIcon']}>{item.icon}</Icon>
                    <Typography sx={styling['itemText']}>{item.text}</Typography>
                </>


            let tab = <Tab key={item.text} label={menuItemComponment} />

            if (item.logIn) {
                tab = <Tab sx={styling['itemButton']} key={item.text} onClick={auth0LogIn} label={menuItemComponment} />
            } else if (item.logOut) {
                tab = <Tab sx={styling['itemButton']} key={item.text} onClick={auth0LogOut} label={menuItemComponment} />
            } else {
                tab = <Tab sx={styling['itemButton']} key={item.text} component={Link} to={item.link} label={menuItemComponment} />
            }

            menuItemComponents.push(tab)
            tabValue++

        }

    })

    return (
        <AppBar component='nav' sx={styling['toolbarContainer']} position='fixed'>
            <Toolbar sx={styling['toolbar']}>
                <Box
                    component={Link}
                    to='/'
                    sx={{
                        padding: '.375rem',
                        paddingLeft: '0rem',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <img src={appConfig.logos.appMain}
                        style={{
                            height: 'auto',
                            width: 'auto',
                            maxHeight: '100%',
                            maxWidth: '100%'
                        }}
                    />
                </Box>
                <Tabs onChange={handleChange} value={activeValue} indicatorColor='null' variant='scrollable' scrollButtons='auto' aria-label='top navigation bar menu items' sx={styling['itemList']}>
                    {menuItemComponents}
                </Tabs>
            </Toolbar>
        </AppBar>
    )

}

export default TrillliNavTop