import config from "../config";

const validateToken = () => {
  if (getToken() !== null) {
    if (new Date().getTime() - getTokenTimeStamp() >= 3600) {
      clearToken();
      return false;
    } else {
      return true;
    }
  }
  clearToken();
  return false;
};

const getToken = () => {
  return window.localStorage.getItem("statify_identity");
};

const getTokenTimeStamp = () => {
  return window.localStorage.getItem("statify_timestamp");
};

const clearToken = () => {
  window.localStorage.removeItem("statify_identity");
  window.localStorage.removeItem("statify_timestamp");
  window.location.replace(authorizeUser());
};

const setToken = () => {
  const timeStamp = new Date();
  window.localStorage.setItem("statify_identity", getTokenFromURL());
  window.localStorage.setItem("statify_timestamp", timeStamp.getTime());
};

const getTokenFromURL = () => {
  return window.location.href
    .split("#")[1]
    .split("&")[0]
    .split("=")[1];
};

const getDefaultHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken}`
});

const authorizeUser = () => {
  return `${config.authority}${spotifyParams(config.authparams)}`;
};

// const authorizeUserRequest_depricated = async (headers = {}) => {
//   console.log(spotifyParams(config.authparams));
//   return fetch(`${config.authority}${spotifyParams(config.authparams)}`, {
//     method: "GET",
//     mode: "no-cors",
//     headers: {
//       ...headers
//     }
//   }).then(response => console.log(response));
// };

const getData = async (path, headers = {}) => {
  const token = getToken();
  const defaultHeaders = getDefaultHeaders(token);
  return fetch(`${config.remoteUrl}${path}`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      ...headers
    }
  })
    .then(response => response.url)
    .then(result => console.log(result));
};

const spotifyParams = params =>
  params
    ? `?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}&response_type=token`
    : "";

export { getData, authorizeUser, validateToken, setToken };
