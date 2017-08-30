import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../actions/resetPasswordActions';
import { validateResetPassword } from '../utils/validations';
import ResetPassword from '../components/ResetPassword.jsx';
import store from '../store/store';


class ResetPasswordContainer extends React.Component {
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

  handleChange(e) {
    e.persist();
    if (!!this.state.errors && this.state.errors[e.target.name]) {
      this.setState((prevState) => {
        const errors = Object.assign({}, prevState.errors);
        delete errors[e.target.name];

        return {
          [e.target.name]: e.target.value,
          errors
        };
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { isValid, errors } = validateResetPassword(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }
    const token = this.props.location.search.split('=')[1];

    this.setState({ errors: {} });
    console.log('*****token', token);

    this.props.resetPassword(token, this.state)
    .then(
      () => {
        if (this.props.resetResponse.resetSuccess) {
          this.setState({ redirect: true });
          notify.show('Password reset successful, please login to continue', 'success', 10000);
        } else {
          if (this.props.resetResponse.errors.errors) {
            return this.setState({ errors: this.props.resetResponse.errors.errors });
          }
          notify.show(this.props.resetResponse.errors.globals, 'warning', 10000);
        }
      }
    );
  }

  render() {

    return (
      <div>
        {
          this.state.redirect ? store.dispatch(push('/login')) :
          <ResetPassword
            submit={this.handleFormSubmit}
            state={this.state}
            password={this.state.password}
            passwordConfirmation={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
        }
      </div>
          // this.state.redirect ? <Redirect to="/login" /> :
      // <ResetPassword
      //   submit={this.handleFormSubmit}
      //   state={this.state}
      //   password={this.state.password}
      //   passwordConfirmation={this.state.passwordConfirmation}
      //   onChange={this.handleChange}
      // />
    );
  }
}

ResetPasswordContainer.defaultProps = {
  loginResponse: {}
};

ResetPasswordContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  // eslint-disable-next-line
  resetResponse: PropTypes.object
};

const mapStateToProps = state => ({
  resetResponse: state.resetPasswordReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ resetPassword }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ResetPasswordContainer);
