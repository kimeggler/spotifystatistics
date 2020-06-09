import { useEffect } from 'react';
import './style.css';
import { setToken } from '../../helper/authenticationhelper';

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
