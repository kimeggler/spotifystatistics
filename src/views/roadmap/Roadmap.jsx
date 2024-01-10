import React from 'react';
import { useHistory } from 'react-router-dom';
import { stars } from '../../assets';
import { validateToken } from '../../helper/authenticationhelper';
import './style.css';

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
            <p className="roadmap-element-title line-trough text-inactive">Playlist Stats</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider" />
              <div className="roadmap-state roadmap-state-canceled" />
            </div>
            <p className="roadmap-element-date line-trough text-inactive">JUN 2022</p>
            <p className="roadmap-element-paragraph line-trough text-inactive">
              The statistics page will recieve a new look and new stats will become available
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Phaseout</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider active" />
              <div className="roadmap-state roadmap-state-active" />
            </div>
            <p className="roadmap-element-date">DEZ 2024</p>
            <p className="roadmap-element-paragraph">
              Due to high maintenance efforts, Statfy will cease operations at the end of the year.
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
