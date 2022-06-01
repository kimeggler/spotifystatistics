import React from 'react';
import './style.css';
import { authorizeSpotifyUser } from '../../services/fetchservice';

import { useHistory } from 'react-router-dom';
import { validateToken } from '../../helper/authenticationhelper';
import { stars } from '../../assets';

function Landingpage() {
  const history = useHistory();

  if (validateToken()) {
    history.push('/overview');
  }

  return (
    <div className="landingpage">
      <div className="landingpage-image" style={{ backgroundImage: `url(${stars})` }}></div>
      <div className="login-area">
        <h3 className="logo">STATFY</h3>
        <p className="langing-page-tag-title">STATISTICS & FACTS</p>
        <h1 className="landing-page-title">
          SPOTIFY <span className="landing-page-title-span">STATISTICS</span>
        </h1>
        <p className="paragraph">
          With our website you can see what your most listened artists and tracks are. You can also
          create playlists with your favourite tracks directly in Statfy!
        </p>
        <div className="login-buttons">
          <button
            className="button-primary"
            onClick={() => {
              window.location.replace(authorizeSpotifyUser());
            }}
          >
            LOG IN WITH SPOTIFY
          </button>
          <button
            className="button-secondary"
            onClick={() => {
              window.location.replace('/roadmap');
            }}
          >
            Development
          </button>
          <button
            className="button-secondary"
            onClick={() => {
              window.location.replace('/about');
            }}
          >
            Learn more
          </button>
        </div>
      </div>
      {/* <div className="color-circle"></div> */}
    </div>
  );
}

export default Landingpage;
