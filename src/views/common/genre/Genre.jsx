import React from 'react';
import './style.css';

function Genre(genre, index) {

  return (
    <div key={index} className="genre">
      <div className="left">
        <h3>{index + 1}</h3>
      </div>
      <div className="right">
        <p>{genre.name}</p>
      </div>
    </div>
  );
}

export default Genre;