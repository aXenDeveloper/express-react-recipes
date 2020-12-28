import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useCSRF } from '../context/csrf';

const ProtectedRoute = ({ component: Component, ...res }) => {
	const auth = useCSRF();

	return <Route {...res} render={props => auth ? <Component {...props} /> : <Redirect to="/" />} />;
};

export default ProtectedRoute;
