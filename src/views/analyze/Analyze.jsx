import React from 'react';
import './style.css';
import { ArtistTop, TrackTop } from '../common';

function Analyze() {
  return (
    <div className='analyze'>
      <h1>How funky are your playlists?</h1>
      <ArtistTop />
      <TrackTop />
    </div>
  );
}

export default Analyze;
