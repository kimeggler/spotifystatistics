import React, { Fragment } from 'react';
import './style.css';

import { ShowAt } from '../../common';

function Navigation() {
  return (
    <Fragment>
      <ShowAt breakpoint="1000AndBelow">
        <div></div>
      </ShowAt>

      <ShowAt breakpoint="1000AndAbove">
        <div className="navigation">
          <a
            href="/"
            className={`navigation-item ${
              window.location.href.split('/')[3] === ''
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Overview
          </a>
          <a
            href="/artists"
            className={`navigation-item ${
              window.location.href.split('/')[3] === 'artists'
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Artists
          </a>
          <a
            href="/tracks"
            className={`navigation-item ${
              window.location.href.split('/')[3] === 'tracks'
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Tracks
          </a>
          <a
            href="/analyze"
            className={`navigation-item ${
              window.location.href.split('/')[3] === 'analyze'
                ? 'navigation-active'
                : 'navigation-inactive'
            }`}
          >
            Playlists
          </a>
        </div>
      </ShowAt>
    </Fragment>
  );
}

export default Navigation;
