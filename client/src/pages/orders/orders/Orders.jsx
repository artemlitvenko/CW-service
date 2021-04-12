import React from 'react';
import './Orders.css';
import Order from '../order/Order';
import { useSelector } from 'react-redux';

const Orders = ({ setCurrentOrderId }) => {
    const ordersList = useSelector((state) => state.orderReducer.orders).map((order) => (
        <Order order={order} setCurrentOrderId={setCurrentOrderId} />
    ));

    return <div>{ordersList}</div>;
};

export default Orders;
