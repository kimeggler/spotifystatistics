import React from 'react';

import './style.css';

const Artist = (artist, index) => {
  let background = {};
  if (artist.images[0]) {
    background = {
      backgroundImage: `url(${artist.images[0].url})`,
    };
  }

  return (
    <div key={artist.id} className="artist">
      <div className="img-container">
        <div style={background} className="artist-card-image">
          <div className="artist-card-genres-background"></div>
          <div className="artist-card-genres">
            {artist.genres
              .slice(0, 2)
              .sort((f, s) => f.length - s.length)
              .map(g => (
                <div key={artist.id + g} className="artist-card-genre-tag">
                  <p>{g.toUpperCase()}</p>
                </div>
              ))}
          </div>
        </div>
        <p className="artist-rank">{index + 1}</p>
      </div>
      <p className="artist-card-name bold">{artist.name}</p>
    </div>
  );
};

export default Artist;
