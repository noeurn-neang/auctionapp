import * as Actions from "./constant";

const initState = {
    user: localStorage.getItem("user")
}

const authReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case Actions.SET_USER:
            return {
                ...state,
                user: payload
            };
        case Actions.CLEAR_USER:
            return {
                user: null
            };
        default: 
            return state;

    }
};

export default authReducer;