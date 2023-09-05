import * as React from "react";
import * as ROUTES from "js/routes";
import Grow from "@material-ui/core/Grow";

import { WelcomeTextContainer } from "./parts/WelcomeTextContainer";
import { useNavigate } from "react-router-dom";

const welcome = "Witamy w Firebase :)";

const LandingPage = React.memo(() => {
    const navigate = useNavigate();
    return (
        <>
            <WelcomeTextContainer component="header" onClick={() => navigate(ROUTES.PERSONS)}>
                <Grow in={true}>
                    <h1 className="landing_message">{welcome}</h1>
                </Grow>
            </WelcomeTextContainer>
            <main></main>
        </>
    );
});
export default LandingPage;
