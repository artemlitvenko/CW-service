import React from 'react';
import './Masters.css';
import Master from "../master/Master";
import {useSelector} from "react-redux";

const Masters = ({ setCurrentMasterId }) => {
    const mastersList = useSelector(state => state.masterReducer.masters ).map(master => <Master master={master} setCurrentMasterId={setCurrentMasterId} />);
    debugger
    return (
        <div>
            { mastersList }
        </div>
    );
}

export default Masters;