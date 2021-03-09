import React, {useState} from 'react';
import './Registration.css';
import Input from "../../components/input/Input";
import {registration} from "../../actions/user";

const Registration = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="auth-form">
            <div className="title">
                <h1>Don't have an account?</h1>
            </div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Your email" />
            <Input value={password} setValue={setPassword} type="password" placeholder="Your password" />
            <button type="submit" onClick={ () => registration(email, password) }>Sign Up</button>
        </div>
    );
};

export default Registration;