import { motion } from 'framer-motion';
import React from 'react';
import { SpotifyArtist } from '../../../types/spotify';
import FormattedNumber from '../formattednumber/FormattedNumber';

interface TopArtistProps {
  background: React.CSSProperties;
  topArtist: SpotifyArtist;
}

const TopArtist: React.FC<TopArtistProps> = ({ background, topArtist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Clean layout that uses appropriate space */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-statfy-purple-500/20 transition-all duration-300 group h-[460px] md:h-[520px]">
        {/* Dark background */}
        <div className="absolute inset-0 bg-statfy-dark-950"></div>

        {/* Background Image - 60% width with blend effect */}
        <div className="absolute inset-0 md:left-[40%] overflow-hidden">
          <div
            style={background}
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-statfy-dark-950 via-statfy-dark-950/60 to-statfy-dark-950/20 md:bg-gradient-to-l md:from-transparent md:via-statfy-dark-950/40 md:to-statfy-dark-950" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
          <div className="w-full md:w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <p className="text-statfy-purple-300 text-sm font-semibold tracking-wider uppercase">
                Top Artist
              </p>
            </motion.div>

            {/* Artist Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <h2
                className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-none mb-3 drop-shadow-lg truncate group-hover:animate-pulse"
                title={topArtist.name}
              >
                {topArtist.name}
              </h2>
            </motion.div>

            {/* Followers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 115.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-white text-lg md:text-xl font-medium">
                  <FormattedNumber value={topArtist.followers.total} /> followers
                </p>
              </div>
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {topArtist.genres && topArtist.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topArtist.genres.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-statfy-purple-500/30 to-statfy-purple-400/30 text-statfy-purple-200 text-xs font-medium rounded-full border border-statfy-purple-500/30 backdrop-blur-sm"
                    >
                      {genre}
                    </span>
                  ))}
                  {topArtist.genres.length > 2 && (
                    <span className="px-3 py-1 bg-white/20 text-white/70 text-xs font-medium rounded-full border border-white/20 backdrop-blur-sm">
                      +{topArtist.genres.length - 2}
                    </span>
                  )}
                </div>
              )}
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

export default TopArtist;
