import { Button, Card, CardBody, Image } from '@heroui/react';
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

  const renderAnalysisBar = (name: string, value: number) => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-4">
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
                renderAnalysisBar(category.name, getAnalyseValue(category.index)),
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
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-full max-w-sm"
      >
        <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-statfy-purple-500/20 transition-all duration-500 group rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-statfy-purple-500/10">
          <CardBody className="p-0">
            {/* Playlist Image */}
            <div
              className="relative overflow-hidden rounded-t-3xl cursor-pointer"
              onClick={() => changePlaylist(playlist.id)}
            >
              <Image
                src={playlist.images[0]?.url}
                alt={playlist.name}
                className="w-full h-56 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                fallbackSrc="/api/placeholder/350/325"
              />

              {/* Overlay with Analyze Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center"
                >
                  <div className="text-white text-3xl font-bold mb-4 tracking-wide">Analyze</div>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
                    <svg
                      className="w-7 h-7 text-white"
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
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Playlist Name */}
            <div className="p-6">
              <h3 className="text-white font-bold text-lg text-center truncate group-hover:text-statfy-purple-300 transition-colors duration-300">
                {playlist.name}
              </h3>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Analysis Overlay */}
      <AnimatePresence>
        {activePlaylist === playlist.id && renderOverlay(playlist.name)}
      </AnimatePresence>
    </div>
  );
};

export default Playlist;
