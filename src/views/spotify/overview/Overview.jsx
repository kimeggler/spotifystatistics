import React from 'react';
import './style.css';
import { TopArtist, TopTrack } from '../../common';

function Overview() {
  return (
    <div className="overview">
      <h1 className="overview-title">Let&apos;s start with your favourites</h1>
      <TopArtist />
      <TopTrack />
    </div>
  );
}

export default Overview;
