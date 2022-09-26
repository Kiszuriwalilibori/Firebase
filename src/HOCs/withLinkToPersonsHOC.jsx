import { Link } from "react-router-dom";
import * as ROUTES from "../js/routes";

function withLinkToPersonsHOC(Component) {
  return props => (
    <Link to={ROUTES.PERSONS} style={{ textDecoration: "none" }}>
      <Component {...props} />
    </Link>
  );
}

export default withLinkToPersonsHOC;
