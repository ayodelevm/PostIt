import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App.jsx';
import ResetPassword from './containers/ResetPassword.jsx';
import DashBoard from './containers/DashBoard.jsx';
import MessageAreaContainer from './containers/MessageAreaContainer.jsx';
import Landing from './components/Landing.jsx';
import NotFound from './components/NotFound.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';
import AuthProtected from './utils/AuthProtected.jsx';

import LoginContainer from './containers/LoginContainer.jsx';
import SignUpContainer from './containers/SignUpContainer.jsx';

const Routes = () => (
  <App>
    <Switch>
      <AuthProtected exact path="/resetpassword" component={ResetPassword} />
      <AuthProtected exact path="/" component={Landing} />
      <AuthProtected exact path="/register" component={SignUpContainer} />
      <AuthProtected exact path="/login" component={LoginContainer} />
      <PrivateRoute exact path="/dashboard" component={DashBoard} />
      <PrivateRoute
        exact
        path="/groups/:id/message"
        component={MessageAreaContainer}
      />
      <Route path="/*" component={NotFound} />
    </Switch>
  </App>
  );

export default Routes;

