import React from 'react'
import TrillliPageBuilder from 'trillli/src/components/TrillliPageBuilder'
import AppConfig from 'src/AppConfig'

interface PageBuilderProps {
    navTop?: boolean,
    navSide?: boolean,
    children?: React.ReactNode
}

const PageBuilder: React.FC<PageBuilderProps> = ({
    navTop = false,
    navSide = false,
    children
}) => {

    const styling: {[key: string]: any} = {
        mainContents: {
            // background: `linear-gradient(147deg, #f9e351, #d8684d)`
            background: 'white'
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