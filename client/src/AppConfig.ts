import ITrillliConfig from "trillli/src/types/ITrillliConfig"
import TrillliConfig from "trillli/src/components/TrillliConfig"
import TrillliMenu from "trillli/src/types/TrillliMenu"
import TrillliMenuItem from "trillli/src/types/TrillliMenuItem"


class AppConfig extends TrillliConfig implements ITrillliConfig {




    readonly menuApp: TrillliMenu = {
        top: [
            {
                text: 'Alarms',
                link: '/alarms',
                icon: 'alarm',
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
        ],
        bottom: []
    }

}

export default AppConfig;