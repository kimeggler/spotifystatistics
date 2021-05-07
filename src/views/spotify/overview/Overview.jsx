import React, { useEffect, useState } from 'react';
import cx from 'classnames';


import './style.css';
import { DefaultErrorMessage, Spinner, TopArtist, TopTrack } from '../../common';
import useDataHook from '../../../hooks/useDataHook';
import { fetchMyTopArtist, fetchMyTopTrack } from '../../../services/spotifyservice';
import rangeOptions from '../../common/top-track/range-options';

function Overview() {

  const [timerange, setTimerange] = useState('medium_term');
  const [artistRequest, setArtistRequest] = useState(() => () => fetchMyTopArtist(timerange));
  const [trackRequest, setTrackRequest] = useState(() => () => fetchMyTopTrack(timerange));
  const { data: topArtist, isLoading: artistIsLoading, hasError: artistError } = useDataHook(artistRequest);
  const { data: topTrack, isLoading: trackisLoading, hasError: trackError } = useDataHook(trackRequest);

  const isLoading = (artistIsLoading || trackisLoading);

  useEffect(() => {
    setArtistRequest(() => () => fetchMyTopArtist(timerange));
    setTrackRequest(() => () => fetchMyTopTrack(timerange));
  }, [timerange]);

  if (artistError || trackError) return <DefaultErrorMessage />;
  if ((!topArtist || !topTrack) || isLoading) return <Spinner />;
  
  const background = (imgUrl) => {
    return {
      backgroundImage: `url(${imgUrl})`,
    }
  }

  return (
    <div className="overview">
      <h1 className="overview-title">Let&apos;s start with your favourites</h1>
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
      <TopArtist background={background(topArtist.images[0].url)} topArtist={topArtist} />
      <TopTrack background={background(topTrack.album.images[0].url)} topTrack={topTrack} />
    </div>
  );
}

export default Overview;
