import React, { useState, useEffect } from 'react';
import { getData } from '../../../services/fetchservice';
import './style.css';

function TrackTop() {
  const [toptrack, setToptrack] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  useEffect(() => {
    const fetchTopArtist = async () => {
      let track = await getData('me/top/tracks', {}, `?time_range=${timerange}&limit=1`);
      setToptrack(track.items[0]);
    };
    fetchTopArtist();
  }, [timerange]);
  if (!toptrack) return null;
  const background = {
    backgroundImage: `url(${toptrack.album.images[0].url})`,
  };
  return (
    <div className="artist-top">
      {/* <img alt={toptrack.artists[0].name} src={toptrack.album.images[0].url} className='top-card-image' /> */}
      <div style={background} className="top-card-image"></div>
      <div className="top-card-information top-card-information-track">
        <p className="image-description padding-left top-card-description">Dein Top-Song</p>
        <p className="image-description padding-left bold top-card-primary">{toptrack.name}</p>
        <p className="image-description padding-left top-card-secondary">
          {toptrack.artists[0].name}
        </p>
        <div className="time-switch padding-left">
          <div
            onClick={() => {
              setTimerange('short_term');
            }}
            className={`time-button ${timerange === 'short_term' ? 'button-selected' : ''}`}
          >
            1 month
          </div>
          <div
            onClick={() => {
              setTimerange('medium_term');
            }}
            className={`time-button ${timerange === 'medium_term' ? 'button-selected' : ''}`}
          >
            6 months
          </div>
          <div
            onClick={() => {
              setTimerange('long_term');
            }}
            className={`time-button ${timerange === 'long_term' ? 'button-selected' : ''}`}
          >
            all time
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackTop;
