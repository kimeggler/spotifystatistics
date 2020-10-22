import { useEffect } from 'react';
import { setToken, getDeezerTokenFromURL } from '../../helper/authenticationhelper';
import { fetchDeezerToken } from '../../services/fetchservice';

import './style.css';

function DeezerCallback() {
  useEffect(() => {
    const getToken = async () => {
      console.log(await fetchDeezerToken(getDeezerTokenFromURL()));
    };
    const setCredentials = async () => {
      await setToken();
    };
    getToken();
    setCredentials();
    // window.location.replace(origin);
  }, []);
  return null;
}

export default DeezerCallback;
