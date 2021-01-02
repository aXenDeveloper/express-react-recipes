import React from 'react';
import NavItems from './NavItems';

const NavBar = ({ navMobile }) => (
	<nav className="nav">
		<div className="container">
			<ul>
				<NavItems />
			</ul>
		</div>
	</nav>
);

export default NavBar;
