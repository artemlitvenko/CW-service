import {
    SET_MASTER,
    ADD_MASTER,
    UPDATE_MASTER,
    REMOVE_MASTER,
    SET_POPUP_ADD_DISPLAY_MASTER,
    SET_POPUP_EDIT_DISPLAY_MASTER
} from "./actionMasterTypes";

export const setMaster = (masterAction) => ({
    type: SET_MASTER, payload: masterAction
});

export const addMaster = (masterAction) => ({
    type: ADD_MASTER, payload: masterAction
});

export const updateMasters = (masterAction) => ({
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