import config from '../config';

const validateToken = () => {
  if (getToken() !== null) {
    if (Math.abs(new Date().getTime() / 1000 - getTokenTimeStamp()) >= 3600) {
      clearToken();
      return false;
    } else {
      return true;
    }
  }
  clearToken();
  return false;
};

const getTokenFromURL = () => {
  if (window.location.href.split('#')[1] !== undefined) {
    return window.location.href
      .split('#')[1]
      .split('&')[0]
      .split('=')[1];
  }
  return null;
};

const getToken = () => {
  return window.localStorage.getItem('statify_token');
};

const getTokenTimeStamp = () => {
  return window.localStorage.getItem('statify_timestamp');
};

const clearToken = () => {
  window.localStorage.clear();
};

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
});

const getUserID = async token => {
  const defaultHeaders = getDefaultHeaders(token);
  return await fetch(`${config.remoteUrl}me`, {
    method: 'GET',
    headers: {
      ...defaultHeaders
    }
  }).then(response => response.json());
};

const setToken = async () => {
  if (getTokenFromURL()) {
    const timeStamp = new Date();
    window.localStorage.setItem('statify_token', getTokenFromURL());
    window.localStorage.setItem(
      'statify_timestamp',
      timeStamp.getTime() / 1000
    );
    window.localStorage.setItem(
      'statify_userid',
      await getUserID(getTokenFromURL())
    );
  }
};

const logout = () => {
  clearToken();
  window.location.reload();
};

export { validateToken, setToken, logout, getToken };
