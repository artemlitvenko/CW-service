import React from 'react';
import './Login.css';
import LoginReduxForm from '../loginForm/LoginForm';
import { login } from '../../../actions/user';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const onSubmitLogin = (value) => {
        dispatch(login(value.name, value.password));
    };
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmitLogin} />
        </div>
    );
};

export default Login;
