import { useEffect, lazy, Suspense, useContext } from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";
import { NavigateFunction, useNavigate } from "react-router-dom";

import * as ROUTES from "routes";

import isOffline from "functions/isOffline";
import PersonsTableHeader from "./parts/PersonsTable/Header";
import useMessage, { ShowMessage } from "hooks/useMessage";

import { login, hideError } from "reduxware/actions";
import { getPersons } from "thunks";
import Firebase, { FirebaseContext } from "contexts/firebaseContext";
import { PersonsTableContainer, PersonsPageContainer, PersonsTableBody } from "styles/style";
import { AppDispatch, RootStateType, Loader } from "components";
import { User } from "types";

const PersonsTableContent = lazy(() => import("./parts/PersonsTable/Body"));
const LoginSection = lazy(() => import("./parts/LoginSection"));
const PersonsTableSortArea = lazy(() => import("./parts/PersonsTable/SortArea"));
const UserCard = lazy(() => import("./parts/UserCard"));
const Header = lazy(() => import("./parts/Header"));

const SUMMARY =
    "Table of users by name and email. ID is a label only. Users are sortable by name or email alternatively and can be removed.";

interface Props {
    user: User;
    getPersons: (navigate: NavigateFunction, firebase: Firebase, showMessage: ShowMessage) => void;
    isLoading: boolean;
}

function PersonsPage(props: Props) {
    const { user, getPersons } = props;
    const firebase = useContext(FirebaseContext);
    const showMessage = useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOffline()) {
            navigate(ROUTES.LANDING);
            showMessage.error("W tej chwili nie masz połączenia z interenetem. Popróbuj później");
        } else {
            if (!isOffline() && navigate && firebase) {
                console.log("getpersons");
                getPersons(navigate, firebase, showMessage);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebase, isOffline()]);

    return !isOffline() ? (
        <Suspense fallback={<Loader />}>
            <PersonsPageContainer>
                {user && <UserCard user={user} />}
                <Header />
                <LoginSection />
                <Fade in={true} timeout={2000}>
                    <PersonsTableContainer>
                        <PersonsTableHeader />
                        <PersonsTableBody summary={SUMMARY}>
                            <PersonsTableSortArea />
                            <PersonsTableContent />
                        </PersonsTableBody>
                    </PersonsTableContainer>
                </Fade>
            </PersonsPageContainer>
        </Suspense>
    ) : null;
}

const mapStateToProps = (state: RootStateType) => ({
    user: state.user,
    isLoading: state.isLoading,
});

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        login: (data: any) => dispatch(login(data)),
        hideError: () => dispatch(hideError()),
        getPersons: (navigate: NavigateFunction, firebase: Firebase, showMessage: ShowMessage) =>
            dispatch(getPersons(navigate, firebase, showMessage)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);
