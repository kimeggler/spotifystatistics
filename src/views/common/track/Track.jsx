import moment from 'moment';
import React from 'react';
import './style.css';

function Track(track, index) {
  return (
    <div key={track.id} className="track">
      <div className="track-rating">{index + 1}</div>

      <div className="track-top-container">
        <h2 className="track-card-title">{track.name}</h2>
        <img alt={track.name} src={track.album.images[0]?.url} className="card-image" />
      </div>

      <div className="track-text-container">
        <span className="track-text-column">
          <p className="bold">Artist name:</p>
          <p>{track.artists[0].name}</p>
        </span>
        <span className="track-text-column">
          <p className="bold">Album name:</p>
          <p>{track.album.name}</p>
        </span>
        <span className="track-text-column">
          <p className="bold">Release date:</p>
          <p>{moment(track.album.release_date).format('DD.MM.YYYY')}</p>
        </span>
      </div>
    </div>
  );
}

export default Track;
