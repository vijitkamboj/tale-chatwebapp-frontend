import * as actionTypes from "./types";

export const setUser = (user) => {
    return ({
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    })
}// used to change the current user state

export const clearUser = (value) => {
    return({
        type: actionTypes.CLEAR_USER,
        payload: {
            currentUser: null,
        }
    })
}

export const changeRegisterStatus = (value) => {
    return ({
        type: actionTypes.CHANGE_REGISTER_STATUS,
        payload: {
            register_status:value
        }
    })
}