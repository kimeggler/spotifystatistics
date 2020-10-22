import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import './style.css';
import FormattedNumber from '../formattednumber/FormattedNumber';

import rangeOptions from './range-options';
import Spinner from '../spinner/Spinner';
import DefaultErrorMessage from '../errors/DefaultErrorMessage';
import { fetchMyTopArtist } from '../../../services/spotifyservice';
import useDataHook from '../../../hooks/useDataHook';

const TopArtist = () => {
  const [timerange, setTimerange] = useState('medium_term');
  const [artistRequest, setArtistRequest] = useState(() => () => fetchMyTopArtist(timerange));
  const { data: topArtist, isLoading, hasError } = useDataHook(artistRequest);

  useEffect(() => {
    setArtistRequest(() => () => fetchMyTopArtist(timerange));
  }, [timerange]);

  if (hasError) return <DefaultErrorMessage />;
  if (!topArtist && isLoading !== false) return <Spinner />;

  const background = {
    backgroundImage: `url(${topArtist.images[0].url})`,
  };

  return (
    <div className="artist-top">
      {isLoading && <Spinner className="overlay" />}
      <div className="top-card-information top-card-information-artist">
        <p className="top-card-description">Your Top-Artist</p>
        <p className="bold top-card-primary">{topArtist.name}</p>
        <p className="top-card-secondary">
          Followers: <FormattedNumber value={topArtist.followers.total} />
        </p>
        <div className="time-switch padding-right">
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
      <div style={background} className="top-card-image"></div>
    </div>
  );
};

export default TopArtist;
