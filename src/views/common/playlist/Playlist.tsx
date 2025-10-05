import { Button } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface AnalyseData {
  name: string;
  value: number;
}

interface PlaylistData {
  id: string;
  name: string;
  images: Array<{ url: string }>;
}

interface PlaylistProps {
  playlist: PlaylistData;
  activePlaylist: string | null;
  changePlaylist: (id: string) => void;
  analyse: AnalyseData[] | { empty: boolean };
  closePlaylist: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  playlist,
  activePlaylist,
  changePlaylist,
  analyse,
  closePlaylist,
}) => {
  const getAnalyseValue = (index: number): number => {
    if (Array.isArray(analyse) && analyse[index]) {
      return analyse[index].value;
    }
    return 0;
  };

  const renderAnalysisBar = (name: string, value: number, key: string) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-statfy-purple-300 text-sm">{value}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full"
        />
      </div>
    </motion.div>
  );

  const renderAnalysis = (name: string) => {
    const analysisCategories = [
      { name: 'Acousticness', index: 0 },
      { name: 'Danceability', index: 1 },
      { name: 'Energy', index: 2 },
      { name: 'Instrumentalness', index: 3 },
      { name: 'Liveness', index: 4 },
      { name: 'Speechiness', index: 5 },
      { name: 'Happiness', index: 6 },
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col lg:flex-row items-center w-full max-w-6xl mx-auto p-10 bg-white/5 backdrop-blur-md border-white/10 rounded-3xl shadow-2xl"
      >
        {/* Info Section */}
        <div className="flex-1 mb-8 lg:mb-0 lg:mr-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-white/80 text-lg mb-2">About your playlist</h2>
            <h3 className="text-white text-2xl font-bold">{name}</h3>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 leading-relaxed"
          >
            The content of the playlist is analyzed by Spotify based on a couple of categories. The
            assessment includes the calculation of the proportion of vocal and instrumental parts of
            songs. Furthermore the average energy of each song is being calculated. Additionally
            Spotify gives insights into how euphoric or dystrophic the songs in your playlist are.
          </motion.p>
        </div>

        {/* Chart Section */}
        <div className="flex-1 w-full">
          {analyse && typeof analyse === 'object' && 'empty' in analyse && analyse.empty ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/70 py-8"
            >
              <p>This playlist appears to be empty</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              {analysisCategories.map(category =>
                renderAnalysisBar(category.name, getAnalyseValue(category.index), category.name),
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderOverlay = (name: string) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-statfy-dark-950/95 via-statfy-dark-900/95 to-statfy-purple-900/95 backdrop-blur-sm flex items-center justify-center p-4"
    >
      {renderAnalysis(name)}

      {/* Close Button */}
      <Button
        isIconOnly
        variant="light"
        className="fixed top-6 right-6 text-white hover:bg-white/20 rounded-2xl w-12 h-12 backdrop-blur-md border border-white/20"
        onClick={closePlaylist}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </motion.div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-full max-w-sm"
      >
        {/* TopTrack mobile style - full-width image with content overlay */}
        <div
          className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group aspect-square cursor-pointer bg-cover bg-center group-hover:scale-105 box-border"
          onClick={() => changePlaylist(playlist.id)}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(15, 15, 23, 1) 0%, rgba(15, 15, 23, 0.6) 60%, rgba(15, 15, 23, 0.2) 100%), url(${playlist.images[0]?.url || '/api/placeholder/300/300'})`,
          }}
        >
          {/* Content */}
          <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-end space-y-3 md:space-y-4">
            {/* Playlist Name */}
            <h3
              className="text-white font-black text-xl md:text-2xl leading-tight truncate group-hover:text-statfy-purple-300 transition-colors duration-300 drop-shadow-lg"
              title={playlist.name}
            >
              {playlist.name}
            </h3>

            {/* Playlist label */}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-statfy-purple-400 flex-shrink-0"
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
              <p className="text-white text-sm md:text-base font-medium">Playlist</p>
            </div>
          </div>

          {/* Analyze Button - Top right on hover */}
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Analysis Overlay - separate from card structure */}
      <AnimatePresence>
        {activePlaylist === playlist.id && renderOverlay(playlist.name)}
      </AnimatePresence>
    </>
  );
};

export default Playlist;
