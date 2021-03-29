import { ADD_CITY, REMOVE_CITY, SET_CITY, SET_POPUP_ADD_DISPLAY, SET_POPUP_EDIT_DISPLAY, UPDATE_CITY } from './actionCityTypes';

export const setCity = (citiesAction) => ({
    type: SET_CITY,
    payload: citiesAction,
});

export const addCity = (citiesAction) => ({
    type: ADD_CITY,
    payload: citiesAction,
});

export const updateCity = (citiesAction) => ({
    type: UPDATE_CITY,
    payload: citiesAction,
});

export const removeCity = (cityId) => ({
    type: REMOVE_CITY,
    payload: cityId,
});

export const setPopupAddDisplay = (display) => ({
    type: SET_POPUP_ADD_DISPLAY,
    payload: display,
});
export const setPopupEditDisplay = (display) => ({
    type: SET_POPUP_EDIT_DISPLAY,
    payload: display,
});
