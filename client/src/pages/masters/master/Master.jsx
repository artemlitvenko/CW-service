import React from 'react';
import './Master.css';
import {useDispatch} from "react-redux";
import {deleteMaster} from "../../../actions/master";
import {setPopupEditDisplayMaster} from "../../../reducers/masterReducer";

const Master = ({master, setCurrentMasterId}) => {
    const dispatch = useDispatch();

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteMaster( master._id ))
    }
    function showPopupEditHandler() {
        dispatch(setPopupEditDisplayMaster('flex'))
        setCurrentMasterId(master._id)
    }
    return (
        <div className="list-item">
            <div className="list-content">
                <div className="list-content-item">{master.name}</div>
                <div className="list-content-item">{master.city}</div>
                <div className="list-content-item">Rating: {master.rating}</div>
            </div>
            <div className="btn-item">
                <button className="edit-btn" onClick={() => showPopupEditHandler()}>Edit</button>
                <button className="delete-btn"  onClick={(e) => deleteClickHandler(e)}>Delete</button>
            </div>
        </div>
    );
}

export default Master;