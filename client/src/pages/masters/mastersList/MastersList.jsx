import React from 'react';
import './MastersList.css';
import Masters from "../masters/Masters";


const MastersList = () => {

    return (
        <div>
            <h1>MasterList</h1>
            <Masters />
            <Masters />
            <Masters />
            <h3>Add new master</h3>
            <div className="list-form">
                <input
                    placeholder="Name"
                />
                <select>
                    <option>Dnipro</option>
                    <option>Uzhhorod</option>
                </select>
                <select>
                    <option disabled>Rating</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <button>add master</button>
            </div>
        </div>
    );
}

export default MastersList;