import React from 'react';
import './LoginForm.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../actions/user';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string().required('Sorry, this field is required!').email('Needs to be an email').max(30, 'Sorry, email is to long!'),
                password: Yup.string().required('Sorry, this field is required!').max(30, 'Sorry, password is to long!'),
            })}
            onSubmit={(values) => {
                dispatch(login(values.email, values.password));
            }}
        >
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
                            maxLength="30"
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
                            maxLength="30"
                        />

                        <button type="submit">Log in</button>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default LoginForm;
