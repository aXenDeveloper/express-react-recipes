import React, { FC } from 'react';
import NavItems from './NavItems';

const NavBar: FC = () => (
	<nav className="nav">
		<div className="container">
			<ul>
				<NavItems />
			</ul>
		</div>
	</nav>
);

export default NavBar;
