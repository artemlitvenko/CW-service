import axios from 'axios';
import { API_URL } from '../config';
import { addCity, removeCity, setCity, updateCity } from '../constarts/actionCityСreaters';

export const getCity = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}api/city`);
            dispatch(setCity(response.data));
        } catch (e) {}
    };
};

export const createCity = (city_name) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}api/city`, { city_name });
            dispatch(addCity(response.data));
        } catch (e) {}
    };
};

export const updateCities = (_id, city_name) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}api/city/${_id}`, { city_name });
            dispatch(updateCity(response.data));
        } catch (e) {
            console.log('Update city is crash', e.message);
        }
    };
};

export const deleteCity = (_id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${API_URL}api/city/${_id}`);
            dispatch(removeCity(_id));
        } catch (e) {
            console.log(e.message);
        }
    };
};
