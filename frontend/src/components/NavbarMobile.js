import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCSRF } from '../context/csrf';
import LogoutButton from './LogoutButton';

const NavbarMobile = () => {
	const [active, setActive] = useState(false);

	const { tokenCSRF, memberData } = useCSRF();

	const navOpen = () => setActive(true);
	const navClose = () => setActive(false);

	return (
		<>
			<button className="nav_mobile_button:open" aria-label="Open nav mobile" onClick={navOpen}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<button className={`nav_mobile_button:close${active ? ' active' : ''}`} aria-label="Close nav mobile" onClick={navClose}>
				<FontAwesomeIcon icon={faTimes} />
			</button>

			<div className={`nav_mobile_content${active ? ' active' : ''}`}>
				<div className="nav_mobile_content_top padding">
					{tokenCSRF ? (
						<div>Welcome {memberData.name}</div>
					) : (
						<>
							<Link to="/login" onClick={navClose}>
								<button className="button button_full margin_bottom:half">Existing user? Sign In</button>
							</Link>

							<Link to="/register" onClick={navClose}>
								<button className="button button_primary button_full">Sign Up</button>
							</Link>
						</>
					)}
				</div>
				<div className="padding">{tokenCSRF && <LogoutButton buttonFull />}</div>
			</div>
			<div className={`nav_mobile_background${active ? ' active' : ''}`} onClick={navClose}></div>
		</>
	);
};

export default NavbarMobile;