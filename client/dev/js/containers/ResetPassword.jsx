import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { resetPassword } from '../actions/resetPasswordActions';
import { validateResetPassword } from '../utils/validations';
import ResetPasswordForm from '../components/ResetPasswordForm.jsx';

/**
 * This class is the container component for resetting a users password
 * It is responsible for managing all the state changes in the component
 * @class ResetPassword
 * @extends {Component}
 */
export class ResetPassword extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      passwordConfirmation: '',
      password: '',
      redirect: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Takes in the target object of the onclick event and sets the state
   * with the form input and new error object
   * @method handleChange
   * @memberof ResetPassword
   * @param {object} event
   * @returns {void}
   */
  handleChange(event) {
    event.persist();
    if (!!this.state.errors && this.state.errors[event.target.name]) {
      this.setState((prevState) => {
        const errors = Object.assign({}, prevState.errors);
        delete errors[event.target.name];

        return {
          [event.target.name]: event.target.value,
          errors
        };
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  /**
   * Validates form input. If there's error, sets State with the error
   * if no error, makes a post request to the reset password endpoint
   * and handles response accordingly
   * @method handleFormSubmit
   * @memberof ResetPassword
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const { isValid, errors } = validateResetPassword(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }
    const token = this.props.location.search.split('=')[1];

    this.setState({ errors: {} });

    this.props.resetPassword(token, this.state)
    .then(
      () => {
        if (this.props.resetResponse.resetSuccess) {
          this.setState({ redirect: true });
          notify.show(
            'Password reset successful, please login to continue',
            'success',
            3000
          );
        } else {
          if (this.props.resetResponse.errors.errors) {
            return this.setState({
              errors: this.props.resetResponse.errors.errors
            });
          }
          notify
            .show(this.props.resetResponse.errors.globals, 'warning', 3000);
        }
      }
    );
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <div>
        {
          this.state.redirect ?
            <Redirect
              push
              to={{
                pathname: '/login',
              }}
            /> :
            <ResetPasswordForm
              onSubmit={this.handleFormSubmit}
              state={this.state}
              password={this.state.password}
              passwordConfirmation={this.state.passwordConfirmation}
              onChange={this.handleChange}
            />
        }
      </div>
    );
  }
}

ResetPassword.defaultProps = {
  loginResponse: {}
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  resetResponse: PropTypes.object,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  resetResponse: state.resetPasswordReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  resetPassword
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);
