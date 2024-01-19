import * as React from 'react';
import AppConfig from '../AppConfig';

const AppSplash = () => {

    console.log("loading splash screen")
    // const appConfig = AppConfig();
    // console.log(AppConfig.app_menu)
    console.log(AppConfig.app_theme)

    return (
        <div>This is the splash screen</div>
    )
}

export default AppSplash