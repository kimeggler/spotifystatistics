import React from 'react';

import { UserBadge, NavBar } from '..';

import './_style.css';

const Header = () => {
  return (
    <div className="header">
      <h3 className="title">
        <a className="header-link" href="/">
          Statify
        </a>
      </h3>
      <NavBar />
      <UserBadge />
    </div>
  );
};

export default Header;
