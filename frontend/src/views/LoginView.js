import React, { useState, useRef, useEffect } from 'react';
import { useCSRF } from '../context/csrf';
import config from '../config';

const LoginView = () => {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState();

	const { createTokenCSRF } = useCSRF();

	const unmounted = useRef(false);
	useEffect(() => {
		document.title = `${config.title_page} - Login`;
		return (unmounted.current = true);
	}, []);

	const api = async () => {
		setLoading(true);

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
			} else if (api.status === 400) {
				setErrorMessage(data.message);
			}

			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	const formSubmit = e => {
		e.preventDefault();
		api();
	};

	const handleEmail = e => setInputEmail(e.target.value);
	const handlePassword = e => setInputPassword(e.target.value);

	return (
		<>
			{loading ? (
				<div className="loading"></div>
			) : (
				<div className="flex flex-ai:center flex-jc:center">
					<div className="container_box container_box:small">
						<div className="padding:large">
							{errorMessage && <div className="message message-error">{errorMessage}</div>}

							<form onSubmit={formSubmit}>
								<input type="email" placeholder="Email Address" onChange={handleEmail} value={inputEmail} />
								<input type="password" placeholder="Password" onChange={handlePassword} value={inputPassword} />

								<button className="button button_primary" type="submit">
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default LoginView;
