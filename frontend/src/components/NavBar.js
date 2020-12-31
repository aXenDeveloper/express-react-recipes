import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCSRF } from '../context/csrf';

const NavBar = () => {
    const { tokenCSRF } = useCSRF();

    return (
        <nav className="navbar">
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
        </nav>
    );
};

export default NavBar;