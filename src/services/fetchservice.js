import config from "../config";

const getToken = () => {
  return window.localStorage.getItem("statify_identity");
};

const getDefaultHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json"
});

const authorizeUser = () => {
  console.log(`${config.authority}${spotifyParams(config.authparams)}`);
  return `${config.authority}${spotifyParams(config.authparams)}`;
};

const authorizeUserRequest_depricated = async (headers = {}) => {
  console.log(spotifyParams(config.authparams));
  return fetch(`${config.authority}${spotifyParams(config.authparams)}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      ...headers
    }
  }).then(response => console.log(response));
};

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

export { getData, authorizeUser };
