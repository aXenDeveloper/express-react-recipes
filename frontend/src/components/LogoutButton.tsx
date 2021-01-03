import { FC } from 'react';
import config from '../config';
import { useCSRF } from '../context/csrf';

interface LogoutButtonInterface {
	buttonFull?: boolean;
}

const LogoutButton: FC<LogoutButtonInterface> = ({ buttonFull }) => {
	const { tokenCSRF, deleteTokenCSRF }: any = useCSRF();

	const api = async () => {
		try {
			const api = await fetch(`${config.backend_url}/account/logout`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					CSRF_Token: tokenCSRF
				}
			});

			if (api.status === 200) {
				deleteTokenCSRF();
				window.location.href = '/';
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<button className={`button button_important${buttonFull ? ' button_full' : ''}`} onClick={() => api()}>
			Logout
		</button>
	);
};

export default LogoutButton;
