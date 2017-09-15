import React from 'react';
import Spinner from 'react-spinner-material';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, path: route, status }) => {
  if (status.isVerified) {
    return (<Route
      path={route} render={props => (
        status.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <div>
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          </div>
        )
      )}
    />
    );
  } else if (window.localStorage.token === undefined) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  return (
    <div className="before-auth-spinner">
      <Spinner
        size={120}
        spinnerColor={'#333'}
        spinnerWidth={2}
        visible
      />
    </div>
  );
};

export const AuthProtected = ({ component: Component, path: route }) => (<Route
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


PrivateRoute.propTypes = {
  // eslint-disable-next-line
  status: PropTypes.object,
  location: PropTypes.object,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

AuthProtected.propTypes = {
  // eslint-disable-next-line
  location: PropTypes.object,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  status: state.authReducer,
});


export default connect(mapStateToProps, null)(PrivateRoute);
