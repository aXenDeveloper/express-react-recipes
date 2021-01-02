import React from 'react';
import Header from './Header';
import NavBar from './nav/NavBar';

const Layout = ({ children }) => (
	<>
		<Header />
		<NavBar />
		<main>
			<div className="container">{children}</div>
		</main>
	</>
);

export default Layout;
