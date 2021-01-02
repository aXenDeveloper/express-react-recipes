import React, { FC, useEffect } from 'react';
import { useCSRF } from '../context/csrf';
import config from '../config';

const AdminView: FC = () => {
	const { memberData }: any = useCSRF();

	useEffect(() => {
		document.title = `${config.title_page} - Admin Panel`;
	}, []);

	return (
		<div className="container">
			<div className="container_box">
				<div className="padding">Admin {memberData.name}</div>
			</div>
		</div>
	);
};

export default AdminView;
