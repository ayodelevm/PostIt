import React from 'react';
import { Link } from 'react-router-dom';

require('../../../../scss/main.scss');


const Home = () => (
  <div>
    <Link id="site_name" to="/list" >PostIt</Link>
  </div>
);

export default Home;
