import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../assets/logo_dark.png';
import { ContainerFlex } from '../styles/header';
import { Logo } from '../styles/header';
import NavBar from "./NavBar";

const Header = () => (
    <header>
        <ContainerFlex>
            <Link to="/">
                <Logo src={LogoDark} alt="Logo" />
            </Link>
            <NavBar />
        </ContainerFlex>
    </header>
);

export default Header;