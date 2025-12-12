import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { stars } from '../../assets';
import { validateToken, signIn } from '../../helper/authenticationhelper';
import { ShowAt } from '../common';
import './style.css';

function Landingpage() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      if (isValid) {
        setIsAuthenticated(true);
        history.push('/overview');
      }
    };
    checkAuth();
  }, [history]);

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  if (isAuthenticated) {
    return null;
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
              onClick={handleLogin}
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
