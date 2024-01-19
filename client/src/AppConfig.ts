import { Theme } from "@mui/material/styles"
import TrillliMenuItems from 'trillli_client/src/types/TrillliMenuItems'
import TrillliLight from "trillli_client/src/themes/TrillliLight"



class AppConfig {

    //Define the app's thenme
    private static _app_theme: Theme = TrillliLight

    //Define the app menu items
    private static _app_menu: TrillliMenuItems = {
        primary: [
            {
                text: 'App primary 1',
                link: '/abc/def',
                icon: 'ac_unit'
            },
        ],
        secondary: [
            {
                text: 'App secondary 1',
                link: '/abc/jkl',
                icon: 'ac_unit'
            }
        ],
        tertiary: [
            {
                text: 'App tertiary 1',
                link: '/abc/pqr',
                icon: 'ac_unit'
            },
            {
                text: 'App tertiary 2',
                link: '/abc/stu',
                icon: 'ac_unit'
            },
        ]
    }

    //Define the app menu override
    //If false, will append to the default Trillli menu items (with 'Profile', 'Log Out', etc)
    //If true, will fully replace the default Trillli menu items
    private static _app_menu_override: boolean = false

    //Define logos
    //key: unique nickname for this logo; value: file name with extension
    //all logos, should be in /src/assets/logos of this app
    private static _logos: {[key: string]: string} = {
        appDefault: 'logo-trillli.svg'      //Locations used: Nav
    }











    

    public static get app_theme(): Theme {
        return this._app_theme
    }

    public static get app_menu(): TrillliMenuItems {
        return this._app_menu
    }

    public static get app_menu_override(): boolean {
        return this._app_menu_override
    }

    public static get logos(): {[key: string]: string} {
        return this._logos
    }

    // public static get teststr(): string {
    //     return this._teststr
    // }
    // private static _teststr: string = 'hello im a test str'



    
  
  

    







}







const defaults = () => {

    const menuItems = {}
    const theme = {}



    return "hello this is a menu def"

}

export default AppConfig;