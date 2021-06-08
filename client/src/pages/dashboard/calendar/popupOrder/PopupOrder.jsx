import React, { useCallback } from 'react';
import './PopupOrder.css';
import { useDispatch, useSelector } from 'react-redux';
import { popupCalendarDisplayOrder } from '../../../../constarts/actionOrderСreaters';

const PopupOrder = ({ currentOrderId }) => {
    const dispatch = useDispatch();
    const orderView = useSelector((state) => (currentOrderId ? state.orderReducer.order.find((m) => m._id === currentOrderId) : null));

    console.log('orderView >>>>', orderView);
    console.log('currentOrderId >>>>', currentOrderId);

    const popupOrderDisplay = useSelector((state) => state.orderReducer.popupCalendarDisplay);

    const popupOrderClose = useCallback(() => {
        dispatch(popupCalendarDisplayOrder(false));
    }, [dispatch]);

    if (!popupOrderDisplay) {
        return null;
    }

    return (
        <div className="popup popup-order" onClick={popupOrderClose}>
            <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-title">Order information</div>
                    <button className="popup-close" onClick={() => dispatch(popupCalendarDisplayOrder(false))}>
                        X
                    </button>
                </div>
                <div>order</div>
            </div>
        </div>
    );
};

export default PopupOrder;
