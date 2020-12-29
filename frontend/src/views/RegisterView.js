import React from 'react';
import config from '../config';

const RegisterView = () => {
	const api = async () => {
		try {
			const api = await fetch(`${config.backend_url}/account/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: 'admin@admin.pl',
					password: 'admin123'
				})
			});

			const data = await api.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<button onClick={api}>Register</button>
		</div>
	);
};

export default RegisterView;
