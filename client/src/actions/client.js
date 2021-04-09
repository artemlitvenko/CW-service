import axios from 'axios';
import { API_URL } from '../config';
import { removeClient, setClient, updateClients } from '../constarts/actionClientСreaters';

export const getClient = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}api/client`);
            dispatch(setClient(response.data));
        } catch (e) {}
    };
};

export const updateClient = () => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}api/client/${_id}`, {});
            dispatch(updateClients(response.data));
        } catch (e) {
            console.log('Update Client is crash', e.message);
        }
    };
};

export const deleteClient = (_id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${API_URL}api/client/${_id}`);
            dispatch(removeClient(_id));
        } catch (e) {
            console.log(e.message);
        }
    };
};
