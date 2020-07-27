// icomoon na styled
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddPersonForm from "./AddPersonForm";
import { showAddUserForm } from "../../js/ACTIONS/actions";
import { overhead_ } from "../../styles/style";

const _PersonsTableHeader = (props) => {
  const {
    isHiddenAddUserButton,
    isHiddenAddedUserMsg,
    isHiddenInputForm,
    isNotLimitReached,
    onAddUser,
  } = props;

  const AddUserButton = () =>
    isNotLimitReached ? (
      <overhead_.btn
        id="AddUserButton"
        type="button"
        onClick={isNotLimitReached ? onAddUser : function () {}}
      >
        <overhead_.iconCross />
        <overhead_.btnText>Add User</overhead_.btnText>
      </overhead_.btn>
    ) : (
      <overhead_.btn_disabled>
        <overhead_.iconCross />
        <overhead_.btnText>Add User</overhead_.btnText>
      </overhead_.btn_disabled>
    );

  return (
    <overhead_.wrapper>
      {!isHiddenAddUserButton && <AddUserButton />}

      {!isHiddenAddedUserMsg && (
        <overhead_.successMessage>
          <overhead_.iconCheck />
          <span> You have succesfully added an user </span>
        </overhead_.successMessage>
      )}

      {!isHiddenInputForm && <AddPersonForm />}

      {!isNotLimitReached && (
        <overhead_.dangerMessage>
          <overhead_.iconLimit />
          <span> You have reached the limit</span>
        </overhead_.dangerMessage>
      )}
    </overhead_.wrapper>
  );
};

const mapStateToProps = (state) => ({
  isHiddenAddUserButton: state.isHiddenAddUserButton,
  isHiddenAddedUserMsg: state.isHiddenAddedUserMsg,
  isHiddenInputForm: state.isHiddenInputForm,
  isNotLimitReached: state.isNotLimitReached,
});

const mapDispatchToProps = (dispatch) => ({
  onAddUser: () => dispatch(showAddUserForm()),
});

const PersonsTableHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PersonsTableHeader);

PersonsTableHeader.propTypes = {
  isHiddenAddUserButton: PropTypes.bool,
  isHiddenInputForm: PropTypes.bool,
  isNotLimitReached: PropTypes.bool,
  onAddUser: PropTypes.func,
};

export default PersonsTableHeader;
