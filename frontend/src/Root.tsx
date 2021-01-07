import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import { AuthContext } from './context/csrf';
import AdminView from './views/protected/AdminView';
import Cookies from 'js-cookie';
import config from './config';
import ErrorView from './views/ErrorView';
import RecipesView from './views/RecipesView';
import RecipesAddView from './views/protected/RecipeAddView';
import RecipeItemView from './views/RecipeItemView';
import RecipeEditView from './views/protected/RecipeEditView';

const Root = () => {
	const [tokenCSRF, setTokenCSRF] = useState<string | undefined>(Cookies.get('CSRF_token'));
	const [statusVerifyCSRF, setStatusVerifyCSRF] = useState<number>(0);
	const [memberData, setMemberData] = useState({});

	useEffect(() => {
		if (tokenCSRF) {
			fetch(`${config.backend_url}/account/verifyCSRF`, {
				headers: {
					'Content-Type': 'application/json',
					CSRF_Token: tokenCSRF
				}
			})
				.then(res => {
					setStatusVerifyCSRF(res.status);
					return res.json();
				})
				.then(data => {
					setMemberData(data.member);
				});
		}
	}, [tokenCSRF]);

	const createTokenCSRF = (key: string): void => {
		Cookies.set('CSRF_token', key);
		setTokenCSRF(key);
	};

	const deleteTokenCSRF = () => {
		Cookies.remove('CSRF_token');
		setTokenCSRF('');
	};

	return (
		<AuthContext.Provider value={{ tokenCSRF, createTokenCSRF, deleteTokenCSRF, memberData, statusVerifyCSRF }}>
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={HomeView} />

						<Route exact path="/recipes/:id/edit" component={RecipeEditView} />
						<Route exact path="/recipes/add" component={RecipesAddView} />
						<Route path="/recipes/:id" component={RecipeItemView} />
						<Route exact path="/recipes" component={RecipesView} />

						<Route exact path="/login" render={() => (!tokenCSRF ? <LoginView /> : <Redirect to="/" />)} />
						<Route exact path="/register" render={() => (!tokenCSRF ? <RegisterView /> : <Redirect to="/" />)} />

						<Route
							exact
							path="/admin"
							render={() =>
								statusVerifyCSRF === 200 ? <AdminView /> : <ErrorView code={401}>You don't have access to this page!</ErrorView>
							}
						/>

						<Route component={() => <ErrorView code={404}>The page you requested does not exist</ErrorView>} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default Root;
