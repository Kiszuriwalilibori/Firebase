import * as React from "react";
import Grow from "@material-ui/core/Grow";

import { WelcomeTextContainer } from "./parts/WelcomeTextContainer";

import { withLinkToPersons } from "HOCs";

const welcome = "Witamy w Firebase :)";

const LandingPage = React.memo(() => {
  return (
    <WelcomeTextContainer>
      <Grow in={true}>
        <h1 className="landing_message">{welcome}</h1>
      </Grow>
    </WelcomeTextContainer>
  );
});
export default withLinkToPersons(LandingPage);
