import React from 'react';
import './style.css';
import { authorizeSpotifyUser } from '../../services/fetchservice';

import { background } from '../../assets';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../../helper/authenticationhelper';

function Landingpage() {
  const history = useHistory();

  if (validateToken()) {
    history.push('/overview');
  }

  return (
    <div className="landingpage" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-area">
        <h3 className="logo">STATIFY</h3>
        <h1 className="intro-text">Do you really know what music you listen to?</h1>
        <p className="paragraph">
          With our website you can see what your most listened artists and tracks are. You can also
          create playlists with your favourite tracks directly from Statify!
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
    </div>
  );
}

export default Landingpage;
