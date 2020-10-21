import React from 'react';

import './style.css';

function Artist(artist, index) {
  let background = {};
  if (artist.images[0]) {
    background = {
      backgroundImage: `url(${artist.images[0].url})`,
    };
  }

  return (
    <div key={artist.id} className="artist">
      <div className="img-container">
        {/* <img alt={artist.name} src={artist.images[0].url} className='artist-card-image' /> */}
        <div style={background} className="artist-card-image"></div>
        <p className="artist-rank">{index + 1}</p>
      </div>
      <p className="artist-card-name bold">{artist.name}</p>
    </div>
  );
}

export default Artist;
