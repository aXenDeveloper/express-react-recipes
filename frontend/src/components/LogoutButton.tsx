import { FC } from 'react';
import { useCSRF } from '../context/csrf';
import { useMutation } from 'react-query';
import { LogoutButtontype } from '../types/componentsType';
import config from '../config';

const LogoutButton: FC<LogoutButtontype> = ({ buttonFull }) => {
  const { tokenCSRF, deleteTokenCSRF } = useCSRF() as { tokenCSRF: string; deleteTokenCSRF: () => void };

  const { mutateAsync } = useMutation(async () => {
    const api = await fetch(`${config.backend_url}/account/logout`, {
      method: 'DELETE',
      headers: {
        CSRF_Token: tokenCSRF
      }
    });

    if (api.status === 200) {
      deleteTokenCSRF();
    }
  });

  return (
    <button
      className={`button button_important${buttonFull ? ' button_full' : ''}`}
      onClick={async () => await mutateAsync()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
