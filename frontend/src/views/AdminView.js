import React, { useEffect } from 'react';
import { useCSRF } from '../context/csrf';
import config from '../config';

const AdminView = () => {
	const { memberData } = useCSRF();

	useEffect(() => {
		document.title = `${config.title_page} - Admin Panel`;
	}, []);

	return (
		<div className="container_box">
			<div className="padding">Admin {memberData.name}</div>
		</div>
	);
};

export default AdminView;
