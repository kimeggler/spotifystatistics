import React from "react";
import "./style.css";

function About() {
  return (
    <div className="overview">
      <div className="about-area">
        <h1>About Statify</h1>
        <p>
          Statify is a webapplication based on React. It was developed as part
          of a schoolproject and is part of a non-profit project.
        </p>
        <p className="disclaimer">
          *This application has not been approved by Spotify and is
          selfsustained.
        </p>
      </div>
    </div>
  );
}

export default About;
