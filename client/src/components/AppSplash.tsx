import * as React from 'react';
import PageBuilder from './PageBuilder';
import TrillliPageBuilder from 'trillli/src/components/TrillliPageBuilder';

const AppSplash: React.FC = () => {

    return (
        <PageBuilder navTop navSide>
            <div id='mypage'>
                <div>This is the splash screen</div>
                <div>write some good ol html here!</div>
            </div>
        </PageBuilder>
    )
}

export default AppSplash