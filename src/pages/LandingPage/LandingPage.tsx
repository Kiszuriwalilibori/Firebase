import * as React from "react";
import * as ROUTES from "routes";
import Grow from "@material-ui/core/Grow";

import { WelcomeTextWrapper } from "./styles";
import { useNavigate } from "react-router-dom";
import useDebouncedCallback from "hooks/useDebouncedCallback";

const LandingPage = React.memo(() => {
    const navigate = useNavigate();
    const handleClick = useDebouncedCallback<HTMLDivElement>(navigate, ROUTES.PERSONS);

    return (
        <>
            <WelcomeTextWrapper component="header" onClick={handleClick}>
                <Grow in={true}>
                    <h1 className="landing_message">{"witamy w Firebase :)"}</h1>
                </Grow>
            </WelcomeTextWrapper>
            <main></main>
        </>
    );
});
export default LandingPage;
