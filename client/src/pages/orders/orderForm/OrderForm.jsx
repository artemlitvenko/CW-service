import React, { useCallback, useEffect, useState } from 'react';
import './OrderForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/input/Input';
import { getCity } from '../../../actions/city';
import { createOrder, getMastersForOrder } from '../../../actions/order';
import OrderMaster from '../orderMaster/OrderMaster';

const OrderForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCity());
    }, []);
    useEffect(() => {
        dispatch(getMastersForOrder());
    }, []);

    const [clientName, setClientName] = useState();
    const [clientEmail, setClientEmail] = useState();

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
    }, [dispatch, orderCity, startDate, endDate]);

    const createOrderHandler = useCallback(
        (currentMasterId) => {
            dispatch(createOrder(clientName, clientEmail, currentMasterId, orderCity, Number(orderSize), startDate, endDate));
        },
        [dispatch, clientName, clientEmail, orderCity, Number(orderSize), startDate, endDate],
    );

    const mastersResultList = useSelector((state) => state.orderReducer.masters).map((master) => (
        <OrderMaster createOrderHandler={createOrderHandler} master={master} />
    ));

    return (
        <div className="order-form">
            <div className="title">
                <h1>Fill out the form and select the right master for you</h1>
            </div>
            <Input type="text" placeholder="Your name" name="name" value={clientName} setValue={setClientName} />
            <Input type="text" placeholder="Your email" name="email" value={clientEmail} setValue={setClientEmail} />
            <div className="subtitle-form">Select watch size</div>
            <div className="watch-size">
                <select name="size" value={orderSize} onChange={(event) => setOrderSize(event.target.value)}>
                    <option value="default">Choose size of watch</option>
                    <option value="3600000">small</option>
                    <option value="7200000">medium</option>
                    <option value="10800000">large</option>
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
                    disablePast
                />
            </div>
            <button type="submit" onClick={() => findMasterHandler()}>
                Find master
            </button>
            <div className="subtitle-form">Select your master</div>
            <div className="find-master-result">{mastersResultList}</div>
        </div>
    );
};

export default OrderForm;
