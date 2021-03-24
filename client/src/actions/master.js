import axios from "axios";
import {API_URL} from "../config";
import {addMaster, removeMaster, setMaster} from "../reducers/masterReducer";



export const getMaster = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/master`);
            dispatch(setMaster(response.data));
        } catch (e) {

        }
    }
}

export const createMaster = (name, rating) => {
    debugger
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/master`, {name, rating});
            dispatch(addMaster(response.data));
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateMaster = (_id, name) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${API_URL}api/master/${_id}`, {_id, name});
            dispatch(updateMaster(response.data));
        } catch (e) {
            console.log('Update master is crash', e.message)
        }
    }
}

export const deleteMaster = (_id) => {
    return async dispatch => {
        try {
            await axios.delete(`${API_URL}api/master/${_id}`);
            dispatch(removeMaster(_id));
        } catch (e) {
            console.log(e.message)
        }
    }
}








