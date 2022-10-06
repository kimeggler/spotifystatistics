import React from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import { stars } from '../../assets';
import { validateToken } from '../../helper/authenticationhelper';

function Roadmap() {
  const history = useHistory();

  if (validateToken()) {
    history.push('/overview');
  }

  return (
    <div className="landingpage">
      <div className="landingpage-image" style={{ backgroundImage: `url(${stars})` }}></div>
      <div className="roadmap-area">
        <h3
          className="logo"
          onClick={() => {
            window.location.replace('/');
          }}
        >
          STATFY
        </h3>
        <h1 className="landing-page-title">
          DEVELOPMENT <span className="landing-page-title-span">ROADMAP</span>
        </h1>
        <p className="paragraph">
          We want to provide you with information about our current plans for the development of
          features
        </p>

        <div className="roadmap">
          <div className="roadmap-element">
            <p className="roadmap-element-title">Current stage</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider" />
              <div className="roadmap-state roadmap-state-completed" />
            </div>
            <p className="roadmap-element-date">TODAY</p>
            <p className="roadmap-element-paragraph">
              Statfy allows users to view their listening behaviours. Users can create playlists
              with their favorite songs over different periods of time
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Major redesign</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider" />
              <div className="roadmap-state roadmap-state-completed" />
            </div>
            <p className="roadmap-element-date">MAR 2022</p>
            <p className="roadmap-element-paragraph">
              Statfy will recieve major a overhaul and redesign.
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Phaseout</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider" />
              <div className="roadmap-state roadmap-state-active" />
            </div>
            <p className="roadmap-element-date">END OF 2022</p>
            <p className="roadmap-element-paragraph">
              Statfy will be shut down by the end of the year. We are currently working on a
              solution to replace statfy. Feel free to leave us feedback and wishes for Statfy 2.0.
            </p>
            <a href="/feedback">Leave feedback</a>
          </div>
        </div>
        <button
          className="button-secondary roadmap-button"
          onClick={() => {
            window.location.replace('/');
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default Roadmap;
