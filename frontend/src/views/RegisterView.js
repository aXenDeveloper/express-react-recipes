import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { BoxConatainerSmall, FlexCenter, PaddingLarge, BoxContainerTitle } from '../styles/layout';
import { Form, TextCenterForm } from '../styles/forms';
import Button from '../styles/button';

const RegisterView = () => {
	const [inputName, setInputName] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [inputPasswordCF, setInputPasswordCF] = useState('');

	const api = async () => {
		try {
			const api = await fetch(`${config.backend_url}/account/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: inputName,
					email: inputEmail,
					password: inputPassword
				})
			});

			const data = await api.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	const formSubmit = e => {
		e.preventDefault();
		if (inputPassword === inputPasswordCF) {
			api();
		}
	};

	const handleName = e => setInputName(e.target.value);
	const handleEmail = e => setInputEmail(e.target.value);
	const handlePassword = e => setInputPassword(e.target.value);
	const handlePasswordCF = e => setInputPasswordCF(e.target.value);

	return (
		<FlexCenter>
			<BoxConatainerSmall>
				<BoxContainerTitle>
					<h1>Register</h1>
				</BoxContainerTitle>

				<PaddingLarge>
					<TextCenterForm>
						<Link to="/login">Existing user? Sign In</Link>
					</TextCenterForm>

					<Form onSubmit={formSubmit}>
						<input type="text" placeholder="Display Name" onChange={handleName} value={inputName} />
						<input type="email" placeholder="Email Address" onChange={handleEmail} value={inputEmail} />
						<input type="password" placeholder="Password" onChange={handlePassword} value={inputPassword} />
						<input type="password" placeholder="Confirm Password" onChange={handlePasswordCF} value={inputPasswordCF} />

						<Button primary type="submit">
							Register
						</Button>
					</Form>
				</PaddingLarge>
			</BoxConatainerSmall>
		</FlexCenter>
	);
};

export default RegisterView;
