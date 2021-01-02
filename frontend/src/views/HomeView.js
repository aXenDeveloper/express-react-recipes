import React, { useEffect } from 'react';
import config from '../config';

const HomeView = () => {
	useEffect(() => {
		document.title = config.title_page;
	}, []);

	return <div>Home</div>;
};

export default HomeView;
