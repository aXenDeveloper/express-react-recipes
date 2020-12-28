import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/csrf';
import AdminView from './views/AdminView';
import Cookies from 'js-cookie';

const App = () => {
	const [tokenCSRF, setTokenCSRF] = useState(Cookies.get('CSRF_token'));

	const createTokenCSRF = key => {
		Cookies.set('CSRF_token', key);
		setTokenCSRF(key);
	};

	return (
		<AuthContext.Provider value={{ tokenCSRF, createTokenCSRF }}>
			<Router>
				<Layout>
					<Route exact path="/" component={HomeView} />
					<Route exact path="/login" component={LoginView} />
					<Route exact path="/register" component={RegisterView} />
					<ProtectedRoute path="/admin" component={AdminView} />
				</Layout>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
