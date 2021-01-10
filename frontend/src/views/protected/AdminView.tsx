import { FC, useEffect } from 'react';
import { AuthContextType, useCSRF } from '../../context/csrf';
import config from '../../config';

import ErrorView from '../ErrorView';

const AdminView: FC = () => {
	const { memberData, statusVerifyCSRF } = useCSRF() as AuthContextType;

	useEffect(() => {
		document.title = `${config.title_page} - Admin Panel`;
	}, []);

	if (statusVerifyCSRF !== 200) return <ErrorView code={401}>You don't have access to this page!</ErrorView>;

	return (
		<div className="container">
			<div className="container_box">
				<div className="padding">Admin {memberData.name}</div>
			</div>
		</div>
	);
};

export default AdminView;
