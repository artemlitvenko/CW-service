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
            <div className="watch-size">
                <form>
                    <div className="form-radio">
                        <input type="radio" name="size" value="small" />
                        <label className="radio" >small</label>
                    </div>
                    <div className="form-radio">
                        <input type="radio" name="size" value="medium" />
                        <label className="radio" >medium</label>
                    </div>
                    <div className="form-radio">
                        <input type="radio" name="size" value="large" />
                        <label className="radio" >large</label>
                    </div>
                </form>
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
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    disablePast
                />
            </div>
            <button type="submit">Find master</button>
        </div>
    );
}

export default OrderForm;