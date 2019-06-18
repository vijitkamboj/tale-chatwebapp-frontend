import * as actionTypes from "./types";

export const setUser = (user,status) => {
    return ({
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user,
            register_status:status
        }
    })
}// used to change the current user state

export const clearUser = () => {
    return({
        type: actionTypes.CLEAR_USER,
        payload: {
            currentUser: null,
        }
    })
}

export const changeRegisterStatus = (user,value) => {
    return ({
        type: actionTypes.CHANGE_REGISTER_STATUS,
        payload: {
            currentUser:user,
            register_status:value
        }
    })
}