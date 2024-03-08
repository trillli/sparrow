import { useAuth0 } from '@auth0/auth0-react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ITrillliConfig from '../types/ITrillliConfig';
import TrillliMenu from '../types/TrillliMenu';
import useAuth0LogIn from './useAuth0LogIn';
import useAuth0LogOut from './useAuth0LogOut';


interface TrillliNavSideProps {
    appConfig: ITrillliConfig,
    anchor?: 'left' | 'top',
    collapsed: boolean,
    isDisplayWidthSm: boolean,
    isDisplayWidthXs: boolean,
    variant?: 'permanent' | 'temporary',
    open: boolean,
    styling: { [key: string]: any },
    fnToggleHandler: Function,
    fnShiftHandler: Function
}

const TrillliNavSide: React.FC<TrillliNavSideProps> = ({ appConfig, anchor, collapsed, isDisplayWidthSm, isDisplayWidthXs, variant, open, styling = {}, fnToggleHandler, fnShiftHandler }) => {

    //sv
    const { isAuthenticated, isLoading } = useAuth0();
    const { auth0LogIn } = useAuth0LogIn();
    const { auth0LogOut } = useAuth0LogOut();
    const sideNavRef = React.useRef(null);

    //ef
    React.useEffect(() => {
    }, [isLoading, isAuthenticated]);

    React.useEffect(() => {
        const handleOffClick = (event) => {
            let clickTarget = event.target
            if (isDisplayWidthSm && !collapsed && sideNavRef.current != null && !sideNavRef.current.contains(clickTarget)) {
                fnShiftHandler()
            }
        }

        document.addEventListener('click', handleOffClick)
        return () => {
            document.removeEventListener('click', handleOffClick)
        }

    })

    //ha

    //other
    const menuAll: TrillliMenu = {
        top: [...appConfig.menuApp.top, ...appConfig.menuBase.top],
        side: [...appConfig.menuBase.side, ...appConfig.menuApp.side],
        bottom: [...appConfig.menuBase.bottom, ...appConfig.menuApp.bottom]
    }

    let menuItemComponents: React.ReactNode[] = []

    if (!isLoading) {

        if (isDisplayWidthXs && menuAll.top.length > 0) {
            menuAll.top.forEach((item) => {

                let useItem = (isAuthenticated && !item.hideAuthed) || (!isAuthenticated && !item.hideUnauthed)

                if (useItem) {

                    const listItemButtonInner = <><ListItemIcon sx={styling['itemIcon']}><Icon>{item.icon}</Icon></ListItemIcon>
                        <ListItemText primary={item.text} sx={styling['itemText']} /></>

                    let listItemButton = <></>

                    if (item.logIn) {
                        listItemButton = <ListItemButton disableGutters onClick={auth0LogIn} sx={styling['itemButton']}>{listItemButtonInner}</ListItemButton>
                    } else if (item.logOut) {
                        listItemButton = <ListItemButton disableGutters onClick={auth0LogOut} sx={styling['itemButton']}>{listItemButtonInner}</ListItemButton>
                    } else {
                        listItemButton = <ListItemButton disableGutters component={Link} to={item.link} sx={styling['itemButton']}>{listItemButtonInner}</ListItemButton>
                    }

                    const listItem = <ListItem key={item.text} disablePadding sx={styling['item']}>{listItemButton}</ListItem>

                    menuItemComponents.push(listItem)

                }



            })
        }

        menuAll.side.forEach((item) => {

            let useItem = (isAuthenticated && !item.hideAuthed) || (!isAuthenticated && !item.hideUnauthed)

            if (useItem) {
                const menuItemComponment =
                    <ListItem key={item.text} disablePadding sx={styling['item']}>
                        <ListItemButton disableGutters component={Link} to={item.link} sx={styling['itemButton']}>
                            <ListItemIcon sx={styling['itemIcon']}><Icon>{item.icon}</Icon></ListItemIcon>
                            <ListItemText primary={item.text} sx={styling['itemText']} />
                        </ListItemButton>
                    </ListItem>

                menuItemComponents.push(menuItemComponment)

            }

        })
    }

    return (

        <Drawer id='nav-side-wrapper'
            open={open}
            onClose={fnToggleHandler}
            variant={variant}
            anchor={anchor}
            ModalProps={{
                keepMounted: true
            }}
            sx={styling['wrapper']}
            ref={sideNavRef}
        >
            <Box id='side-nav-handle'
                sx={styling['handle']['container']}
            >
                <IconButton
                    color='primary'
                    onClick={fnShiftHandler}
                    sx={styling['handle']['icon']}
                >
                    <ExpandLessIcon
                        sx={{
                            transition: '.2s',
                            rotate: '90deg'
                        }}
                    />
                </IconButton>
            </Box>
            <Box id='side-nav-container' sx={styling['container']}>
                <List id='side-nav-list' sx={styling['list']}>
                    {menuItemComponents}
                </List>
            </Box>
        </Drawer>

    )

}


export default TrillliNavSide