import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/csrf';
import Cookies from 'js-cookie';
import config from './config';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import LoginView from './views/accounts/LoginView';
import RegisterView from './views/accounts/RegisterView';
import AdminView from './views/protected/AdminView';
import ErrorView from './views/ErrorView';
import RecipesView from './views/recipes/RecipesView';
import RecipesAddView from './views/recipes/protected/RecipeAddView';
import RecipeItemView from './views/recipes/RecipeItemView';
import RecipeEditView from './views/recipes/protected/RecipeEditView';

const Root = () => {
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

  const createTokenCSRF = (key: string) => {
    Cookies.set('CSRF_token', key, { expires: 1460 });
    setTokenCSRF(key);
  };

  const deleteTokenCSRF = () => {
    Cookies.remove('CSRF_token');
    setTokenCSRF('');
    setStatusVerifyCSRF(0);
    setMemberData({});
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

            <Route exact path="/admin" component={AdminView} />

            <Route component={() => <ErrorView code={404}>The page you requested does not exist</ErrorView>} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Root;
