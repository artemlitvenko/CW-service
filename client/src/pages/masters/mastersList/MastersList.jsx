import React, {useEffect, useState} from 'react';
import './MastersList.css';
import Masters from "../masters/Masters";
import PopupAdd from "../../masters/popupAdd/PopupAdd";
import PopupEdit from "../../masters/popupEdit/PopupEdit";
import {useDispatch} from "react-redux";
import {getMaster} from "../../../actions/master";
import {setPopupAddDisplayMaster} from "../../../constarts/actionMasterСreaters";


const MastersList = () => {
    const [currentMasterId, setCurrentMasterId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMaster())
    }, []); // если массив зависимости пустой, то функция вызовется один раз после отрисовки компонента

    function showPopupDeleteHandler() {
        dispatch(setPopupAddDisplayMaster(true))
    }

    return (
        <div className="item-list">
            <div className="item-list-title">
                <h1>MasterList</h1>
                <button className="add" onClick={() => showPopupDeleteHandler()}>add master</button>
            </div>
            <Masters setCurrentMasterId={setCurrentMasterId} />
            <PopupAdd />
            <PopupEdit currentId={currentMasterId} setCurrentId={setCurrentMasterId} />
        </div>
    );
}

export default MastersList;