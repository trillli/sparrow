import * as React from 'react';
import AppConfig from '../AppConfig';
import PageBuilder from 'trillli/components/PageBuilder'

const AppSplash = () => {

    console.log("loading splash screen")
    let config = new AppConfig()
    // const appConfig = AppConfig();
    console.log(config)
    // console.log(config._app_theme)
    // console.log(AppConfig.app_theme)

    return (
        <PageBuilder header sidebar menuItems={config._app_menu} >
            <div>This is the splash screen</div>
        </PageBuilder>
        
    )
}

export default AppSplash