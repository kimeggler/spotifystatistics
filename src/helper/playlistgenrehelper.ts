import { getData } from '../services/fetchservice';
import { SpotifyArtist } from '../types/spotify';

interface PlaylistGenreBreakdown {
  name: string;
  pct: number;
}

interface PlaylistTracksArtistsResponse {
  items: { track: { artists: { id: string }[] } | null }[];
}

interface ArtistsBatchResponse {
  artists: (SpotifyArtist | null)[];
}

const countGenres = (artists: SpotifyArtist[]): { name: string; count: number }[] => {
  const counts = new Map<string, number>();

  artists.forEach(artist => {
    (artist.genres || []).forEach(genre => {
      counts.set(genre, (counts.get(genre) || 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

const getPlaylistTopGenres = async (playlistId: string): Promise<PlaylistGenreBreakdown[]> => {
  const tracksResponse = await getData<PlaylistTracksArtistsResponse>(
    `playlists/${playlistId}/tracks`,
    {},
    '?fields=items(track(artists(id)))&limit=100',
  );

  const artistIds = Array.from(
    new Set(
      (tracksResponse?.items || [])
        .flatMap(item => item.track?.artists || [])
        .map(artist => artist.id)
        .filter(Boolean),
    ),
  ).slice(0, 50);

  if (artistIds.length === 0) return [];

  const artistsResponse = await getData<ArtistsBatchResponse>(
    'artists',
    {},
    `?ids=${artistIds.join(',')}`,
  );

  const artists = (artistsResponse?.artists || []).filter(
    (artist): artist is SpotifyArtist => artist !== null,
  );

  const genreCounts = countGenres(artists);
  const total = genreCounts.reduce((sum, genre) => sum + genre.count, 0);

  if (total === 0) return [];

  return genreCounts
    .slice(0, 3)
    .map(genre => ({ name: genre.name, pct: Math.round((genre.count / total) * 100) }));
};

export { getPlaylistTopGenres };
export type { PlaylistGenreBreakdown };
