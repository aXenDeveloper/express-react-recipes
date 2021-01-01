import React from 'react';
import NavbarMobile from "./NavbarMobile";
import NavItems from "./NavItems";

const NavBar = ({ navMobile }) => (
    <>
        <nav className="nav">
            <ul>
                <NavItems />
            </ul>
        </nav>
        <NavbarMobile />
    </>
);

export default NavBar;