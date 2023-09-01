import { Items, User } from "types";

const initialState = {
    items: [] as Items,
    isError: false,
    errorMessage: "",
    message: null,
    isMessage: false,
    columnSortBy: undefined as undefined | number,
    isSortDescending: false,
    isHiddenInputForm: true,
    isHiddenAddUserButton: false,
    isHiddenAddedUserMsg: true,
    isNotLimitReached: true,
    isLoading: false,
    isAlert: false,
    limit: 15,
    user: undefined as unknown as User,
    submitDisabled: false,
};
export default initialState;
