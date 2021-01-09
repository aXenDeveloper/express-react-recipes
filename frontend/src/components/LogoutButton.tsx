import { FC } from 'react';
import { useCSRF } from '../context/csrf';
import config from '../config';
import { useMutation } from 'react-query';

interface LogoutButtonInterface {
	buttonFull?: boolean;
}

const LogoutButton: FC<LogoutButtonInterface> = ({ buttonFull }) => {
	const { tokenCSRF, deleteTokenCSRF }: any = useCSRF();

	const { mutateAsync } = useMutation(async () => {
		const api = await fetch(`${config.backend_url}/account/logout`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				CSRF_Token: tokenCSRF
			}
		});

		if (api.status === 200) {
			deleteTokenCSRF();
		}
	});

	return (
		<button className={`button button_important${buttonFull ? ' button_full' : ''}`} onClick={async () => await mutateAsync()}>
			Logout
		</button>
	);
};

export default LogoutButton;
