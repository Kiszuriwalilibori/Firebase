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

export { ErrorType, FirebaseError, Item, Items, Sort, User };
