import React from 'react';
import './OrderMaster.css';

const OrderMaster = ({ master, createOrderHandler }) => {
    return (
        <div className="list-result">
            <div className="list-result-item">{master.name}</div>
            <div className="list-result-item">Rating: {master.rating}</div>
            <button className="result-item-btn" type="submit" onClick={() => createOrderHandler(master._id)}>
                choose
            </button>
        </div>
    );
};

export default OrderMaster;
