import { SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUser } from '../types/spotify';
import { getData } from './fetchservice';

// Time range type for Spotify API
export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

// Spotify API response interfaces
interface SpotifyApiResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  previous: string | null;
  next: string | null;
}

const fetchMyProfile = async (): Promise<SpotifyUser> => {
  try {
    const response = await getData<SpotifyUser>('me');
    if (!response) {
      throw new Error('No user profile data received');
    }
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const fetchMyTopArtist = async (timerange: TimeRange): Promise<SpotifyArtist> => {
  try {
    const response = await getData<SpotifyApiResponse<SpotifyArtist>>(
      'me/top/artists',
      {},
      `?time_range=${timerange}&limit=1`,
    );
    if (!response?.items || response.items.length === 0) {
      throw new Error('No top artist data available');
    }
    return response.items[0];
  } catch (error) {
    console.error('Error fetching top artist:', error);
    throw error;
  }
};

const fetchArtists = async (timerange: TimeRange): Promise<SpotifyArtist[]> => {
  try {
    const response = await getData<SpotifyApiResponse<SpotifyArtist>>(
      'me/top/artists',
      {},
      `?time_range=${timerange}&limit=50`,
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

const fetchMyTopTrack = async (timerange: TimeRange): Promise<SpotifyTrack> => {
  try {
    const response = await getData<SpotifyApiResponse<SpotifyTrack>>(
      'me/top/tracks',
      {},
      `?time_range=${timerange}&limit=1`,
    );
    if (!response?.items || response.items.length === 0) {
      throw new Error('No top track data available');
    }
    return response.items[0];
  } catch (error) {
    console.error('Error fetching top track:', error);
    throw error;
  }
};

const fetchTracks = async (timerange: TimeRange): Promise<SpotifyTrack[]> => {
  try {
    const response = await getData<SpotifyApiResponse<SpotifyTrack>>(
      'me/top/tracks',
      {},
      `?time_range=${timerange}&limit=50`,
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

const fetchPlaylists = async (profile: SpotifyUser): Promise<SpotifyPlaylist[]> => {
  try {
    const response = await getData<SpotifyApiResponse<SpotifyPlaylist>>(
      `users/${profile.id}/playlists`,
      {},
      `?limit=50`,
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    throw error;
  }
};

const fetchMyPlaylists = async (): Promise<SpotifyPlaylist[]> => {
  try {
    const response = await getData<SpotifyApiResponse<SpotifyPlaylist>>(
      'me/playlists',
      {},
      `?limit=50`,
    );
    return response?.items || [];
  } catch (error) {
    console.error('Error fetching my playlists:', error);
    throw error;
  }
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

export type { SpotifyApiResponse };
