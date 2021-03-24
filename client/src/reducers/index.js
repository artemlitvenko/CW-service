import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import cityReducer from "./cityReducer";
import masterReducer from "./masterReducer";


const rootReduser = combineReducers({
    user: userReducer,
    cityReducer: cityReducer,
    masterReducer: masterReducer
});

export  const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

