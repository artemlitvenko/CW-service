import React, { useCallback, useEffect, useState } from 'react';
import './OrderForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../../../actions/city';
import { createOrder, getMastersForOrder } from '../../../actions/order';
import OrderMaster from '../orderMaster/OrderMaster';
import PopupCreate from '../popupCreate/PopupCreate';
import { setMastersLoaded, setPopupCreateDisplayOrder } from '../../../constarts/actionOrderСreaters';
import { largeClockSize, mediumClockSize, smallClockSize } from '../../../constarts/clockSize';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { longEmail, longValue, needEmail, requiredField, shortValue } from '../../../constarts/validationMessage';
import moment from 'moment';
//import moment from 'moment-timezone';
//const moment = require('moment-timezone');
import { setMinutes, setHours } from 'date-fns';

const OrderForm = () => {
    const dispatch = useDispatch();

    /*const now = moment().tz('Europe/Kiev');
    console.log(now);*/

    const formik = useFormik({
        initialValues: {
            clientName: '',
            clientEmail: '',
            orderSize: '',
            orderCity: '',
            orderDate: '',
            endDate: '',
        },
        validationSchema: Yup.object({
            clientName: Yup.string().required(requiredField).min(3, shortValue).max(30, longValue),
            clientEmail: Yup.string().required(requiredField).email(needEmail).max(30, longEmail),
            orderSize: Yup.string().required(requiredField),
            orderCity: Yup.string().required(requiredField),
        }),
        onSubmit: (values) => {
            console.log('orderDate', orderDate);
            //endDate = +orderDate + Number(values.orderSize);
            dispatch(getMastersForOrder(values.orderCity, orderDate, endDate));
            dispatch(setMastersLoaded(false));
        },
    });

    useEffect(() => {
        dispatch(getCity());
    }, []);

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');

    const [orderDate, setOrderDate] = useState(new Date());

    const [orderSize, setOrderSize] = useState({ size: '' });
    const [orderCity, setOrderCity] = useState({
        city: { city_name: '', _id: '' },
    });
    const orderObj = useSelector((state) => state.cityReducer.cities).map((city) => ({
        city_name: city.city_name,
        _id: city._id,
    }));
    const citySelect = orderObj.map((city) => <option value={city._id}>{city.city_name}</option>);

    let startDate = orderDate;
    let endDate = +startDate + Number(formik.values.orderSize);

    const createOrderHandler = useCallback(
        (currentMasterId) => {
            console.log(
                formik.values.clientName,
                formik.values.clientEmail,
                currentMasterId,
                formik.values.orderCity,
                Number(formik.values.orderSize),
                orderDate,
                new Date(endDate),
            );
            dispatch(
                createOrder(
                    formik.values.clientName,
                    formik.values.clientEmail,
                    currentMasterId,
                    formik.values.orderCity,
                    Number(formik.values.orderSize),
                    orderDate,
                    new Date(endDate),
                ),
            );
            dispatch(setPopupCreateDisplayOrder(true));
        },
        [dispatch, clientName, clientEmail, orderCity, Number(orderSize), startDate, endDate],
    );

    const { loaded: loadedMasters, masters } = useSelector((state) => state.orderFormReducer);
    const mastersResultList = masters.map((master) => <OrderMaster createOrderHandler={createOrderHandler} master={master} />);

    const mastersResult = () => {
        if (loadedMasters && mastersResultList.length === 0) {
            return <div className="find-master-result">Masters not found. Try searching using different settings</div>;
        } else {
            return <div className="find-master-result">{mastersResultList}</div>;
        }
    };

    return (
        <div className="order-form">
            <div className="title">
                <h1>Fill out the form and select the right master for you</h1>
            </div>
            <form onSubmit={formik.handleSubmit}>
                {formik.errors.clientName && formik.touched.clientName ? <span className="validation-text">{formik.errors.clientName}</span> : null}
                <input
                    value={formik.values.clientName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="clientName"
                    className="input-text"
                    type="text"
                    placeholder="Your name"
                    maxLength="30"
                />

                {formik.errors.clientEmail && formik.touched.clientEmail ? (
                    <span className="validation-text">{formik.errors.clientEmail}</span>
                ) : null}
                <input
                    value={formik.values.clientEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="clientEmail"
                    className="input-text"
                    type="text"
                    placeholder="Your email"
                    maxLength="30"
                />
                <div className="subtitle-form">Select your city</div>
                {formik.errors.orderSize && formik.touched.orderSize ? <span className="validation-text">{formik.errors.orderSize}</span> : null}
                <select name="orderSize" value={formik.values.orderSize} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option value="">Choose size of watch</option>
                    <option value={smallClockSize}>small</option>
                    <option value={mediumClockSize}>medium</option>
                    <option value={largeClockSize}>large</option>
                </select>
                <div className="subtitle-form">Select your city</div>
                <div className="city">
                    {formik.errors.orderCity && formik.touched.orderCity ? <span className="validation-text">{formik.errors.orderCity}</span> : null}
                    <select name="orderCity" value={formik.values.orderCity._id} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option value="">Choose city of master</option>
                        {citySelect}
                    </select>
                </div>
                <div className="subtitle-form">Choose a time that is convenient for you</div>
                <div className="datetime-picker">
                    <DatePicker
                        selected={orderDate}
                        value={orderDate}
                        onChange={(date) => setOrderDate(date)}
                        onBlur={formik.handleBlur}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h aa"
                        minDate={new Date()}
                        minTime={moment().hours()}
                        maxTime={setHours(setMinutes(new Date(), 30), 20)}
                        /*minTime={now.hours(now.hour()).minutes(now.minutes())}
                        maxTime={now.hours(23).minutes(45)}*/
                        /*minDate={Date.now()}
                        minTime={moment().hours().minutes()}
                        maxTime={setHours(setMinutes(new Date(), 30), 20)}
                        /!*minTime={setMinutes(new Date(), 0)}
                        maxTime={setHours(setMinutes(new Date(), 30), 20)}*!/*/
                        name="orderDate"
                    />
                </div>
                <button type="submit">Find master</button>
            </form>
            {mastersResult()}
            <PopupCreate />
        </div>
    );
};

export default OrderForm;
