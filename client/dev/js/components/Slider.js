import React from 'react';

const Slider = () => (
  <div className="slide_sec col l8 m12 s12">
    <div className="slider">
      <ul className="slides">
        <li>
          <img src="https://farm4.staticflickr.com/3077/2607404802_675f6419b2.jpg" alt="slider_image_1" />
          <div className="caption center-align">
            <h3>This is our big Tagline!</h3>
            <h5 className="light grey-text text-lighten-3">Here&#39s our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="http://lorempixel.com/580/250/nature/2" alt="slider_image_2" />
          <div className="caption left-align">
            <h3>Left Aligned Caption</h3>
            <h5 className="light grey-text text-lighten-3">Here&#39s our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="http://lorempixel.com/580/250/nature/3" alt="slider_image_3" />
          <div className="caption right-align">
            <h3>Right Aligned Caption</h3>
            <h5 className="light grey-text text-lighten-3">Here&#39s our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="http://lorempixel.com/580/250/nature/4" alt="slider_image_4" />
          <div className="caption center-align">
            <h3>This is our big Tagline!</h3>
            <h5 className="light grey-text text-lighten-3">Here&#39s our small slogan.</h5>
          </div>
        </li>
      </ul>
    </div>
  </div>
);
export default Slider;
