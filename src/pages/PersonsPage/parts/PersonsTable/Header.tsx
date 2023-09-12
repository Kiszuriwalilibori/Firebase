import { connect, useSelector } from "react-redux";

import AddPersonForm from "./AddPersonForm";

import { showAddUserForm } from "js/redux/actions";
import { Overhead } from "styles/style";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { isOffline } from "js/functions";
import { selectIsLogged, selectArePersonsInRange } from "js/redux/selectors";
import { HTMLClick } from "types/index";

interface Props {
    isHiddenAddUserButton: Boolean;
    isHiddenInputForm: Boolean;
    showAddUserForm: () => void;
}

const PersonsTableHeader = (props: Props) => {
    const { isHiddenAddUserButton, isHiddenInputForm, showAddUserForm } = props;
    const isLogged = useSelector(selectIsLogged);
    const isTableFull = !useSelector(selectArePersonsInRange);

    const AddUserButton = () => (
        <Overhead.Btn
            disabled={isTableFull || isOffline() || !isLogged}
            id="AddUserButton"
            type="button"
            onClick={showAddUserForm as HTMLClick}
        >
            <Overhead.IconCross />
            <Overhead.BtnText>Add User</Overhead.BtnText>
        </Overhead.Btn>
    );

    return (
        <Overhead.Wrapper>
            {!isHiddenAddUserButton && <AddUserButton />}

            {!isHiddenInputForm && <AddPersonForm />}

            {isTableFull && (
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
    isHiddenInputForm: state.isHiddenInputForm,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    showAddUserForm: () => dispatch(showAddUserForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableHeader);
