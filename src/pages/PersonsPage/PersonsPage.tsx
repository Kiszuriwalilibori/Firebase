import React, { useEffect, lazy, Suspense, useContext } from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import createRedirect from "js/functions/createRedirect";
import isOffline from "js/functions/isOffline";
import PersonsTableHeader from "./parts/PersonsTable/Header";
import useMessage from "hooks/useMessage";

import { login, hideError } from "js/redux/actions";
import { getPersons } from "thunks";
import { FirebaseContext } from "contexts/firebaseContext";
import { PersonsTableContainer, PersonsPageContainer, PersonsTableBody } from "styles/style";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { Redirect, User } from "types/index";
import Loader from "components/Loader";

const PersonsTableContent = lazy(() => import("./parts/PersonsTable/Body"));
const LoginSection = lazy(() => import("./parts/LoginSection"));
const PersonsTableSortArea = lazy(() => import("./parts/PersonsTable/SortArea"));
const UserInfoCard = lazy(() => import("./parts/UserCard"));

interface Props {
    user: User;
    getPersons: any;
    isAlert: boolean;
    isLoading: boolean;
}

function PersonsPage(props: Props) {
    const { user, getPersons } = props;
    const firebase = useContext(FirebaseContext);
    const showMessage = useMessage();
    const history = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const redirect = React.useMemo(createRedirect(history), []);

    useEffect(() => {
        if (isOffline()) {
            redirect.landing();
            showMessage.error("W tej chwili nie masz połączenia z interenetem. Popróbuj później");
        } else {
            if (!isOffline() && redirect && firebase) {
                getPersons(redirect, firebase, showMessage);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebase, isOffline()]);

    return !isOffline() ? (
        <Suspense fallback={<Loader />}>
            {user && <UserInfoCard user={user} />}
            <PersonsPageContainer>
                <LoginSection />
                <Fade in={true} timeout={2000}>
                    <PersonsTableContainer>
                        <PersonsTableHeader />
                        <PersonsTableBody>
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
    isAlert: state.isAlert,
    isLoading: state.isLoading,
});

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        login: (data: any) => dispatch(login(data)),
        hideError: () => dispatch(hideError()),
        getPersons: (redirect: Redirect, firebase: any, showMessage: any) =>
            dispatch(getPersons(redirect, firebase, showMessage)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);
