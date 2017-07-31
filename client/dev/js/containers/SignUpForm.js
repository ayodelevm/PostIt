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
      username: '',
      password: '',
      email: '',
      fullname: '',
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
        if (this.props.signupResponse.success) {
          this.setState({ redirect: true });
        }
      }
    );
  }

  render() {
    const form = (
      <form className="col s12">
        <div className="input-field col s12">
          <input
            id="full_name" type="text" className="validate"
            name="fullname" onChange={this.handleChange} value={this.state.fullname}
          />
          <label htmlFor="full_name">Full Name</label>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email" type="email" className="validate"
              name="email" onChange={this.handleChange} value={this.state.email}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username" type="text" className="validate"
              name="username" onChange={this.handleChange} value={this.state.username}
            />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password" type="password" className="validate"
              name="password" onChange={this.handleChange} value={this.state.password}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <Link to="/home" className="waves-effect waves-light btn" onClick={this.handleFormSubmit}>Create Account</Link>
        </div>
      </form>
    );

    return (
      <div>
        {
          this.state.redirect ? <Redirect to="/home" /> : form
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
