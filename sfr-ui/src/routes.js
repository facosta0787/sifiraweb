import React from 'react';
import { Route, Switch } from 'react-router-dom';

import auth from './shared/components/hocs/AuthRoute';
import App from './pages/App';
import Home from './pages/Home';
import Names from './pages/Names';
import Prices from './pages/Prices';
import Cash from './pages/Cash';
import Process from './pages/Process';
import Bank from './pages/Bank';
import Login from './pages/Login';
import Page404 from './pages/Page404';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route exact path="/process" component={auth(Process)} />
      <Route exact path="/cash" component={auth(Cash)} />
      <Route exact path="/bank" component={auth(Bank)} />
      <Route exact path="/prices/:ref/:desc" component={auth(Prices)} />
      <Route exact path="/prices" component={auth(Prices)} />
      <Route exact path="/names" component={auth(Names)} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/:dni" component={auth(Home)} />
      <Route exact path="/" component={auth(Home)} />
      <Route component={Page404} />
    </Switch>
  </App>
);

export default AppRoutes;
