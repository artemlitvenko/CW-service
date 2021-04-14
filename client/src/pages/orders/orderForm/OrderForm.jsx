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
import { setHours, setMinutes } from 'date-fns';

const OrderForm = () => {
    const dispatch = useDispatch();
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
    let endDate = +startDate + Number(orderSize);

    const findMasterHandler = useCallback(() => {
        dispatch(getMastersForOrder(orderCity, startDate, endDate));
        dispatch(setMastersLoaded(false));
    }, [dispatch, orderCity, startDate, endDate]);

    const createOrderHandler = useCallback(
        (currentMasterId) => {
            dispatch(createOrder(clientName, clientEmail, currentMasterId, orderCity, Number(orderSize), startDate, endDate));
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
            <input
                maxLength="25"
                className="input-text"
                type="text"
                placeholder="Your name"
                name="name"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
            />
            <input
                maxLength="25"
                className="input-text"
                type="text"
                placeholder="Your email"
                name="email"
                value={clientEmail}
                onChange={(event) => setClientEmail(event.target.value)}
            />
            <div className="subtitle-form">Select watch size</div>
            <div className="watch-size">
                <select name="size" value={orderSize} onChange={(event) => setOrderSize(event.target.value)}>
                    <option value="default">Choose size of watch</option>
                    <option value={smallClockSize}>small</option>
                    <option value={mediumClockSize}>medium</option>
                    <option value={largeClockSize}>large</option>
                </select>
            </div>
            <div className="subtitle-form">Select your city</div>
            <div className="city">
                <select name="city" value={orderCity.city} onChange={(event) => setOrderCity(event.target.value)}>
                    <option value="default">Choose city of master</option>
                    {citySelect}
                </select>
            </div>
            <div className="subtitle-form">Choose a time that is convenient for you</div>
            <div className="datetime-picker">
                <DatePicker
                    selected={orderDate}
                    onChange={(date) => setOrderDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h aa"
                    minDate={new Date()}
                    minTime={setMinutes(orderDate, 60)}
                    maxTime={setHours(setMinutes(new Date(), 0), 21)}
                    disablePast
                />
            </div>
            <button type="submit" onClick={() => findMasterHandler()}>
                Find master
            </button>
            {mastersResult()}
            <PopupCreate />
        </div>
    );
};

export default OrderForm;
