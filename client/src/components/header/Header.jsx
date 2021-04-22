import React from 'react';
import './Header.css';
import logo from '../../assets/img/logo.svg';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const Header = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <NavLink to="/">
                                <img alt="" src={logo} />
                            </NavLink>
                        </div>
                        <div className="menu-header">
                            {isAuth && (
                                <>
                                    <NavLink to="/orderslist">Orders list</NavLink>
                                    <NavLink to="/masterslist">Masters list</NavLink>
                                    <NavLink to="/citieslist">Cities list</NavLink>
                                    <NavLink to="/clientslist">Clients list</NavLink>
                                    <Redirect to="/" />
                                </>
                            )}
                        </div>
                        <div className="log-in">
                            {!isAuth && <NavLink to="/login">Log In</NavLink>}
                            {isAuth && (
                                <div className="menu-logout" onClick={() => dispatch(logout())}>
                                    Log out
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
