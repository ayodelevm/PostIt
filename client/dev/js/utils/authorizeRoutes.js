import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import { push } from 'react-router-redux';
import store from '../store/store';

const authorize = (ProtectedComponent) => {
  class AuthorizeRoutes extends React.Component {
    componentWillMount() {
      if (!this.props.status.isAuthenticated) {
        store.dispatch(push('/login'));
        setTimeout(() => {
          notify.show('You need to be logged in to access this page!', 'warning', 10000);
        }, 1000);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.status.isAuthenticated) {
        store.dispatch(push('/'));
      }
    }

    render() {
      return (
        <ProtectedComponent {...this.props.status} />
      );
    }
  }

  AuthorizeRoutes.propTypes = {
    // eslint-disable-next-line
    status: PropTypes.object
  };

  const mapStateToProps = state => ({
    status: state.authReducer
  });

  return connect(mapStateToProps, null)(AuthorizeRoutes);
};

export default authorize;
