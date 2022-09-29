export const GET_DATA_DONE = "GET_DATA_DONE";
export const SORT = "SORT";
export const SHOW_ADD_USER_FORM = "SHOW_ADD_USER_FORM";
export const SUBMIT_USER = "SUBMIT";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";
export const SHOW_WARNING = "SHOW_WARNING";
export const HIDE_WARNING = "HIDE_WARNING";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const HIDE_MESSAGE = "HIDE_MESSAGE";
export const HIDE_ADDED_USER_MESSAGE = "HIDE_ADDED_USER_MESSAGE";
export const TOGGLE_SPINNER = "TOGGLE_SPINNER";
export const BLOCK_SUBMIT = "BLOCK_SUBMIT";
export const TOGGLE_SUBMIT = "TOGGLE_SUBMIT";

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

export function sort(data) {
  return {
    type: SORT,
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

export function showWarning(data) {
  return {
    type: SHOW_WARNING,
    payload: data,
  };
}

export function hideWarning() {
  return {
    type: HIDE_WARNING,
  };
}

export function showMessage(data) {
  return {
    type: SHOW_MESSAGE,
    payload: data,
  };
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
  };
}

export function toggleSpinner() {
  return {
    type: TOGGLE_SPINNER,
  };
}

export function getDataDone(data) {
  return {
    type: GET_DATA_DONE,
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

export function hideAddedUserMessage() {
  return {
    type: HIDE_ADDED_USER_MESSAGE,
  };
}

/**
 * todo prawdopodobnie SHOW_WARNING i HIDE_WARNING nie są nigdzie wykorzystywane, to samo w reducerze
 */
