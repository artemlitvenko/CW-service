import { ADD_CLIENT, REMOVE_CLIENT, SET_CLIENT } from './actionClientTypes';

export const setClient = (clientAction) => ({
    type: SET_CLIENT,
    payload: clientAction,
});

export const addClient = (clientAction) => ({
    type: ADD_CLIENT,
    payload: clientAction,
});

export const removeClient = (clientId) => ({
    type: REMOVE_CLIENT,
    payload: clientId,
});
