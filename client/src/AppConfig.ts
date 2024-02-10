import ITrillliConfig from "trillli/src/types/ITrillliConfig"
import TrillliConfig from "trillli/src/components/TrillliConfig"
import TrillliMenu from "trillli/src/types/TrillliMenu"
import TrillliMenuItem from "trillli/src/types/TrillliMenuItem"


class AppConfig extends TrillliConfig implements ITrillliConfig {

    teststr: string = 'test string defined in APP config, overriding trillli config'


    readonly menuApp: TrillliMenu = {
        top: [
            {
                text: 'Test',
                link: '/protected',
                icon: 'circle',
                hideAuthed: false,
                hideUnauthed: true
            },
        ],
        side: [
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
                // hideAuthed: false,
                // hideUnauthed: true
            },
        ],
        bottom: []
    }

}

export default AppConfig;