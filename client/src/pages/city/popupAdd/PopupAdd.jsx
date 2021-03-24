import React, {useCallback, useState} from 'react';
import Input from "../../../components/input/Input";
import './PopupAdd.css';
import {useDispatch, useSelector} from "react-redux";
import {createCity} from "../../../actions/city";
import {setPopupAddDisplay} from "../../../constarts/actionСreaters";

const PopupAdd = () => {
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState();
    const popupDisplay = useSelector(state => state.cityReducer.popupAddDisplay);

    const createHandler = useCallback(() => {
        dispatch(createCity( cityName ));
        dispatch(setPopupAddDisplay('none'));
    }, [cityName]);

    return (
        <div className="popup popup-add" onClick={() => dispatch(setPopupAddDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup-content" onClick={(event => event.stopPropagation())}>
                <div className="popup-header">
                    <div className="popup-title">
                        Add new city
                    </div>
                    <button className="popup-close" onClick={() => dispatch(setPopupAddDisplay('none'))}>X</button>
                </div>
                <Input type="text" placeholder="New city name" value={cityName} setValue={setCityName} />
                <button className="popup-send" onClick={() => createHandler()}>add city</button>
            </div>
        </div>
    );
};

export default PopupAdd;