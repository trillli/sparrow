import TrillliConfig from "src/tr/components/TrillliConfig"
import ITrillliConfig from "src/tr/types/ITrillliConfig"
import TrillliMenu from "src/tr/types/TrillliMenu"
import SparrowLight from "./themes/SparrowLight"

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
        ],
        bottom: []
    }

    readonly logos: { [key: string]: string; } = {
        appMain: '/logos/v1_fullLight_padNo_bgNo.png',
        loading: '/logos/v1_iconLight_padNo_bgNo.png',
    }

    readonly pages: { [key: string]: {[key: string]: any} } = {
        landing: {
            trBasic: false,
        },
        loading: {
            trBasic: true,
        },
        notFound: {
            trBasic: true,
        }
    }

}

export default AppConfig;