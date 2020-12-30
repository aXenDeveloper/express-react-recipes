import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../assets/logo_dark.png';
import { ContainerFlex, HeaderStyle } from '../styles/header';
import { Logo } from '../styles/header';
import NavBar from "./NavBar";
import Userbar from "./Userbar";

const Header = () => (
    <HeaderStyle>
        <ContainerFlex>
            <Link to="/">
                <Logo src={LogoDark} alt="Logo" />
            </Link>
            <NavBar />
            <Userbar />
        </ContainerFlex>
    </HeaderStyle>
);

export default Header;