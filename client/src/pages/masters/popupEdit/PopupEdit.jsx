import React, { useState, useEffect, useCallback } from 'react';
import Input from '../../../components/input/Input';
import './PopupEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupEditDisplayMaster } from '../../../constarts/actionMasterСreaters';
import { updateMaster } from '../../../actions/master';
import { getCity } from '../../../actions/city';

const PopupEdit = ({ currentId, setCurrentId }) => {
    useEffect(() => {
        dispatch(getCity());
    }, []);

    const dispatch = useDispatch();
    const [editMasterName, editSetMasterName] = useState({ name: '' });
    const [editMasterRating, editSetMasterRating] = useState({ rating: '' });
    const [editMasterCity, editSetMasterCity] = useState({ city: { city_name: '', _id: '' } });
    const popupEditDisplay = useSelector((state) => state.masterReducer.popupEditDisplay);
    const masterEdit = useSelector((state) => (currentId ? state.masterReducer.masters.find((m) => m._id === currentId) : null));
    const cityObj = useSelector((state) => state.cityReducer.cities).map((city) => ({ city_name: city.city_name, _id: city._id }));
    const citySelect = cityObj.map((city) => <option value={city._id}>{city.city_name}</option>);

    useEffect(() => {
        if (masterEdit) editSetMasterName(masterEdit);
    }, [masterEdit]);

    const updateHandler = useCallback(() => {
        dispatch(updateMaster(currentId, editMasterName, editMasterRating, editMasterCity));
        dispatch(setPopupEditDisplayMaster(false));
    }, [dispatch, currentId, editMasterName, editMasterRating, editMasterCity]);

    const popupEditClose = useCallback(() => {
        dispatch(setPopupEditDisplayMaster(false));
    }, [dispatch]);

    if (!popupEditDisplay) {
        return null;
    }

    return (
        <div className="popup popup-edit" onClick={popupEditClose}>
            <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-title">Edit master</div>
                    <button className="popup-close" onClick={() => dispatch(setPopupEditDisplayMaster(false))}>
                        X
                    </button>
                </div>
                <Input type="text" name="name" placeholder="Master name" value={editMasterName.name} setValue={editSetMasterName} />
                <h4>Change rating of master</h4>
                <select name="rating" value={editMasterRating.rating} onChange={(event) => editSetMasterRating(event.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <h4>Change city of master</h4>
                <select name="city" value={editMasterCity} onChange={(event) => editSetMasterCity(event.target.value)}>
                    <option>Choose city of master</option>
                    {citySelect}
                </select>
                <button className="popup-send" onClick={() => updateHandler()}>
                    edit master
                </button>
            </div>
        </div>
    );
};

export default PopupEdit;
