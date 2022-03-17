import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddPersonForm from './AddPersonForm';
import { showAddUserForm } from '../../../../js/REDUX/actions';
import { Overhead } from '../../../../styles/style';

let PersonsTableHeader = props => {
    const { isHiddenAddUserButton, isHiddenAddedUserMsg, isHiddenInputForm, isNotLimitReached, onAddUser } =
        props;

    const AddUserButton = () =>
        isNotLimitReached ? (
            <Overhead.Btn
                id="AddUserButton"
                type="button"
                onClick={isNotLimitReached ? onAddUser : function () {}}
            >
                <Overhead.IconCross />
                <Overhead.BtnText>Add User</Overhead.BtnText>
            </Overhead.Btn>
        ) : (
            <Overhead.BtnDisabled>
                <Overhead.IconCross />
                <Overhead.BtnText>Add User</Overhead.BtnText>
            </Overhead.BtnDisabled>
        );

    return (
        <Overhead.Wrapper>
            {!isHiddenAddUserButton && <AddUserButton />}

            {!isHiddenAddedUserMsg && (
                <Overhead.SuccessMessage>
                    <Overhead.IconCheck />
                    <span> You have succesfully added an user </span>
                </Overhead.SuccessMessage>
            )}

            {!isHiddenInputForm && <AddPersonForm />}

            {!isNotLimitReached && (
                <Overhead.DangerMessage>
                    <Overhead.IconLimit />
                    <span> You have reached the limit</span>
                </Overhead.DangerMessage>
            )}
        </Overhead.Wrapper>
    );
};

const mapStateToProps = state => ({
    isHiddenAddUserButton: state.isHiddenAddUserButton,
    isHiddenAddedUserMsg: state.isHiddenAddedUserMsg,
    isHiddenInputForm: state.isHiddenInputForm,
    isNotLimitReached: state.isNotLimitReached,
});

const mapDispatchToProps = dispatch => ({
    onAddUser: () => dispatch(showAddUserForm()),
});

PersonsTableHeader = connect(mapStateToProps, mapDispatchToProps)(PersonsTableHeader);

PersonsTableHeader.propTypes = {
    isHiddenAddUserButton: PropTypes.bool,
    isHiddenAddUserMsg: PropTypes.bool,
    isHiddenInputForm: PropTypes.bool,
    isNotLimitReached: PropTypes.bool,
    onAddUser: PropTypes.func,
};

export default PersonsTableHeader;
