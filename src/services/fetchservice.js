import config from '../config';
import { getToken, validateToken } from '../helper/authenticationhelper';

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const authorizeSpotifyUser = () => {
  return `${config.spotifyAuthority}${spotifyParams(config.spotifyAuthparams)}`;
};
const authorizeDeezerUser = () => {
  return `${config.deezerAuthority}${deezerParams(config.deezerAuthparams)}`;
};
// const getDeezerToken = () => {
//   return `${config.deezerAccess}${deezerAccessParams(config.deezerAuthparams)}`;
// };

const fetchDeezerToken = (code) => {
  return fetch(
    `${config.deezerAccess}?app_id=${config.deezerAuthparams.client_id}&secret=${config.deezerAuthparams.client_secret}&code=${code}&output=json`,
    {
      method: 'GET',
    }
  ).then((response) => response.json);
};

const getData = async (path, headers = {}, queryParams = '') => {
  if (!validateToken()) {
    window.location.replace(authorizeSpotifyUser());
  }
  const token = getToken();
  const defaultHeaders = getDefaultHeaders(token);
  return fetch(
    `${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`,
    {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    }
  ).then((response) => response.json());
};

const postData = async (path, data, headers = {}, queryParams = '') => {
  if (!validateToken()) {
    window.location.replace(authorizeSpotifyUser());
  }
  const token = getToken();
  const defaultHeaders = getDefaultHeaders(token);
  return fetch(
    `${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`,
    {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: data,
    }
  ).then((response) => response.json());
};

const spotifyParams = (params) =>
  params
    ? `?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}&response_type=token&show_dialog=${params.show_dialog}`
    : '';

const deezerParams = (params) =>
  params
    ? `?app_id=${params.client_id}&redirect_uri=${params.redirect_uri}&perms=${params.scope}`
    : '';

// const deezerAccessParams = (params) =>
//   params
//     ? `?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}&response_type=token&show_dialog=${params.show_dialog}`
//     : '';

export {
  getData,
  postData,
  authorizeSpotifyUser,
  authorizeDeezerUser,
  fetchDeezerToken,
};
