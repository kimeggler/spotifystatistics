import { getData } from './fetchservice';

const fetchMyTopArtist = async timerange => {
  const response = await getData(`me/top/artists`, {}, `?time_range=${timerange}&limit=1`);
  return response.items[0];
};

const fetchMyTopTrack = async timerange => {
  const response = await getData(`me/top/tracks`, {}, `?time_range=${timerange}&limit=1`);
  return response.items[0];
};

export { fetchMyTopArtist, fetchMyTopTrack };
