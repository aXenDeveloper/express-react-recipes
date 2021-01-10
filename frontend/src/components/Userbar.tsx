import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AuthContextType, useCSRF } from '../context/csrf';

import LogoutButton from './LogoutButton';

const Userbar: FC = () => {
	const { tokenCSRF, memberData } = useCSRF() as AuthContextType;

	return (
		<div className="userbar">
			{tokenCSRF ? (
				<>
					<li>Welcome {memberData.name}</li>
					<li>
						<LogoutButton />
					</li>
				</>
			) : (
				<>
					<li>
						<Link to="/login">
							<button className="button">Existing user? Sign In</button>
						</Link>
					</li>

					<li>
						<Link to="/register">
							<button className="button button_primary">Sign Up</button>
						</Link>
					</li>
				</>
			)}
		</div>
	);
};

export default Userbar;
