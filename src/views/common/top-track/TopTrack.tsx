import { motion } from 'framer-motion';
import React from 'react';
import { SpotifyTrack } from '../../../types/spotify';

interface TopTrackProps {
  background: React.CSSProperties;
  topTrack: SpotifyTrack;
}

const TopTrack: React.FC<TopTrackProps> = ({ background, topTrack }) => {
  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      {/* Clean layout - reverse orientation from TopArtist */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-statfy-purple-500/20 transition-all duration-300 group h-[460px] md:h-[520px]">
        {/* Dark background */}
        <div className="absolute inset-0 bg-statfy-dark-950"></div>

        {/* Background Image - 60% width with blend effect */}
        <div className="absolute inset-0 md:right-[40%] overflow-hidden">
          <div
            style={background}
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-statfy-dark-950 via-statfy-dark-950/60 to-statfy-dark-950/20 md:bg-gradient-to-r md:from-transparent md:via-statfy-dark-950/40 md:to-statfy-dark-950" />
        </div>

        {/* Content Overlay - Right side on desktop */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center md:ml-auto">
          <div className="w-full md:w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 text-left md:text-right"
            >
              <p className="text-statfy-purple-300 text-sm font-semibold tracking-wider uppercase">
                Top Track
              </p>
            </motion.div>

            {/* Track Name */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 text-left md:text-right"
            >
              <h2
                className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-none mb-3 drop-shadow-lg truncate group-hover:animate-pulse"
                title={topTrack.name}
              >
                {topTrack.name}
              </h2>
            </motion.div>

            {/* Artist and Album Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4 mb-8 text-left md:text-right"
            >
              {/* Artist */}
              <div className="flex items-center gap-3 justify-start md:justify-end">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p
                  className="text-white text-lg md:text-xl font-medium truncate"
                  title={topTrack.artists[0].name}
                >
                  {topTrack.artists[0].name}
                </p>
              </div>

              {/* Album */}
              <div className="flex items-center gap-3 justify-start md:justify-end">
                <svg
                  className="w-5 h-5 text-white/60"
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
                <p
                  className="text-white/80 text-lg md:text-xl font-light truncate"
                  title={topTrack.album.name}
                >
                  {topTrack.album.name}
                </p>
              </div>
            </motion.div>

            {/* Track Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-2 justify-start md:justify-end"
            >
              <span className="px-3 py-1 bg-gradient-to-r from-statfy-purple-500/30 to-statfy-purple-400/30 text-statfy-purple-200 text-xs font-medium rounded-full border border-statfy-purple-500/30 backdrop-blur-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="md:hidden">{formatDuration(topTrack.duration_ms)}</span>
                <span className="hidden md:inline">
                  {formatDuration(topTrack.duration_ms)} duration
                </span>
              </span>

              {topTrack.explicit && (
                <span className="px-3 py-1 bg-red-500/30 text-red-300 text-xs font-medium rounded-full border border-red-500/30 backdrop-blur-sm">
                  <span className="md:hidden">E</span>
                  <span className="hidden md:inline">Explicit</span>
                </span>
              )}

              <span className="px-3 py-1 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 text-xs font-medium rounded-full border border-orange-500/30 backdrop-blur-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="md:hidden">{topTrack.popularity}%</span>
                <span className="hidden md:inline">{topTrack.popularity}% popularity</span>
              </span>
            </motion.div>
          </div>

          {/* Play Button - Bottom right corner */}
          <motion.div
            className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopTrack;
