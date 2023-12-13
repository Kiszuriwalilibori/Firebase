import React, { useEffect, lazy, Suspense, useContext } from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";
import { NavigateFunction, useNavigate } from "react-router-dom";

import * as ROUTES from "js/routes";

import isOffline from "js/functions/isOffline";
import PersonsTableHeader from "./parts/PersonsTable/Header";
import useMessage from "hooks/useMessage";

import { login, hideError } from "js/redux/actions";
import { getPersons } from "thunks";
import { FirebaseContext } from "contexts/firebaseContext";
import { PersonsTableContainer, PersonsPageContainer, PersonsTableBody } from "styles/style";
import { AppDispatch, RootStateType, Loader } from "components";
import { User } from "types";

const PersonsTableContent = lazy(() => import("./parts/PersonsTable/Body"));
const LoginSection = lazy(() => import("./parts/LoginSection"));
const PersonsTableSortArea = lazy(() => import("./parts/PersonsTable/SortArea"));
const UserInfoCard = lazy(() => import("./parts/UserCard"));
const Header = lazy(() => import("./parts/Header"));

interface Props {
    user: User;
    getPersons: any;
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
                getPersons(navigate, firebase, showMessage);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebase, isOffline()]);

    return !isOffline() ? (
        <Suspense fallback={<Loader />}>
            <PersonsPageContainer>
                {user && <UserInfoCard user={user} />}
                <Header />
                <LoginSection />
                <Fade in={true} timeout={2000}>
                    <PersonsTableContainer>
                        <PersonsTableHeader />
                        <PersonsTableBody summary="Table of users by name and email. ID is a label only. Users are sortable by name or email alternatively and can be removed.">
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
        getPersons: (navigate: NavigateFunction, firebase: any, showMessage: any) =>
            dispatch(getPersons(navigate, firebase, showMessage)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);
