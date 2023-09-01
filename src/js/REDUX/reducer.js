import * as actions from "./actions";
import initialState from "./initialState";
import { sortFigures } from "../functions";

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

        case actions.SORT:
            const { isSortDescending, columnSortBy } = action.payload;
            const sorted_items = sortFigures([...state.items], isSortDescending, columnSortBy);
            return {
                ...state,
                items: sorted_items,
                isHiddenAddedUserMsg: true,
                isSortDescending,
                columnSortBy,
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
        case actions.SHOW_WARNING:
            return {
                ...state,
                isAlert: true,
                errorMessage: action.payload,
            };
        case actions.HIDE_WARNING:
            return {
                ...state,
                isAlert: false,
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

        case actions.GET_DATA_DONE:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
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
            console.log("unknown action", action.type);
            return state;
    }
};

export default reducer;
