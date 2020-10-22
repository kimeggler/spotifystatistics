import React from 'react';

import './style.css';

function About() {
  return (
    <div className="about">
      <h1>About Statify</h1>
      <p>
        Statify is a webapplication based on React. It was developed as part of a non-profit
        schoolproject.
      </p>
      <p className="disclaimer">
        *This application has not been approved by Spotify and is selfsustained.
      </p>

      <a href="/">Back to home</a>
    </div>
  );
}

export default About;
