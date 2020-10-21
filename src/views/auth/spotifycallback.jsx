import { useEffect } from 'react';

import { setToken } from '../../helper/authenticationhelper';

import './style.css';

function SpotifyCallback() {
  useEffect(() => {
    const setCredentials = async () => {
      await setToken();
    };
    setCredentials();
    window.location.replace(origin);
  }, []);
  return null;
}

export default SpotifyCallback;
