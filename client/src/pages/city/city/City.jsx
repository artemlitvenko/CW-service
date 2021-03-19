import React from 'react';
import './City.css';
import {useDispatch} from "react-redux";
import {setPopupEditDisplay} from "../../../reducers/cityReducer";
import {deleteCity} from "../../../actions/city";

const City = ({city, setCurrentId}) => {
    const dispatch = useDispatch();
    //const city = city.city

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteCity( city._id ))
    }
    function showPopupEditHandler() {
        dispatch(setPopupEditDisplay('flex'))
        setCurrentId(city._id)
    }
    return (
        <div className="list-item">
            <div className="list-content">
                {city.city_name}
            </div>
            <div className="btn-item">
                <button className="edit-btn" onClick={() => showPopupEditHandler()}>Edit</button>
                <button className="delete-btn"  onClick={(e) => deleteClickHandler(e)}>Delete</button>
            </div>
        </div>
    );
}

export default City;