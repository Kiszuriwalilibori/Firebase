import * as React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { AlertTitle } from "@material-ui/lab";
import { Fade } from "@material-ui/core";

import { hideWarning } from "js/redux/actions";
import { renderConditionally } from "HOCs";
import StyledAlert from "./style";

// interface Props {
//   message: string;
//   hideWarning: Function;
// }
const Alert = (props /*: Props*/) => {
  const { message, hideWarning } = props;

  return (
    <Fade in={true}>
      <StyledAlert severity="error" onClose={hideWarning}>
        <AlertTitle>Uwaga!!!</AlertTitle>
        {message}
      </StyledAlert>
    </Fade>
  );
};

const mapStateToProps = state => ({
  message: state.errorMessage,
  renderCondition: state.isAlert,
});
const mapDispatchToProps = dispatch => {
  return {
    hideWarning: () => dispatch(hideWarning()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(renderConditionally(Alert));

Alert.propTypes = {
  renderCondition: PropTypes.bool,
  message: PropTypes.string,
  hideWarning: PropTypes.func,
};
