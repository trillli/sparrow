import React from 'react'
import TrillliPageBuilder from 'trillli/src/components/TrillliPageBuilder'
import AppConfig from 'src/AppConfig'

interface PageBuilderProps {
    header?: boolean,
    sidebar?: boolean,
    children?: React.ReactNode
}

const PageBuilder: React.FC<PageBuilderProps> = ({
    header = false,
    sidebar = false,
    children
}) => {
    return (
        <TrillliPageBuilder header sidebar appConfig={new AppConfig()} children={children} />
    )
}

export default PageBuilder