import { createSelector } from "reselect";

export const rootAuth = state => state.auth;

export const userSelector = createSelector(rootAuth, data => {
    return data.user
});