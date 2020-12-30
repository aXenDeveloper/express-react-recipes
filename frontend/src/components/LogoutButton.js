import React from 'react';
import config from '../config';
import { useCSRF } from '../context/csrf';

const LogoutButton = () => {
    const { tokenCSRF, deleteTokenCSRF } = useCSRF();

    const api = async () => {
        try {
            const api = await fetch(`${config.backend_url}/account/logout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF_Token': tokenCSRF
                }
            });

            if (api.status === 200) {
                deleteTokenCSRF();
                window.location.href = '/';
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {tokenCSRF && <button onClick={() => api()}>Logout</button>}
        </>
    );
};

export default LogoutButton;