import { User, FirebaseError } from "firebase";

type Item = string[];
type Items = Item[];

interface Sort {
    isSortDescending: boolean;
    columnSortBy: number;
}

interface ErrorType {
    isError: boolean;
    errorMessage: string | undefined;
}
type HistoryCall = () => void;
type PathKeys = "LANDING" | "LOGIN" | "PERSONS" | "ERROR";

type Redirect = {
    [Item in PathKeys]: HistoryCall;
};

export { ErrorType, FirebaseError, Item, Items, Redirect, Sort, User };
