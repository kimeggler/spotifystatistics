import { useHistory } from 'react-router-dom';
import { setToken } from '../../helper/authenticationhelper';

import './style.css';

function SpotifyCallback() {
  const history = useHistory();

  setToken().then(() => history.push('/overview'));
  return null;
}

export default SpotifyCallback;
