import { Button, Card, CardBody } from '@heroui/react';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';

import { useSpotify } from '../../../hooks/useSpotify';
import useNotification from '../../../hooks/useNotification';
import { getData, postData } from '../../../services/fetchservice';
import { SpotifyTrack } from '../../../types/spotify';
import { UserContext } from '../../AppRouter';
import { DefaultErrorMessage, TimeRangeSelector, Track } from '../../common';
import { RangeOption } from '../../common/top-track/range-options';

const Tracks: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  
  const { isLoading, error, getTracks } = useSpotify();
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    const loadData = async () => {
      const result = await getTracks(timerange);
      if (result) setTracks(result);
    };

    loadData();
  }, [timerange, getTracks]);

  if (error) return <DefaultErrorMessage />;
  if (!tracks || tracks.length === 0 || isLoading) return null; // Global loader will handle loading state

  const mapTrackUris = (): string[] => {
    return tracks.map(track => track.uri);
  };

  const createPlaylist = async (): Promise<void> => {
    try {
      showNotification('loading', 'Creating playlist...');

      // Get user profile from context only when needed
      const context = useContext(UserContext);
      if (!context) {
        showNotification('error', 'User profile not available');
        return;
      }
      const { profile } = context;

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

        const createdPlaylist = await postData(`users/${profile.id}/playlists`, playlistData);
        await postData(`playlists/${createdPlaylist.id}/tracks`, tracksData);

        showNotification('success', 'Playlist created successfully!');
      } else {
        showNotification('error', 'Playlist already exists for this time period');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      showNotification('error', 'Failed to create playlist');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const getTimeRangeLabel = (): string => {
    switch (timerange) {
      case 'short_term':
        return 'from the last month';
      case 'medium_term':
        return 'from the last 6 months';
      case 'long_term':
        return 'of all time';
      default:
        return '';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-4 md:px-6 lg:px-8 py-12 w-full"
    >
      {/* Notification */}
      <AnimatePresence>
        {notification.status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <Card
              className={cx(
                'border-0 shadow-2xl rounded-2xl backdrop-blur-md',
                notification.status === 'success' &&
                  'bg-green-500/90 text-white border border-green-400/30',
                notification.status === 'error' &&
                  'bg-red-500/90 text-white border border-red-400/30',
                notification.status === 'loading' &&
                  'bg-statfy-purple-500/90 text-white border border-statfy-purple-400/30',
              )}
            >
              <CardBody className="p-6">
                <div className="flex items-center space-x-3">
                  {notification.status === 'loading' && (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  )}
                  {notification.status === 'success' && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {notification.status === 'error' && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span className="font-semibold">{notification.message}</span>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Create Playlist Button */}
      <motion.div variants={itemVariants} className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
          Your favourite{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            tracks
          </span>
        </h1>

        <Button
          size="lg"
          className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-statfy-purple-500/40 transition-all duration-300 hover:scale-105"
          onClick={createPlaylist}
          isDisabled={notification.status === 'loading'}
        >
          <span className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            Create Playlist
          </span>
        </Button>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div variants={itemVariants} className="w-full max-w-7xl mx-auto mb-12">
        <TimeRangeSelector
          timerange={timerange}
          onTimerangeChange={setTimerange}
          isLoading={isLoading}
          className="max-w-none mx-0"
        />
      </motion.div>

      {/* Content Container - Full width with max-width constraint */}
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Tracks List */}
        <motion.div variants={itemVariants} className="w-full max-w-4xl mx-auto space-y-3">
          {tracks
            .filter(track => track.name)
            .map((track, index) => (
              <Track key={track.id} track={track} index={index} />
            ))}
        </motion.div>

        {/* Stats Footer */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <Card className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border-white/10 rounded-2xl shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5 text-statfy-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p className="text-white/80 text-center font-medium">
                  Showing your top {tracks.length} tracks {getTimeRangeLabel()}
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Tracks;
