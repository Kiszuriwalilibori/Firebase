export const GET_DATA_DONE = "GET_DATA_DONE";
export const SORT = "SORT";
export const SHOW_ADD_USER_FORM = "SHOW_ADD_USER_FORM";
export const SUBMIT_USER = "SUBMIT";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";
export const HIDE_ADDED_USER_MESSAGE = "HIDE_ADDED_USER_MESSAGE";
export const BLOCK_SUBMIT = "BLOCK_SUBMIT";
export const TOGGLE_SUBMIT = "TOGGLE_SUBMIT";
export const SET_LOADING_TRUE = "LOADING_TRUE";
export const SET_LOADING_FALSE = "LOADING_FALSE";
export const PERSONS_SET = "PERSONS_SET";
export const PERSONS_SORT = "PERSONS_SORT";

export function toggleSubmit() {
    return { type: TOGGLE_SUBMIT };
}

export function blockSubmit() {
    return { type: BLOCK_SUBMIT };
}

export function submitUser(data) {
    return { type: SUBMIT_USER, payload: data };
}

export function showAddUserForm() {
    return { type: SHOW_ADD_USER_FORM };
}

export function sortPersons(data) {
    return {
        type: PERSONS_SORT,
        payload: data,
    };
}

export function showError(data) {
    return {
        type: SHOW_ERROR,
        payload: data,
    };
}

export function hideError() {
    return {
        type: HIDE_ERROR,
    };
}

export function startLoading() {
    return {
        type: SET_LOADING_TRUE,
    };
}
export function stopLoading() {
    return {
        type: SET_LOADING_FALSE,
    };
}

export function setPersons(data) {
    return {
        type: PERSONS_SET,
        payload: data,
    };
}

export function login(data) {
    return {
        type: LOGIN,
        payload: data,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
