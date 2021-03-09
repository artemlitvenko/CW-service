import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import useReducer from "./userReducer";


const rootReduser = combineReducers({
    user: useReducer
});

export  const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

