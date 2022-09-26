import * as React from "react";
import Grow from "@material-ui/core/Grow";

import { WelcomeTextContainer } from "./parts/WelcomeTextContainer";

import withLinkToPersonsHOC from "HOCs/withLinkToPersonsHOC";

const LandingPage = React.memo(() => {
  return (
    <WelcomeTextContainer>
      <Grow in={true}>
        <h1 className="landing_message">Witamy w Firebase :)</h1>
      </Grow>
    </WelcomeTextContainer>
  );
});
export default withLinkToPersonsHOC(LandingPage);
