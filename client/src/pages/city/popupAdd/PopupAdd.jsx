import React from 'react';
import './PopupAdd.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCity } from '../../../actions/city';
import { setPopupAddDisplay } from '../../../constarts/actionCityСreaters';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { longValue, requiredField } from '../../../constarts/validationMessage';

const PopupAdd = () => {
    const dispatch = useDispatch();
    const popupDisplay = useSelector((state) => state.cityReducer.popupAddDisplay);

    if (!popupDisplay) {
        return null;
    }

    return (
        <Formik
            initialValues={{
                cityName: '',
            }}
            validationSchema={Yup.object({
                cityName: Yup.string().required(requiredField).max(30, longValue),
            })}
            onSubmit={(values) => {
                dispatch(createCity(values.cityName));
                dispatch(setPopupAddDisplay(false));
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <div className="popup popup-add" onClick={() => dispatch(setPopupAddDisplay(false))}>
                    <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                        <div className="popup-header">
                            <div className="popup-title">Add new city</div>
                            <button className="popup-close" onClick={() => dispatch(setPopupAddDisplay(false))}>
                                X
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {errors.cityName && touched.cityName ? <span className="validation-text">{errors.cityName}</span> : null}
                            <input
                                value={values.cityName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="cityName"
                                className="input-text"
                                type="text"
                                placeholder="New city name"
                                maxLength="30"
                            />
                            <button className="popup-send" type="submit">
                                add city
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default PopupAdd;
