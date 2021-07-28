import React from 'react';
import './style.css';

function Track(track, index) {
  return (
    <div key={track.id} className="track">
      <div className="highlight-circle">
        <p className="track-index bold">{index + 1}</p>
      </div>
      <img alt={track.name} src={track.album.images[1]?.url} className="card-image" />
      <div className="top-section">
        <p className="image-description bold track-name">
          {track.name.length > 35 ? `${track.name.substring(0, 32)}...` : track.name}
        </p>
        <p className="image-description artist-name">{track.artists[0].name}</p>
      </div>
    </div>
  );
}

export default Track;
