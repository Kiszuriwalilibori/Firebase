import * as React from 'react';
import { WelcomeTextContainer } from './WelcomeTextContainer';
import Grow from '@material-ui/core/Grow';
import * as ROUTES from '../js/routing/routes';
import { Link } from 'react-router-dom';

const LandingPage = React.memo(() => {
    return (
        <Link to={ROUTES.PERSONS} style={{ textDecoration: 'none' }}>
            <WelcomeTextContainer>
                <Grow in={true}>
                    <h1 className="landing_message">Witamy w Firebase :)</h1>
                </Grow>
            </WelcomeTextContainer>
        </Link>
    );
});
export default LandingPage;
