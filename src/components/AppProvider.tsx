import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Firebase, { FirebaseContext } from "contexts/firebaseContext";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import reducer from "js/redux/reducer";
import thunk from "redux-thunk";
import * as serviceWorker from "../serviceWorker";

import "styles/App.css";
import React from "react";

const store = createStore(reducer, applyMiddleware(thunk));
const AppProvider: React.FC = ({ children }) => {
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
          <Router basename={process.env.PUBLIC_URL}>{children}</Router>
        </Provider>
      </SnackbarProvider>
    </FirebaseContext.Provider>
  );
};

export type RootStateType = ReturnType<typeof store.getState>;

serviceWorker.register();

export default AppProvider;
