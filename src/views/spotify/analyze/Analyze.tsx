import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { getAudioAnalysis } from '../../../helper/analysationhelper';
import useDataHook from '../../../hooks/useDataHook';
import { fetchPlaylists } from '../../../services/spotifyservice';
import { UserContext } from '../../AppRouter';
import { DefaultErrorMessage, Playlist, Spinner } from '../../common';

interface PlaylistData {
  id: string;
  name: string;
  images: Array<{ url: string }>;
}

interface AnalyseData {
  name: string;
  value: number;
}

const Analyze: React.FC = () => {
  const userContext = useContext(UserContext);
  const profile = userContext?.profile;
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseData[] | { empty: boolean } | null>(null);

  const [playlistsRequest, setPlaylistsRequest] = useState(() => () => fetchPlaylists(profile));
  const { data: playlists, isLoading, hasError } = useDataHook<PlaylistData[]>(playlistsRequest);

  useEffect(() => {
    setPlaylistsRequest(() => () => fetchPlaylists(profile));
  }, [profile]);

  if (hasError) return <DefaultErrorMessage />;
  if (!playlists && isLoading !== false) return <Spinner />;

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
    return playlists.map((playlist: PlaylistData) => (
      <motion.div
        key={playlist.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <Playlist
          playlist={playlist}
          activePlaylist={activePlaylist}
          changePlaylist={changePlaylist}
          analyse={activePlaylist === playlist.id ? analyse : null}
          closePlaylist={closePlaylist}
        />
      </motion.div>
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
        className="text-4xl md:text-5xl font-bold text-white mb-12 text-center bg-gradient-to-r from-statfy-purple-400 to-statfy-purple-300 bg-clip-text text-transparent"
      >
        How funky are your playlists?
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-row justify-center flex-wrap gap-6 mb-6 max-w-7xl w-full lg:text-left text-center"
      >
        {renderPlaylists()}
      </motion.div>
    </motion.div>
  );
};

export default Analyze;
