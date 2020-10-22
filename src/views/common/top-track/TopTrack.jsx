import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import useDataHook from '../../../hooks/useDataHook';
import { fetchMyTopTrack } from '../../../services/spotifyservice';
import DefaultErrorMessage from '../errors/DefaultErrorMessage';
import Spinner from '../spinner/Spinner';
import rangeOptions from './range-options';

function TrackTop() {
  const [timerange, setTimerange] = useState('medium_term');
  const [trackRequest, setTrackRequest] = useState(() => () => fetchMyTopTrack(timerange));
  const { data: topTrack, isLoading, hasError } = useDataHook(trackRequest);

  useEffect(() => {
    setTrackRequest(() => () => fetchMyTopTrack(timerange));
  }, [timerange]);

  if (hasError) return <DefaultErrorMessage />;
  if (!topTrack && isLoading !== false) return <Spinner />;

  const background = {
    backgroundImage: `url(${topTrack.album.images[0].url})`,
  };

  return (
    <div className="artist-top">
      {isLoading && <Spinner className="overlay" />}
      <div style={background} className="top-card-image"></div>
      <div className="top-card-information top-card-information-track">
        <p className="image-description padding-left top-card-description">Dein Top-Song</p>
        <p className="image-description padding-left bold top-card-primary">{topTrack.name}</p>
        <p className="image-description padding-left top-card-secondary">
          {topTrack.artists[0].name}
        </p>
        <div className="time-switch padding-left">
          {rangeOptions.map((option, idx) => (
            <div
              key={idx}
              onClick={() => !isLoading && setTimerange(option.value)}
              className={cx(
                'time-button',
                option.value === timerange ? 'button-selected' : '',
                isLoading && 'disabled',
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackTop;
