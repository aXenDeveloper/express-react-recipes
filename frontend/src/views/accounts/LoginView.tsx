import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import useAuthForm from '../../hooks/useAuthForm';
import { useCSRF } from '../../context/csrf';
import config from '../../config';
import Loading from '../../components/Loading';
import ErrorView from '../ErrorView';
import { AuthContextType } from '../../types/contextTypes';

const LoginView = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const { inputEmail, inputPassword, handleEmail, handlePassword } = useAuthForm();
  const { register, handleSubmit, errors } = useForm();
  const { createTokenCSRF } = useCSRF() as AuthContextType;

  useEffect(() => {
    document.title = `${config.title_page} - Login`;
  }, []);

  const { mutateAsync, isLoading, isError } = useMutation(async () => {
    const res = await fetch(`${config.backend_url}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword
      })
    });

    const data = await res.json();

    if (res.status === 200) {
      createTokenCSRF(data.CSRF_token);
    } else if (res.status === 400) {
      setErrorMessage(data.message);
    }

    return data;
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorView code={500}>There was a problem with API connection.</ErrorView>;

  return (
    <div className="container container:small">
      <div className="container_box padding:large">
        {errorMessage && <div className="message message-error">{errorMessage}</div>}

        <form className="form" onSubmit={handleSubmit(async () => await mutateAsync())}>
          <ul className="form_ul">
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
          </ul>

          <div className="flex flex-jc:center margin-top">
            <button className="button button_primary button_full" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
