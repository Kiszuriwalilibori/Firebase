import { createSelector } from "@reduxjs/toolkit";
import { LIMIT } from "config";
import { RootStateType } from "../../components/AppProvider";

const user = (store: RootStateType) => store.user;

const items = (store: RootStateType) => store.items;

const setIsTableNotFullYet = (items: any[]) => (items.length < LIMIT ? true : false);

const getBoolean = (item: any) => Boolean(item);

export const selectIsLogged = createSelector(user, getBoolean);
export const selectIsTableNotFullYet = createSelector(items, setIsTableNotFullYet);
