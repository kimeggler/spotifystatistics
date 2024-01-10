import React from 'react';
import { useHistory } from 'react-router-dom';
import { stars } from '../../assets';
import { validateToken } from '../../helper/authenticationhelper';
import { authorizeSpotifyUser } from '../../services/fetchservice';
import { ShowAt } from '../common';
import './style.css';

function Landingpage() {
  const history = useHistory();

  if (validateToken()) {
    history.push('/overview');
  }

  return (
    <>
      <div className="landingpage">
        <div className="landingpage-image" style={{ backgroundImage: `url(${stars})` }}></div>
        <h3 className="logo">STATFY</h3>
        <div className="login-area">
          <p className="langing-page-tag-title">STATISTICS & FACTS</p>
          <h1 className="landing-page-title">
            SPOTIFY <span className="landing-page-title-span">STATISTICS</span>
          </h1>
          <ShowAt breakpoint="1000AndAbove">
            <p className="paragraph">
              With our website you can see what your most listened artists and tracks are. You can
              also create playlists with your favourite tracks directly from Statfy!
            </p>
          </ShowAt>
          <p className="paragraph">
            <span className="bold">Important information: </span>Due to high maintenance efforts,
            Statfy will cease operations at the end of the year. A replacement solution will be
            introduced here, as soon as it is ready! Stay tuned!
          </p>
          <div className="login-buttons">
            <button
              className="button-primary"
              onClick={() => {
                window.location.replace(authorizeSpotifyUser());
              }}
            >
              LOG IN WITH SPOTIFY
            </button>
            <button
              className="button-secondary"
              onClick={() => {
                window.location.replace('/roadmap');
              }}
            >
              Development
            </button>
            {/* <button
              className="button-secondary"
              onClick={() => {
                window.location.replace('/about');
              }}
            >
              Learn more
            </button> */}
          </div>
        </div>
        <div className="color-circle"></div>
      </div>
    </>
  );
}

export default Landingpage;
