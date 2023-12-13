import * as React from "react";
import * as ROUTES from "js/routes";
import Grow from "@material-ui/core/Grow";

import { WelcomeTextWrapper } from "./styles";
import { useNavigate } from "react-router-dom";

const LandingPage = React.memo(() => {
    const navigate = useNavigate();
    return (
        <>
            <WelcomeTextWrapper component="header" onClick={() => navigate(ROUTES.PERSONS)}>
                <Grow in={true}>
                    <h1 className="landing_message">{"witamy w Firebase :)"}</h1>
                </Grow>
            </WelcomeTextWrapper>
            <main></main>
        </>
    );
});
export default LandingPage;
