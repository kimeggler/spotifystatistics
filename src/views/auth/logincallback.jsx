import { useEffect } from 'react';
import './style.css';
import { setToken } from '../../helper/authenticationhelper';

function Logincallback() {
  useEffect(() => {
    setToken();
    window.location.replace(origin);
  }, []);
  return null;
}

export default Logincallback;
