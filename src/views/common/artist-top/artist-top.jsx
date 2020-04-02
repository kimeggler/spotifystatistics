import React, { useEffect, useState } from 'react';
import { getData } from '../../../services/fetchservice';
import { addThousendSeparator } from '../../../helper/stringOperationHelper';
import './style.css';

function ArtistTop() {
  const [topartist, setTopartist] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  useEffect(() => {
    const fetchTopArtist = async () => {
      let artist = await getData('me/top/artists', {}, `?time_range=${timerange}&limit=1`);
      setTopartist(artist.items[0]);
    };
    fetchTopArtist();
  }, [timerange]);
  if (!topartist) return null;
  const background = {
    backgroundImage: `url(${topartist.images[0].url})`,
  };
  return (
    <div className='artist-top'>
      <div className='top-card-information'>
        <p className='top-card-description'>Dein Top-Artist</p>
        <p className='bold top-card-primary'>{topartist.name}</p>
        <p className='top-card-secondary'>Followers: {addThousendSeparator(topartist.followers.total)}</p>
        <div className='time-switch padding-right'>
          <div
            onClick={() => {
              setTimerange('short_term');
            }}
            className={`time-button ${timerange === 'short_term' ? 'button-selected' : ''}`}>
            1 month
          </div>
          <div
            onClick={() => {
              setTimerange('medium_term');
            }}
            className={`time-button ${timerange === 'medium_term' ? 'button-selected' : ''}`}>
            6 months
          </div>
          <div
            onClick={() => {
              setTimerange('long_term');
            }}
            className={`time-button ${timerange === 'long_term' ? 'button-selected' : ''}`}>
            all time
          </div>
        </div>
      </div>
      {/* <img alt={topartist.name} src={topartist.images[0].url} className='top-card-image' /> */}
      <div style={background} className='top-card-image'></div>
    </div>
  );
}

export default ArtistTop;
