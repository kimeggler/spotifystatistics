import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { ShowAt } from '../../common';

import './style.css';

function Navigation() {
  return (
    <Fragment>
      <ShowAt breakpoint="1000AndBelow">
        <div></div>
      </ShowAt>

      <ShowAt breakpoint="1000AndAbove">
        <div className="navigation">
          <Link
            to="/"
            className={`navigation-item ${
              window.location.href.split('/')[3] === ''
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Overview
          </Link>
          <Link
            to="/artists"
            className={`navigation-item ${
              window.location.href.split('/')[3] === 'artists'
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Artists
          </Link>
          <Link
            to="/tracks"
            className={`navigation-item ${
              window.location.href.split('/')[3] === 'tracks'
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Tracks
          </Link>
          <Link
            to="/analyze"
            className={`navigation-item ${
              window.location.href.split('/')[3] === 'analyze'
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Playlists
          </Link>
        </div>
      </ShowAt>
    </Fragment>
  );
}

export default Navigation;
