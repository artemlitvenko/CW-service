import { SET_MASTER_FOR_CITY, SET_MASTER_LOADED } from '../constarts/actionOrderTypes';

const defaultState = {
    masters: [],
    loaded: false,
};

export default function orderFormReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MASTER_FOR_CITY:
            return {
                ...state,
                masters: action.payload,
                loaded: true,
            };
        case SET_MASTER_LOADED:
            return {
                ...state,
                loaded: action.payload,
            };
        default:
            return state;
    }
}
