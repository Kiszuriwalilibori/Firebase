import lowerCase from "lodash/lowerCase";
import { Person, PersonFields, Persons } from "types";

const fields: PersonFields[] = ["firebaseRef", "name", "email", "user"];

export function sortPersons(ary: Persons, isDescending: boolean, key: number, func = lowerCase) {
    const comparatorDescending = (a: Person, b: Person) => {
        if (func(a[fields[key]]) > func(b[fields[key]])) {
            return -1;
        }
        if (func(b[fields[key]]) > func(a[fields[key]])) {
            return 1;
        }
        return 0;
    };

    const comparatorAscending = (a: Person, b: Person) => {
        if (func(a[fields[key]]) > func(b[fields[key]])) {
            return 1;
        }
        if (func(b[fields[key]]) > func(a[fields[key]])) {
            return -1;
        }
        return 0;
    };

    return isDescending ? [...ary].sort(comparatorDescending) : [...ary].sort(comparatorAscending);
}

export default sortPersons;
