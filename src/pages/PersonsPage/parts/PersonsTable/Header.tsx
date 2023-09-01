import PropTypes from "prop-types";

import { connect } from "react-redux";

import AddPersonForm from "./AddPersonForm";

import { showAddUserForm } from "js/redux/actions";
import { Overhead } from "styles/style";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { isOffline } from "js/functions";
import { User } from "types";

interface Props {
    isHiddenAddUserButton: Boolean;
    isHiddenAddedUserMsg: Boolean;
    isHiddenInputForm: Boolean;
    isNotLimitReached: Boolean;
    user: User;
    addUser: Function;
}

const PersonsTableHeader = (props: Props) => {
    const { isHiddenAddUserButton, isHiddenAddedUserMsg, isHiddenInputForm, isNotLimitReached, addUser, user } = props;

    const AddUserButton = () => (
        <Overhead.Btn
            disabled={!isNotLimitReached || isOffline() || !user}
            id="AddUserButton"
            type="button"
            onClick={isNotLimitReached ? addUser : function () {}}
        >
            <Overhead.IconCross />
            <Overhead.BtnText>Add User</Overhead.BtnText>
        </Overhead.Btn>
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

const mapStateToProps = (state: RootStateType) => ({
    isHiddenAddUserButton: state.isHiddenAddUserButton,
    isHiddenAddedUserMsg: state.isHiddenAddedUserMsg,
    isHiddenInputForm: state.isHiddenInputForm,
    isNotLimitReached: state.isNotLimitReached,
    user: state.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    addUser: () => dispatch(showAddUserForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableHeader);

PersonsTableHeader.propTypes = {
    isHiddenAddUserButton: PropTypes.bool,
    isHiddenAddUserMsg: PropTypes.bool,
    isHiddenInputForm: PropTypes.bool,
    isNotLimitReached: PropTypes.bool,
    onAddUser: PropTypes.func,
};
