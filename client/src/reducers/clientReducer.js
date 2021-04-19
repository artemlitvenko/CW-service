import { ADD_CLIENT, REMOVE_CLIENT, SET_CLIENT } from '../constarts/actionClientTypes';

const defaultState = {
    clients: [],
};

export default function clientReducer(state = defaultState, action) {
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
        case REMOVE_CLIENT:
            return {
                ...state,
                clients: [...state.clients.filter((client) => client._id !== action.payload)],
            };
        default:
            return state;
    }
}
