import { getData } from './fetchservice';

const fetchMyProfile = async () => {
  const response = await getData(`me`);
  return response;
};

const fetchMyTopArtist = async timerange => {
  const response = await getData(`me/top/artists`, {}, `?time_range=${timerange}&limit=1`);
  return response.items[0];
};

const fetchArtists = async timerange => {
  const response = await getData(`me/top/artists`, {}, `?time_range=${timerange}&limit=50`);
  return response.items;
};

const fetchMyTopTrack = async timerange => {
  const response = await getData(`me/top/tracks`, {}, `?time_range=${timerange}&limit=1`);
  return response.items[0];
};

const fetchTracks = async timerange => {
  const response = await getData(`me/top/tracks`, {}, `?time_range=${timerange}&limit=50`);
  return response.items;
};

const fetchPlaylists = async profile => {
  const response = await getData(`users/${profile.id}/playlists`, null, `?limit=50`);
  return response.items;
};

const fetchMyPlaylists = async () => {
  const response = await getData(`me/playlists`, null, `?limit=50`);
  return response.items;
};

export {
  fetchArtists,
  fetchMyPlaylists,
  fetchMyProfile,
  fetchMyTopArtist,
  fetchMyTopTrack,
  fetchPlaylists,
  fetchTracks,
};
