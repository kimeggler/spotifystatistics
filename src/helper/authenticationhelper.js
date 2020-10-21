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
    return window.location.href.split('#')[1].split('&')[0].split('=')[1];
  }
  return null;
};

const getDeezerTokenFromURL = () => {
  if (window.location.href.split('?')[1] !== undefined) {
    return window.location.href.split('?')[1].split('=')[1];
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

const setToken = async () => {
  if (getTokenFromURL()) {
    const timeStamp = new Date();
    window.localStorage.setItem('statify_token', getTokenFromURL());
    window.localStorage.setItem('statify_timestamp', timeStamp.getTime() / 1000);
  }
};

export { validateToken, setToken, getToken, getDeezerTokenFromURL, clearToken };
