import React from 'react';
import './style.css';
import { authorizeSpotifyUser } from '../../services/fetchservice';

import { background } from '../../assets';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../../helper/authenticationhelper';

function Roadmap() {
  const history = useHistory();

  if (validateToken()) {
    history.push('/overview');
  }

  return (
    <div className="landingpage" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-area">
        <h3
          className="logo"
          onClick={() => {
            window.location.replace('/');
          }}
        >
          STATIFY
        </h3>
        <h1 className="intro-text">Roadmap</h1>
        <p className="paragraph">
          What features are we currently developing and when you can expect their release
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
              Statify allows users to view their listening behaviours. Users can create playlists
              with their favorite songs over different periods of time
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Playlist analyse</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider" />
              <div className="roadmap-state roadmap-state-active" />
            </div>
            <p className="roadmap-element-date">JAN 2022</p>
            <p className="roadmap-element-paragraph">
              The feature to analyse playlists will recieve major a overhaul and redesign.
              Additionally more stats will become available.
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Instagram stories</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider inactive" />
              <div className="roadmap-state roadmap-state-inactive" />
            </div>
            <p className="roadmap-element-date">MAR 2022</p>
            <p className="roadmap-element-paragraph">
              Some statistics can be exported and published as stories or posts on all major social
              platforms.
            </p>
          </div>
          <div className="roadmap-element">
            <p className="roadmap-element-title">Customizable theme</p>
            <div className="roadmap-progress">
              <div className="roadmap-divider inactive" />
              <div className="roadmap-state roadmap-state-inactive" />
            </div>
            <p className="roadmap-element-date">~ JUN 2022</p>
            <p className="roadmap-element-paragraph">
              All users on statfy can customize the style of the app to their own taste.
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
      </div>
    </div>
  );
}

export default Roadmap;
