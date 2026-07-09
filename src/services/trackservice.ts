import { getData } from './fetchservice';
import { SpotifyTrack } from '../types/spotify';

// Get Track
const fetchTrack = async (trackId: string): Promise<SpotifyTrack> => {
  const response = await getData<SpotifyTrack>(`tracks/${trackId}`);
  if (!response) throw new Error('No track data received');
  return response;
};

export { fetchTrack };
