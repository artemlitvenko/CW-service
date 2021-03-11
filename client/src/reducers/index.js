import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";


const rootReduser = combineReducers({
    user: userReducer
});

export  const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

