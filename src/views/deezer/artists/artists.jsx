import React, { useState, useEffect } from 'react';
import { getData } from '../../../services/fetchservice';
import { Artist } from '../../common';
import './style.css';

function Artists() {
  const [topartists, setTopartists] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  useEffect(() => {
    const fetchTopArtist = async () => {
      let tracks = await getData(
        'me/top/artists',
        {},
        `?time_range=${timerange}&limit=50`
      );
      setTopartists(tracks.items);
    };
    fetchTopArtist();
  }, [timerange]);
  if (!topartists) return null;

  const renderArtists = () => {
    return topartists.map((artist, index) => {
      return Artist(artist, index);
    });
  };

  return (
    <div className='artists'>
      <h1 className='site-title'>Favourite Artists</h1>
      <div className='time-switch time-switch-detail'>
        <div
          onClick={() => {
            setTimerange('short_term');
          }}
          className={`time-button ${
            timerange === 'short_term' ? 'button-selected' : ''
          }`}>
          1 month
        </div>
        <div
          onClick={() => {
            setTimerange('medium_term');
          }}
          className={`time-button ${
            timerange === 'medium_term' ? 'button-selected' : ''
          }`}>
          6 months
        </div>
        <div
          onClick={() => {
            setTimerange('long_term');
          }}
          className={`time-button ${
            timerange === 'long_term' ? 'button-selected' : ''
          }`}>
          all time
        </div>
      </div>
      <div className='artists-content'>{renderArtists()}</div>
    </div>
  );
}

export default Artists;
