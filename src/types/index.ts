import { User, FirebaseError } from "firebase";

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

type SetUser = Omit<PurePerson, "firebaseRef">;
type Persons = Person[];
type HTMLClick = (e: React.MouseEvent<HTMLElement>) => void;

interface SortParams {
    column: undefined | number;
    isDescending: boolean;
}

export { ArgumentsType, ErrorType, FirebaseError, HTMLClick, Person, PersonFields, Persons, SetUser, SortParams, User };
