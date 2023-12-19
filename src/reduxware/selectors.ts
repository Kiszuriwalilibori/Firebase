import { createSelector } from "@reduxjs/toolkit";
import { PERSONS_LIMIT } from "config";
import { RootStateType } from "../components/AppProvider";

const user = (store: RootStateType) => store.user;
const persons = (store: RootStateType) => store.persons;

const setPersonsInRange = (persons: RootStateType["persons"]) => (persons.length < PERSONS_LIMIT ? true : false);

const setPersonsWithAuth = (persons: RootStateType["persons"], user: RootStateType["user"] | undefined) => {
    persons.forEach(person => {
        const isAuthorised = user && user.displayName && person.user === user.displayName ? true : false;
        person.isAuthorised = isAuthorised;
    });
    return persons;
};

const getBoolean = (item: any) => Boolean(item);

export const selectIsLogged = createSelector(user, getBoolean);
export const selectArePersonsInRange = createSelector(persons, setPersonsInRange);
export const selectPersons = createSelector(persons, user, setPersonsWithAuth);
