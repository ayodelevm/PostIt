import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import 'jquery/dist/jquery';
import 'materialize-css/dist/css/materialize.css';
import 'react-select/dist/react-select.css';
import 'materialize-css/dist/js/materialize';
import './js/main';

import '../scss/main.scss';

import store, { history } from './store/store';

import Routes from './Routes.jsx';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
