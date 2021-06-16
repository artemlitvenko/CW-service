import axios from 'axios';
import { API_URL } from '../config';
import { addOrder, removeOrder, setMastersForOrder, setOrder, updateOrders } from '../constarts/actionOrderСreaters';

export const getMastersForOrder = (orderCity, startDate, endDate) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}api/order/master`, {
                params: {
                    orderCity: orderCity,
                    startDate: startDate,
                    endDate: endDate,
                },
            });
            dispatch(setMastersForOrder(response.data));
        } catch (e) {}
    };
};
export const createOrder = (client_name, client_email, master, city, size, start_time, end_time) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}api/order`, { client_name, client_email, master, city, size, start_time, end_time });
            dispatch(addOrder(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const getOrder = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}api/order`);
            dispatch(setOrder(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateOrder = (_id, body) => {
    return async (dispatch) => {
        debugger;
        try {
            const response = await axios.put(`${API_URL}api/order/${_id}`, {
                _id,
                body,
            });
            dispatch(updateOrders(response.data));
        } catch (e) {
            console.log('Update master is crash', e.message);
        }
    };
};

export const deleteOrder = (_id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${API_URL}api/order/${_id}`);
            dispatch(removeOrder(_id));
        } catch (e) {
            console.log(e.message);
        }
    };
};
