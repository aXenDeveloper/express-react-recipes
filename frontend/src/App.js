import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Home_view from "./views/Home_view";
import Login_view from "./views/Login_view";
import Register_view from "./views/Register_view";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home_view} />
        <Route exact path="/login" component={Login_view} />
        <Route exact path="/register" component={Register_view} />
      </Layout>
    </Router>
  );
};

export default App;
