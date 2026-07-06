import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../common/footer/Footer';
import PaperNav from '../common/papernav/PaperNav';
import { artistPreviews, capabilities, playlistPreviews, timeRanges } from './landing-data';
import type { TimeRangeKey } from './landing-data';

const Landingpage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useAuth();
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRangeKey>('sixMonths');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/overview');
    }
  }, [navigate, isAuthenticated]);

  const connect = async (): Promise<void> => {
    try {
      await signIn();
    } catch (error) {
      console.error('Failed to initiate sign in:', error);
    }
  };

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1120px] mx-auto px-6 md:px-10 pt-16 md:pt-24 lg:pt-[120px] pb-16 md:pb-[90px]"
      >
        <div className="flex items-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-7">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Vol. 01 — Listening Data, Decoded
        </div>

        <h1 className="text-[44px] sm:text-[64px] lg:text-[96px] leading-[0.98] font-extrabold tracking-[-0.03em] mb-8 md:mb-10 max-w-[900px]">
          Your year in sound,
          <br />
          laid{' '}
          <span
            className="font-serif italic font-normal inline-block px-4 pt-[2px] pb-[6px] -rotate-[1.5deg] bg-paper-accent text-paper-bg"
            style={{ boxShadow: '6px 6px 0 #141210' }}
          >
            bare.
          </span>
        </h1>

        <p className="text-lg md:text-xl leading-[1.55] max-w-[560px] text-paper-muted mb-10 md:mb-11">
          Statfy turns your Spotify history into a plain, honest record — top artists, top tracks,
          top genres, and the playlists that shaped your listening. No clutter. No filler. Just the
          data.
        </p>

        <div className="flex items-center gap-5 flex-wrap">
          <button
            onClick={connect}
            className="bg-paper-fg text-paper-bg px-[30px] py-4 font-mono font-bold text-[13px] tracking-[0.06em] uppercase cursor-pointer"
          >
            Connect with Spotify →
          </button>
          <span className="font-mono text-xs text-paper-muted">
            Read-only access. Disconnect anytime.
          </span>
        </div>
      </motion.div>

      {/* WHAT YOU GET */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pt-16 pb-0">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-[10px]">
            What you get
          </div>
          <h2 className="text-3xl md:text-[38px] font-extrabold tracking-[-0.02em] mb-2 max-w-[640px]">
            Four views into how you actually listen.
          </h2>
          <p className="font-mono text-xs text-paper-muted mb-2">
            Every view spans 1 month, 6 months, or all time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-paper-border mt-10">
          {capabilities.map((cap, i) => (
            <div
              key={cap.num}
              className={`px-7 py-9 min-h-[230px] flex flex-col justify-between border-paper-border ${
                i !== capabilities.length - 1 ? 'border-r' : ''
              } border-b sm:border-b-0`}
            >
              <div className="w-[34px] h-[34px] bg-paper-accent text-paper-bg flex items-center justify-center font-mono text-[13px] font-bold -rotate-3">
                {cap.num}
              </div>
              <div>
                <div className="text-[22px] font-extrabold tracking-[-0.01em] mb-[10px]">
                  {cap.title}
                </div>
                <div className="text-sm leading-[1.5] text-paper-muted">{cap.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP ARTISTS PREVIEW */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pt-[70px] pb-[90px]">
          <div className="flex justify-between items-end flex-wrap gap-5 mb-9">
            <div>
              <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-[10px]">
                Preview
              </div>
              <h2 className="text-[32px] font-extrabold tracking-[-0.02em]">Top Artists</h2>
            </div>

            <div className="flex border border-paper-border">
              {timeRanges.map(range => (
                <button
                  key={range.key}
                  onClick={() => setActiveTimeRange(range.key)}
                  className={`px-[18px] py-[10px] font-mono text-[11px] tracking-[0.06em] uppercase cursor-pointer ${
                    activeTimeRange === range.key ? 'bg-paper-fg text-paper-bg' : 'text-paper-muted'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-paper-border">
            {artistPreviews.map((artist, i) => {
              const isFirst = i === 0;
              const stripeColor = isFirst ? '#c23b1f' : '#141210';
              return (
                <div
                  key={artist.rank}
                  className={`p-5 flex flex-col gap-[14px] relative border-paper-border ${
                    i !== artistPreviews.length - 1 ? 'border-r' : ''
                  } border-b lg:border-b-0`}
                >
                  <div
                    className="absolute top-[14px] left-[14px] font-mono text-xs font-bold px-2 py-[3px] z-10"
                    style={{
                      background: isFirst ? '#c23b1f' : '#141210',
                      color: '#f2efe9',
                    }}
                  >
                    {artist.rank}
                  </div>
                  <div
                    className="w-full aspect-square"
                    style={{
                      background: `repeating-linear-gradient(${artist.angle}deg, ${stripeColor} 0, ${stripeColor} 8px, transparent 8px, transparent 16px), rgba(20,18,16,0.16)`,
                    }}
                  />
                  <div>
                    <div className="text-base font-extrabold mb-2">{artist.name}</div>
                    <div className="flex flex-wrap gap-[6px] mb-[10px]">
                      {artist.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-[0.03em] uppercase border border-paper-border px-2 py-[3px] text-paper-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="font-mono text-xs text-paper-muted">
                      {artist.followers} followers
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PLAYLISTS */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-4">
              Playlists
            </div>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-[-0.02em] mb-5 max-w-[440px]">
              Analyze what you've built.{' '}
              <span className="font-serif italic font-normal text-paper-accent">Generate</span>{' '}
              what's next.
            </h2>
            <p className="text-[15px] leading-[1.6] text-paper-muted max-w-[420px]">
              Every playlist in your library, broken down by genre and mood. Then, in one move, turn
              your Top 50 tracks into a playlist of its own.
            </p>
          </div>

          <div className="border border-paper-border p-9 flex flex-col gap-[18px]">
            {playlistPreviews.map(playlist => (
              <div
                key={playlist.name}
                className="flex justify-between items-center pb-[18px] border-b border-paper-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10" style={{ background: playlist.swatch }} />
                  <div className="text-[15px] font-bold">{playlist.name}</div>
                </div>
                <div className="font-mono text-xs text-paper-muted">{playlist.count}</div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-1">
              <span className="font-mono text-xs uppercase text-paper-muted">
                Your Top 50 → New Playlist
              </span>
              <button
                onClick={connect}
                className="border border-paper-fg px-4 py-[9px] font-mono text-[11px] tracking-[0.06em] uppercase cursor-pointer"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CLOSING CTA */}
      <div className="border-t border-paper-border px-6 md:px-10 py-20 md:py-[110px] text-center">
        <h2 className="text-4xl md:text-[56px] font-extrabold tracking-[-0.02em] mb-9 max-w-[760px] mx-auto">
          Stop guessing what you listen to.
        </h2>
        <button
          onClick={connect}
          className="inline-block bg-paper-fg text-paper-bg px-9 py-[18px] font-mono font-bold text-[13px] tracking-[0.06em] uppercase cursor-pointer"
        >
          Connect with Spotify →
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Landingpage;
