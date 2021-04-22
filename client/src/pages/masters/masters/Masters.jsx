import React from 'react';
import './Masters.css';
import Master from '../master/Master';
import { useSelector } from 'react-redux';

const Masters = ({ setCurrentMasterId }) => {
    const mastersList = useSelector((state) => state.masterReducer.masters).map((master) => (
        <Master key={master._id} master={master} setCurrentMasterId={setCurrentMasterId} />
    ));

    return <div>{mastersList}</div>;
};

export default Masters;
