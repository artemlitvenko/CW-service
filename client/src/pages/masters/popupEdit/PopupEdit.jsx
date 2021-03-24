import React, {useState, useEffect} from 'react';
import Input from "../../../components/input/Input";
import './PopupEdit.css';
import {useDispatch, useSelector} from "react-redux";
import {setPopupEditDisplayMaster} from "../../../reducers/masterReducer";
import {updateMaster} from "../../../actions/master";

const PopupEdit = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const [editMasterName, editSetMasterName] = useState({ name: '' });
    const popupEditDisplay = useSelector(state => state.masterReducer.popupEditDisplay);
    const masterEdit = useSelector(state => currentId ? state.masterReducer.masters.find((m) => m._id === currentId) : null);

    useEffect(() => {
        if(masterEdit) editSetMasterName(masterEdit);
    }, [masterEdit])

    function updateHandler() {
        dispatch(updateMaster( currentId, editMasterName ))
        dispatch(setPopupEditDisplayMaster('none'))
    }

    return (
        <div className="popup popup-edit" onClick={() => dispatch(setPopupEditDisplayMaster('none'))} style={{display: popupEditDisplay}}>
            <div className="popup-content" onClick={(event => event.stopPropagation())}>
                <div className="popup-header">
                    <div className="popup-title">
                        Edit master
                    </div>
                    <button className="popup-close" onClick={() => dispatch(setPopupEditDisplayMaster('none'))}>X</button>
                </div>
                <Input type="text" name="name" placeholder="Master name" value={editMasterName.name} setValue={editSetMasterName} />
                <button className="popup-send" onClick={() => updateHandler()}>edit master</button>
            </div>
        </div>
    );
};

export default PopupEdit;