import { ADD_ORDER, SET_ORDER } from '../constarts/actionOrderTypes';

const defaultState = {
    orders: [],
};

export default function orderFormReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,
                orders: action.payload,
            };
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.masters, action.payload],
            };
        default:
            return state;
    }
}
