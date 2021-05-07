import React from 'react';

const TopTrack = ({background, topTrack}) => {
  return (
    <div className="artist-top">
      <div style={background} className="top-card-image top-card-image-track"></div>
      <div className="top-card-information top-card-information-track">
        <p className="image-description padding-left top-card-description">Your favourite song</p>
        <p className="image-description padding-left bold top-card-primary">{topTrack.name}</p>
        <p className="image-description padding-left top-card-secondary">
          {topTrack.artists[0].name} - {topTrack.album.name}
        </p>
      </div>
    </div>
  );
}

export default TopTrack;
