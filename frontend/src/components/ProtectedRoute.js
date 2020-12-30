import React from 'react';
import { Route } from 'react-router-dom';
import { useCSRF } from '../context/csrf';
import ErrorView from '../views/ErrorView';

const ProtectedRoute = ({ component: Component, ...res }) => {
	const { statusVerifyCSRF } = useCSRF();

	return <Route {...res} render={props => (statusVerifyCSRF === 200 ? <Component {...props} /> : <ErrorView />)} />;
};

export default ProtectedRoute;
