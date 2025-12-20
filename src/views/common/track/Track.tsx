import { motion } from 'framer-motion';
import React from 'react';
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
        type: 'spring' as const,
        stiffness: 100,
        delay: index * 0.05,
      },
    },
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
      className="w-full max-w-sm"
    >
      {/* Clean white aesthetic card */}
      <div className="relative backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group aspect-square md:h-[320px] md:aspect-auto">
        {/* Dark background */}
        <div className="absolute inset-0 bg-statfy-dark-950"></div>

        {/* Background Image - Album art */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url(${track.album.images[0]?.url || '/api/placeholder/300/300'})`,
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-500" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
          {/* Top section - Rank and icon */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
              #{index + 1}
            </span>

            {/* Spotify icon - clickable link to track page */}
            <motion.a
              href={track.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </motion.a>
          </div>

          {/* Bottom section - Track info */}
          <div className="space-y-3">
            {/* Track Info */}
            <div className="space-y-3 md:space-y-4">
              {/* Track Name */}
              <h3
                className="text-white font-black text-xl md:text-2xl leading-tight line-clamp-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                title={track.name}
              >
                {track.name}
              </h3>

              {/* Artist */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-white/80 flex-shrink-0"
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
                  className="text-white text-sm md:text-base font-medium truncate"
                  title={track.artists[0].name}
                >
                  {track.artists[0].name}
                </p>
              </div>

              {/* Album */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-white/60 flex-shrink-0"
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
                <p className="text-white/80 text-sm font-light truncate" title={track.album.name}>
                  {track.album.name}
                </p>
              </div>
            </div>

            {/* Track Stats - Clean white style */}
            <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
              <span className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {formatDuration(track.duration_ms)}
              </span>

              {track.explicit && (
                <span className="px-2 md:px-3 py-1 bg-red-500/30 text-red-300 text-xs font-medium rounded-full border border-red-500/30 backdrop-blur-sm">
                  E
                </span>
              )}

              {track.popularity > 70 && (
                <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 text-xs font-medium rounded-full border border-orange-500/30 backdrop-blur-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {track.popularity}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover glow effect - subtle white */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default Track;
