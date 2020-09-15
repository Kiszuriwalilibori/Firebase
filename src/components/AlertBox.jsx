import * as React from "react";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { hideWarning } from "../js/ACTIONS/actions";

const NewAlert = withStyles({
  root: {
    background: "#AA1227",
    zIndex: "1000",
    position: "fixed",
    top: "1vw",
    left: "1vh",
    color: "white",
    fontWeight: "bold",
    border: "2px solid #D13525",
    margin: "40px auto",
    maxWidth: "300px",
    boxShadow:
      "inset 0 0 2px #D13525, 0 1px 1px rgba(0,0,0,0.14), 0 2px 2px rgba(0,0,0,0.14),0 0 4px rgba(0,0,0,0.14),0 0 8px rgba(0,0,0,0.14)",
  },
})(Alert);

const UnconnectedMyAlert = (props) => {
  const { visible, message, hideWarning } = props;

  return visible ? (
    <Fade in={true}>
      <NewAlert severity="error" onClose={hideWarning}>
        <AlertTitle>Uwaga!!!</AlertTitle>
        {message}
      </NewAlert>
    </Fade>
  ) : null;
};

const mapStateToProps = (state) => ({
  message: state.errorMessage,
  visible: state.isAlert,
});
const mapDispatchToProps = (dispatch) => {
  return {
    hideWarning: () => dispatch(hideWarning()),
  };
};

const AlertBox = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMyAlert);

export default AlertBox;
