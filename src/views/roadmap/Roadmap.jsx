import React from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import { validateToken } from '../../helper/authenticationhelper';
import { stars } from '../../assets';

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
            <p className="roadmap-element-title">Playlist Stats</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider" />
              <div className="roadmap-state roadmap-state-active" />
            </div>
            <p className="roadmap-element-date">APR 2022</p>
            <p className="roadmap-element-paragraph">
              The statistics page will recieve a new look and new stats will become available
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Instagram stories</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider inactive" />
              <div className="roadmap-state roadmap-state-inactive" />
            </div>
            <p className="roadmap-element-date">MAY 2022</p>
            <p className="roadmap-element-paragraph">
              Some statistics can be exported and published as stories or posts on all major social
              platforms.
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">More to come...</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider inactive" />
              <div className="roadmap-state roadmap-state-inactive" />
            </div>
            <p className="roadmap-element-date">TBD</p>
            <p className="roadmap-element-paragraph">
              More features will be added to the roadmap over the next few months. STAY TUNED.
            </p>
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
