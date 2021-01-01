import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../assets/logo_dark.png';
import NavBar from "./nav/NavBar";
import Userbar from "./Userbar";

const Header = () => (
    <header>
        <div className="container">
            <Link to="/" className="logo">
                <img src={LogoDark} alt="Logo" />
            </Link>

            <NavBar />
            <Userbar />
        </div>
    </header>
);

export default Header;