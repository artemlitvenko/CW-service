import React, {useState} from 'react';
import './OrderForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {setMinutes, setHours} from "date-fns";

const OrderForm = () => {
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 17));
    const today = new Date().getDate();
    return (
        <div className="order-form">
            <div className="title">
                <h1>Fill out the form and select the right master for you</h1>
            </div>
            <input className="input-text" type="text" placeholder="Your name"/>
            <input className="input-text" type="text" placeholder="Your email"/>
            <div className="subtitle-form">
                Select watch size
            </div>
            <div className="watch-size">
                <select>
                    <option>small</option>
                    <option>medium</option>
                    <option>large</option>
                </select>
            </div>
            <div className="subtitle-form">
                Select your city
            </div>
            <div className="city">
                <select>
                    <option>Dnipro</option>
                    <option>Uzhhorod</option>
                </select>
            </div>
            <div className="subtitle-form">
                Choose a time that is convenient for you
            </div>
            <div className="datetime-picker">
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h aa"
                    minDate={new Date()}
                    minTime={setHours(new Date(), (new Date().getDate() !== today) ? new Date().getHours() : 9)}
                    maxTime={setHours(setMinutes(new Date(), 0), 18)}
                    disablePast
                />
            </div>
            <button type="submit">Find master</button>
        </div>
    );
}

export default OrderForm;