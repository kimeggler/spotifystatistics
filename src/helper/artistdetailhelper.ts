import {
  fetchArtist,
  fetchArtistAlbums,
  fetchArtistRelatedArtists,
  fetchArtistsByIds,
  fetchArtistTopTracks,
} from '../services/artistservice';
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from '../types/spotify';

interface ArtistDetail {
  artist: SpotifyArtist;
  topTracks: SpotifyTrack[];
  albums: SpotifyAlbum[];
  relatedArtists: SpotifyArtist[];
  collaborators: SpotifyArtist[];
}

const settledOr = <T>(result: PromiseSettledResult<T>, fallback: T): T =>
  result.status === 'fulfilled' ? result.value : fallback;

const dedupeAlbums = (albums: SpotifyAlbum[]): SpotifyAlbum[] => {
  const seen = new Set<string>();
  return albums.filter(album => {
    const key = album.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const getArtistDetail = async (
  artistId: string,
  knownArtist?: SpotifyArtist,
): Promise<ArtistDetail | null> => {
  const [artistResult, topTracksResult, albumsResult, relatedResult] = await Promise.allSettled([
    fetchArtist(artistId),
    fetchArtistTopTracks(artistId),
    fetchArtistAlbums(artistId),
    fetchArtistRelatedArtists(artistId),
  ]);

  const artist = artistResult.status === 'fulfilled' ? artistResult.value : (knownArtist ?? null);
  if (!artist) return null;

  const topTracks = settledOr(topTracksResult, []);
  const albums = dedupeAlbums(settledOr(albumsResult, []));
  const relatedArtists = settledOr(relatedResult, []);

  const collaboratorIds = Array.from(
    new Set(
      topTracks
        .flatMap(track => track.artists)
        .map(collaborator => collaborator.id)
        .filter(id => id && id !== artistId),
    ),
  ).slice(0, 12);

  const collaborators =
    collaboratorIds.length > 0 ? await fetchArtistsByIds(collaboratorIds).catch(() => []) : [];

  return { artist, topTracks, albums, relatedArtists, collaborators };
};

export { getArtistDetail };
export type { ArtistDetail };
