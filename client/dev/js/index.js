import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import promise from 'redux-promise';

import 'jquery/dist/jquery';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import './js/main';

import '../../../scss/main.scss';

import store from './store/store';


import App from './components/App';
import Home from './components/Home';
import Footer from './components/LandingFooter';
import DashBoardContainer from './containers/DashBoardContainer';
import Landing from './components/Landing';
import authorize from './utils/authorizeRoutes';


import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';


ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" forceRefresh component={Landing} />
            <Route exact path="/register" component={SignUpComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route path="/dashboard" component={authorize(DashBoardContainer)} />
          </Switch>
          {/* <Route path="/home" component={Home} /> */}
        </App>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
