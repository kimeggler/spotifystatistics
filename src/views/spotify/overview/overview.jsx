import React from 'react';
import './style.css';
import { ArtistTop, TrackTop } from '../../common';

function Overview() {
  return (
    <div className='overview'>
      <h1 className='overview-title'>Let's start with your favourites</h1>
      <ArtistTop />
      <TrackTop />
    </div>
  );
}

export default Overview;
