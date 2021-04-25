import loginTypes from "./loginTypes";

const loginReducer = (state = { loggedUser: "" }, action) => {
    switch (action.type) {
        case loginTypes.UPDATE_LOGGED_USER: {
            return {
                ...state, loggedUser: action.payload 
            }
        }
        default:
            return state
    };
};

export default loginReducer;