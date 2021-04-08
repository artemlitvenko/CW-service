import { ADD_CLIENT, GET_ONE_CLIENT, REMOVE_CLIENT, SET_CLIENT, UPDATE_CLIENT } from '../constarts/actionClientTypes';

const defaultState = {
    clients: [],
};

export default function orderReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CLIENT:
            return {
                ...state,
                clients: action.payload,
            };
        case ADD_CLIENT:
            return {
                ...state,
                clients: [...state.clients, action.payload],
            };
        case UPDATE_CLIENT:
            return {
                ...state,
                clients: [...state.clients.map((client) => (client._id === action.payload._id ? action.payload : client))],
            };
        case REMOVE_CLIENT:
            return {
                ...state,
                clients: [...state.clients.filter((client) => client._id !== action.payload)],
            };
        default:
            return state;
    }
}
