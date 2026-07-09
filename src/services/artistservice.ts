import { getData } from './fetchservice';
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from '../types/spotify';

interface SpotifyArtistsResponse {
  artists: (SpotifyArtist | null)[];
}

interface SpotifyArtistAlbumsResponse {
  items: SpotifyAlbum[];
}

interface SpotifyArtistTopTracksResponse {
  tracks: SpotifyTrack[];
}

interface SpotifyRelatedArtistsResponse {
  artists: SpotifyArtist[];
}

// Get Artist
const fetchArtist = async (artistId: string): Promise<SpotifyArtist> => {
  const response = await getData<SpotifyArtist>(`artists/${artistId}`);
  if (!response) throw new Error('No artist data received');
  return response;
};

// Get Several Artists
const fetchArtistsByIds = async (artistIds: string[]): Promise<SpotifyArtist[]> => {
  if (artistIds.length === 0) return [];

  const response = await getData<SpotifyArtistsResponse>(
    'artists',
    {},
    `?ids=${artistIds.join(',')}`,
  );

  return (response?.artists || []).filter((artist): artist is SpotifyArtist => artist !== null);
};

// Get Artist's Albums
const fetchArtistAlbums = async (artistId: string): Promise<SpotifyAlbum[]> => {
  const response = await getData<SpotifyArtistAlbumsResponse>(
    `artists/${artistId}/albums`,
    {},
    '?include_groups=album,single&limit=50',
  );

  return response?.items || [];
};

// Get Artist's Top Tracks
const fetchArtistTopTracks = async (artistId: string): Promise<SpotifyTrack[]> => {
  const response = await getData<SpotifyArtistTopTracksResponse>(`artists/${artistId}/top-tracks`);
  return response?.tracks || [];
};

// Get Artist's Related Artists
const fetchArtistRelatedArtists = async (artistId: string): Promise<SpotifyArtist[]> => {
  const response = await getData<SpotifyRelatedArtistsResponse>(
    `artists/${artistId}/related-artists`,
  );
  return response?.artists || [];
};

export {
  fetchArtist,
  fetchArtistAlbums,
  fetchArtistRelatedArtists,
  fetchArtistsByIds,
  fetchArtistTopTracks,
};
