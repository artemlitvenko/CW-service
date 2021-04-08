import React, { useCallback } from 'react';
import './OrderMaster.css';

const OrderMaster = ({ master, createOrderHandler, setCurrentMasterId }) => {
    const showIdHandler = useCallback(() => {
        setCurrentMasterId(master._id);
    }, []);

    return (
        <div className="list-result">
            <div className="list-result-item">{master.name}</div>
            <div className="list-result-item">Rating: {master.rating}</div>
            <button
                className="result-item-btn"
                type="submit"
                onClick={() => {
                    showIdHandler();
                    createOrderHandler();
                }}
            >
                choose
            </button>
        </div>
    );
};

export default OrderMaster;
