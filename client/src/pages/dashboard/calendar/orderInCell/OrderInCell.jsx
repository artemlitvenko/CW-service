import React, { useCallback } from 'react';
import './OrderInCell.css';
import { popupCalendarDisplayOrder } from '../../../../constarts/actionOrderСreaters';
import { useDispatch } from 'react-redux';

const OrderInCell = ({ order, orderInDay, dayNumber, setCurrentOrderId }) => {
    const dispatch = useDispatch();
    const showPopupOrderHandler = useCallback(() => {
        if (order._id) {
            dispatch(popupCalendarDisplayOrder(true));
            setCurrentOrderId(order._id);
        }
    }, [dispatch, order._id, setCurrentOrderId]);

    return (
        <div>
            {orderInDay(dayNumber, order.start_time) ? (
                <div className="order-cell" onClick={showPopupOrderHandler}>
                    <div>{order.master.name}</div>
                    <div>{order.start_time.slice(11, 16)}</div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default OrderInCell;
