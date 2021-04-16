import React, { useCallback, useMemo } from 'react';
import './PopupEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCities } from '../../../actions/city';
import { setPopupEditDisplay } from '../../../constarts/actionCityСreaters';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { longValue, requiredField } from '../../../constarts/validationMessage';

const PopupEdit = ({ currentId }) => {
    const dispatch = useDispatch();
    const popupEditDisplay = useSelector((state) => state.cityReducer.popupEditDisplay);
    const cityEdit = useSelector((state) => (currentId ? state.cityReducer.cities.find((c) => c._id === currentId) : null));

    const initialValues = useMemo(
        () => ({
            cityName: cityEdit.city_name,
        }),
        [cityEdit],
    );

    const validationSchema = useMemo(
        () =>
            Yup.object({
                cityName: Yup.string().required(requiredField).max(30, longValue),
            }),
        [],
    );
    const onSubmit = useCallback((values) => {
        dispatch(updateCities(currentId, values.cityName));
        dispatch(setPopupEditDisplay(false));
    }, []);

    if (!popupEditDisplay) {
        return null;
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
