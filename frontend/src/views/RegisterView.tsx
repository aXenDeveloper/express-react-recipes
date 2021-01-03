import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const RegisterView = () => {
	const [inputName, setInputName] = useState<string>('');
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [inputPasswordCF, setInputPasswordCF] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [verifyPasswordCF, setVerifyPasswordCF] = useState<boolean>(true);

	useEffect(() => {
		document.title = `${config.title_page} - Register`;
	}, []);

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

			setErrorMessage('');
			setSuccessMessage('');

			if (api.status === 200) {
				setSuccessMessage(data.message);
			} else if (api.status === 400) {
				setErrorMessage(data.message);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const formSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (inputPassword === inputPasswordCF) {
			api();
		}
	};

	const handleName = (e: ChangeEvent<HTMLInputElement>): void => setInputName(e.target.value);
	const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => setInputEmail(e.target.value);
	const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => setInputPassword(e.target.value);
	const handlePasswordCF = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputPasswordCF(e.target.value);

		if (inputPassword === e.target.value) {
			setVerifyPasswordCF(false);
		} else setVerifyPasswordCF(true);
	};

	return (
		<div className="container">
			<div className="flex flex-ai:center flex-jc:center">
				<div className="container_box container_box:small">
					<div className="container_title">
						<h1>Register</h1>
					</div>

					<div className="padding:large">
						{errorMessage && <div className="message message-error">{errorMessage}</div>}
						{successMessage && <div className="message message-success">{successMessage}</div>}

						<form className="form" onSubmit={formSubmit}>
							<ul className="form_ul">
								<li>
									<input
										type="text"
										className="input input_text input_full"
										placeholder="Display Name"
										onChange={handleName}
										value={inputName}
									/>
								</li>
								<li>
									<input
										type="email"
										className="input input_text input_full"
										placeholder="Email Address"
										onChange={handleEmail}
										value={inputEmail}
									/>
								</li>
								<li>
									<input
										type="password"
										className="input input_text input_full"
										placeholder="Password"
										onChange={handlePassword}
										value={inputPassword}
									/>
								</li>
								<li>
									<input
										type="password"
										className="input input_text input_full"
										placeholder="Confirm Password"
										onChange={handlePasswordCF}
										value={inputPasswordCF}
									/>
								</li>

								{verifyPasswordCF && (
									<li>
										<div className="message message-error">The password confirmation must be the same.</div>
									</li>
								)}
							</ul>

							<div className="flex flex-jc:center margin-top">
								<button className="button button_primary button_full" type="submit">
									Register
								</button>
							</div>
						</form>

						<div className="text:center margin-top">
							<Link to="/login">Existing user? Sign In</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterView;
