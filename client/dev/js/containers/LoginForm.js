import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAUser } from '../actions/userActions';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    this.props.loginAUser(this.state)
    .then(
      () => {
        if (this.props.loginResponse.success) {
          this.setState({ redirect: true });
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

          <div className="row">
            <div className="input-field col s12">
              <button className="btn lime accent-4 waves-effect waves-light center" type="submit" name="action">Login
                <i className="material-icons left">person</i>
              </button>
            </div>
          </div>
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

LoginForm.defaultProps = {
  loginResponse: {}
};

LoginForm.propTypes = {
  loginAUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
  loginResponse: PropTypes.object
};

const mapStateToProps = state => ({
  loginResponse: state.userReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ loginAUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
