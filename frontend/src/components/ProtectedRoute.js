import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import ErrorView from '../views/ErrorView';
import config from '../config';

const ProtectedRoute = ({ component: Component, ...res }) => {
	const [statusVerifyCSRF, setStatusVerifyCSRF] = useState();
	const { tokenCSRF } = useCSRF();

	useEffect(() => {
		if (tokenCSRF) {
			fetch(`${config.backend_url}/account/verifyCSRF`, {
				headers: {
					'Content-Type': 'application/json',
					CSRF_Token: tokenCSRF
				}
			}).then(res => setStatusVerifyCSRF(res.status));
		}
	}, [tokenCSRF]); // statusVerifyCSRF === 200

	return <Route {...res} render={props => (statusVerifyCSRF === 200 ? <Component {...props} /> : <ErrorView />)} />;
};

export default ProtectedRoute;
