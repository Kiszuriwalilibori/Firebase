import { Items } from "types";

const initialState = {
  isLoading: false,
  items: [] as Items,
  isError: false,
  errorMessage: "",
  message: null,
  columnSortBy: null,
  isSortDescending: false,
  isHiddenInputForm: true,
  isHiddenAddUserButton: false,
  isHiddenAddedUserMsg: true,
  isNotLimitReached: true,
  spinnerVisible: false,
  isAlert: false,
  limit: 15,
  user: null,
  submitDisabled: false,
};
export default initialState;
