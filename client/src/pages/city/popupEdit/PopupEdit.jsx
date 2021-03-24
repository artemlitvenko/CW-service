import React, {useState, useEffect, useCallback} from 'react';
import Input from "../../../components/input/Input";
import './PopupEdit.css';
import {useDispatch, useSelector} from "react-redux";
import {updateCities} from "../../../actions/city";
import {setPopupEditDisplay} from "../../../constarts/actionСreaters";

const PopupEdit = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const [editCityName, editSetCityName] = useState({ city_name: '' });
    const popupEditDisplay = useSelector(state => state.cityReducer.popupEditDisplay);
    const cityEdit = useSelector(state => currentId ? state.cityReducer.cities.find((c) => c._id === currentId) : null);

    useEffect(() => {
        if(cityEdit) editSetCityName(cityEdit);
    }, [cityEdit]);

    const updateHandler = useCallback(() => {
        dispatch(updateCities( currentId, editCityName ));
        dispatch(setPopupEditDisplay(false));
    }, [currentId, editCityName]);

    if(!popupEditDisplay) {
        return true;
    }

    return (
        <div className="popup popup-edit" onClick={() => dispatch(setPopupEditDisplay(false))}>
            <div className="popup-content" onClick={(event => event.stopPropagation())}>
                <div className="popup-header">
                    <div className="popup-title">
                        Edit city
                    </div>
                    <button className="popup-close" onClick={() => dispatch(setPopupEditDisplay(false))}>X</button>
                </div>
                <Input type="text" name="city_name" placeholder="City name" value={editCityName.city_name} setValue={editSetCityName} />
                <button className="popup-send" onClick={() => updateHandler()}>edit city</button>
            </div>
        </div>
    );
};

export default PopupEdit;