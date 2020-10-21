import React, { useEffect, useState } from 'react';

import { UserBadge, NavBar } from '..';
import { getData } from '../../../services/fetchservice';

import './_style.css';

function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      // You can await here
      setUser(await getData('me'));
      // ...
    };
    fetchUser();
  }, []);
  return (
    <div className="header">
      <h3 className="title">
        <a className="header-link" href="/">
          Statify
        </a>
      </h3>
      <NavBar />
      <UserBadge user={user} />
    </div>
  );
}

export default Header;
