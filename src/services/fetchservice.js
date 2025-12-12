import config from '../config';
import { getToken, signIn, validateToken } from '../helper/authenticationhelper';

const getDefaultHeaders = async () => {
  const token = await getToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const authorizeSpotifyUser = async () => {
  await signIn();
};

const getData = async (path, headers = {}, queryParams = '') => {
  const isValid = await validateToken();
  if (!isValid) {
    await authorizeSpotifyUser();
    return;
  }

  const defaultHeaders = await getDefaultHeaders();
  return fetch(`${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  }).then(response => response.json());
};

const postData = async (path, data, headers = {}, queryParams = '') => {
  const isValid = await validateToken();
  if (!isValid) {
    await authorizeSpotifyUser();
    return;
  }

  const defaultHeaders = await getDefaultHeaders();
  return fetch(`${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: data,
  }).then(response => response.json());
};

export { authorizeSpotifyUser, getData, postData };
