import { ADD_ORDER, SET_MASTER_FOR_CITY, SET_ORDER } from './actionOrderTypes';

export const setMastersForOrder = (masterOrderAction) => ({
    type: SET_MASTER_FOR_CITY,
    payload: masterOrderAction,
});
export const setOrder = (getOrderAction) => ({
    type: SET_ORDER,
    payload: getOrderAction,
});
export const addOrder = (addOrderAction) => ({
    type: ADD_ORDER,
    payload: addOrderAction,
});
