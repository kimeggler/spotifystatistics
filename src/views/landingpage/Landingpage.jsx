import React from 'react';
import './style.css';
import { authorizeSpotifyUser } from '../../services/fetchservice';

import { startscreen } from '../../assets';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../../helper/authenticationhelper';

function Landingpage() {
  const history = useHistory();

  if (validateToken()) {
    history.push('/overview');
  }

  return (
    <div className="landingpage">
      <div className="login-area">
        <h3 className="logo">STATIFY</h3>
        <h1 className="intro-text">Do you really know what music you listen to?</h1>
        <p>
          With our website you can see what your most listened artists and tracks are. You can also
          create playlists with your favourite tracks directly from Statify!
        </p>
        <a href="/about">About this site</a>
        <div className="login-buttons">
          <button
            onClick={() => {
              window.location.replace(authorizeSpotifyUser());
            }}
          >
            LOG IN WITH SPOTIFY
          </button>
        </div>
      </div>
      <div className="login-image-area">
        <div className="login-image" style={{ backgroundImage: `url(${startscreen})` }}></div>
      </div>
    </div>
  );
}

export default Landingpage;
