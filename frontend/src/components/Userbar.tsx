import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import LogoutButton from './LogoutButton';

const Userbar: FC = () => {
	const { tokenCSRF, memberData }: any = useCSRF();

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
