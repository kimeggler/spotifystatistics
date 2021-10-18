import React from 'react';

import './style.css';

function About() {
  return (
    <div className="about">
      <h1>About Statify</h1>
      <p className="paragraph">
        Statify is a web-application based on React. It was developed as part of a non-profit
        schoolproject.
      </p>
      <p className="paragraph">While using Statify no data from your Spotify profile is stored.</p>
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
