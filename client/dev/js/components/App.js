import React from 'react';
import PropTypes from 'prop-types';
// import UserList from '../containers/user-list';
// import UserDetails from '../containers/user-detail';
import Nav from './Nav';
import Footer from './LandingFooter';
import Slider from './Slider';


class App extends React.Component {
  render() {
    return (
      <div id="register_signin">
        <Nav />
        <main id="below_nav" className="row">
          <Slider />
          { this.props.children }
        </main>
        <Footer />
        <div className="container" />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
