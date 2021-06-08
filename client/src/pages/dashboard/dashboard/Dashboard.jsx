import React from 'react';
import './Dashboard.css';
import Calendar from '../calendar/calendar/Calendar';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="container">
                <Calendar />
            </div>
        </div>
    );
};

export default Dashboard;
