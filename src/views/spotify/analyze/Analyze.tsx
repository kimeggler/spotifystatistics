import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { getAudioAnalysis } from '../../../helper/analysationhelper';
import useGlobalDataHook from '../../../hooks/useGlobalDataHook';
import { fetchMyPlaylists } from '../../../services/spotifyservice';
import { SpotifyPlaylist } from '../../../types/spotify';
import { DefaultErrorMessage, Playlist } from '../../common';

interface AnalyseData {
  name: string;
  value: number;
}

const Analyze: React.FC = () => {
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseData[] | { empty: boolean } | null>(null);

  // Simple data fetching like Artists/Tracks - no need for UserContext
  const playlistsRequest = useCallback(() => fetchMyPlaylists(), []);
  const { data: playlists, isLoading, hasError } = useGlobalDataHook<SpotifyPlaylist[]>(
    playlistsRequest,
    'Loading your playlists for analysis...'
  );

  if (hasError) return <DefaultErrorMessage />;
  if (isLoading) return null; // Global loader will handle loading state
  if (!playlists || playlists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-white mb-4">No Playlists Found</h1>
        <p className="text-white/70">You don't have any playlists to analyze.</p>
      </div>
    );
  }

  const fetchAnalyse = async (playlist_id: string): Promise<void> => {
    if (!playlist_id) return;
    try {
      const analyseResponse = await getAudioAnalysis(playlist_id);
      setAnalyse(analyseResponse);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setAnalyse({ empty: true });
    }
  };

  if (!playlists) return null;

  const closePlaylist = (): void => {
    setAnalyse(null);
    setActivePlaylist(null);
    toggleScroll();
  };

  const changePlaylist = (id: string): void => {
    setActivePlaylist(id);
    fetchAnalyse(id);
    toggleScroll();
  };

  const toggleScroll = (): void => {
    if (document.body.classList.contains('no-scroll')) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  };

  const renderPlaylists = () => {
    return playlists.map((playlist: SpotifyPlaylist) => (
      <Playlist
        key={playlist.id}
        playlist={playlist}
        activePlaylist={activePlaylist}
        changePlaylist={changePlaylist}
        analyse={activePlaylist === playlist.id ? analyse || { empty: true } : { empty: true }}
        closePlaylist={closePlaylist}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900 p-8"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-statfy-purple-400 to-statfy-purple-300 bg-clip-text text-transparent"
      >
        How funky are your playlists?
      </motion.h1>

      {/* Content Container - Full width with max-width constraint */}
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Playlists Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <div
            className="grid gap-6 justify-items-center"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gridAutoRows: '1fr',
            }}
          >
            {renderPlaylists()}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analyze;
