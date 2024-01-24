import * as React from 'react';
// import AppConfig from '../AppConfig';
import PageBuilder from 'trillli/src/components/PageBuilder'
import TrillliConfig from "trillli/src/types/TrillliConfig"
// import App from 'src/App';

interface AppSplashProps {
    app_config: TrillliConfig
}

const AppSplash: React.FC<AppSplashProps> = ({app_config}) => {

    console.log("splish splash")
    console.log(app_config)



    // console.log(app_config)

    // console.log(app_config)

    // console.log('TOP OF APPSPLASH')
    // console.log(AppConfig)
    // console.log(new AppConfig()._teststr)

    // class MyClass {
    //     static staticField1: string = "Static Field 1";
    //     static staticField2: number = 42;
    //     static staticField3: boolean = true;

    //     static getAllStaticFields(): Record<string, any> {
    //         const staticFields: Record<string, any> = {};

    //         for (const [key, value] of Object.entries(this)) {
    //             if (typeof value !== 'function' && !key.startsWith('__')) {
    //                 staticFields[key] = value;
    //             }
    //         }

    //         return staticFields;
    //     }
    // }

    // // Example usage
    // const allStaticFields = MyClass.getAllStaticFields();
    // console.log(allStaticFields);
    // console.log("?????")

    // class ChildClass extends MyClass {
    //     static staticField2: number = 99;
    // }

    // const childStaticFields = ChildClass.getAllStaticFields();
    // console.log(childStaticFields);
    // console.log("!!!!")

    //     // console.log("loading splash screen")
    //     // // let config = new AppConfig()
    //     // // console.log(config.getTest())
    //     console.log(AppConfig)
    // console.log(AppConfig.getTest())
    // // console.log("just logged config")
    return (
        <div>hello world</div>
    )

    return (
        <PageBuilder header sidebar menuItems={config._base_menu} >
            <div>This is the splash screen</div>
        </PageBuilder>

    )
}

export default AppSplash