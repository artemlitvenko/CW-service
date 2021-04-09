import { SET_MASTER_FOR_CITY } from '../constarts/actionOrderTypes';

const defaultState = {
    masters: [],
};

export default function orderFormReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MASTER_FOR_CITY:
            return {
                ...state,
                masters: action.payload,
            };
        default:
            return state;
    }
}
