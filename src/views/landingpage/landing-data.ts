interface Capability {
  num: string;
  title: string;
  desc: string;
}

const capabilities: Capability[] = [
  {
    num: '01',
    title: 'Top Artist & Track',
    desc: 'Your #1 artist and song, surfaced instantly.',
  },
  {
    num: '02',
    title: 'Top 50',
    desc: 'Your fifty most-played tracks and artists, ranked.',
  },
  {
    num: '03',
    title: 'Top Genres',
    desc: 'The sounds behind your listening, broken down.',
  },
  {
    num: '04',
    title: 'Playlists',
    desc: 'Every playlist analyzed — plus a new one built from your Top 50.',
  },
];

interface ArtistPreview {
  rank: string;
  name: string;
  angle: number;
  tags: string[];
  followers: string;
}

const artistPreviews: ArtistPreview[] = [
  { rank: '01', name: 'Field Recordings', angle: 45, tags: ['Indie Folk'], followers: '2.4M' },
  {
    rank: '02',
    name: 'Motorik Youth',
    angle: 135,
    tags: ['Krautrock', 'Post-Punk'],
    followers: '640K',
  },
  { rank: '03', name: 'Nightbus', angle: 90, tags: ['Synthwave'], followers: '1.1M' },
  {
    rank: '04',
    name: 'Pale Fire Collective',
    angle: 45,
    tags: ['Chamber Pop'],
    followers: '318K',
  },
  {
    rank: '05',
    name: 'Low Season',
    angle: 135,
    tags: ['Shoegaze', 'Ambient'],
    followers: '87K',
  },
];

interface PlaylistPreview {
  name: string;
  swatch: string;
  count: string;
}

const playlistPreviews: PlaylistPreview[] = [
  { name: 'Late Studio Nights', swatch: '#8a8578', count: '48 tracks' },
  { name: 'Drive South', swatch: '#9a9186', count: '32 tracks' },
  { name: 'Grey Weather', swatch: '#a39b8e', count: '61 tracks' },
];

type TimeRangeKey = 'month' | 'sixMonths' | 'all';

interface TimeRangeOption {
  key: TimeRangeKey;
  label: string;
}

const timeRanges: TimeRangeOption[] = [
  { key: 'month', label: '1 Month' },
  { key: 'sixMonths', label: '6 Months' },
  { key: 'all', label: 'All Time' },
];

export { artistPreviews, capabilities, playlistPreviews, timeRanges };
export type { ArtistPreview, Capability, PlaylistPreview, TimeRangeKey, TimeRangeOption };
