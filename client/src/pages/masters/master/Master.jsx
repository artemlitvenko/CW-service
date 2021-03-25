import React, {useCallback} from 'react';
import './Master.css';
import {useDispatch} from "react-redux";
import {deleteMaster} from "../../../actions/master";
import {setPopupEditDisplayMaster} from "../../../constarts/actionMasterСreaters";

const Master = ({master, setCurrentMasterId}) => {
    const dispatch = useDispatch();

    const deleteClickHandler = useCallback((e) => {
        e.stopPropagation()
        dispatch(deleteMaster( master._id ))
    }, []);

    const showPopupEditHandler = useCallback(() => {
        dispatch(setPopupEditDisplayMaster(true))
        setCurrentMasterId(master._id)
    }, []);

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