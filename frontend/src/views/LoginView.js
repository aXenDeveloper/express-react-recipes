import React, { useState } from 'react';
import { useCSRF } from '../context/csrf';
import config from '../config';
import { BoxConatainerSmall, FlexCenter, PaddingLarge } from '../styles/layout';
import { Form } from '../styles/forms';
import Button from '../styles/button';

const LoginView = () => {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const { createTokenCSRF } = useCSRF();

	const api = async () => {
		try {
			const api = await fetch(`${config.backend_url}/account/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: inputEmail,
					password: inputPassword
				})
			});

			const data = await api.json();
			console.log(data);

			if (api.status === 200) {
				createTokenCSRF(data.CSRF_token);
				window.location.href = '/';
			}

		} catch (err) {
			console.error(err);
		}
	};

	const forumSubmit = e => {
		e.preventDefault();
		api();
	};

	const handleEmail = e => setInputEmail(e.target.value);
	const handlePassword = e => setInputPassword(e.target.value);

	return (
		<FlexCenter>
			<BoxConatainerSmall>
				<PaddingLarge>
					<Form onSubmit={forumSubmit}>
						<input type="email" placeholder="Email" onChange={handleEmail} value={inputEmail} />
						<input type="password" placeholder="Password" onChange={handlePassword} value={inputPassword} />
						<Button primary type="submit">Login</Button>
					</Form>
				</PaddingLarge>
			</BoxConatainerSmall>
		</FlexCenter>
	);
};

export default LoginView;
