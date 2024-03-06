import { Theme } from "@mui/material";
import ITrillliConfig from "../types/ITrillliConfig";
import TrillliLight from "../themes/TrillliLight"
import TrillliMenu from "../types/TrillliMenu";
import TrillliMenuItem from "../types/TrillliMenuItem";

class TrilllilConfig implements ITrillliConfig {

    readonly teststr: string = 'this is a teststr'

    //Define the app theme
    //Recommend to override in app config: yes
    readonly theme: Theme = TrillliLight

    //Define the default menu items
    //Recommend to override in app config: no, unless wanting to get rid of the default basic nav
    //items like 'account' 'log out' etc
    //
    private _itemAccount: TrillliMenuItem = {
        text: 'Account',
        link: '/profile',
        icon: 'manage_accounts',
        hideAuthed: false,
        hideUnauthed: true
    }
    private _itemLogIn: TrillliMenuItem = {
        text: 'Log In',
        link: '/abc/ghi',
        icon: 'login',
        hideAuthed: true,
        hideUnauthed: false,
        logIn: true
    }
    private _itemLogOut: TrillliMenuItem = {
        text: 'Log Out',
        link: '',
        icon: 'logout',
        hideAuthed: false,
        hideUnauthed: true,
        logOut: true
    }


    readonly menuBase: TrillliMenu = {
        // primary: [
        //     this._itemAccount,
        //     this._itemLogOut
        // ],
        // secondary: [],
        // tertiary: [],
        top: [
            this._itemAccount,
            this._itemLogIn,
            this._itemLogOut
        ],
        side: [],
        bottom: []
    }

    //Define menu items
    //Recommend to override: yes
    readonly menuApp : TrillliMenu = {
        // primary: [],
        // secondary: [],
        // tertiary: [],
        top: [],
        side: [],
        bottom: []
    }

    //Define logos
    //key: unique nickname for this logo; value: file name with extension
    //all logos should be in /logos of app
    //Recommend to override in app config: yes
    readonly logos: { [key: string]: string; } = {
        appMain: '/logos/trillli-light-frameless.png',      //Locations used: Nav
        loading: '/logos/trillli-light-frameless.png',
    }
    
}

export default TrilllilConfig