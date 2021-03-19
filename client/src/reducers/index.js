import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import cityReducer from "./cityReducer";


const rootReduser = combineReducers({
    user: userReducer,
    cityReducer: cityReducer
});

export  const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

