import React from 'react'
import AppConfig from 'src/AppConfig'
import TrillliPageBuilder from 'src/tr/components/TrillliPageBuilder'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'

interface PageBuilderProps {
    navTop?: boolean,
    navSide?: boolean,
    appConfig: ITrillliConfig
    styling?: { [key: string]: any }
    children?: React.ReactNode
}

const PageBuilder: React.FC<PageBuilderProps> = ({
    navTop = false,
    navSide = false,
    appConfig,
    styling,
    children
}) => {

    // State Variables & Related ------------------------------------------------------------------ //

    // Effects & Related -------------------------------------------------------------------------- //

    // Event Handlers & Related ------------------------------------------------------------------- //

    // Other vars, util functions, etc ------------------------------------------------------------ //

    if (!styling) {
        styling = {}
    }

    const stylingDefault: { [key: string]: any } = {
        mainContents: {
            background: `linear-gradient(180deg, ${appConfig.theme.palette.neutral.dark[6]}, ${appConfig.theme.palette.neutral.dark[2]})`,
            ...(styling.mainContents || {}),
        }
    }

    return (
        <TrillliPageBuilder
            navTop={navTop}
            navSide={navSide}
            appConfig={new AppConfig()}
            styling={stylingDefault}
            children={children} />
    )
}

export default PageBuilder