import { Link } from 'react-router-dom';
import * as ROUTES from '../js/routing/routes';

function LinkToPersonsHOC(Component) {
    return props => (
        <Link to={ROUTES.PERSONS} style={{ textDecoration: 'none' }}>
            <Component {...props} />
        </Link>
    );
}

export default LinkToPersonsHOC;
