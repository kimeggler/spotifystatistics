import React from 'react';
import { stars } from '../../assets';

import './style.css';

function About() {
  return (
    <div className="about">
      <div className="landingpage-image" style={{ backgroundImage: `url(${stars})` }}></div>
      <h3 className="logo">STATFY</h3>
      <p className="langing-page-tag-title">STATISTICS & FACTS</p>
      <h1 className="landing-page-title">
        ABOUT <span className="landing-page-title-span">STATFY</span>
      </h1>
      <p className="paragraph">
        Statfy is a web-application based on React. It was developed as part of a non-profit
        schoolproject.
      </p>
      <p className="paragraph">While using Statfy no data from your Spotify profile is stored.</p>
      <p className="disclaimer">*This application is not supported by Spotify.</p>

      <button
        className="button-secondary"
        onClick={() => {
          window.location.replace('/');
        }}
      >
        Back to home
      </button>
    </div>
  );
}

export default About;
