import { getData } from '../services/fetchservice';
import { SpotifyAudioFeatures } from '../types/spotify';

interface PlaylistTrackItem {
  track: {
    id: string;
  };
}

interface PlaylistTracksResponse {
  items: PlaylistTrackItem[];
}

interface AudioFeaturesResponse {
  audio_features: (SpotifyAudioFeatures | null)[];
}

const getSongs = async (playlist_id: string): Promise<string[]> => {
  try {
    const songs = await getData<PlaylistTracksResponse>(
      `playlists/${playlist_id}/tracks`,
      {},
      '?field=items(id)',
    );

    if (!songs?.items) {
      return [];
    }

    return songs.items.map(song => song.track.id).filter(id => id); // Filter out null/undefined ids
  } catch (error) {
    console.error('Error fetching playlist songs:', error);
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

export { getSongFeatures, getSongs };
