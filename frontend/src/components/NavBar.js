import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import NavbarMobile from "./NavbarMobile";

const NavBar = ({ navMobile }) => {
    const { tokenCSRF } = useCSRF();

    return (
        <>
            <nav className="nav">
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
            <NavbarMobile />
        </>
    );
};

export default NavBar;