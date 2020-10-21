import React from 'react';
import './style.css';
import { authorizeSpotifyUser } from '../../services/fetchservice';

import { startscreen, spotify } from '../../assets';

function Landingpage() {
  return (
    <div className="landingpage">
      <div className="login-area">
        <h3 className="logo">Statify</h3>
        <h1 className="intro-text">Do you really know what music you listen to?</h1>
        <p>
          With our website you can see what your most listened artist and tracks are. You can also
          create playlists with your favourite tracks directly from Statify
        </p>
        <p className="disclaimer">*Some functionality may be exclusive for Spotify-Users</p>
        <a href="/about">About this site</a>
        <div className="login-buttons">
          <button
            onClick={() => {
              window.location.replace(authorizeSpotifyUser());
            }}
          >
            <img className="login-button-image spotify-image" src={spotify} alt="spotify" />
          </button>
          {/* <button
            onClick={() => {
              window.location.replace(authorizeSpotifyUser());
            }}>
            <img className='login-button-image' src={deezer} alt='deezer' />
          </button> */}
        </div>
      </div>
      <div className="login-image-area">
        <div className="login-image" style={{ backgroundImage: `url(${startscreen})` }}></div>
      </div>
    </div>
  );
}

export default Landingpage;
