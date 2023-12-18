import * as actions from "./actions";
import initialState from "./initialState";
import { sortPersons } from "../functions";
import { Action } from "./actions";

export interface BaseAction {
    type: string;
    payload?: any;
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actions.SET_USER_SUBMITTED:
            return {
                ...state,
                isHiddenInputForm: true,
                isHiddenAddUserButton: false,
            };

        case actions.SHOW_ADD_USER_FORM:
            return state.isHiddenInputForm
                ? {
                      ...state,
                      isHiddenAddUserButton: true,
                      isHiddenInputForm: false,
                  }
                : { ...state };

        case actions.PERSONS_SORT:
            const { isDescending, column } = action.payload;
            const sortedPersons = sortPersons([...state.persons], isDescending, column);

            return {
                ...state,
                persons: sortedPersons,
                sortParams: { ...action.payload },
                isHiddenAddedUserMsg: true,
            };
        case actions.SHOW_ERROR:
            return {
                ...state,
                isError: true,
                errorMessage: action.payload ? action.payload : "Nieokreślony błąd",
            };
        case actions.HIDE_ERROR:
            return {
                ...state,
                isError: false,
                errorMessage: null,
            };

        case actions.SET_LOADING_TRUE:
            return {
                ...state,
                isLoading: true,
            };
        case actions.SET_LOADING_FALSE:
            return {
                ...state,
                isLoading: false,
            };

        case actions.TOGGLE_SUBMIT:
            const toggled_submit = !state.submitDisabled;
            return {
                ...state,
                submitDisabled: toggled_submit,
            };

        case actions.PERSONS_SET:
            return {
                ...state,
                isLoading: false,
                persons: action.payload,
            };
        case actions.HIDE_ADDED_USER_MESSAGE:
            return {
                ...state,
                isHiddenAddedUserMsg: true,
            };

        case actions.LOGIN:
            const personsForLogin = [...state.persons];
            personsForLogin.forEach(person => {
                if (person.firebaseRef === action.payload.firebaseRef) {
                    person.isAuthorised = true;
                }
            });
            return {
                ...state,
                user: action.payload,
                persons: personsForLogin,
            };

        case actions.LOGOUT:
            const personsForLogout = [...state.persons];
            personsForLogout.forEach(person => {
                if (person.firebaseRef === state.user.uid) {
                    person.isAuthorised = false;
                }
            });
            return {
                ...state,
                user: null,
                persons: personsForLogout,
            };

        default:
            return state;
    }
};

export default reducer;
