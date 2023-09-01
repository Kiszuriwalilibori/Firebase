import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Firebase, { FirebaseContext } from "contexts/firebaseContext";
import { HashRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import reducer from "js/redux/reducer";
import thunk from "redux-thunk";

import "styles/App.css";
import React from "react";
import { register } from "serviceWorkerRegistration";

const store = createStore(reducer, applyMiddleware(thunk)); // do not ever update or app will break

export const AppProvider: React.FC = ({ children }) => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                preventDuplicate={true}
            >
                <Provider store={store}>
                    <Router>{children}</Router>
                </Provider>
            </SnackbarProvider>
        </FirebaseContext.Provider>
    );
};

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
register();

export default AppProvider;
