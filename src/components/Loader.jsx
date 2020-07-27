import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
export const ContainerVerticallyCentered = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
})(Container);

const ColorCircularProgress = withStyles({
  root: {
    color: "#CB823F",
    display: "block",
    margin: "0 auto",
  },
})(CircularProgress);

const _Loader = (props) => {
  const { visible } = props;

  return visible ? (
    <ContainerVerticallyCentered>
      <ColorCircularProgress thickness={5} size={100} />
    </ContainerVerticallyCentered>
  ) : null;
};

const mapStateToProps = (state) => ({
  visible: state.spinnerVisible,
});
const Loader = withRouter(connect(mapStateToProps, null)(_Loader));
export default Loader;
