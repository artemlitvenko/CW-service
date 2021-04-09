import axios from 'axios';
import { API_URL } from '../config';
import { addOrder, setMastersForOrder } from '../constarts/actionOrderСreaters';

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
