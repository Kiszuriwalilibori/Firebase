import { Link } from "react-router-dom";
import * as ROUTES from "../routes";

function withLinkToPersons<T>(Component: React.ComponentType<T>) {
    return (props: React.PropsWithChildren<T>) => (
        <Link to={ROUTES.PERSONS} style={{ textDecoration: "none" }}>
            <Component {...props} />
        </Link>
    );
}

export default withLinkToPersons;
