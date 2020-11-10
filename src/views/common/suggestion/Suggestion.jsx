import React from 'react';

import './style.css';

const Suggestion = (suggestion, index) => {
  let background = {};
  if (suggestion.images[0]) {
    background = {
      backgroundImage: `url(${suggestion.images[0].url})`,
    };
  }

  return (
    <div key={suggestion.id} className="artist">
      <div className="img-container">
        <div style={background} className="artist-card-image"></div>
        <p className="artist-rank">{index + 1}</p>
      </div>
      <p className="artist-card-name bold">{suggestion.name}</p>
    </div>
  );
};

export default Suggestion;
