import React from 'react';
import './OrdersList.css';
import Orders from '../orders/Orders';

const OrdersList = () => {
    return (
        <div>
            <h1>OrderList</h1>
            <Orders />
            <Orders />
        </div>
    );
};

export default OrdersList;
