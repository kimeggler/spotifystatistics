import { getPlaylistTrackDetails, getSongFeatures, PlaylistTrackDetail } from './analysationhelper';
import { buildGrill, PlaylistGrill } from './playlistgrillhelper';
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
  grill: PlaylistGrill;
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

const getDecade = (releaseDate: string): number | null => {
  const year = parseInt(releaseDate.slice(0, 4), 10);
  return Number.isNaN(year) ? null : Math.floor(year / 10) * 10;
};

const getTopArtist = (
  tracks: PlaylistTrackDetail[],
): { name: string; pct: number; uniqueCount: number } => {
  const counts = new Map<string, { name: string; count: number }>();

  tracks.forEach(track => {
    track.artists.forEach(artist => {
      const existing = counts.get(artist.id);
      counts.set(artist.id, { name: artist.name, count: (existing?.count || 0) + 1 });
    });
  });

  const sorted = Array.from(counts.values()).sort((a, b) => b.count - a.count);
  const top = sorted[0];

  return {
    name: top?.name ?? 'Unknown',
    pct: top ? Math.round((top.count / tracks.length) * 100) : 0,
    uniqueCount: counts.size,
  };
};

const getTopDecade = (tracks: PlaylistTrackDetail[]): { decade: string; pct: number } => {
  const decades = tracks.map(track => getDecade(track.releaseDate)).filter((d): d is number => d !== null);

  if (decades.length === 0) return { decade: 'Unknown', pct: 0 };

  const counts = new Map<number, number>();
  decades.forEach(decade => counts.set(decade, (counts.get(decade) || 0) + 1));

  const [decade, count] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0];
  return { decade: `${decade}s`, pct: Math.round((count / decades.length) * 100) };
};

const getPlaylistAnalysis = async (playlistId: string): Promise<PlaylistAnalysis | null> => {
  const trackDetails = await getPlaylistTrackDetails(playlistId);

  if (trackDetails.length === 0) return null;

  const songIds = trackDetails.map(track => track.id);
  const artistIds = Array.from(new Set(trackDetails.flatMap(track => track.artists.map(a => a.id)))).slice(
    0,
    50,
  );

  const [rawFeatures, topGenres] = await Promise.all([
    getSongFeatures(songIds),
    getPlaylistTopGenres(artistIds),
  ]);

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

  const avgPopularity = Math.round(
    trackDetails.reduce((sum, track) => sum + (track.popularity || 0), 0) / trackDetails.length,
  );
  const explicitPct = Math.round(
    (trackDetails.filter(track => track.explicit).length / trackDetails.length) * 100,
  );
  const topArtist = getTopArtist(trackDetails);
  const topDecade = getTopDecade(trackDetails);

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
    { label: 'Avg. Popularity', value: `${avgPopularity}/100` },
    { label: 'Explicit Tracks', value: `${explicitPct}%` },
    { label: 'Unique Artists', value: `${topArtist.uniqueCount}` },
    { label: 'Most Featured', value: topArtist.name },
    { label: 'Dominant Era', value: topDecade.decade },
  ];

  const totalDuration = formatTotalDuration(
    trackDetails.reduce((sum, track) => sum + track.duration_ms, 0),
  );

  const grill = buildGrill({
    avgPopularity,
    explicitPct,
    topArtistName: topArtist.name,
    topArtistPct: topArtist.pct,
    uniqueArtistCount: topArtist.uniqueCount,
    totalTracks: trackDetails.length,
    topDecade: topDecade.decade,
    topDecadePct: topDecade.pct,
    mood,
  });

  return { topGenres, mood, features, specs, totalDuration, grill };
};

export { getPlaylistAnalysis };
export type { FeatureBar, PlaylistAnalysis };
