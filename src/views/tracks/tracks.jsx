import React, { useState, useEffect } from 'react';
import { getData } from '../../services/fetchservice';
import Track from '../common/track/track';
import './style.css';

function Tracks() {
  const [toptracks, setToptracks] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  useEffect(() => {
    const fetchTopArtist = async () => {
      let tracks = await getData('me/top/tracks', {}, `?time_range=${timerange}&limit=50`);
      setToptracks(tracks.items);
    };
    fetchTopArtist();
  }, [timerange]);
  if (!toptracks) return null;

  const renderTracks = () => {
    return toptracks.map((track, index) => {
      return Track(track, index)
    })
  }

  return (
    <div className='tracks-container'>
      <div className='time-switch'>
        <div
          onClick={() => {
            setTimerange('short_term');
          }}
          className={`time-button ${timerange === 'short_term' ? 'button-selected' : ''}`}>
          1
        </div>
        <div
          onClick={() => {
            setTimerange('medium_term');
          }}
          className={`time-button ${timerange === 'medium_term' ? 'button-selected' : ''}`}>
          6
        </div>
        <div
          onClick={() => {
            setTimerange('long_term');
          }}
          className={`time-button ${timerange === 'long_term' ? 'button-selected' : ''}`}>
          all
        </div>
      </div>
      <div className='tracks-content'>
          {renderTracks()}
      </div>
    </div>
  );
}

export default Tracks;
