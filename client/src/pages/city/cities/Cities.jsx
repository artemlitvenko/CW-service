import React from 'react';
import './Cities.css';
import {useSelector} from "react-redux";
import City from "../city/City";

const Cities = ({ setCurrentId }) => {
    const citiesList = useSelector(state => state.cityReducer.cities )
        .map(city => <City city={city} setCurrentId={setCurrentId} />);

    return (
        <div>
            { citiesList }
        </div>
    );
}

export default Cities;