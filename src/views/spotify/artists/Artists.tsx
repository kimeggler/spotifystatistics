import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyArtist } from '../../../types/spotify';
import { DefaultErrorMessage } from '../../common';
import Footer from '../../common/footer/Footer';
import PaperNav from '../../common/papernav/PaperNav';
import rangeOptions, { RangeOption } from '../../common/top-track/range-options';

const formatFollowers = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return `${count}`;
};

const Artists: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
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

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 md:pt-[70px] pb-10"
      >
        <div className="flex justify-between items-end flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-5">
              <span className="w-2 h-2 bg-paper-accent inline-block" />
              Top 50
            </div>
            <h1 className="text-4xl md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.02em]">
              Your favourite{' '}
              <span className="font-serif italic font-normal text-paper-accent">artists.</span>
            </h1>
          </div>
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
        </div>
      </motion.div>

      {/* ARTIST GRID */}
      {artists && artists.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-paper-border">
            {artists.map((artist, i) => {
              const isFirst = i === 0;
              return (
                <div
                  key={artist.id}
                  className="border-r border-b border-paper-border p-5 flex flex-col gap-[14px] relative"
                >
                  <div
                    className="absolute top-[14px] left-[14px] font-mono text-xs font-bold px-2 py-[3px] z-10"
                    style={{
                      background: isFirst ? '#c23b1f' : '#141210',
                      color: '#f2efe9',
                    }}
                  >
                    #{i + 1}
                  </div>
                  <div
                    className="w-full aspect-square bg-paper-border bg-cover bg-center"
                    style={
                      artist.images[0]?.url
                        ? { backgroundImage: `url(${artist.images[0].url})` }
                        : undefined
                    }
                  />
                  <div>
                    <div className="text-[17px] font-extrabold mb-2">{artist.name}</div>
                    {artist.genres.length > 0 && (
                      <div className="flex flex-wrap gap-[6px] mb-[10px]">
                        {artist.genres.slice(0, 2).map(genre => (
                          <span
                            key={genre}
                            className="font-mono text-[10px] tracking-[0.03em] uppercase border border-paper-border px-2 py-[3px] text-paper-muted"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="font-mono text-xs text-paper-muted">
                      {formatFollowers(artist.followers.total)} followers
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Artists;
