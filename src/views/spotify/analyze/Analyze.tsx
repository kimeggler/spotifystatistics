import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { getAudioAnalysis } from '../../../helper/analysationhelper';
import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyPlaylist } from '../../../types/spotify';
import { DefaultErrorMessage, Playlist } from '../../common';

interface AnalyseData {
  name: string;
  value: number;
}

const Analyze: React.FC = () => {
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseData[] | { empty: boolean } | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);

  const { isLoading, error, getMyPlaylists } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const result = await getMyPlaylists();
      if (result) setPlaylists(result);
    };

    loadData();
  }, [getMyPlaylists]);

  if (error) return <DefaultErrorMessage />;
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-4 md:px-6 lg:px-8 py-12 w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
          How funky are your{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            playlists?
          </span>
        </h1>
      </motion.div>

      {/* Content Container - Full width with max-width constraint */}
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Playlists Grid */}
        <motion.div variants={itemVariants} className="w-full">
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
