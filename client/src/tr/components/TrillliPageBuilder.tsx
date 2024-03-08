import { useAuth0 } from '@auth0/auth0-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import ITrillliConfig from '../types/ITrillliConfig'
import LoadingPage from './LoadingPage'
import TrillliConfig from './TrillliConfig'
import TrillliNavSide from './TrillliNavSide'
import TrillliNavToggler from './TrillliNavToggler'
import TrillliNavTop from './TrillliNavTop'


interface TrillliPageBuilderProps {
    appConfig: ITrillliConfig,
    navTop?: boolean
    navSide?: boolean
    styling?: { [key: string]: any }
    children: React.ReactNode
}

const TrillliPageBuilder: React.FC<TrillliPageBuilderProps> = ({ appConfig, navTop = false, navSide = false, children, styling }) => {


    //sv
    const [sideNavOpen, setSideNavOpen] = React.useState(false)
    const { isLoading } = useAuth0();
    let trillliConfig = new TrillliConfig();
    const widthSmBp = trillliConfig.theme.breakpoints.values['sm']
    const widthMdBp = trillliConfig.theme.breakpoints.values['md']
    const [sideNavMini, setSideNavMini] = React.useState(window.innerWidth < widthMdBp)
    const [isDisplayWidthXs, setIsDisplayWidthXs] = React.useState(window.innerWidth < widthSmBp)
    const [isDisplayWidthSm, setIsDisplayWidthSm] = React.useState(window.innerWidth >= widthSmBp && window.innerWidth < widthMdBp)

    //ef


    React.useEffect(() => {

        //Listen for window resize event; on window resize, track the display width classification and
        //the side nav full/mini state
        const handleWindowResize = () => {
            setIsDisplayWidthXs(window.innerWidth < widthSmBp)
            setIsDisplayWidthSm(window.innerWidth >= widthSmBp && window.innerWidth < widthMdBp)
            setSideNavMini(window.innerWidth < widthMdBp)
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }

    }, [])



    //ha

    //'SideNavShift' used here to refer to the transition between full-width and mini side nav menu
    const handleSideNavShift = () => {
        setSideNavMini((sideNavMiniState) => {
            return !sideNavMiniState
        })
    }

    //'SideNavToggle' used here to refer to the opening/closing of the side nav via the menu toggle button
    //Note that this is relevant only in the narrow screen (ie, mobile) mode, so the nav is actually
    //a top nav (a MUI Drawer with anchor = top) rather than a side nav; consider renaming to 
    //something like handleTopNavToggle
    const handleSideNavToggle = () => {
        setSideNavOpen((sideNavState) => {
            return !sideNavState
        })
    }
    if (!styling) {
        styling = {}
    }

    //other

    const topNavHeightPx = navTop ? 100 : 0
    const sideNavWidthPx = 240
    const sideNavCollapsedWidthPx = navSide ? 100 : 0

    //Define toggler if it is to be shown
    const showToggler = isDisplayWidthXs
    const togglerWidthPx = 50
    let sxToggler = {
        container: {
            position: 'fixed',
            right: 0,
            display: (navSide || navTop) ? 'flex' : 'none',
            height: topNavHeightPx,
            paddingRight: '6%',
            zIndex: trillliConfig.theme.zIndex.drawer + 2,
        },
        icon: {
            color: appConfig.theme.palette.primary.dark[4],
            '&>.MuiSvgIcon-root': {
                fontSize: '2.5rem'
            }
        }

    }
    let toggler = showToggler ? <TrillliNavToggler
        fnToggleHandler={handleSideNavToggle}
        sideNavOpen={sideNavOpen}
        styling={sxToggler}
    /> : <></>


    // ---------------------------------------------------------------------------------------------
    //Define top nav element & styling if it is to be shown
    let sxTopNav = {
        toolbarContainer: {
            paddingRight: showToggler ? `${togglerWidthPx}px` : '0px',
            zIndex: trillliConfig.theme.zIndex.drawer + 1,
            height: `${topNavHeightPx}px`,
            background: appConfig.theme.palette.neutral.dark[6]
        },
        toolbar: {
            justifyContent: 'space-between',
            height: '100%',
            paddingRight: { xs: '10%', sm: '2%', md: '6%', lg: '6%', xl: '6%' },
            paddingLeft: { xs: '4%', sm: '6%' }
        },
        itemList: {
            height: '100%',
            display: isDisplayWidthXs ? 'none' : 'flex',
            '& div.MuiTabs-flexContainer': {
                height: '100%',
            },
            '& span.MuiTabs-indicator': {
                height: '5px',
                borderRadius: '4px',
                background: appConfig.theme.palette.primary.dark[5],
                opacity: '.5'
            },
            '& MuiButtonBase-root-MuiTabScrollButton-root': {
                opacity: 1
            },
            '& div.MuiTabScrollButton-root': {
                height: 'fit-content',
                alignSelf: 'center',
                color: appConfig.theme.palette.tertiary.main,
            },
            '& div.MuiTabScrollButton-root svg.MuiSvgIcon-root': {
                background: appConfig.theme.palette.primary.main,
                borderRadius: '10%',
                fontSize: '1.75rem'
            }
        },
        item: {

        },
        itemButton: {
            rowGap: '.5rem'
        },
        itemIcon: {
            color: appConfig.theme.palette.secondary.dark[5],
            fontSize: '1.5rem'
        },
        itemText: {
            color: appConfig.theme.palette.primary.dark[1],
            fontFamily: appConfig.theme.typography.fontFamily,
            fontWeight: 'bold'
        }


    }
    let topNav = navTop ? <TrillliNavTop appConfig={appConfig} styling={sxTopNav} /> : <></>


    const sideNavTransitionMs = 500

    //Define side nav if it is to be shown
    let collapsed = sideNavMini && !isDisplayWidthXs
    let anchor: 'left' | 'top' = isDisplayWidthXs ? 'top' : 'left'
    let variant: 'temporary' | 'permanent' = isDisplayWidthXs ? 'temporary' : 'permanent'
    let sxSideNav = {
        wrapper: {
            transition: sideNavTransitionMs + 'ms',
            width: (collapsed || isDisplayWidthSm) ? `${sideNavCollapsedWidthPx}px` : `${sideNavWidthPx}px`,
            display: (navSide || isDisplayWidthXs) ? 'initial' : 'none',
            flexShrink: 0,
            zIndex: isDisplayWidthXs ? '0' : 'initial',
            '& .MuiDrawer-paper': {
                background: isDisplayWidthXs ? appConfig.theme.palette.primary.dark[8] : appConfig.theme.palette.neutral.dark[6],
                borderBottom: isDisplayWidthXs ? `4px solid ${appConfig.theme.palette.secondary.dark[4]}` : 'none',
                transition: sideNavTransitionMs + 'ms',
                boxSizing: 'border-box',
                width: (window.innerWidth < widthSmBp) ? 'fit-content' : (collapsed ? `${sideNavCollapsedWidthPx}px` : `${sideNavWidthPx}px`),
                overflow: 'visible',
                padding: isDisplayWidthXs ? '0px 25px' : '0px 20px',
                marginTop: (window.innerWidth < widthSmBp) ? `calc(${topNavHeightPx}px + 10px)` : `${topNavHeightPx}px`,
                marginLeft: isDisplayWidthXs ? 'auto' : '0px',
                marginRight: isDisplayWidthXs ? '6%' : '0px',
                borderRadius: isDisplayWidthXs ? '4px' : '0px',
                maxWidth: isDisplayWidthXs ? '80%' : 'none',
                boxShadow: (!collapsed && isDisplayWidthSm) ? '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12), 95px 0px 95px 25px #00000045, 10px 0px 25px #0000006b' : 'none',
                '& .MuiListItem-root': {
                    borderTop: '1px solid #ffffff14'
                },
                '& .MuiListItem-root:first-of-type': {
                    borderTop: 'none'
                }
            },
            '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
        },
        container: {
            transition: sideNavTransitionMs + 'ms',
            marginTop: isDisplayWidthXs ? '0px' : '15px'
        },
        handle: {
            container: {
                display: isDisplayWidthXs ? 'none' : 'initial',
                transition: sideNavTransitionMs + 'ms',
                position: 'absolute',
                top: '25px',
                borderRadius: '10%',
                right: collapsed ? '50%' : 0,
                transform: 'translate(50%, 0%)',
                zIndex: trillliConfig.theme.zIndex.drawer + 9999,
                '&:hover': {
                    background: appConfig.theme.palette.primary.dark[5],
                    transform: 'translate(50%, 0%) scale(1.1)'
                }
            },
            icon: {
                background: appConfig.theme.palette.neutral.dark[6],
                border: `2px solid ${appConfig.theme.palette.primary.dark[1]}`,
                color: appConfig.theme.palette.neutral.dark[6],
                fontSize: '3.5rem',
                borderRadius: '10%',
                padding: '1.125rem',
                width: '35px',
                height: '35px',
                transition: sideNavTransitionMs + 'ms',
                rotate: collapsed ? '0deg' : '180deg',
                '&:hover': {
                    color: appConfig.theme.palette.neutral.dark[0],
                    border: `3px solid ${appConfig.theme.palette.neutral.dark[0]}`,
                }
            }
        },
        list: {
            transition: sideNavTransitionMs + 'ms',
            marginTop: collapsed ? '50px' : '0px',
            padding: isDisplayWidthSm ? '0px' : 'initial',
            display: isDisplayWidthXs ? 'flex' : 'block',
            flexDirection: 'column',
            rowGap: isDisplayWidthXs ? '0rem' : '1rem'
        },
        item: {
        },
        itemButton: {
            transition: sideNavTransitionMs + 'ms',
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: isDisplayWidthXs ? '2rem' : '0px',
            paddingRight: isDisplayWidthXs ? '2rem' : '0px',
            paddingTop: collapsed ? '16px' : (isDisplayWidthXs ? '1rem' : '8px'),
            paddingBottom: collapsed ? '16px' : (isDisplayWidthXs ? '1rem' : '8px'),
        },
        itemIcon: {
            transition: sideNavTransitionMs + 'ms',
            paddingRight: collapsed ? '0px' : isDisplayWidthXs ? '1.125rem' : '10px',
            justifyContent: 'center',
            paddingLeft: '1px',
            minWidth: '0px',
            color: appConfig.theme.palette.secondary.dark[4],
            '& .MuiIcon-root': {
                transition: sideNavTransitionMs + 'ms',
                fontSize: isDisplayWidthXs ? '1.75rem' : '2rem',
            }

        },
        itemText: {
            textTransform: 'uppercase',
            transition: sideNavTransitionMs / 1.1 + 'ms',
            maxWidth: collapsed ? '0px' : '200px',
            color: appConfig.theme.palette.primary.dark[4],
            '& .MuiListItemText-primary': {
                transition: sideNavTransitionMs + 'ms',
                fontWeight: isDisplayWidthXs ? 'normal' : 'bold',
                fontSize: collapsed ? '0px' : isDisplayWidthXs ? '1.125rem' : 'initial',
                opacity: collapsed ? 0 : 1,
            }
        }
    }

    let sideNav = navSide ? (
        <TrillliNavSide appConfig={appConfig} anchor={anchor} collapsed={collapsed} isDisplayWidthSm={isDisplayWidthSm} isDisplayWidthXs={isDisplayWidthXs} variant={variant} open={sideNavOpen} styling={sxSideNav} fnToggleHandler={handleSideNavToggle} fnShiftHandler={handleSideNavShift} />
    ) : (
        <TrillliNavSide appConfig={appConfig} anchor={anchor} collapsed={collapsed} isDisplayWidthSm={isDisplayWidthSm} isDisplayWidthXs={isDisplayWidthXs} variant={variant} open={sideNavOpen} styling={sxSideNav} fnToggleHandler={handleSideNavToggle} fnShiftHandler={handleSideNavShift} />
    )


    //Define content
    let content = <Box component='main' id='main' sx={{ transition: `${sideNavTransitionMs}ms`, marginTop: `${topNavHeightPx}px`, minHeight: `calc(100vh - ${topNavHeightPx}px)`, width: isDisplayWidthXs ? '100%' : `calc(100% - ${sideNavCollapsedWidthPx}px)` }}>
        <Box
            id='main-contents'
            sx={{
                height: '100%',
                padding: '3rem 5%',
                ...(styling.mainContents || {}),
            }}>
            {children}
        </Box>
    </Box>

    //Assemble
    if (isLoading) {
        return (
            <ThemeProvider theme={appConfig.theme}>
                <CssBaseline />
                <LoadingPage appConfig={appConfig} />
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={appConfig.theme}>

                {/* NOTE
            
            This <style> import ensures Karla font is available if user has not linked it in their app's index.html; note that placing the following in the app's index.html is highly recommended as it will prefent the split-second flicker to and from Arial (or the browser's equivalent default font) when navigating between pages within the app:

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
            
            */}
                <style>@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');</style>

                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <CssBaseline />
                    {toggler}
                    {topNav}
                    {sideNav}
                    {content}
                </Box>
            </ThemeProvider>
        )
    }

}

export default TrillliPageBuilder