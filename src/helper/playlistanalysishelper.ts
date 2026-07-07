import { getSongFeatures, getSongs } from './analysationhelper';
import { getPlaylistTopGenres, PlaylistGenreBreakdown } from './playlistgenrehelper';
import { SpotifyAudioFeatures } from '../types/spotify';

interface FeatureBar {
  name: string;
  pct: number;
  value: string;
  isDominant: boolean;
}

interface PlaylistAnalysis {
  topGenres: PlaylistGenreBreakdown[];
  mood: string;
  features: FeatureBar[];
  specs: { label: string; value: string }[];
  totalDuration: string;
}

const FEATURE_NAMES: { key: keyof SpotifyAudioFeatures; name: string }[] = [
  { key: 'valence', name: 'Valence' },
  { key: 'energy', name: 'Energy' },
  { key: 'danceability', name: 'Danceability' },
  { key: 'acousticness', name: 'Acousticness' },
  { key: 'instrumentalness', name: 'Instrumentalness' },
  { key: 'liveness', name: 'Liveness' },
  { key: 'speechiness', name: 'Speechiness' },
];

const average = (features: SpotifyAudioFeatures[], key: keyof SpotifyAudioFeatures): number =>
  features.reduce((sum, feature) => sum + (feature[key] as number), 0) / features.length;

const majority = (values: number[]): { value: number; pct: number } => {
  const counts = new Map<number, number>();
  values.forEach(value => counts.set(value, (counts.get(value) || 0) + 1));

  const [value, count] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0];
  return { value, pct: Math.round((count / values.length) * 100) };
};

const formatTotalDuration = (ms: number): string => {
  const totalMinutes = Math.round(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const formatTrackDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const getPlaylistAnalysis = async (playlistId: string): Promise<PlaylistAnalysis | null> => {
  const [topGenres, songIds] = await Promise.all([
    getPlaylistTopGenres(playlistId),
    getSongs(playlistId),
  ]);

  if (songIds.length === 0) return null;

  const rawFeatures = await getSongFeatures(songIds);
  const validFeatures = rawFeatures.filter(
    (feature): feature is SpotifyAudioFeatures => feature !== null,
  );

  if (validFeatures.length === 0) return null;

  const featureValues = FEATURE_NAMES.map(({ key, name }) => ({
    name,
    v: average(validFeatures, key),
  }));

  const maxValue = Math.max(...featureValues.map(f => f.v));
  const features: FeatureBar[] = featureValues.map(f => ({
    name: f.name,
    pct: Math.round(f.v * 100),
    value: f.v.toFixed(2),
    isDominant: f.v === maxValue,
  }));

  const valence = featureValues.find(f => f.name === 'Valence')!.v;
  const energy = featureValues.find(f => f.name === 'Energy')!.v;

  let mood: string;
  if (valence >= 0.5 && energy >= 0.5) mood = 'Bright & Driving';
  else if (valence >= 0.5 && energy < 0.5) mood = 'Warm & Easy';
  else if (energy >= 0.5) mood = 'Tense & Restless';
  else mood = 'Hazy & Melancholic';

  const modeMajority = majority(validFeatures.map(f => f.mode));
  const timeSignatureMajority = majority(validFeatures.map(f => f.time_signature));

  const specs = [
    { label: 'Avg. Tempo', value: `${Math.round(average(validFeatures, 'tempo'))} BPM` },
    { label: 'Avg. Loudness', value: `${average(validFeatures, 'loudness').toFixed(1)} dB` },
    {
      label: 'Avg. Duration',
      value: formatTrackDuration(average(validFeatures, 'duration_ms')),
    },
    {
      label: 'Key Mode',
      value: `${modeMajority.value === 1 ? 'Major' : 'Minor'} · ${modeMajority.pct}%`,
    },
    { label: 'Time Signature', value: `${timeSignatureMajority.value}/4` },
  ];

  const totalDuration = formatTotalDuration(
    validFeatures.reduce((sum, feature) => sum + feature.duration_ms, 0),
  );

  return { topGenres, mood, features, specs, totalDuration };
};

export { getPlaylistAnalysis };
export type { FeatureBar, PlaylistAnalysis };
