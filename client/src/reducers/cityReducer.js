const SET_CITY = "SET_CITY";
const ADD_CITY = "ADD_CITY";
const REMOVE_CITY = "REMOVE_CITY";
const UPDATE_CITY = "UPDATE_CITY";
const SET_POPUP_ADD_DISPLAY = "SET_POPUP_ADD_DISPLAY";
const SET_POPUP_EDIT_DISPLAY = "SET_POPUP_EDIT_DISPLAY";

const defaultState = {
    cities: [],
    popupAddDisplay: 'none',
    popupEditDisplay: 'none'
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

// action creaters
export const setCity = (citiesAction) => ({
    type: SET_CITY, payload: citiesAction
});

export const addCity = (citiesAction) => ({
    type: ADD_CITY, payload: citiesAction
});

export const updateCity = (citiesAction) => ({
    type: UPDATE_CITY, payload: citiesAction
});

export const removeCity = (cityId) => ({
    type: REMOVE_CITY, payload: cityId
});

export const setPopupAddDisplay = (display) => ({
    type: SET_POPUP_ADD_DISPLAY, payload: display
});
export const setPopupEditDisplay = (display) => ({
    type: SET_POPUP_EDIT_DISPLAY, payload: display
});
