import React from 'react';
import { motion } from 'framer-motion';
import { SpotifyTrack } from '../../../types/spotify';

interface TrackProps {
  track: SpotifyTrack;
  index: number;
}

const Track: React.FC<TrackProps> = ({ track, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        delay: index * 0.05
      }
    }
  };

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* TopTrack mobile style - full-width image with content overlay */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-statfy-purple-500/20 transition-all duration-300 group h-[140px] md:h-[160px]">
        {/* Dark background */}
        <div className="absolute inset-0 bg-statfy-dark-950"></div>
        
        {/* Background Image - Full width like TopTrack mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url(${track.album.images[1]?.url || track.album.images[0]?.url || '/api/placeholder/300/300'})`
            }}
          />
          {/* Gradient overlay like TopTrack mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-statfy-dark-950 via-statfy-dark-950/60 to-statfy-dark-950/20" />
        </div>

        {/* Content Overlay - Like TopTrack mobile */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-center">
          <div className="w-full">
            {/* Rank Badge - Top left */}
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold text-sm md:text-base px-3 py-1 rounded-full shadow-lg min-w-[48px] text-center">
                #{index + 1}
              </div>
            </div>

            {/* Track Info */}
            <div className="space-y-2 md:space-y-3">
              {/* Track Name */}
              <h3 
                className="text-white font-bold text-lg md:text-xl leading-tight truncate group-hover:text-statfy-purple-300 transition-colors duration-300 drop-shadow-lg"
                title={track.name}
              >
                {track.name}
              </h3>
              
              {/* Artist */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-statfy-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-white text-sm md:text-base font-medium truncate" title={track.artists[0].name}>
                  {track.artists[0].name}
                </p>
              </div>
              
              {/* Album */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p className="text-white/80 text-sm font-light truncate" title={track.album.name}>
                  {track.album.name}
                </p>
              </div>
            </div>

            {/* Track Stats - Bottom right */}
            <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end">
              <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-statfy-purple-500/30 to-statfy-purple-400/30 text-statfy-purple-200 text-xs font-medium rounded-full border border-statfy-purple-500/30 backdrop-blur-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="md:hidden">{formatDuration(track.duration_ms)}</span>
                <span className="hidden md:inline">{formatDuration(track.duration_ms)} duration</span>
              </span>
              
              {track.explicit && (
                <span className="px-2 md:px-3 py-1 bg-red-500/30 text-red-300 text-xs font-medium rounded-full border border-red-500/30 backdrop-blur-sm">
                  <span className="md:hidden">E</span>
                  <span className="hidden md:inline">Explicit</span>
                </span>
              )}
              
              {track.popularity > 70 && (
                <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 text-xs font-medium rounded-full border border-orange-500/30 backdrop-blur-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="md:hidden">{track.popularity}%</span>
                  <span className="hidden md:inline">{track.popularity}% popularity</span>
                </span>
              )}
            </div>

            {/* Play Button - Center of the card on hover */}
            <motion.div 
              className="absolute top-1/2 right-6 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Track;