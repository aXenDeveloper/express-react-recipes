import React from 'react';
import { Route } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import ErrorView from '../views/ErrorView';

const ProtectedRoute = ({ component: Component, ...res }) => {
	const { statusVerifyCSRF } = useCSRF();

	return (
		<Route
			{...res}
			render={props =>
				statusVerifyCSRF === 200 ? <Component {...props} /> : <ErrorView code="401">You don't have access to this page!</ErrorView>
			}
		/>
	);
};

export default ProtectedRoute;
