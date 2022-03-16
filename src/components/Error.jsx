import * as React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import * as ROUTES from '../js/routing/routes';
import { Link } from 'react-router-dom';

const Container = withStyles({
    root: {
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba( 255,255,255,0.4)',
    },
})(Box);

const NewAlert = withStyles({
    root: {
        background: '#F7EFE2',
        color: '#F70025',
        fontWeight: 'bold',
        border: '1px solid #F70025',
        margin: '40px auto',
        maxWidth: '300px',
        minWidth: '200px',
        boxShadow:
            'inset 0 0 2px #c46a62, 0 1px 1px rgba(0,0,0,0.14), 0 2px 2px rgba(0,0,0,0.14),0 0 4px rgba(0,0,0,0.14),0 0 8px rgba(0,0,0,0.14),0 0 10px rgba(0,0,0,0.14)',
    },
})(Alert);

let Error = props => {
    const { message } = props;

    return (
        <Link to={ROUTES.PERSONS} style={{ textDecoration: 'none' }}>
            <Container>
                <NewAlert severity="error">
                    <AlertTitle>Uwaga!!!</AlertTitle>
                    {message}
                </NewAlert>
            </Container>
        </Link>
    );
};

const mapStateToProps = state => ({
    message: state.errorMessage,
});

Error = withRouter(connect(mapStateToProps, null)(Error));

export default Error;

Error.propTypes = {
    message: PropTypes.string,
};
