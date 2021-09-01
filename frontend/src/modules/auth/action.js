import { SET_USER } from "./constant"

export const setUserAction = payload => {
    return {
        type: SET_USER,
        payload
    }
}