import React from 'react';
import './style.css';

function Navigation() {
  return (
    <div className='navigation'>
      <a href='/' className='navigation-item'>
        Overview
      </a>
      <a href='/artists' className='navigation-item'>
        Artists
      </a>
      <a href='/tracks' className='navigation-item'>
        Tracks
      </a>
    </div>
  );
}

export default Navigation;
