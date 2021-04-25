import loginTypes from "./loginTypes";

export const updateLoggedUser = loggedUser => ({
    type: loginTypes.UPDATE_LOGGED_USER,
    payload: loggedUser,
});