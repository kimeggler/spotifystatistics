import React, { useEffect, useState } from 'react';
import { Userbadge, Navigation } from '../';

import './_style.css';
import { getData } from '../../../services/fetchservice';

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
    <div className='header'>
      <h3>Statify</h3>
      <Navigation/>
      <Userbadge user={user} />
    </div>
  );
}

export default Header;
