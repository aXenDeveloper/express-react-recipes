import { FC } from 'react';
import { Link } from 'react-router-dom';

import NavbarMobile from './nav/NavbarMobile';
import Userbar from './Userbar';
import Navbar from './nav/Navbar';

import Logo from '../assets/logo.png';

const Header: FC = () => (
	<header className="header">
		<div className="container">
			<Link to="/" className="logo">
				<img src={Logo} alt="Logo" />
			</Link>

			<Navbar />
			<Userbar />
			<NavbarMobile />
		</div>
	</header>
);

export default Header;
