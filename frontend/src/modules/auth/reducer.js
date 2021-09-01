import * as Actions from "./constant";

const initState = {
    user: {
        id: 1,
        name: "Neang"
    }
}

const authReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case Actions.SET_USER:
            return {
                ...state,
                user: payload
            };
        default: 
            return state;

    }
};

export default authReducer;