import * as React from "react";
import { connect } from "react-redux";
import { Input } from "../../styles/style";
function UnconnectedAddPersonButton(props) {
  const { disabled } = props;
  return (
    <Input.btn type="submit" id="SubmitButton" disabled={disabled}>
      <span>Submit</span>
    </Input.btn>
  );
}

const mapStateToProps = (state) => ({
  disabled: state.submitDisabled,
});

const AddPersonButton = connect(mapStateToProps, null)(UnconnectedAddPersonButton);

export default AddPersonButton;
