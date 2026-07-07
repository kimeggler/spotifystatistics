import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import useNotification from '../../../hooks/useNotification';
import { useSpotify } from '../../../hooks/useSpotify';
import { getData, postData } from '../../../services/fetchservice';
import { SpotifyTrack } from '../../../types/spotify';
import { UserContext } from '../../App';
import { DefaultErrorMessage } from '../../common';
import Footer from '../../common/footer/Footer';
import PaperNav from '../../common/papernav/PaperNav';
import rangeOptions, { RangeOption } from '../../common/top-track/range-options';

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const rangeLabels: Record<RangeOption['value'], string> = {
  short_term: '1 Month',
  medium_term: '6 Months',
  long_term: 'All Time',
};

const Tracks: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);

  const { isLoading, error, getTracks } = useSpotify();
  const { notification, showNotification } = useNotification();
  const context = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      const result = await getTracks(timerange);
      if (result) setTracks(result);
    };

    loadData();
  }, [timerange, getTracks]);

  if (error) return <DefaultErrorMessage />;

  const mapTrackUris = (): string[] => {
    return tracks?.map(track => track.uri) || [];
  };

  const createPlaylist = async (): Promise<void> => {
    try {
      showNotification('loading', 'Creating playlist...');

      if (!context?.profile) {
        showNotification('error', 'User profile not available');
        return;
      }

      const playlists = await getData('me/playlists');
      const date = moment(new Date()).format('DD-MM-YYYY');
      const timeRange =
        timerange === 'long_term'
          ? 'All time'
          : timerange === 'medium_term'
            ? 'Last 6 months'
            : 'Last month';
      const playlistName = `${timeRange} favorites - ${date}`;

      const filteredPlaylists = playlists.items.filter(
        (playlist: any) => playlist.name === playlistName,
      );

      if (filteredPlaylists.length === 0) {
        const playlistData = JSON.stringify({
          name: playlistName,
          public: true,
          description: 'Generate your own playlist at https://statfy.xyz :)',
        });

        const tracksData = JSON.stringify({
          uris: mapTrackUris(),
        });

        const createdPlaylist = await postData(`me/playlists`, playlistData);
        await postData(`playlists/${createdPlaylist.id}/items`, tracksData);

        showNotification('success', 'Playlist created successfully!');
      } else {
        showNotification('error', 'Playlist already exists for this time period');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      showNotification('error', 'Failed to create playlist');
    }
  };

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* NOTIFICATION */}
      <AnimatePresence>
        {notification.status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-[90px] right-6 z-50 border border-paper-fg bg-paper-bg px-5 py-4 max-w-xs shadow-[6px_6px_0_#141210]"
          >
            <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-accent mb-1">
              {notification.status}
            </div>
            <div className="text-sm">{notification.message}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 md:pt-[70px] pb-10 text-center"
      >
        <div className="flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-5">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Top 50
        </div>
        <h1 className="text-4xl md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.02em] mb-9 mx-auto max-w-[760px]">
          Your favourite{' '}
          <span className="font-serif italic font-normal text-paper-accent">tracks.</span>
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

      {/* GENERATE CTA */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-10">
        <div className="border border-paper-fg bg-paper-accent-soft px-9 py-8 flex justify-between items-center flex-wrap gap-6">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper-muted mb-2">
              From this Top 50 — {rangeLabels[timerange]}
            </div>
            <div className="text-2xl font-extrabold tracking-[-0.01em]">
              Turn these tracks into a playlist.
            </div>
          </div>
          <button
            onClick={createPlaylist}
            disabled={notification.status === 'loading'}
            className="bg-paper-fg text-paper-bg px-[30px] py-4 font-mono font-bold text-[13px] tracking-[0.06em] uppercase cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
          >
            Generate Playlist →
          </button>
        </div>
      </div>

      {/* TRACK GRID */}
      {tracks && tracks.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-paper-border">
            {tracks
              .filter(track => track.name)
              .map((track, i) => {
                const isFirst = i === 0;
                return (
                  <div
                    key={track.id}
                    className="border-r border-b border-paper-border p-5 flex flex-col gap-[14px] relative"
                  >
                    <div
                      className="absolute top-[14px] left-[14px] font-mono text-xs font-bold px-2 py-[3px] z-10"
                      style={{
                        background: isFirst ? '#c23b1f' : '#141210',
                        color: '#f2efe9',
                      }}
                    >
                      #{String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      className="w-full aspect-square bg-paper-border bg-cover bg-center"
                      style={
                        track.album.images[0]?.url
                          ? { backgroundImage: `url(${track.album.images[0].url})` }
                          : undefined
                      }
                    />
                    <div>
                      <div className="text-[17px] font-extrabold mb-[6px]">{track.name}</div>
                      <div className="text-[13px] text-paper-muted mb-[10px]">
                        {track.artists[0].name}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-paper-muted">
                          {formatDuration(track.duration_ms)}
                        </span>
                        <span
                          className={`font-mono text-[10px] tracking-[0.03em] px-2 py-[3px] border ${
                            isFirst
                              ? 'border-paper-accent text-paper-accent'
                              : 'border-paper-border text-paper-muted'
                          }`}
                        >
                          {track.popularity}%
                        </span>
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

export default Tracks;
