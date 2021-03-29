import React from 'react';

const Input = ({ setValue, value, type, placeholder }) => {
    return (
        <div>
            <input className="input-text" onChange={(event) => setValue(event.target.value)} value={value} type={type} placeholder={placeholder} />
        </div>
    );
};

export default Input;
