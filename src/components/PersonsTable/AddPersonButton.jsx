import * as React from "react";
import { connect } from "react-redux";
import { input_ } from "../../styles/style";
function _AddPersonButton(props) {
  const { disabled } = props;
  return (
    <input_.btn type="submit" id="SubmitButton" disabled={disabled}>
      <span>Submit</span>
    </input_.btn>
  );
}

const mapStateToProps = (state) => ({
  disabled: state.submitDisabled,
});

const AddPersonButton = connect(mapStateToProps, null)(_AddPersonButton);

export default AddPersonButton;
