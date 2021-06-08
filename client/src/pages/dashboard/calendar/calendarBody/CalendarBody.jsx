import React, { useState } from 'react';
import './CalendarBody.css';
import moment from 'moment';
import { daysOfGrid, nameDay } from '../../../../constarts/calendarConstant';
import Cell from '../cell/Cell';
import { useSelector } from 'react-redux';
import PopupOrder from '../popupOrder/PopupOrder';

const CalendarBody = ({ startDay, today }) => {
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const totalDays = daysOfGrid;
    const day = startDay.clone().subtract(1, 'day');
    const currentDay = (day) => moment().isSame(day, 'day');
    const currentMonth = (day) => today.isSame(day, 'month');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

    const dayName = nameDay.map((day) => <div className="day">{day}</div>);

    const orderMonth = useSelector((state) => state.orderReducer.orders);

    const orderInDay = (dayNumber, orderTime) => dayNumber.isSame(orderTime, 'day');

    const calendarView = daysArray.map((dayNumber) => (
        <Cell
            key={dayNumber.unix()}
            orderInDay={orderInDay}
            orderMonth={orderMonth}
            currentMonth={currentMonth}
            currentDay={currentDay}
            dayNumber={dayNumber}
            setCurrentOrderId={setCurrentOrderId}
        />
    ));

    return (
        <div className="calendar-body">
            <div className="day-name">{dayName}</div>
            <div className="grid-wrapper">{calendarView}</div>
            <PopupOrder currentOrderId={currentOrderId} />
        </div>
    );
};

export default CalendarBody;
