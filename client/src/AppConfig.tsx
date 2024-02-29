import React from 'react'
import ITrillliConfig from "trillli/src/types/ITrillliConfig"
import TrillliConfig from "trillli/src/components/TrillliConfig"
import TrillliMenu from "trillli/src/types/TrillliMenu"
import TrillliMenuItem from "trillli/src/types/TrillliMenuItem"
import SparrowLight from "./themes/SparrowLight"
import NotFoundPageContents from './components/404NotFound'
import AppSplash from './components/AppSplash'



class AppConfig extends TrillliConfig implements ITrillliConfig {

    teststr: string = 'test string defined in APP config, overriding trillli config'

    readonly theme: Theme = SparrowLight

    readonly menuApp: TrillliMenu = {
        top: [           
            {
                text: 'Alarms',
                link: '/alarms',
                icon: 'alarm',
                hideAuthed: false,
                hideUnauthed: true
            },
            {
                text: 'Home',
                link: '/',
                icon: 'home',

            },
        ],
        side: [
            // {
            //     text: 'Alarms',
            //     link: '/alarms',
            //     icon: 'alarm',
            //     hideAuthed: false,
            //     hideUnauthed: true
            // }
        ],
        bottom: []
    }

    readonly logos: { [key: string]: string; } = {
        appMain: '/src/assets/logos/v1_fullLight_padNo_bgNo.png',
        loading: '/src/assets/logos/v1_iconLight_padNo_bgNo.svg',
    }

    readonly pages: { [key: string]: {[key: string]: any} } = {
        landing: {
            trBasic: true,
            contents: <AppSplash />,
            authPrompt: true
        },
        loading: {
            trBasic: true,
            contents: <div>this is the loading page</div>
        },
        notFound: {
            trBasic: true,
            contents: <NotFoundPageContents />
        }
    }

}

export default AppConfig;