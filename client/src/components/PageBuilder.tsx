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
    return (
        <TrillliPageBuilder navTop navSide appConfig={new AppConfig()} children={children} />
    )
}

export default PageBuilder