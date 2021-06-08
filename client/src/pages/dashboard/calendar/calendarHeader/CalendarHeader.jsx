import React from 'react';
import './CalendarHeader.css';

const CalendarHeader = ({ today, prevHandler, todayHandler, nextHandler }) => {
    return (
        <div className="calendar-header">
            <div className="calendar-header-container">
                <div className="calendar-month">
                    <div className="month">{today.format('MMMM')}</div>
                    <div className="year">{today.format('YYYY')}</div>
                </div>
                <div className="calendar-control">
                    <button onClick={prevHandler}> &lt; </button>
                    <button onClick={todayHandler}> Today </button>
                    <button onClick={nextHandler}> &gt; </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarHeader;
