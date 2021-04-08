import axios from 'axios';
import { API_URL } from '../config';
import { addClient, removeClient, setClient, updateClients } from '../constarts/actionClientСreaters';

/*export const createClient = (name, rating, city) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}api/client`, { name, rating, city });
            dispatch(addClient(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};*/

/*export const getOneClient = (clientEmail) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}api/client/client`, {
                params: {
                    clientEmail: clientEmail,
                },
            });
            dispatch(setOneClient(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};*/

export const getClient = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}api/client`);
            dispatch(setClient(response.data));
        } catch (e) {}
    };
};

export const updateClient = (_id, name, rating, city) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}api/client/${_id}`, { _id, name, rating, city });
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
