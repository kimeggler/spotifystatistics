import React from 'react';
import './style.css';

function Navigation() {
  return (
    <div className='navigation'>
      <a href='/' className={`navigation-item ${window.location.href.split('/')[3] === '' ? 'navigation-active' : 'navigation-inactive'}`}>
        Overview
      </a>
      <a href='/artists' className={`navigation-item ${window.location.href.split('/')[3] === 'artists' ? 'navigation-active' : 'navigation-inactive'}`}>
        Artists
      </a>
      <a href='/tracks' className={`navigation-item ${window.location.href.split('/')[3] === 'tracks' ? 'navigation-active' : 'navigation-inactive'}`}>
        Tracks
      </a>
    </div>
  );
}

export default Navigation;
