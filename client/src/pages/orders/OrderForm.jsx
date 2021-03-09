import React, {useState} from 'react';
import './OrderForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderForm = () => {
    const [startDate, setStartDate] = useState(new Date());
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
            <form>
                <label className="radio" ><input type="radio" value="small" /> small</label>
                <label className="radio" ><input type="radio" value="medium" /> medium</label>
                <label className="radio" ><input type="radio" value="large" /> large</label>
            </form>
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
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
            <button type="submit">Find master</button>
        </div>
    );
}

export default OrderForm;