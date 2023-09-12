import * as actions from "./actions";
import initialState from "./initialState";
import { sortPersons } from "../functions";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SUBMIT_USER:
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
            const sortedPersons = sortPersons([...state.persons], isDescending, column, action.payload);

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
            return {
                ...state,
                user: action.payload,
            };

        case actions.LOGOUT:
            return {
                ...state,
                user: null,
            };

        default:
            // console.log("unknown action", action.type);
            return state;
    }
};

export default reducer;
