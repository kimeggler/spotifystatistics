import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyArtist, SpotifyTrack } from '../../../types/spotify';
import { DefaultErrorMessage, PageLoader } from '../../common';
import Footer from '../../common/footer/Footer';
import FormattedNumber from '../../common/formattednumber/FormattedNumber';
import PaperNav from '../../common/papernav/PaperNav';
import rangeOptions, { RangeOption } from '../../common/top-track/range-options';

interface ExploreLink {
  title: string;
  desc: string;
  to: string;
}

const exploreLinks: ExploreLink[] = [
  { title: 'Top 50', desc: 'Tracks & artists, ranked', to: '/tracks' },
  { title: 'Genres', desc: 'What your ear leans toward', to: '/genres' },
  { title: 'Playlists', desc: 'Analyzed, one by one', to: '/analyze' },
  { title: 'Generate', desc: 'A playlist from your Top 50', to: '/analyze' },
];

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Overview: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [topArtist, setTopArtist] = useState<SpotifyArtist | null>(null);
  const [topTrack, setTopTrack] = useState<SpotifyTrack | null>(null);

  const { isLoading, error, getTopArtist, getTopTrack } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const [artist, track] = await Promise.all([getTopArtist(timerange), getTopTrack(timerange)]);

      if (artist) setTopArtist(artist);
      if (track) setTopTrack(track);
    };

    loadData();
  }, [timerange, getTopArtist, getTopTrack]);

  if (error) return <DefaultErrorMessage />;

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-300 mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-9 text-center"
      >
        <div className="flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-6">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Overview
        </div>
        <h1 className="text-4xl md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.02em] mb-9 mx-auto">
          Let's start with your{' '}
          <span className="font-serif italic font-normal text-paper-accent">favourites.</span>
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
      </motion.div>

      {!topArtist && !topTrack && <PageLoader />}

      {topArtist && (
        <div className="max-w-300 mx-auto px-6 md:px-10 pb-7">
          <div className="border border-paper-border grid grid-cols-1 md:grid-cols-2 min-h-105">
            <div className="p-9 md:p-11 flex flex-col justify-center gap-[18px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-7.5 h-7.5 bg-paper-accent text-paper-bg flex items-center justify-center font-mono text-xs font-bold -rotate-3">
                  01
                </div>
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted">
                  Top Artist
                </div>
              </div>
              <h2 className="text-4xl md:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.02]">
                {topArtist.name}
              </h2>
              <div className="font-mono text-[13px] text-paper-muted">
                <FormattedNumber value={topArtist.followers.total} /> followers
              </div>
              {topArtist.genres.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {topArtist.genres.slice(0, 3).map(genre => (
                    <span
                      key={genre}
                      className="font-mono text-[11px] tracking-[0.04em] uppercase border border-paper-border px-3 py-[5px] text-paper-muted"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div
              className="border-t md:border-t-0 md:border-l border-paper-border bg-cover bg-center min-h-60 md:min-h-0"
              style={
                topArtist.images[0]?.url
                  ? { backgroundImage: `url(${topArtist.images[0].url})` }
                  : undefined
              }
            />
          </div>
        </div>
      )}

      {topTrack && (
        <div className="max-w-300 mx-auto px-6 md:px-10 pb-16 md:pb-20">
          <div className="border border-paper-border grid grid-cols-1 md:grid-cols-2 min-h-105">
            <div
              className="order-2 md:order-1 border-t md:border-t-0 md:border-r border-paper-border bg-cover bg-center min-h-60 md:min-h-0"
              style={
                topTrack.album.images[0]?.url
                  ? { backgroundImage: `url(${topTrack.album.images[0].url})` }
                  : undefined
              }
            />
            <div className="order-1 md:order-2 p-9 md:p-11 flex flex-col justify-center gap-[18px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-7.5 h-7.5 bg-paper-fg text-paper-bg flex items-center justify-center font-mono text-xs font-bold rotate-3">
                  01
                </div>
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted">
                  Top Track
                </div>
              </div>
              <h2 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.02em] leading-[1.04]">
                {topTrack.name}
              </h2>
              <div className="font-mono text-sm text-paper-muted">{topTrack.artists[0].name}</div>
              <div className="flex gap-[10px] flex-wrap">
                <span className="font-mono text-[11px] tracking-[0.04em] uppercase border border-paper-border px-3 py-[5px] text-paper-muted">
                  {formatDuration(topTrack.duration_ms)}
                </span>
                <span className="font-mono text-[11px] tracking-[0.04em] uppercase border border-paper-accent text-paper-accent px-3 py-[5px]">
                  {topTrack.popularity}% popularity
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTINUE EXPLORING */}
      <div className="border-t border-paper-border">
        <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-9">
            Continue exploring
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-paper-border">
            {exploreLinks.map((link, i) => (
              <Link
                key={link.title}
                to={link.to}
                className={`px-[26px] py-[30px] border-paper-border hover:bg-paper-border/20 transition-colors ${
                  i !== exploreLinks.length - 1 ? 'border-r' : ''
                } border-b sm:border-b-0`}
              >
                <div className="text-xl font-extrabold tracking-[-0.01em]">{link.title}</div>
                <div className="font-mono text-xs text-paper-muted mt-2">{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Overview;
