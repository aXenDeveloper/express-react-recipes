import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import config from '../../config';

import ErrorView from '../ErrorView';
import LoginView from './LoginView';
import { RegisterViewFormValues } from '../../types/formTypes';

const RegisterView = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterViewFormValues>();

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

  const handleSubmitWithValue = (data: RegisterViewFormValues) => {
    handleName(data.displayName);
    handleEmail(data.email);
    handlePassword(data.password);
    handlePasswordCF(data.passwordCF);

    mutateAsync();
  };

  return (
    <div className="container container:small">
      <div className="container_box">
        <div className="container_title">
          <h1>Register</h1>
        </div>

        <div className="padding:large">
          {errorMessage && <div className="message message-error">{errorMessage}</div>}
          {successMessage && <div className="message message-success">{successMessage}</div>}

          <form className="form" onSubmit={handleSubmit(handleSubmitWithValue)}>
            <ul className="form_ul">
              <li>
                <input
                  type="text"
                  className={`input input_text input_full${
                    errors.displayName ? ' input_error' : ''
                  }`}
                  placeholder="Display Name"
                  {...register('displayName', { required: true })}
                />
              </li>
              <li>
                <input
                  type="email"
                  className={`input input_text input_full${errors.email ? ' input_error' : ''}`}
                  placeholder="Email Address"
                  {...register('email', { required: true })}
                />
              </li>
              <li>
                <input
                  type="password"
                  className={`input input_text input_full${errors.password ? ' input_error' : ''}`}
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
              </li>
              <li>
                <input
                  type="password"
                  className={`input input_text input_full${
                    errors.passwordCF ? ' input_error' : ''
                  }`}
                  placeholder="Confirm Password"
                  {...register('passwordCF', { required: true })}
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
  );
};

export default RegisterView;
