import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  showError,
  hideAddedUserMessage,
  showWarning,
  toggleSubmit,
} from "../../js/ACTIONS/actions";
import * as ROUTES from "../../js/ROUTES/routes";
import { input_ } from "../../styles/style";
import { itemsRef } from "../../js/FUNCTIONS/firebase";
import submitFigure from "../../js/THUNKS/submitFigure";
import AddPersonButton from "./AddPersonButton";

function _AddPersonForm(props) {
  const input = useRef(null);
  const { user, history, submitFigure, showWarning, toggleSubmit } = props;
  let [inputName, setInputName] = useState("");
  let [inputEmail, setInputEmail] = useState("");
  const ResetText = () => (
    <input_.dangerMessage>
      <u> Reset Fields</u>
    </input_.dangerMessage>
  );

  const redirect = React.useMemo(
    () => ({
      error: () => {
        history.push(ROUTES.ERROR);
      },
      loading: () => {
        history.push(ROUTES.CONNECT);
      },
      home: () => {
        history.push(ROUTES.HOME);
      },
    }),
    [history]
  );

  const handleResetFields = () => {
    setInputName((inputName = ""));
    setInputEmail((inputEmail = ""));
  };
  const isResetFieldsHidden = () => !!(inputName === "" && inputEmail === "");
  const submit = (e) => {
    e.preventDefault();
    if (user) {
      toggleSubmit();
      itemsRef
        .orderByChild("email")
        .equalTo(inputEmail)
        .once("value", (snapshot) => {
          const isNotDuplicate = !snapshot.exists();
          submitFigure(isNotDuplicate, redirect, {
            name: inputName,
            email: inputEmail,
            user: user.displayName || user.email,
          });
        });
    } else {
      showWarning("Tylko zalogowani uzytkownicy mogą dodawać postacie");
    }
  };

  useEffect(() => input.current.focus(), [input]);
  return (
    <input_.outerWrapper onSubmit={submit}>
      <input_.innerWrapper>
        <input_.input
          required
          minLength="2"
          maxLength="20"
          pattern="[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+"
          placeholder="Name..."
          type="text"
          ref={input}
          value={inputName}
          onChange={(e) => setInputName((inputName = e.target.value))}
        />
      </input_.innerWrapper>
      <input_.inputWrapper>
        <input_.input
          required
          minLength="2"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          placeholder="Email..."
          type="text"
          value={inputEmail}
          onChange={(e) => setInputEmail((inputEmail = e.target.value))}
        />
      </input_.inputWrapper>
      {/* <input_.btn type="submit" id="SubmitButton" disabled={false}>
        <span>Submit</span>
      </input_.btn> */}
      <AddPersonButton />
      {!isResetFieldsHidden() && (
        <input_.resetWrapper onClick={handleResetFields}>
          <ResetText />
        </input_.resetWrapper>
      )}
    </input_.outerWrapper>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showWarning: (data) => {
    dispatch(showWarning(data));
  },
  showError: (data) => {
    dispatch(showError(data));
  },
  hideAddedUserMessage: () => {
    dispatch(hideAddedUserMessage());
  },
  submitFigure: (notDuplicate, redirect, data) => {
    dispatch(submitFigure(notDuplicate, redirect, data));
  },
  toggleSubmit: () => {
    dispatch(toggleSubmit());
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

const AddPersonForm = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_AddPersonForm)
);

export default AddPersonForm;

AddPersonForm.propTypes = {
  onSubmit: PropTypes.func,
};
