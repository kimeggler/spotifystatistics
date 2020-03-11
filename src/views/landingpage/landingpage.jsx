import React from 'react';
import './style.css';
import { authorizeUser } from '../../services/fetchservice';

import { startscreen } from '../../assets';

function Landingpage() {
  return (
    <div className='landingpage'>
      <div className='login-area'>
        <h3 className='logo'>Statify</h3>
        <h1>Do you really know what music you listen to?</h1>
        <p>
          With our website you can see what your most listened artist and tracks
          are. You can also create playlists with your favourite tracks directly
          from Statify
        </p>
        <p className='disclaimer'>
          *This app does not collect and will not store any personal data
        </p>
        <button
          onClick={() => {
            window.location.replace(authorizeUser());
          }}>
          Login with Spotify
        </button>
      </div>
      <div className='login-image-area'>
        <div
          className='login-image'
          style={{ backgroundImage: `url(${startscreen})` }}></div>
      </div>
    </div>
  );
}

export default Landingpage;
