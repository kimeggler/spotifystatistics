import React, { Fragment, useContext, useState } from 'react';
import { ShowAt } from '..';
import { close, user_icon, menu_icon } from '../../../assets';
import { logout } from '../../../helper/authenticationhelper';
import { UserContext } from '../../AppRouter';
import './style.css';

function Userbadge(user) {
  const { profile } = useContext(UserContext);
  const [menuActive, setMenuActive] = useState('');

  const toggleScroll = () => {
    if (document.body.classList.contains('no-scroll')) {
      document.body.classList.remove('no-scroll');
      document.body.addEventListener(
        'touchmove',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
        },
        false,
      );
    } else {
      document.body.classList.add('no-scroll');
      document.body.removeEventListener(
        'touchmove',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
        },
        false,
      );
    }
  };

  const toggleMenu = () => {
    toggleScroll();
    setMenuActive(menuActive === '' ? 'menu-active' : '');
  };

  return (
    <Fragment>
      <ShowAt breakpoint="1000AndBelow">
        <div className="user_badge" onClick={() => toggleMenu()}>
          <img
            alt="menu icon"
            src={
              !menuActive
                ? menu_icon
                : profile.images[0] === undefined
                ? user_icon
                : profile.images[0].url
            }
            className={`user_image_mobile ${menuActive ? 'user_image' : null}`}
          />
        </div>
        <div className={`fullscreen-menu ${menuActive}`}>
          <a
            href="/"
            className={`fullscreen-navigation-item ${
              window.location.href.split('/')[3] === ''
                ? 'fullscreen-navigation-active'
                : 'fullscreen-navigation-inactive'
            }`}
          >
            Overview
          </a>
          <a
            href="/artists"
            className={`fullscreen-navigation-item ${
              window.location.href.split('/')[3] === 'artists'
                ? 'fullscreen-navigation-active'
                : 'fullscreen-navigation-inactive'
            }`}
          >
            Artists
          </a>
          <a
            href="/tracks"
            className={`fullscreen-navigation-item ${
              window.location.href.split('/')[3] === 'tracks'
                ? 'fullscreen-navigation-active'
                : 'fullscreen-navigation-inactive'
            }`}
          >
            Tracks
          </a>
          <a
            href="/analyze"
            className={`fullscreen-navigation-item ${
              window.location.href.split('/')[3] === 'analyze'
                ? 'fullscreen-navigation-active'
                : 'fullscreen-navigation-inactive'
            }`}
          >
            Playlists
          </a>
          <img src={close} alt="close" className="close-menu" onClick={() => toggleMenu()} />
          <p
            onClick={() => logout()}
            className={`fullscreen-navigation-item fullscreen-navigation-logout`}
          >
            Logout
          </p>
        </div>
      </ShowAt>

      <ShowAt breakpoint="1000AndAbove">
        <div className="user_badge">
          <img
            alt={profile.display_name}
            src={profile.images[0] === undefined ? user_icon : profile.images[0].url}
            className="user_image"
          />
          <div className="user_information">
            <p className="user_name">{profile.display_name}</p>
            <p className="logout_button" onClick={() => logout()}>
              Logout
            </p>
          </div>
        </div>
      </ShowAt>
    </Fragment>
  );
}

export default Userbadge;
