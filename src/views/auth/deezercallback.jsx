import { useEffect } from 'react';
import './style.css';
import {
  setToken,
  getDeezerTokenFromURL,
} from '../../helper/authenticationhelper';
import { fetchDeezerToken } from '../../services/fetchservice';

function DeezerCallback() {
  useEffect(() => {
    const getToken = async () => {
      console.log(await fetchDeezerToken(getDeezerTokenFromURL()));
    };
    const setCredentials = async () => {
      await setToken();
    };
    getToken();
    // window.location.replace(origin);
  }, []);
  return null;
}

export default DeezerCallback;
