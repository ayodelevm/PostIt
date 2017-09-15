/* eslint arrow-body-style: ["error", "always"]*/
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App.jsx';
import ResetPasswordContainer from './containers/ResetPasswordContainer.jsx';
import DashBoardContainer from './containers/DashBoardContainer.jsx';
import MessagingContainer from './containers/MessagingContainer.jsx';
import Landing from './components/Landing.jsx';
import NotFound from './components/NotFound.jsx';
import PrivateRoute, { AuthProtected } from './utils/authorizeRoutes';

import LoginContainer from './containers/LoginContainer.jsx';
import SignUpContainer from './containers/SignUpContainer.jsx';

const Routes = () => {
  return (
    <App>
      <Switch>
        <AuthProtected exact path="/resetpassword" component={ResetPasswordContainer} />
        <AuthProtected exact path="/" component={Landing} />
        <AuthProtected exact path="/register" component={SignUpContainer} />
        <AuthProtected exact path="/login" component={LoginContainer} />
        <PrivateRoute exact path="/dashboard" component={DashBoardContainer} />
        <PrivateRoute exact path="/groups/:id/message" component={MessagingContainer} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </App>
  );
};

export default Routes;

