const SET_MASTER = "SET_MASTER";
const ADD_MASTER = "ADD_MASTER";
const REMOVE_MASTER = "REMOVE_MASTER";
const UPDATE_MASTER = "UPDATE_MASTER";
const SET_POPUP_ADD_DISPLAY_MASTER = "SET_POPUP_ADD_DISPLAY_MASTER";
const SET_POPUP_EDIT_DISPLAY_MASTER = "SET_POPUP_EDIT_DISPLAY_MASTER";


const defaultState = {
    masters: [],
    popupAddDisplay: 'none',
    popupEditDisplay: 'none'
};

export default function cityReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MASTER:
            return {
                ...state, // перезаписываем все поля в текущем state
                masters: action.payload // перезаписываем city данными которые лежат в объекте action, в поле payload
            }
        case ADD_MASTER:
            return {
                ...state,
                masters: [...state.masters, action.payload]
            }
        case UPDATE_MASTER:
            return {
                ...state,
                masters: [...state.masters.map(master => master._id === action.payload._id ? action.payload : master)]
            }
        case REMOVE_MASTER:
            return {
                ...state,
                masters: [...state.masters.filter(master => master._id !== action.payload)]
            }
        case SET_POPUP_ADD_DISPLAY_MASTER:
            return {
                ...state,
                popupAddDisplay: action.payload
            }
        case SET_POPUP_EDIT_DISPLAY_MASTER:
            return {
                ...state,
                popupEditDisplay: action.payload
            }
        default:
            return state;
    }
}

// action creaters
export const setMaster = (masterAction) => ({
    type: SET_MASTER, payload: masterAction
});

export const addMaster = (masterAction) => ({
    type: ADD_MASTER, payload: masterAction
});

export const updateMaster = (masterAction) => ({
    type: UPDATE_MASTER, payload: masterAction
});

export const removeMaster = (masterId) => ({
    type: REMOVE_MASTER, payload: masterId
});
export const setPopupAddDisplayMaster = (display) => ({
    type: SET_POPUP_ADD_DISPLAY_MASTER, payload: display
});
export const setPopupEditDisplayMaster = (display) => ({
    type: SET_POPUP_EDIT_DISPLAY_MASTER, payload: display
});
