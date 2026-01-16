import { getData } from '../services/fetchservice';
import { SpotifyAudioFeatures } from '../types/spotify';

// Interfaces for analysis data
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

interface AnalysisResult {
  name: string;
  value: number;
}

interface EmptyAnalysisResult {
  empty: true;
}

interface AccumulatedAudioFeatures {
  danceability: number;
  energy: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  duration?: number;
  playlist_duration?: number;
  playlist_length?: number;
  id?: string;
}

const getAudioAnalysis = async (
  playlist_id: string,
): Promise<AnalysisResult[] | EmptyAnalysisResult> => {
  try {
    const songs_ids = await getSongs(playlist_id);
    if (!songs_ids || songs_ids.length === 0) {
      return { empty: true };
    }

    const songs_audio_features = await getSongFeatures(songs_ids);
    return formatData(songs_audio_features);
  } catch (error) {
    console.error('Error getting audio analysis:', error);
    throw error;
  }
};

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

const addData = (
  prev: AccumulatedAudioFeatures,
  curr: SpotifyAudioFeatures | null,
): AccumulatedAudioFeatures => {
  if (curr === null) {
    return prev;
  }

  return {
    ...prev,
    danceability: prev.danceability + curr.danceability,
    energy: prev.energy + curr.energy,
    speechiness: prev.speechiness + curr.speechiness,
    acousticness: prev.acousticness + curr.acousticness,
    instrumentalness: prev.instrumentalness + curr.instrumentalness,
    liveness: prev.liveness + curr.liveness,
    valence: prev.valence + curr.valence,
    tempo: prev.tempo + curr.tempo,
    duration_ms: prev.duration_ms + curr.duration_ms,
  };
};

const divideData = (prev: AccumulatedAudioFeatures, count: number): AccumulatedAudioFeatures => {
  return {
    ...prev,
    danceability: prev.danceability / count,
    energy: prev.energy / count,
    speechiness: prev.speechiness / count,
    acousticness: prev.acousticness / count,
    instrumentalness: prev.instrumentalness / count,
    liveness: prev.liveness / count,
    valence: prev.valence / count,
    tempo: prev.tempo / count,
    duration: prev.duration_ms / 1000 / count,
    playlist_duration: prev.duration_ms / 1000,
    playlist_length: count,
    id: 'analysis',
  };
};

const getPercentageandCrop = (analysis: AccumulatedAudioFeatures): AnalysisResult[] => {
  const series: AnalysisResult[] = [];

  series.push({ name: 'Acousticness', value: Math.round(analysis.acousticness * 100) });
  series.push({ name: 'Danceability', value: Math.round(analysis.danceability * 100) });
  series.push({ name: 'Energy', value: Math.round(analysis.energy * 100) });
  series.push({ name: 'Instrumentalness', value: Math.round(analysis.instrumentalness * 100) });
  series.push({ name: 'Liveness', value: Math.round(analysis.liveness * 100) });
  series.push({ name: 'Speechiness', value: Math.round(analysis.speechiness * 100) });
  series.push({ name: 'Happiness', value: Math.round(analysis.valence * 100) });

  return series;
};

const formatData = (
  songs: (SpotifyAudioFeatures | null)[],
): AnalysisResult[] | EmptyAnalysisResult => {
  if (!songs || songs.length === 0 || songs[0] === null) {
    return { empty: true };
  }

  const validSongs = songs.filter(song => song !== null) as SpotifyAudioFeatures[];

  if (validSongs.length === 0) {
    return { empty: true };
  }

  const initialData: AccumulatedAudioFeatures = {
    danceability: 0,
    energy: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    tempo: 0,
    duration_ms: 0,
  };

  const playlist_analysis = validSongs.reduce((prev, curr, i) => {
    const accumulated = addData(prev, curr);
    return i === validSongs.length - 1 ? divideData(accumulated, validSongs.length) : accumulated;
  }, initialData);

  return getPercentageandCrop(playlist_analysis);
};

export { getAudioAnalysis };
export type { AccumulatedAudioFeatures, AnalysisResult, EmptyAnalysisResult };
