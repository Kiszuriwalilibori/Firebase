import { Link } from "react-router-dom";
import * as ROUTES from "../js/routes";

function withLinkToPersons(Component) {
  return props => (
    <Link to={ROUTES.PERSONS} style={{ textDecoration: "none" }}>
      <Component {...props} />
    </Link>
  );
}

export default withLinkToPersons;
