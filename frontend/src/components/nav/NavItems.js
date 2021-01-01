import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCSRF } from '../../context/csrf';

const NavItems = () => {
	const { tokenCSRF } = useCSRF();

	return (
		<>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
			</li>
			{tokenCSRF && (
				<li>
					<NavLink exact to="/admin">
						Admin
					</NavLink>
				</li>
			)}
		</>
	);
};

export default NavItems;
