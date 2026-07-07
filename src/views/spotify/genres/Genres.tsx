import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { calcTopGenres, calcTopGenresIncludingArtists } from '../../../helper/genrehelper';
import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyArtist } from '../../../types/spotify';
import { DefaultErrorMessage } from '../../common';
import Footer from '../../common/footer/Footer';
import PaperNav from '../../common/papernav/PaperNav';
import rangeOptions, { RangeOption } from '../../common/top-track/range-options';

type Weighting = 'frequency' | 'artist';

const weightingOptions: { key: Weighting; label: string }[] = [
  { key: 'frequency', label: 'Play Frequency' },
  { key: 'artist', label: 'Top Artist Rank' },
];

const nameFontSize = (index: number): string => {
  if (index === 0) return 'text-[30px]';
  if (index < 3) return 'text-[22px]';
  return 'text-[18px]';
};

const Genres: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [weighting, setWeighting] = useState<Weighting>('frequency');
  const [artists, setArtists] = useState<SpotifyArtist[] | null>(null);

  const { isLoading, error, getArtists } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const result = await getArtists(timerange);
      if (result) setArtists(result);
    };

    loadData();
  }, [timerange, getArtists]);

  if (error) return <DefaultErrorMessage />;

  const rawGenres = artists
    ? weighting === 'artist'
      ? calcTopGenresIncludingArtists(artists)
      : calcTopGenres(artists)
    : [];
  const totalCount = rawGenres.reduce((sum, genre) => sum + genre.count, 0);
  const genres = rawGenres.slice(0, 10).map(genre => ({
    name: genre.name,
    pct: totalCount > 0 ? Math.round((genre.count / totalCount) * 100) : 0,
  }));

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 md:pt-[70px] pb-10 text-center"
      >
        <div className="flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-5">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Top Genres
        </div>
        <h1 className="text-4xl md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.02em] mb-9 mx-auto max-w-[760px]">
          The sound of{' '}
          <span className="font-serif italic font-normal text-paper-accent">your ear.</span>
        </h1>
        <div className="inline-flex border border-paper-border">
          {rangeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => !isLoading && setTimerange(option.value)}
              disabled={isLoading}
              className={`px-[18px] py-[10px] font-mono text-[11px] tracking-[0.06em] uppercase cursor-pointer disabled:cursor-not-allowed ${
                timerange === option.value ? 'bg-paper-fg text-paper-bg' : 'text-paper-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-paper-muted">
            Ranked by
          </div>
          <div className="inline-flex border border-paper-border">
            {weightingOptions.map(option => (
              <button
                key={option.key}
                onClick={() => setWeighting(option.key)}
                className={`px-[18px] py-[10px] font-mono text-[11px] tracking-[0.06em] uppercase cursor-pointer ${
                  weighting === option.key ? 'bg-paper-fg text-paper-bg' : 'text-paper-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* GENRE RANKED LIST */}
      {genres.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
          {genres.map((genre, i) => (
            <div
              key={genre.name}
              className="grid grid-cols-[45px_1fr_60px] sm:grid-cols-[70px_1fr_90px] items-center gap-4 sm:gap-6 py-[22px] border-b border-paper-border"
            >
              <div
                className={`font-mono text-[15px] font-bold ${
                  i === 0 ? 'text-paper-accent' : 'text-paper-muted'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div className={`font-extrabold tracking-[-0.01em] mb-[10px] ${nameFontSize(i)}`}>
                  {genre.name}
                </div>
                <div className="w-full h-2 bg-paper-border relative">
                  <div
                    className="absolute left-0 top-0 h-full"
                    style={{
                      width: `${genre.pct}%`,
                      background: i === 0 ? 'var(--paper-accent)' : 'var(--paper-fg)',
                    }}
                  />
                </div>
              </div>
              <div className="font-mono text-sm text-paper-muted text-right">{genre.pct}%</div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Genres;
