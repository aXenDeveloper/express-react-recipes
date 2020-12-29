import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
    <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/login">Login</NavLink>
        <NavLink exact to="/admin">Admin</NavLink>
    </nav>
);

export default NavBar;