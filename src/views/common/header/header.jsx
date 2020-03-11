import React, { useEffect, useState } from 'react';
import { Userbadge } from '../';

import './_style.css';
import { getData } from '../../../services/fetchservice';

function Header() {
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchUser() {
      // You can await here
      setUser(await getData('me'));
      // ...
    }
    fetchUser();
  }, []);
  return (
    <div className='header'>
      <h3>Statify</h3>

      <Userbadge user={user} />
    </div>
  );
}

export default Header;
