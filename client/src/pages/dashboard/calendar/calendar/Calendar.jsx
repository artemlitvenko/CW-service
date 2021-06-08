import React, { useEffect, useState } from 'react';
import './Calendar.css';
import moment from 'moment';
import CalendarHeader from '../calendarHeader/CalendarHeader';
import CalendarBody from '../calendarBody/CalendarBody';
import { useDispatch } from 'react-redux';
import { getOrder } from '../../../../actions/order';

const Calendar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder());
    }, []);

    moment.updateLocale('en', { week: { dow: 1 } });

    const [today, setToday] = useState(moment());
    const startDay = today.clone().startOf('month').startOf('week');

    const prevHandler = () => {
        setToday((prev) => prev.clone().subtract(1, 'month'));
    };
    const todayHandler = () => {
        setToday(moment());
    };
    const nextHandler = () => {
        setToday((next) => next.clone().add(1, 'month'));
    };

    return (
        <div className="calendar">
            <div className="calendar-container">
                <CalendarHeader today={today} prevHandler={prevHandler} todayHandler={todayHandler} nextHandler={nextHandler} />
                <CalendarBody startDay={startDay} today={today} />
            </div>
        </div>
    );
};

export default Calendar;
