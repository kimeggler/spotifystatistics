import { getData } from '../services/fetchservice';
import { SpotifyAudioFeatures } from '../types/spotify';

interface PlaylistTrackDetail {
  id: string;
  name: string;
  popularity: number;
  explicit: boolean;
  duration_ms: number;
  releaseDate: string;
  artists: { id: string; name: string }[];
}

interface PlaylistTrackItem {
  track: {
    id: string;
    name: string;
    popularity: number;
    explicit: boolean;
    duration_ms: number;
    album: { release_date: string };
    artists: { id: string; name: string }[];
  } | null;
}

interface PlaylistTracksResponse {
  items: PlaylistTrackItem[];
}

interface AudioFeaturesResponse {
  audio_features: (SpotifyAudioFeatures | null)[];
}

const getPlaylistTrackDetails = async (playlist_id: string): Promise<PlaylistTrackDetail[]> => {
  try {
    const songs = await getData<PlaylistTracksResponse>(
      `playlists/${playlist_id}/tracks`,
      {},
      '?fields=items(track(id,name,popularity,explicit,duration_ms,album(release_date),artists(id,name)))&limit=100',
    );

    if (!songs?.items) {
      return [];
    }

    return songs.items
      .map(item => item.track)
      .filter((track): track is NonNullable<PlaylistTrackItem['track']> => Boolean(track?.id))
      .map(track => ({
        id: track.id,
        name: track.name,
        popularity: track.popularity,
        explicit: track.explicit,
        duration_ms: track.duration_ms,
        releaseDate: track.album?.release_date || '',
        artists: track.artists || [],
      }));
  } catch (error) {
    console.error('Error fetching playlist track details:', error);
    throw error;
  }
};

const getSongFeatures = async (ids: string[]): Promise<(SpotifyAudioFeatures | null)[]> => {
  try {
    if (ids.length === 0) {
      return [];
    }

    const id_string = ids.join(',');
    const result = await getData<AudioFeaturesResponse>('audio-features', {}, `?ids=${id_string}`);

    return result?.audio_features || [];
  } catch (error) {
    console.error('Error fetching song features:', error);
    throw error;
  }
};

export { getPlaylistTrackDetails, getSongFeatures };
export type { PlaylistTrackDetail };
