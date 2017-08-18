import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { loginAUser } from '../actions/authActions';
import { validateLoginInput } from '../utils/validations';
import InputFieldGroup from '../components/common/InputFields';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIdentifier: '',
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

    const { isValid, errors } = validateLoginInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });

    this.props.loginAUser(this.state)
    .then(
      () => {
        if (this.props.loginResponse.isAuthenticated) {
          this.setState({ redirect: true });
          notify.show('Welcome back!', 'success', 10000);
        } else {
          if (this.props.loginResponse.errors.errors) {
            return this.setState({ errors: this.props.loginResponse.errors.errors });
          }
          notify.show(this.props.loginResponse.errors.globals, 'warning', 10000);
          window.localStorage.removeItem('token');
        }
      }
    );
  }

  render() {
    const form = (
      <form className="col s12" onSubmit={this.handleFormSubmit} noValidate>
        <div className="main">
          <Notifications />
        </div>
        <div className="divider" />
        <br />

        <div className="row">
          <InputFieldGroup
            name={'userIdentifier'}
            placeholder={'vic ayo'}
            id={'userIdentifier'}
            value={this.state.userIdentifier}
            label={'Username or E-mail *'}
            error={this.state.errors.userIdentifier}
            type={'text'}
            onChange={this.handleChange}
            htmlFor={'userIdentifier'}
          />
          <span className="left error-message grey-text">{this.state.errors.userIdentifier}</span>
        </div>
        <div className="row">
          <InputFieldGroup
            name={'password'}
            placeholder={'Your Password'}
            id={'password'}
            value={this.state.password}
            label={'Password *'}
            error={this.state.errors.password}
            type={'password'}
            onChange={this.handleChange}
            htmlFor={'password'}
          />
          <span className="left error-message grey-text">{this.state.errors.password}</span>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <button className="btn lime accent-4 waves-effect waves-light center" type="submit" name="action">Login
              <i className="material-icons right">person</i>
            </button>
          </div>
        </div>
      </form>
    );

    return (
      <div>
        {
          this.state.redirect ? <Redirect push to="/dashboard" /> : form
        }
      </div>
    );
  }
}

LoginForm.defaultProps = {
  loginResponse: {}
};

LoginForm.propTypes = {
  loginAUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
  loginResponse: PropTypes.object
};

const mapStateToProps = state => ({
  loginResponse: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ loginAUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
