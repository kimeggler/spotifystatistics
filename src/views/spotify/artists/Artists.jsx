import React, { useState, useEffect } from 'react';
import { fetchArtists } from '../../../services/spotifyservice';
import { Artist, DefaultErrorMessage } from '../../common';
import './style.css';

import { Spinner } from '../../common';
import useDataHook from '../../../hooks/useDataHook';

function Artists() {
  const [timerange, setTimerange] = useState('medium_term');
  const [artistsRequest, setArtistsRequest] = useState(() => () => fetchArtists(timerange));
  const { data: artists, isLoading, hasError } = useDataHook(artistsRequest);

  useEffect(() => {
    setArtistsRequest(() => () => fetchArtists(timerange));
  }, [timerange]);

  if (hasError) return <DefaultErrorMessage />;
  if (!artists > 0 && isLoading !== false) return <Spinner />;

  const renderArtists = () => {
    return artists.map((artist, index) => {
      return Artist(artist, index);
    });
  };

  return (
    <div className="artists">
      <h1 className="site-title">Favourite Artists</h1>
      <div className="time-switch time-switch-detail">
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
      <div className="artists-content">{renderArtists()}</div>
    </div>
  );
}

export default Artists;
