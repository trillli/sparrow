import * as React from 'react';
import PageBuilder from './PageBuilder';

const AppSplash: React.FC = () => {

    return (
        <PageBuilder header sidebar>
            <div id='mypage'>
                <div>This is the splash screen</div>
                <div>write some good ol html here!</div>
            </div>
        </PageBuilder>
    )
}

export default AppSplash