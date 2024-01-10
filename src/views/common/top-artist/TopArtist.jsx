import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

const TopArtist = ({ background, topArtist }) => {
  console.log(topArtist);
  return (
    <div className="artist-top">
      <div className="top-card-information top-card-information-artist">
        <p className="top-card-description">Your favourite artist</p>
        <p className="bold top-card-primary">{topArtist.name}</p>
        <p className="top-card-secondary flex justify-center">
          {topArtist.genres
            .slice(0, 2)
            .sort((f, s) => f.length - s.length)
            .map(g => (
              <div key={topArtist.id + g} className="artist-card-genre-tag">
                <p>{g.toUpperCase()}</p>
              </div>
            ))}
        </p>
      </div>
      <div style={background} className="top-card-image top-card-image-artist"></div>
    </div>
  );
};

TopArtist.propTypes = {
  background: PropTypes.object,
  topArtist: PropTypes.object,
};

export default TopArtist;
