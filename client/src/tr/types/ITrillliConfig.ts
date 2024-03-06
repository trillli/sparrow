import { Theme } from "@mui/material/styles"
import { PaletteColor } from '@mui/material/styles/createPalette'
import TrillliMenu from './TrillliMenu'
import { trmapKS_VS } from './TrMaps'

//Extend MUI theme types (using intersection type instead of interface for consistency within project)
type ITrillliPaletteColor = PaletteColor & {
    light: trmapKS_VS,
    dark: trmapKS_VS,
}
type ITrillliTheme = Theme & {
    palette: {
        primary: ITrillliPaletteColor,
        secondary: ITrillliPaletteColor,
        tertiary: ITrillliPaletteColor,
        neutral: ITrillliPaletteColor
    }
}

type ITrillliConfig = {
    readonly theme: ITrillliTheme
    readonly menuBase: TrillliMenu
    readonly menuApp: TrillliMenu 
    readonly logos: { [key: string]: string }
    readonly teststr: string
}

export default ITrillliConfig