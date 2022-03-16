import React, { useEffect, lazy, Suspense, useContext } from 'react';
import { connect } from 'react-redux';
import { login, hideError } from '../js/REDUX/actions';
import { Fade } from '@material-ui/core';
import PersonsTableHeader from './PersonsTable/PersonsTableHeader';
import { load } from '../js/REDUX/THUNKS/loadData';
import { FirebaseContext } from '../contexts/firebaseContext';
import { Application } from '../styles/style';
import * as ROUTES from '../js/routing/routes';

const AlertBox = lazy(() => import('./AlertBox'));
const Loader = lazy(() => import('./ConnectingPage'));
const PersonsTableContent = lazy(() => import('./PersonsTable/PersonsTableContent'));
const LoginSection = lazy(() => import('./LoginSection'));
const PersonsTableSortArea = lazy(() => import('./PersonsTable/PersonsTableSortArea'));
const UserInfoCard = lazy(() => import('./UserInfoCard'));
const MessageBox = lazy(() => import('./MessageBox'));

function PrepareApp(props) {
    const { isLoading, user, load, history } = { ...props };
    const firebase = useContext(FirebaseContext);

    const redirect = React.useMemo(
        () => ({
            error: () => {
                history.push(ROUTES.ERROR);
            },
            loading: () => {
                history.push(ROUTES.CONNECT);
            },
            home: () => {
                history.push(ROUTES.PERSONS);
            },
        }),
        [history],
    );

    useEffect(() => {
        if (redirect && firebase) {
            load(redirect, firebase);
        }
    }, [firebase, redirect, load]);

    return (
        <>
            <Suspense fallback={null}>
                <AlertBox />
                <UserInfoCard user={user} />
                <Loader visible={isLoading} />
                <Application.App>
                    <LoginSection />
                    <Fade in={true} timeout={2000}>
                        <Application.TableWrapper>
                            <PersonsTableHeader />
                            <Application.Table>
                                <PersonsTableSortArea />
                                <PersonsTableContent />
                            </Application.Table>
                        </Application.TableWrapper>
                    </Fade>
                </Application.App>
                <MessageBox />
            </Suspense>
        </>
    );
}

const mapStateToProps = state => ({
    isError: state.isError,
    errorMessage: state.errorMessage,
    isLoading: state.isLoading,
    user: state.user,
});

function mapDispatchToProps(dispatch) {
    return {
        login: data => dispatch(login(data)),
        hideError: () => dispatch(hideError()),
        load: (x, y) => dispatch(load(x, y)),
    };
}
const Persons = connect(mapStateToProps, mapDispatchToProps)(PrepareApp);

export default Persons;
