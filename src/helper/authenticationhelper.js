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
  return window.location.href
    .split('#')[1]
    .split('&')[0]
    .split('=')[1];
};

const getToken = () => {
  return window.localStorage.getItem('statify_identity');
};

const getTokenTimeStamp = () => {
  return window.localStorage.getItem('statify_timestamp');
};

const clearToken = () => {
  window.localStorage.removeItem('statify_identity');
  window.localStorage.removeItem('statify_timestamp');
};

const setToken = () => {
  const timeStamp = new Date();
  window.localStorage.setItem('statify_identity', getTokenFromURL());
  window.localStorage.setItem('statify_timestamp', timeStamp.getTime() / 1000);
};

const logout = () => {
  clearToken();
  window.location.reload();
}



export {
  validateToken,
  setToken,
  logout,
  getToken
};