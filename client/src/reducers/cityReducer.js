import {
    ADD_CITY,
    REMOVE_CITY,
    SET_CITY,
    SET_POPUP_ADD_DISPLAY,
    SET_POPUP_EDIT_DISPLAY,
    UPDATE_CITY
} from "../constarts/actionTypes";


const defaultState = {
    cities: [],
    popupAddDisplay: false,
    popupEditDisplay: false
};

export default function cityReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CITY:
            return {
                ...state, // перезаписываем все поля в текущем state
                cities: action.payload // перезаписываем city данными которые лежат в объекте action, в поле payload
            }
        case ADD_CITY:
            return {
                ...state,
                cities: [...state.cities, action.payload]
            }
        case UPDATE_CITY:
            return {
                ...state,
                cities: [...state.cities.map(city => city._id === action.payload._id ? action.payload : city)]
            }
        case REMOVE_CITY:
            return {
                ...state,
                cities: [...state.cities.filter(city => city._id !== action.payload)]
            }
        case SET_POPUP_ADD_DISPLAY:
            return {
                ...state,
                popupAddDisplay: action.payload
            }
        case SET_POPUP_EDIT_DISPLAY:
            return {
                ...state,
                popupEditDisplay: action.payload
            }
        default:
            return state;
    }
}