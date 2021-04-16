import React from 'react';
import './PopupEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCities } from '../../../actions/city';
import { setPopupEditDisplay } from '../../../constarts/actionCityСreaters';
import * as Yup from 'yup';
import { Formik } from 'formik';

const PopupEdit = ({ currentId }) => {
    const dispatch = useDispatch();
    const popupEditDisplay = useSelector((state) => state.cityReducer.popupEditDisplay);
    const cityEdit = useSelector((state) => (currentId ? state.cityReducer.cities.find((c) => c._id === currentId) : null));

    if (!popupEditDisplay) {
        return null;
    }

    return (
        <Formik
            initialValues={{
                cityName: cityEdit.city_name,
            }}
            validationSchema={Yup.object({
                cityName: Yup.string().required('Sorry, this field is required!').max(30, 'Sorry, name is to long!'),
            })}
            onSubmit={(values) => {
                dispatch(updateCities(currentId, values.cityName));
                dispatch(setPopupEditDisplay(false));
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <div className="popup popup-add" onClick={() => dispatch(setPopupEditDisplay(false))}>
                    <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                        <div className="popup-header">
                            <div className="popup-title">Add new city</div>
                            <button className="popup-close" onClick={() => dispatch(setPopupEditDisplay(false))}>
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

export default PopupEdit;
