import React from 'react';

import './style.css';
import FormattedNumber from '../formattednumber/FormattedNumber';

const TopArtist = ({background, topArtist}) => {
  return (
    <div className="artist-top">
      <div className="top-card-information top-card-information-artist">
        <p className="top-card-description">Your favourite artist</p>
        <p className="bold top-card-primary">{topArtist.name}</p>
        <p className="top-card-secondary">
          Followers: <FormattedNumber value={topArtist.followers.total} />
        </p>
      </div>
      <div style={background} className="top-card-image top-card-image-artist"></div>
    </div>
  );
};

export default TopArtist;
