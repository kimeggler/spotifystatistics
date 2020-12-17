import React, { useEffect, useState } from 'react';
import { calcTopGenres, calcTopGenresIncludingArtists } from '../../../helper/genrehelper';
import useDataHook from '../../../hooks/useDataHook';
import { fetchArtists } from '../../../services/spotifyservice';
import { DefaultErrorMessage, Spinner } from '../../common';
import Genre from '../../common/genre/Genre';
import './style.css';

function Genres() {
  const [timerange, setTimerange] = useState('medium_term');
  const [includeArtistRating, setIncludeArtistRating] = useState(false)
  const [artistsRequest, setArtistsRequest] = useState(() => () => fetchArtists(timerange));
  const { data: artists, isLoading, hasError } = useDataHook(artistsRequest);
  const [topGenres, setTopGenres] = useState();
  const [hovered, setHovered] = useState();

  useEffect(() => {
    setArtistsRequest(() => () => fetchArtists(timerange));
  }, [timerange]);

  useEffect(() => {
    if (artists) setTopGenres(includeArtistRating ? calcTopGenresIncludingArtists(artists) : calcTopGenres(artists));
  }, [artists, includeArtistRating])

  const renderGenres = () => {
    return topGenres.map((genre, index) => Genre(genre, index))
  }

  if (hasError) return <DefaultErrorMessage />;
  if (!artists > 0 && isLoading !== false) return <Spinner />;

  return (
    <div className="genres">
      <h1 className="site-title">Favourite Genres</h1>
      <div className="time-switch time-switch-detail time-switch-tracks">
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
      <div className="include-ranking-container">
        <div className="flex">
          <p>Include artist ranking?</p>
          <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="info-icon">i</div>
        </div>
        {hovered && <div className="info-card"><p>If this option is turned on, the genres of your higher artists will be weighted more.</p></div>}
        <div className="button" onClick={() => setIncludeArtistRating(!includeArtistRating)}>{includeArtistRating ? 'turn off' : 'turn on'}</div>
      </div>
      <div className="genres-content">
        {topGenres && renderGenres()}
      </div>
    </div>
  );
}

export default Genres;