import React, {useState} from 'react';
import './Login.css';
import Input from "../../components/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    return (
        <div className="auth-form">
            <div className="title">
                <h1>Log in</h1>
            </div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Your email" />
            <Input value={password} setValue={setPassword} type="password" placeholder="Your password" />
            <button type="submit" onClick={() => dispatch(login(email, password))}>Log in</button>
        </div>
    );
};

export default Login;