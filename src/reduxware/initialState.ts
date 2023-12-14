import { Persons, User } from "types";

const initialState = {
    persons: [] as Persons,
    isError: false,
    errorMessage: "",
    message: null,
    isMessage: false,
    sortParams: { column: undefined, isDescending: false },
    isHiddenInputForm: true,
    isHiddenAddUserButton: false,
    isHiddenAddedUserMsg: true,
    isLoading: false,
    user: undefined as unknown as User,
    submitDisabled: false,
};
export default initialState;
