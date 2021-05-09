import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../actions/user';
import { useDispatch } from 'react-redux';
import { longEmail, longPassword, needEmail, requiredField } from '../../../constarts/validationMessage';
import { GoogleLogin } from 'react-google-login';

const LoginForm = () => {
    const dispatch = useDispatch();

    const validationSchema = useMemo(
        () =>
            Yup.object({
                email: Yup.string().required(requiredField).email(needEmail).max(60, longEmail),
                password: Yup.string().required(requiredField).max(60, longPassword),
            }),
        [],
    );
    const onSubmit = useCallback(
        (values) => {
            dispatch(login(values.email, values.password));
        },
        [dispatch],
    );

    const initialValues = useMemo(
        () => ({
            email: '',
            password: '',
        }),
        [],
    );
    const googleSuccess = (res) => {
        console.log(res);
    };
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful');
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <div className="auth-form">
                    <div className="title">
                        <h1>Log in</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {errors.email && touched.email ? <span className="validation-text">{errors.email}</span> : null}
                        <input
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            className="input-text"
                            type="text"
                            placeholder="Your email"
                            maxLength="60"
                        />

                        {errors.password && touched.password ? <span className="validation-text">{errors.password}</span> : null}
                        <input
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            className="input-text"
                            type="password"
                            placeholder="Your password"
                            maxLength="60"
                        />

                        <button type="submit">Log in</button>
                        <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin" />
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default LoginForm;
