import React from 'react';
import { useCSRF } from '../context/csrf';

const Login_view = () => {
	const { createTokenCSRF } = useCSRF();

	const api = async () => {
		try {
			const api = await fetch('http://localhost:8000/account/login', {
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
			<form>
				<input type="email" placeholder="email" />
				<input type="password" placeholder="password" />
				<input type="submit" value="Login" />
			</form>
			<button onClick={() => createTokenCSRF('siema')}>Test</button>
		</div>
	);
};

export default Login_view;
