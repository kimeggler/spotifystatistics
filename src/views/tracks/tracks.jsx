import React, { useState, useEffect } from 'react';
import { getData } from '../../services/fetchservice';
import './style.css';

function Tracks() {
  const [toptracks, setToptracks] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  useEffect(() => {
    const fetchTopArtist = async () => {
      let track = await getData('me/top/tracks', {}, `?time_range=${timerange}&limit=1`);
      setToptracks(track.items[0]);
    };
    fetchTopArtist();
  }, [timerange]);
  if (!toptracks) return null;
  console.log(toptracks);
  return (
    <div className='tracks'>
      <div className='time-switch padding-left'>
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
    </div>
  );
}

export default Tracks;
