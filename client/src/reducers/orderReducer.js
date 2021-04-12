import { ADD_ORDER, REMOVE_ORDER, SET_ORDER, SET_POPUP_CREATE_DISPLAY_ORDER, UPDATE_ORDER } from '../constarts/actionOrderTypes';

const defaultState = {
    orders: [],
    popupCreateDisplay: false,
};

export default function orderReducer(state = defaultState, action) {
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
        case UPDATE_ORDER:
            return {
                ...state,
                orders: [...state.orders.map((order) => (order._id === action.payload._id ? action.payload : order))],
            };
        case REMOVE_ORDER:
            return {
                ...state,
                orders: [...state.orders.filter((order) => order._id !== action.payload)],
            };
        case SET_POPUP_CREATE_DISPLAY_ORDER:
            return {
                ...state,
                popupCreateDisplay: action.payload,
            };
        default:
            return state;
    }
}
