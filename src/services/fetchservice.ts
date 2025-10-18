import config from '../config';
import { getToken, signIn, validateToken } from '../helper/authenticationhelper';

interface RequestHeaders {
  [key: string]: string;
}

interface DefaultHeaders {
  Accept: string;
  'Content-Type': string;
  Authorization: string;
}

const getDefaultHeaders = async (): Promise<DefaultHeaders> => {
  const token = await getToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const getData = async <T = any>(
  path: string,
  headers: RequestHeaders = {},
  queryParams: string = '',
): Promise<T | undefined> => {
  const isAuthenticated = await validateToken();
  if (!isAuthenticated) {
    await signIn();
    return;
  }

  const defaultHeaders = await getDefaultHeaders();
  const response = await fetch(
    `${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`,
    {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const postData = async <T = any>(
  path: string,
  data: string | FormData | null = null,
  headers: RequestHeaders = {},
  queryParams: string = '',
): Promise<T | undefined> => {
  const isAuthenticated = await validateToken();
  if (!isAuthenticated) {
    await signIn();
    return;
  }

  const defaultHeaders = await getDefaultHeaders();
  const response = await fetch(
    `${config.remoteUrl}${path}${queryParams !== '' ? queryParams : ''}`,
    {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: data,
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export { getData, postData };
export type { DefaultHeaders, RequestHeaders };
