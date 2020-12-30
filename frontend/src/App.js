import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/csrf';
import AdminView from './views/AdminView';
import Cookies from 'js-cookie';
import config from './config';

const App = () => {
	const [tokenCSRF, setTokenCSRF] = useState(Cookies.get('CSRF_token'));
	const [statusVerifyCSRF, setStatusVerifyCSRF] = useState(0);
	const [memberData, setMemberData] = useState({});

	useEffect(() => {
		if (tokenCSRF) {
			fetch(`${config.backend_url}/account/verifyCSRF`, {
				headers: {
					'Content-Type': 'application/json',
					CSRF_Token: tokenCSRF
				}
			}).then(res => {
				setStatusVerifyCSRF(res.status);
				return res.json();
			}).then(data => {
				setMemberData(data.member);
			});
		}
	}, [tokenCSRF]);

	const createTokenCSRF = key => {
		Cookies.set('CSRF_token', key);
		setTokenCSRF(key);
	};

	const deleteTokenCSRF = () => {
		Cookies.remove('CSRF_token');
		setTokenCSRF(undefined);
	};

	return (
		<AuthContext.Provider value={{ tokenCSRF, createTokenCSRF, deleteTokenCSRF, statusVerifyCSRF, memberData }}>
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
