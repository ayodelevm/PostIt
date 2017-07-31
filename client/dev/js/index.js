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

// import UserList from './containers/user-list';
// import UserDetails from './containers/user-detail';

import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
         <App> 
          <Switch>
            <Route path="/register" component={SignUpComponent} />
            <Route path="/login" component={LoginComponent} />
          </Switch>
          <Route path="/home" component={Home} />
         </App>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
