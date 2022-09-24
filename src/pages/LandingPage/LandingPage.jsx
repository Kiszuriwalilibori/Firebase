import * as React from 'react';
import { WelcomeTextContainer } from './parts/WelcomeTextContainer';
import Grow from '@material-ui/core/Grow';
import LinkToPersonsHOC from '../../HOCs/LinkToPersonsHOC';

const LandingPage = React.memo(() => {
    return (
        <WelcomeTextContainer>
            <Grow in={true}>
                <h1 className="landing_message">Witamy w Firebase :)</h1>
            </Grow>
        </WelcomeTextContainer>
    );
});
export default LinkToPersonsHOC(LandingPage);
