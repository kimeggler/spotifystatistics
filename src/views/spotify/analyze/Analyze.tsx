import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyPlaylist } from '../../../types/spotify';
import { DefaultErrorMessage, PageLoader } from '../../common';
import Footer from '../../common/footer/Footer';
import MarqueeText from '../../common/marqueetext/MarqueeText';
import PaperNav from '../../common/papernav/PaperNav';

const Analyze: React.FC = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);
  const navigate = useNavigate();

  const { error, getMyPlaylists } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const result = await getMyPlaylists();
      if (result) setPlaylists(result);
    };

    loadData();
  }, [getMyPlaylists]);

  if (error) return <DefaultErrorMessage />;

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-300 mx-auto px-6 md:px-10 pt-14 md:pt-[70px] pb-10 text-center"
      >
        <div className="flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-5">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Your Library
        </div>
        <h1 className="text-4xl md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.02em] mb-2 mx-auto max-w-190">
          Playlists,{' '}
          <span className="font-serif italic font-normal text-paper-accent">analyzed.</span>
        </h1>
        <p className="text-[15px] text-paper-muted max-w-130 mx-auto">
          Every playlist in your library, broken down by the genres that shape it.
        </p>
      </motion.div>

      {/* GENERATE HINT */}
      <div className="max-w-300 mx-auto px-6 md:px-10 pb-5">
        <Link
          to="/tracks"
          className="border border-paper-border px-7 py-5 flex justify-between items-center flex-wrap gap-4"
        >
          <div className="font-mono text-xs text-paper-muted">
            Want a playlist made from your most-played tracks? Head to{' '}
            <span className="text-paper-fg underline">Top 50 Tracks</span> to generate one.
          </div>
          <div className="font-mono text-xs text-paper-accent whitespace-nowrap">
            Go to Tracks →
          </div>
        </Link>
      </div>

      {/* PLAYLIST GRID */}
      {playlists === null && <PageLoader />}
      {playlists && playlists.length > 0 && (
        <div className="max-w-300 mx-auto px-6 md:px-10 pt-10 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-paper-border">
            {playlists.map(playlist => (
              <div
                key={playlist.id}
                className="group border-r border-b border-paper-border p-5 flex flex-col gap-[14px]"
              >
                <div
                  className="w-full aspect-square bg-paper-border bg-cover bg-center"
                  style={
                    playlist.images[0]?.url
                      ? { backgroundImage: `url(${playlist.images[0].url})` }
                      : undefined
                  }
                />
                <div>
                  <MarqueeText text={playlist.name} className="text-[17px] font-extrabold mb-1.5" />
                  <div className="font-mono text-xs text-paper-muted mb-3.5">
                    {playlist.tracks.total} tracks
                  </div>
                  <button
                    onClick={() => navigate(`/analyze/${playlist.id}`, { state: { playlist } })}
                    className="w-full flex justify-between items-center border border-paper-border px-3 py-2 cursor-pointer"
                  >
                    <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-paper-muted">
                      View Analysis
                    </span>
                    <span className="font-mono text-[11px] text-paper-accent">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Analyze;
