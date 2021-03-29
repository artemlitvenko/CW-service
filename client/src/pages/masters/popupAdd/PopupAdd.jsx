import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../../components/input/Input';
import './PopupAdd.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupAddDisplayMaster } from '../../../constarts/actionMasterСreaters';
import { createMaster } from '../../../actions/master';
import { getCity } from '../../../actions/city';

const PopupAdd = () => {
    const dispatch = useDispatch();
    const [masterName, setMasterName] = useState();
    const [masterRating, setMasterRating] = useState({ rating: '' });
    const [masterCity, setMasterCity] = useState({
        city: { city_name: '', _id: '' },
    });
    const popupDisplay = useSelector((state) => state.masterReducer.popupAddDisplay);
    const cityObj = useSelector((state) => state.cityReducer.cities).map((city) => ({
        city_name: city.city_name,
        _id: city._id,
    }));
    const citySelect = cityObj.map((city) => <option value={city._id}>{city.city_name}</option>);

    useEffect(() => {
        dispatch(getCity());
    }, []);

    const createHandler = useCallback(() => {
        dispatch(createMaster(masterName, masterRating, { _id: masterCity }));
        dispatch(setPopupAddDisplayMaster(false));
    }, [dispatch, masterName, masterRating, { _id: masterCity }]);

    const popupClose = useCallback(() => {
        dispatch(setPopupAddDisplayMaster(false));
    }, [dispatch]);

    if (!popupDisplay) {
        return null;
    }

    return (
        <div className="popup popup-add" onClick={popupClose}>
            <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-title">Add new master</div>
                    <button className="popup-close" onClick={() => dispatch(setPopupAddDisplayMaster(false))}>
                        X
                    </button>
                </div>
                <Input type="text" placeholder="New master name" name="name" value={masterName} setValue={setMasterName} />
                <h4>Master rating</h4>
                <select name="rating" value={masterRating.rating} onChange={(event) => setMasterRating(event.target.value)}>
                    <option>Choose rating of master</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <h4>Add city of master</h4>
                <select name="city" value={masterCity} onChange={(event) => setMasterCity(event.target.value)}>
                    <option>Choose city of master</option>
                    {citySelect}
                </select>
                <button className="popup-send" onClick={() => createHandler()}>
                    add master
                </button>
            </div>
        </div>
    );
};

export default PopupAdd;
