import {
    ADD_ORDER,
    REMOVE_ORDER,
    SET_MASTER_FOR_CITY,
    SET_MASTER_LOADED,
    SET_ORDER,
    SET_POPUP_ADD_DISPLAY_ORDER,
    SET_POPUP_CREATE_DISPLAY_ORDER,
    SET_POPUP_EDIT_DISPLAY_ORDER,
    UPDATE_ORDER,
} from './actionOrderTypes';

export const setMastersForOrder = (masterOrderAction) => ({
    type: SET_MASTER_FOR_CITY,
    payload: masterOrderAction,
});
export const setMastersLoaded = (masterLoaded) => ({
    type: SET_MASTER_LOADED,
    payload: masterLoaded,
});
export const setOrder = (getOrderAction) => ({
    type: SET_ORDER,
    payload: getOrderAction,
});
export const addOrder = (addOrderAction) => ({
    type: ADD_ORDER,
    payload: addOrderAction,
});
export const updateOrders = (orderAction) => ({
    type: UPDATE_ORDER,
    payload: orderAction,
});

export const removeOrder = (orderId) => ({
    type: REMOVE_ORDER,
    payload: orderId,
});
export const setPopupCreateDisplayOrder = (display) => ({
    type: SET_POPUP_CREATE_DISPLAY_ORDER,
    payload: display,
});
