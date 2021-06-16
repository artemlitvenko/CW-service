import React from 'react';
import '../orderMaster/OrderMaster.css';

const OrderEditMaster = ({ master, editOrderHandler }) => {
    return (
        <div className="list-result">
            <div className="list-result-item">{master.name}</div>
            <div className="list-result-item">Rating: {master.rating}</div>
            <button className="result-item-btn" type="submit" onClick={() => editOrderHandler(master._id)}>
                choose
            </button>
        </div>
    );
};

export default OrderEditMaster;
