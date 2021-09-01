import { CLEAR_USER, SET_USER } from "./constant"

export const setUserAction = payload => {
    return {
        type: SET_USER,
        payload
    }
}

export const clearUserAction = () => {
    return {
        type: CLEAR_USER
    }
}