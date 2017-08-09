import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewUser } from '../actions/userActions';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      telephone: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.createNewUser(this.state)
    .then(
      () => {
        console.log('=====props', this.props);
        console.log('=====???', this.props.signupResponse);
        console.log('=====???========', this.props.signupResponse);
        if (this.props.signupResponse.isAuthenticated) {
          this.setState({ redirect: true });
        } else {
          window.localStorage.removeItem('token');
        }
      }
    );
  }

  render() {
    const form = (
      <form className="col s12" onSubmit={this.handleFormSubmit}>
        <div className="divider" />
        <br />
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Victor ayo" id="fullname" type="text"
              name="fullname" onChange={this.handleChange} value={this.state.fullname}
            />
            <label htmlFor="fullname">Fullname *</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="vicayo@domainname.com" id="email" type="email"
              name="email" onChange={this.handleChange} value={this.state.email}
            />
            <label htmlFor="email">Email *</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Mobile number" id="telephone" type="tel"
              name="telephone" onChange={this.handleChange} value={this.state.telephone}
            />
            <label htmlFor="telephone">Mobile number *</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="John Doe" id="username" type="text"
              name="username" onChange={this.handleChange} value={this.state.username}
            />
            <label htmlFor="username">Username *</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Your Password" id="password" type="password"
              name="password" onChange={this.handleChange} value={this.state.password}
            />
            <label htmlFor="password">Password *</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Confirm Password" id="passwordConfirmation" type="password"
              name="passwordConfirmation" onChange={this.handleChange} value={this.state.password2}
            />
            <label htmlFor="passwordConfirmation">Confirm Password *</label>
          </div>
        </div>

        <div className="row">

          <div className="row">
            <div className="input-field col s12">
              <button className="btn lime accent-4 waves-effect waves-light center" type="submit" name="action">Create Account
                  <i className="material-icons right">person_add</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );

    return (
      <div>
        {
          this.state.redirect ? <Redirect to="/dashboard" /> : form
        }
      </div>
    );
  }
}

SignUpForm.defaultProps = {
  signupResponse: {}
};

SignUpForm.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  // signupError: PropTypes.string,
  // eslint-disable-next-line
  signupResponse: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    signupResponse: state.userReducer
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ createNewUser }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(SignUpForm);
