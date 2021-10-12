import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
export const ContainerVerticallyCentered = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
})(Container);

const ColorCircularProgress = withStyles({
    root: {
        color: '#CB823F',
        display: 'block',
        margin: '0 auto',
    },
})(CircularProgress);

let Loader = props => {
    const { isVisible } = props;

    return isVisible ? (
        <ContainerVerticallyCentered>
            <ColorCircularProgress thickness={5} size={100} />
        </ContainerVerticallyCentered>
    ) : null;
};

const mapStateToProps = state => ({
    isVisible: state.spinnerVisible,
});
Loader = withRouter(connect(mapStateToProps, null)(Loader));

export default Loader;
Loader.propTypes = {
    isVisible: PropTypes.bool,
};
