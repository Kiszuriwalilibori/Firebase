import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input } from "../../styles/style";

let AddPersonButton = props => {
  const { isDisabled } = props;
  return (
    <Input.btn type="submit" id="SubmitButton" disabled={isDisabled}>
      <span>Submit</span>
    </Input.btn>
  );
};

const mapStateToProps = state => ({
  isDisabled: state.submitDisabled,
});

AddPersonButton = connect(mapStateToProps, null)(AddPersonButton);

export default AddPersonButton;

AddPersonButton.propTypes = {
  isDisabled: PropTypes.bool,
};
