import config from '../config';
import { getToken, validateToken } from '../helper/authenticationhelper';

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
});

const authorizeUser = () => {
  return `${config.authority}${spotifyParams(config.authparams)}`;
};

const getData = async (path, headers = {}, queryParams = '') => {
  if (!validateToken()) {
    window.location.replace(authorizeUser());
  }
  const token = getToken();
  const defaultHeaders = getDefaultHeaders(token);
  return fetch(
    `${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`,
    {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...headers
      }
    }
  ).then(response => response.json());
};

const postData = async (path, data, headers = {}, queryParams = '') => {
  if (!validateToken()) {
    window.location.replace(authorizeUser());
  }
  const token = getToken();
  const defaultHeaders = getDefaultHeaders(token);
  return fetch(
    `${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`,
    {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...headers
      },
      body: data
    }
  ).then(response => response.json());
};

const spotifyParams = params =>
  params
    ? `?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}&response_type=token&show_dialog=${params.show_dialog}`
    : '';

export { getData, postData, authorizeUser };
