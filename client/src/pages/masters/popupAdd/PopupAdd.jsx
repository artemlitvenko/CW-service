import React, {useCallback, useState} from 'react';
import Input from "../../../components/input/Input";
import './PopupAdd.css';
import {useDispatch, useSelector} from "react-redux";
import {setPopupAddDisplayMaster} from "../../../constarts/actionMasterСreaters";
import {createMaster} from "../../../actions/master";

const PopupAdd = () => {
    const dispatch = useDispatch();
    const [masterName, setMasterName] = useState();
    const [masterRating, setMasterRating] = useState({rating: ''});
    const popupDisplay = useSelector(state => state.masterReducer.popupAddDisplay);

    const createHandler = () => {
        debugger
        dispatch(createMaster( masterName, masterRating ))
        debugger
        dispatch(setPopupAddDisplayMaster(false))
    };

    if(!popupDisplay) {
        return null;
    }

    return (
        <div className="popup popup-add" onClick={() => dispatch(setPopupAddDisplayMaster(false))} >
            <div className="popup-content" onClick={(event => event.stopPropagation())}>
                <div className="popup-header">
                    <div className="popup-title">
                        Add new master
                    </div>
                    <button className="popup-close" onClick={() => dispatch(setPopupAddDisplayMaster(false))}>X</button>
                </div>
                <Input type="text" placeholder="New master name" name="name" value={masterName} setValue={setMasterName} />
                <h4>Master rating</h4>
                <select name="rating" value={masterRating.rating} onChange={(event) => setMasterRating(event.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button className="popup-send" onClick={() => createHandler()}>add master</button>
            </div>
        </div>
    );
};

export default PopupAdd;