import React from 'react';
import './style.css';
import { ArtistTop, TrackTop } from '../common';

function Overview() {
  return (
    <div className='overview'>
      <h1>Los geht's mit deinen Favoriten</h1>
      <ArtistTop />
      <TrackTop />
    </div>
  );
}

export default Overview;
