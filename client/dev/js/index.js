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


// import allReducers from './reducers';
import App from './components/App';
import Home from './components/Home';
import Footer from './components/LandingFooter';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';


// import UserList from './containers/user-list';
// import UserDetails from './containers/user-detail';

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
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <Route path="/home" component={Home} /> */}
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
