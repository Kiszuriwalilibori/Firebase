// icomoon na styled
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddPersonForm from "./AddPersonForm";
import { showAddUserForm } from "../../js/ACTIONS/actions";
import { Overhead } from "../../styles/style";

const UnconnectedPersonsTableHeader = (props) => {
  const {
    isHiddenAddUserButton,
    isHiddenAddedUserMsg,
    isHiddenInputForm,
    isNotLimitReached,
    onAddUser,
  } = props;

  const AddUserButton = () =>
    isNotLimitReached ? (
      <Overhead.btn
        id="AddUserButton"
        type="button"
        onClick={isNotLimitReached ? onAddUser : function () {}}
      >
        <Overhead.iconCross />
        <Overhead.btnText>Add User</Overhead.btnText>
      </Overhead.btn>
    ) : (
      <Overhead.btn_disabled>
        <Overhead.iconCross />
        <Overhead.btnText>Add User</Overhead.btnText>
      </Overhead.btn_disabled>
    );

  return (
    <Overhead.wrapper>
      {!isHiddenAddUserButton && <AddUserButton />}

      {!isHiddenAddedUserMsg && (
        <Overhead.successMessage>
          <Overhead.iconCheck />
          <span> You have succesfully added an user </span>
        </Overhead.successMessage>
      )}

      {!isHiddenInputForm && <AddPersonForm />}

      {!isNotLimitReached && (
        <Overhead.dangerMessage>
          <Overhead.iconLimit />
          <span> You have reached the limit</span>
        </Overhead.dangerMessage>
      )}
    </Overhead.wrapper>
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
)(UnconnectedPersonsTableHeader);

PersonsTableHeader.propTypes = {
  isHiddenAddUserButton: PropTypes.bool,
  isHiddenInputForm: PropTypes.bool,
  isNotLimitReached: PropTypes.bool,
  onAddUser: PropTypes.func,
};

export default PersonsTableHeader;
