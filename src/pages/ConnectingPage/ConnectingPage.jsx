import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

import { renderConditionally } from "HOCs";

export const ContainerVerticallyCentered = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
})(Container);
/**
 * todo prawdopodobne nadużycie mui w powyższym
 * */

const ColorCircularProgress = withStyles({
  root: {
    color: "#CB823F",
    display: "block",
    margin: "0 auto",
  },
})(CircularProgress);

const ConnectingPage = () => {
  return (
    <ContainerVerticallyCentered>
      <ColorCircularProgress thickness={5} size={100} />
    </ContainerVerticallyCentered>
  );
};

const mapStateToProps = state => ({
  renderCondition: state.spinnerVisible,
});

export default withRouter(connect(mapStateToProps, null)(renderConditionally(ConnectingPage)));

ConnectingPage.propTypes = {
  renderCondition: PropTypes.bool,
};
