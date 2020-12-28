import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home_view from './views/Home_view';
import Login_view from './views/Login_view';
import Register_view from './views/Register_view';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/csrf';
import Admin_view from './views/Admin_view';
import Cookies from 'js-cookie';

const App = () => {
	const [tokenCSRF, setTokenCSRF] = useState(Cookies.get('CSRF_token'));

	const createTokenCSRF = data => {
		Cookies.set('CSRF_token', data);
		setTokenCSRF(data);
	};

	return (
		<AuthContext.Provider value={{ tokenCSRF, createTokenCSRF }}>
			<Router>
				<Layout>
					<Route exact path="/" component={Home_view} />
					<Route exact path="/login" component={Login_view} />
					<Route exact path="/register" component={Register_view} />
					<ProtectedRoute path="/admin" component={Admin_view} />
				</Layout>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
