import React from 'react';
import '_style.css';

function artist_top(img_alt, img, artist_name, track_name) {
  return (
    <div className="artist-top">
      <p className="image-description text-background">Dein Top-Artist</p>
      <p className="image-description bold artist-name text-background">{artist_name}</p>
      <p className="image-description track-name text-background">{track_name}</p>
      <img alt={img_alt} src={img} className="card-image" />
    </div>
  );
}

export default artist_top;
