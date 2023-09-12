import { User, FirebaseError } from "firebase";
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

type PersonFields = "email" | "name" | "firebaseRef" | "user";

type PurePerson = { [key in PersonFields]: string };
interface Person extends PurePerson {
    isAuthorised?: boolean;
}
type Persons = Person[];

type HTMLClick = (e: React.MouseEvent<HTMLElement>) => void;

interface SortParams {
    column: undefined | number;
    isDescending: boolean;
}

export { ErrorType, FirebaseError, HTMLClick, Person, PersonFields, Persons, Redirect, Sort, SortParams, User };
