import React from 'react';
import '_style.css';

function track_top(img_alt, img, artist_name, track_name) {
  return (
    <div className="artist-top">
      <img alt={img_alt} src={img} className="card-image" />
      <p className="image-description text-background">Dein Top-Song</p>
      <p className="image-description bold track-name text-background">{artist_name}</p>
      <p className="image-description artist-name text-background">{track_name}</p>
    </div>
  );
}

export default track_top;
