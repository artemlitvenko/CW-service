import React from 'react';
import './CitiesList.css';
import Cities from "./Cities";

const CitiesList = () => {
    return (
        <div className="cities-list">
            <h1>CityList</h1>
            <Cities />
            <h3>Add new city</h3>
            <div className="list-form">
                <input placeholder="Name" />
                <button>add city</button>
            </div>
        </div>
    );
}

export default CitiesList;