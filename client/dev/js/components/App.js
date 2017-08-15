import React from 'react';
import PropTypes from 'prop-types';
// import UserList from '../containers/user-list';
// import UserDetails from '../containers/user-detail';
// import Nav from './Nav';
import Footer from './LandingFooter';
import Landing from './Landing';


class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Nav /> */}
        {/* <main id="below_nav" className="row"> */}
        {/* <Landing /> */}
        { this.props.children }
        {/* </main> */}
        {/* <Footer /> */}
        <div className="container" />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
