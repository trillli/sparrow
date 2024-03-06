import React from 'react'
import { AppBar, Box, Tab, Tabs, createTheme } from '@mui/material'
import { Icon} from '@mui/material'
import ITrillliConfig from '../types/ITrillliConfig'
import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import TrillliMenu from '../types/TrillliMenu'
import Typography from '@mui/material/Typography'
import { useAuth0 } from '@auth0/auth0-react'
import useAuth0LogIn from './useAuth0LogIn'
import useAuth0LogOut from './useAuth0LogOut'

interface TrillliNavTopProps {
    appConfig: ITrillliConfig,
    styling: {[key:string]: any}
}

const TrillliNavTop: React.FC<TrillliNavTopProps> = ({appConfig, styling}) => {

    const { isAuthenticated, isLoading } = useAuth0();
    const { auth0LogIn } = useAuth0LogIn();
    const { auth0LogOut } = useAuth0LogOut();
    const [value, setValue] = React.useState(false);

    


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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // setValue(newValue);
        // event.type can be equal to focus with selectionFollowsFocus.
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



    const menuAll: TrillliMenu = {
        top: [...appConfig.menuApp.top, ...appConfig.menuBase.top],
        side: [...appConfig.menuBase.side, ...appConfig.menuApp.side],
        bottom: [...appConfig.menuBase.bottom, ...appConfig.menuApp.bottom]
    }

    let menuItemComponents: React.ReactNode[] = []
    let tabValue:number = 0
    let activeValue:number, boolean = false

    menuAll.top.forEach((item) => {

        let useItem =  !isLoading && ((isAuthenticated && !item.hideAuthed) || (!isAuthenticated && !item.hideUnauthed))


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

        // menuItemComponents.push(<Tab key={item.text} label={0} />)
        tabValue++

    }

    })
    
    return (
        <AppBar component='nav' sx={styling['toolbarContainer']} position='fixed'>
            <Toolbar sx={styling['toolbar']}>
                <Box
                    sx={{
                        padding: '.375rem',
                        paddingLeft: '0rem',
                        width: '100%',
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
                {/* <p style={{color: 'black'}}>{appConfig.teststr}</p> */}
                <Tabs onChange={handleChange} value={activeValue} indicatorColor='null' variant='scrollable' scrollButtons='auto' aria-label='top navigation bar menu items' sx={styling['itemList']}>
                    {menuItemComponents}
                </Tabs>
            </Toolbar>
        </AppBar>
    )

}

export default TrillliNavTop