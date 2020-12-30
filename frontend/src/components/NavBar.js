import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarStyle } from '../styles/navBar';
import { useCSRF } from '../context/csrf';

const NavBar = () => {
    const { tokenCSRF } = useCSRF();

    return (
        <NavBarStyle>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                {tokenCSRF && (
                    <li>
                        <NavLink exact to="/admin">Admin</NavLink>
                    </li>
                )}
            </ul>
        </NavBarStyle>
    );
};

export default NavBar;