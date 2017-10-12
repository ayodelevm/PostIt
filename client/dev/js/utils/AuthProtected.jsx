import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Function to protect some routes from being accesible
 * after a user has been logged in
 * @param {object} props
 * @returns {component} route
 */
const AuthProtected = ({ component: Component, path: route }) => (<Route
  path={route} render={props => (
      window.localStorage.getItem('token') !== null ?
        <Redirect
          to={{
            pathname: '/dashboard',
            state: { from: props.location }
          }}
        /> : <Component {...props} />)}
/>
  );

AuthProtected.propTypes = {
  location: PropTypes.object,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

export default AuthProtected;
