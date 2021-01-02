import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../assets/logo_dark.png';
import NavbarMobile from './nav/NavbarMobile';
import Userbar from './Userbar';
import Navbar from './nav/Navbar';

const Header: FC = () => (
	<header>
		<div className="container">
			<Link to="/" className="logo">
				<img src={LogoDark} alt="Logo" />
			</Link>

			<Navbar />
			<Userbar />
			<NavbarMobile />
		</div>
	</header>
);

export default Header;
