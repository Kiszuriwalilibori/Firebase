import * as React from "react";
import { CustomContainer } from "./CustomContainer";
import Grow from "@material-ui/core/Grow";
import * as ROUTES from "../js/ROUTES/routes";
import { Link } from "react-router-dom";

const LandingPage = React.memo(() => {
  return (
    <Link to={ROUTES.HOME} style={{ textDecoration: "none" }}>
      <CustomContainer>
        <Grow in={true}>
          <div className="landing_message">Witam w Firebase :)</div>
        </Grow>
      </CustomContainer>
    </Link>
  );
});
export default LandingPage;
