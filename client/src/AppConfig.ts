import TrillliConfig from "trillli/src/types/TrillliConfig"
import TrillliDefaultConfig from "trillli/src/components/TrillliDefaultConfig"


class AppConfig extends TrillliDefaultConfig implements TrillliConfig {
    readonly _teststr: string = 'pizza'

}

export default AppConfig;