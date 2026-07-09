interface GrillInput {
  avgPopularity: number;
  explicitPct: number;
  topArtistName: string;
  topArtistPct: number;
  uniqueArtistCount: number;
  totalTracks: number;
  topDecade: string;
  topDecadePct: number;
  mood: string;
}

interface GrillCandidate {
  score: number;
  headline: string;
  line: string;
}

interface PlaylistGrill {
  headline: string;
  lines: string[];
}

const MOOD_LINES: Record<string, { headline: string; line: string }> = {
  'Bright & Driving': {
    headline: 'Main character energy.',
    line: 'High valence, high energy — this is walking-down-the-street-in-slow-motion music.',
  },
  'Warm & Easy': {
    headline: 'Sunny but horizontal.',
    line: 'High valence, low energy — a porch playlist. Nice, but nobody is dancing.',
  },
  'Tense & Restless': {
    headline: 'Sounds like an argument.',
    line: 'Low valence, high energy — restless and a little unresolved.',
  },
  'Hazy & Melancholic': {
    headline: 'Rainy window energy.',
    line: 'Low valence, low energy — the audio equivalent of staring out a rainy window.',
  },
};

const buildGrill = (input: GrillInput): PlaylistGrill => {
  const {
    avgPopularity,
    explicitPct,
    topArtistName,
    topArtistPct,
    uniqueArtistCount,
    totalTracks,
    topDecade,
    topDecadePct,
    mood,
  } = input;

  const candidates: GrillCandidate[] = [];

  if (topArtistPct >= 15) {
    candidates.push({
      score: topArtistPct / 100,
      headline: `Certified ${topArtistName} stan.`,
      line: `${topArtistPct}% of this playlist is just ${topArtistName}. At some point it stops being a playlist and starts being a shrine.`,
    });
  } else {
    candidates.push({
      score: 0.3,
      headline: 'Chronically indecisive.',
      line: `${uniqueArtistCount} different artists across ${totalTracks} tracks, barely any repeats — refreshingly indecisive, or just thorough?`,
    });
  }

  if (avgPopularity >= 70) {
    candidates.push({
      score: (avgPopularity - 70) / 30,
      headline: 'Cafe playlist energy.',
      line: `Average popularity ${avgPopularity}/100 — basically the soundtrack to a coffee shop.`,
    });
  } else if (avgPopularity <= 35) {
    candidates.push({
      score: (35 - avgPopularity) / 35,
      headline: 'Insufferable music snob.',
      line: `Average popularity ${avgPopularity}/100. Nobody else has heard of this, and you will make sure of it.`,
    });
  }

  if (explicitPct >= 50) {
    candidates.push({
      score: (explicitPct - 50) / 50,
      headline: 'Not safe for the office speaker.',
      line: `${explicitPct}% explicit tracks. Bold choice for the group chat.`,
    });
  } else if (explicitPct === 0) {
    candidates.push({
      score: 0.4,
      headline: 'Squeaky clean.',
      line: '0% explicit. Suspiciously wholesome for someone with this many feelings.',
    });
  }

  if (topDecadePct >= 50) {
    candidates.push({
      score: (topDecadePct - 50) / 50,
      headline: `Stuck in the ${topDecade}.`,
      line: `${topDecadePct}% of this is from the ${topDecade}. Nostalgia called, it wants its playlist back.`,
    });
  }

  const moodLine = MOOD_LINES[mood];
  if (moodLine) {
    candidates.push({ score: 0.2, headline: moodLine.headline, line: moodLine.line });
  }

  const ranked = candidates.sort((a, b) => b.score - a.score);

  return {
    headline: ranked[0]?.headline ?? 'Certifiably fine.',
    lines: ranked.slice(0, 3).map(candidate => candidate.line),
  };
};

export { buildGrill };
export type { GrillInput, PlaylistGrill };
