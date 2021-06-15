import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popupAfterEditDisplayOrder } from '../../../../constarts/actionOrderСreaters';

const PopupAfterEdit = () => {
    const dispatch = useDispatch();
    const popupCreateDisplay = useSelector((state) => state.orderReducer.popupAfterEditDisplay);

    const popupCreateClose = useCallback(() => {
        dispatch(popupAfterEditDisplayOrder(false));
        window.location.reload();
    }, [dispatch]);

    if (!popupCreateDisplay) {
        return null;
    }

    return (
        <div className="popup popup-create" onClick={popupCreateClose}>
            <div className="popup-content" onClick={(event) => event.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-title">Order was edit</div>
                    <button className="popup-close" onClick={popupCreateClose}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupAfterEdit;
