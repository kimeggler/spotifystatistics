import config from '../config';
import {
  getToken
} from '../helper/authenticationhelper';

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
});

const authorizeUser = () => {
  return `${config.authority}${spotifyParams(config.authparams)}`;
};

const getData = async (path, headers = {}) => {
  const token = getToken();
  const defaultHeaders = getDefaultHeaders(token);
  return fetch(`${config.remoteUrl}${path}`, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...headers
    }
  }).then(response => response.json());
};

const spotifyParams = params =>
  params ?
  `?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}&response_type=token&show_dialog=${params.show_dialog}` :
  '';

export {
  getData,
  authorizeUser
};