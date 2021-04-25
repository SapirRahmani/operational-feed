import { combineReducers } from "redux";

import coldStartReducer from "../components/feed/components/coldStart/redux/coldStartReducer";
import loginReducer from "../components/login/redux/loginReducer";

export default combineReducers({
    coldStart: coldStartReducer,
    login: loginReducer,
});
