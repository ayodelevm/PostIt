import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'jquery/dist/jquery';
import 'materialize-css/dist/css/materialize.css';
import 'react-select/dist/react-select.css';
import 'materialize-css/dist/js/materialize';
import './js/main';

import '../scss/main.scss';

import store, { history } from './store/store';


import App from './components/App.jsx';
import ResetPasswordContainer from './containers/ResetPasswordContainer.jsx';
import DashBoardContainer from './containers/DashBoardContainer.jsx';
import MessagingContainer from './containers/MessagingContainer.jsx';
import Landing from './components/Landing.jsx';
import authorize from './utils/authorizeRoutes';


import LoginContainer from './containers/LoginContainer.jsx';
import SignUpContainer from './containers/SignUpContainer.jsx';



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/resetpassword" component={ResetPasswordContainer} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={SignUpContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route path="/dashboard" component={authorize(DashBoardContainer)} />
          <Route path="/groups/:id/message" component={MessagingContainer} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

