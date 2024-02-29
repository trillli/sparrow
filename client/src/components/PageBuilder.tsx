import React from 'react'
import TrillliPageBuilder from 'trillli/src/components/TrillliPageBuilder'
import AppConfig from 'src/AppConfig'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'

interface PageBuilderProps {
    navTop?: boolean,
    navSide?: boolean,
    appConfig: ITrillliConfig
    children?: React.ReactNode
}

const PageBuilder: React.FC<PageBuilderProps> = ({
    navTop = false,
    navSide = false,
    appConfig,
    children
}) => {

    const styling: {[key: string]: any} = {
        mainContents: {
            // background: `linear-gradient(147deg, #f9e351, #d8684d)`
            background: `linear-gradient(180deg, ${appConfig.theme.palette.neutral.dark[6]}, ${appConfig.theme.palette.neutral.dark[2]})`,
            // background: 'white'
            // background: 'orange'
            // background: appConfig.theme.palette.neutral.dark[2],
            // background: '#000d3d'
        }
    }

    return (
        <TrillliPageBuilder 
            navTop 
            navSide={navSide} 
            appConfig={new AppConfig()}
            styling={styling}
            children={children} />
    )
}

export default PageBuilder