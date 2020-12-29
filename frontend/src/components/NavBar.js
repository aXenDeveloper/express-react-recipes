import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarStyle } from '../styles/navBar';
import Logout from "./Logout";

const NavBar = () => (
    <NavBarStyle>
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <NavLink exact to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink exact to="/admin">Admin</NavLink>
            </li>
        </ul>
        <Logout />
    </NavBarStyle>
);

export default NavBar;