import { getSongFeatures } from './analysationhelper';
import { fetchTrack } from '../services/trackservice';
import { SpotifyAudioFeatures, SpotifyTrack } from '../types/spotify';

interface FeatureBar {
  name: string;
  pct: number;
  value: string;
  isDominant: boolean;
}

interface TrackAnalysis {
  mood: string;
  features: FeatureBar[];
  specs: { label: string; value: string }[];
}

interface TrackDetail {
  track: SpotifyTrack;
  analysis: TrackAnalysis | null;
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

const KEY_NAMES = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'];

const keyName = (key: number): string => (key >= 0 && key <= 11 ? KEY_NAMES[key] : 'Unknown');
const modeName = (mode: number): string => (mode === 1 ? 'Major' : mode === 0 ? 'Minor' : 'Unknown');

const formatTrackDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const buildTrackAnalysis = (features: SpotifyAudioFeatures): TrackAnalysis => {
  const featureValues = FEATURE_NAMES.map(({ key, name }) => ({
    name,
    v: features[key] as number,
  }));

  const maxValue = Math.max(...featureValues.map(f => f.v));
  const featureBars: FeatureBar[] = featureValues.map(f => ({
    name: f.name,
    pct: Math.round(f.v * 100),
    value: f.v.toFixed(2),
    isDominant: f.v === maxValue,
  }));

  const { valence, energy } = features;

  let mood: string;
  if (valence >= 0.5 && energy >= 0.5) mood = 'Bright & Driving';
  else if (valence >= 0.5 && energy < 0.5) mood = 'Warm & Easy';
  else if (energy >= 0.5) mood = 'Tense & Restless';
  else mood = 'Hazy & Melancholic';

  const specs = [
    { label: 'Tempo', value: `${Math.round(features.tempo)} BPM` },
    { label: 'Key', value: `${keyName(features.key)} ${modeName(features.mode)}` },
    { label: 'Time Signature', value: `${features.time_signature}/4` },
    { label: 'Loudness', value: `${features.loudness.toFixed(1)} dB` },
    { label: 'Duration', value: formatTrackDuration(features.duration_ms) },
  ];

  return { mood, features: featureBars, specs };
};

const getTrackDetail = async (
  trackId: string,
  knownTrack?: SpotifyTrack,
): Promise<TrackDetail | null> => {
  const [trackResult, featuresResult] = await Promise.allSettled([
    fetchTrack(trackId),
    getSongFeatures([trackId]),
  ]);

  const track = trackResult.status === 'fulfilled' ? trackResult.value : (knownTrack ?? null);
  if (!track) return null;

  const rawFeatures = featuresResult.status === 'fulfilled' ? (featuresResult.value[0] ?? null) : null;
  const analysis = rawFeatures ? buildTrackAnalysis(rawFeatures) : null;

  return { track, analysis };
};

export { getTrackDetail };
export type { FeatureBar, TrackAnalysis, TrackDetail };
