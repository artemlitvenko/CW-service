import React, { useState, useEffect } from 'react';
import './PopupEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupEditDisplayMaster } from '../../../constarts/actionMasterСreaters';
import { createMaster, updateMaster } from '../../../actions/master';
import { getCity } from '../../../actions/city';
import * as Yup from 'yup';
import { Formik } from 'formik';

const PopupEdit = ({ currentId }) => {
    useEffect(() => {
        dispatch(getCity());
    }, []);

    const dispatch = useDispatch();

    const popupEditDisplay = useSelector((state) => state.masterReducer.popupEditDisplay);
    const masterEdit = useSelector((state) => (currentId ? state.masterReducer.masters.find((m) => m._id === currentId) : null));
    const cityObj = useSelector((state) => state.cityReducer.cities).map((city) => ({ city_name: city.city_name, _id: city._id }));
    const citySelect = cityObj.map((city) => <option value={city._id}>{city.city_name}</option>);

    if (!popupEditDisplay) {
        return null;
    }

    return (
        <Formik
            initialValues={{
                masterName: masterEdit.name,
                masterRating: '',
                masterCity: '',
            }}
            validationSchema={Yup.object({
                masterName: Yup.string()
                    .required('Sorry, this field is required!')
                    .min(3, 'Sorry, name is to short!')
                    .max(30, 'Sorry, name is to long!'),
                masterRating: Yup.string().required('Sorry, this field is required!'),
                masterCity: Yup.string().required('Sorry, this field is required!'),
            })}
            onSubmit={(values) => {
                dispatch(updateMaster(currentId, values.masterName, values.masterRating, { _id: values.masterCity }));
                dispatch(setPopupEditDisplayMaster(false));
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <div className="popup popup-add" onClick={() => dispatch(setPopupEditDisplayMaster(false))}>
                    <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                        <div className="popup-header">
                            <div className="popup-title">Edit master</div>
                            <button className="popup-close" onClick={() => dispatch(setPopupEditDisplayMaster(false))}>
                                X
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {errors.masterName && touched.masterName ? <span className="validation-text">{errors.masterName}</span> : null}
                            <input
                                value={values.masterName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="masterName"
                                className="input-text"
                                type="text"
                                placeholder="New master name"
                                maxLength="30"
                            />
                            <h4>Master rating</h4>
                            {errors.masterRating && touched.masterRating ? <span className="validation-text">{errors.masterRating}</span> : null}
                            <select name="masterRating" value={values.masterRating} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Choose rating of master</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <h4>Add city of master</h4>
                            {errors.masterCity && touched.masterCity ? <span className="validation-text">{errors.masterCity}</span> : null}
                            <select name="masterCity" value={values.masterCity} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Choose city of master</option>
                                {citySelect}
                            </select>
                            <button className="popup-send" type="submit">
                                edit master
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default PopupEdit;
