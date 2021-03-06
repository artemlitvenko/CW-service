import {
    ADD_ORDER,
    REMOVE_ORDER,
    SET_ORDER,
    SET_POPUP_CREATE_DISPLAY_ORDER,
    UPDATE_ORDER,
    POPUP_CALENDAR_DISPLAY_ORDER,
    POPUP_CALENDAR_EDIT_DISPLAY_ORDER,
    POPUP_AFTER_EDIT_DISPLAY_ORDER,
} from '../constarts/actionOrderTypes';

const defaultState = {
    orders: [],
    popupCreateDisplay: false,
    popupCalendarDisplay: false,
    popupCalendarEditDisplay: false,
    popupAfterEditDisplay: false,
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
                orders: [...state.orders, action.payload],
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
        case POPUP_CALENDAR_DISPLAY_ORDER:
            return {
                ...state,
                popupCalendarDisplay: action.payload,
            };
        case POPUP_CALENDAR_EDIT_DISPLAY_ORDER:
            return {
                ...state,
                popupCalendarEditDisplay: action.payload,
            };
        case POPUP_AFTER_EDIT_DISPLAY_ORDER:
            return {
                ...state,
                popupAfterEditDisplay: action.payload,
            };
        default:
            return state;
    }
}
