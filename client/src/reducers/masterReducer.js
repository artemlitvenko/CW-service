import {
    SET_MASTER,
    ADD_MASTER,
    UPDATE_MASTER,
    REMOVE_MASTER,
    SET_POPUP_ADD_DISPLAY_MASTER,
    SET_POPUP_EDIT_DISPLAY_MASTER,
} from '../constarts/actionMasterTypes';

const defaultState = {
    masters: [],
    popupAddDisplay: false,
    popupEditDisplay: false,
};

export default function cityReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MASTER:
            return {
                ...state,
                masters: action.payload,
            };
        case ADD_MASTER:
            return {
                ...state,
                masters: [...state.masters, action.payload],
            };
        case UPDATE_MASTER:
            return {
                ...state,
                masters: [...state.masters.map((master) => (master._id === action.payload._id ? action.payload : master))],
            };
        case REMOVE_MASTER:
            return {
                ...state,
                masters: [...state.masters.filter((master) => master._id !== action.payload)],
            };
        case SET_POPUP_ADD_DISPLAY_MASTER:
            return {
                ...state,
                popupAddDisplay: action.payload,
            };
        case SET_POPUP_EDIT_DISPLAY_MASTER:
            return {
                ...state,
                popupEditDisplay: action.payload,
            };
        default:
            return state;
    }
}
