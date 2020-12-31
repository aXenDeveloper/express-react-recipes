import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';

const NavbarMobile = () => {
	const [active, setActive] = useState(false);

	const NavMobileBackground = styled.div`
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);

		${props =>
			!props.active &&
			css`
				display: none;
			`}
	`;

	const NavMobileContent = styled.div`
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1100;
		width: 340px;
		max-width: calc(100% - 50px);
		background-color: red;
		box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
		transform: translateX(calc(100% + 45px));
		transition: transform 0.3s ease;
		overflow: auto;

		${props =>
			props.active &&
			css`
				transform: translateX(0);
			`}
	`;

	const handleButtonNavMobile = () => {
		setActive(!active);
	};

	return (
		<>
			<button aria-label="mobile-button-nav" onClick={handleButtonNavMobile}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div active={active}>test</div>
			<div active={active}></div>
		</>
	);
};

export default NavbarMobile;
