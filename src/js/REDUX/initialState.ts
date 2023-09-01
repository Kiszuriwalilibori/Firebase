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
    isLoading: false,
    user: undefined as unknown as User,
    submitDisabled: false,
};
export default initialState;
