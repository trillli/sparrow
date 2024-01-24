import ITrillliConfig from "trillli/src/types/ITrillliConfig"
import TrillliConfig from "trillli/src/components/TrillliAppConfig"
import TrillliMenu from "trillli/src/types/TrillliMenu"


class AppConfig extends TrillliConfig implements ITrillliConfig {
        
    readonly menuApp: TrillliMenu = {
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

}

export default AppConfig;