import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import 'jquery/dist/jquery';
import 'materialize-css/dist/css/materialize.css';
import 'react-select/dist/react-select.css';
import 'materialize-css/dist/js/materialize';
import './js/main';

import '../../../scss/main.scss';

import store, { history } from './store/store';


import App from './components/App.jsx';
import DashBoardContainer from './containers/DashBoardContainer.jsx';
import MessagingContainer from './containers/MessagingContainer.jsx';
import Landing from './components/Landing.jsx';
import authorize from './utils/authorizeRoutes';


import LoginComponent from './components/LoginComponent.jsx';
import SignUpComponent from './components/SignUpComponent.jsx';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBNWHCslAvK5NRxGh93Lw90Og5e5TR9BC0',
  authDomain: 'postit-11cbe.firebaseapp.com',
  databaseURL: 'https://postit-11cbe.firebaseio.com',
  projectId: 'postit-11cbe',
  storageBucket: '',
  messagingSenderId: '100413825842'
};
firebase.initializeApp(config);


ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" forceRefresh component={Landing} />
            <Route exact path="/register" component={SignUpComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route path="/dashboard" component={authorize(DashBoardContainer)} />
            <Route path="/groups/:id/message" component={MessagingContainer} />
          </Switch>
        </App>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

