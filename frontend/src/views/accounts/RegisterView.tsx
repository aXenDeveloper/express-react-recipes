import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import config from '../../config';

import ErrorView from '../ErrorView';
import LoginView from './LoginView';

const RegisterView = () => {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');

	const { register, handleSubmit, errors } = useForm();

	const {
		inputName,
		inputEmail,
		inputPassword,
		inputPasswordCF,
		handleName,
		handleEmail,
		handlePassword,
		handlePasswordCF
	} = useAuthForm();

	useEffect(() => {
		document.title = `${config.title_page} - Register`;
	}, []);

	const { mutateAsync, isLoading, isError } = useMutation(async () => {
		const api = await fetch(`${config.backend_url}/account/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: inputName,
				email: inputEmail,
				password: inputPassword,
				passwordCF: inputPasswordCF
			})
		});
		const data = await api.json();

		setErrorMessage('');
		setSuccessMessage('');

		if (api.status === 200) setSuccessMessage(data.message);
		else if (api.status === 400) setErrorMessage(data.message);

		return data;
	});

	if (isLoading) return <LoginView />;
	if (isError) return <ErrorView code={500}>There was a problem with API connection.</ErrorView>;

	return (
		<div className="container container:small">
			<div className="flex flex-ai:center flex-jc:center">
				<div className="container_box">
					<div className="container_title">
						<h1>Register</h1>
					</div>

					<div className="padding:large">
						{errorMessage && <div className="message message-error">{errorMessage}</div>}
						{successMessage && <div className="message message-success">{successMessage}</div>}

						<form className="form" onSubmit={handleSubmit(async () => await mutateAsync())}>
							<ul className="form_ul">
								<li>
									<input
										type="text"
										name="displayName"
										className={`input input_text input_full${errors.displayName ? ' input_error' : ''}`}
										placeholder="Display Name"
										onChange={handleName}
										value={inputName}
										ref={register({ required: true })}
									/>
								</li>
								<li>
									<input
										type="email"
										name="email"
										className={`input input_text input_full${errors.email ? ' input_error' : ''}`}
										placeholder="Email Address"
										onChange={handleEmail}
										value={inputEmail}
										ref={register({ required: true })}
									/>
								</li>
								<li>
									<input
										type="password"
										name="password"
										className={`input input_text input_full${errors.password ? ' input_error' : ''}`}
										placeholder="Password"
										onChange={handlePassword}
										value={inputPassword}
										ref={register({ required: true })}
									/>
								</li>
								<li>
									<input
										type="password"
										name="passwordCF"
										className={`input input_text input_full${errors.passwordCF ? ' input_error' : ''}`}
										placeholder="Confirm Password"
										onChange={handlePasswordCF}
										value={inputPasswordCF}
										ref={register({ required: true })}
									/>
								</li>
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
