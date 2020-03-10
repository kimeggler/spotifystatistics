import { useEffect } from 'react';
import './style.css';
import { setToken } from '../../services/fetchservice';

function Logincallback() {
  useEffect(() => {
    setToken();
    window.location.replace(origin);
  });
  return null;
}

export default Logincallback;
