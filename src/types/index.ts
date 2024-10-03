import { User, FirebaseError } from "firebase";
import { GetPersons } from "thunks/getPersons";

import { AppDispatch, RootStateType } from "components/AppProvider";
type ArgumentsType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never;

interface ErrorType {
    isError: boolean;
    errorMessage: string | undefined;
}

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

export {
    AppDispatch,
    ArgumentsType,
    ErrorType,
    FirebaseError,
    GetPersons,
    HTMLClick,
    Person,
    PersonFields,
    PurePerson,
    Persons,
    RootStateType,
    SortParams,
    User,
};
