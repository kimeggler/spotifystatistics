import { motion } from 'framer-motion';
import React from 'react';
import { SpotifyArtist } from '../../../types/spotify';

interface ArtistProps {
  artist: SpotifyArtist;
  index: number;
}

const Artist: React.FC<ArtistProps> = ({ artist, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        delay: index * 0.1,
      },
    },
  };

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return `${count}`;
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      {/* TopTrack mobile style - full-width image with content overlay */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group aspect-square md:h-[320px] md:aspect-auto">
        {/* Dark background */}
        <div className="absolute inset-0 bg-statfy-dark-950"></div>

        {/* Background Image - Full width like TopTrack mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url(${artist.images[0]?.url || '/api/placeholder/300/300'})`,
            }}
          />
          {/* Gradient overlay like TopTrack mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-statfy-dark-950 via-statfy-dark-950/60 to-statfy-dark-950/20" />
        </div>

        {/* Content Overlay - Like TopTrack mobile */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-end">
          <div className="w-full">
            {/* Rank Badge - Top left with consistent styling */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-gradient-to-r from-statfy-purple-500/30 to-statfy-purple-400/30 text-statfy-purple-200 text-xs font-medium rounded-full border border-statfy-purple-500/30 backdrop-blur-sm">
                #{index + 1}
              </span>
            </div>

            {/* Artist Info - Now at bottom */}
            <div className="space-y-3 md:space-y-4">
              {/* Artist Name */}
              <h3
                className="text-white font-black text-xl md:text-2xl leading-tight truncate group-hover:text-statfy-purple-300 transition-colors duration-300 drop-shadow-lg"
                title={artist.name}
              >
                {artist.name}
              </h3>

              {/* Followers */}
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 115.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-white text-sm md:text-base font-medium">
                  {artist.followers?.total
                    ? `${formatFollowers(artist.followers.total)} followers`
                    : 'Artist'}
                </p>
              </div>
            </div>

            {/* Genre Tags - Below followers */}
            <div className="flex gap-2 mt-3">
              {artist.genres
                .slice(0, 2)
                .sort((f, s) => f.length - s.length)
                .map(genre => {
                  const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
                  const truncatedGenre =
                    formattedGenre.length > 10
                      ? formattedGenre.slice(0, 10) + '...'
                      : formattedGenre;
                  return (
                    <span
                      key={`${artist.id}-${genre}`}
                      className="px-2 md:px-3 py-1 bg-gradient-to-r from-statfy-purple-500/30 to-statfy-purple-400/30 text-statfy-purple-200 text-xs font-medium rounded-full border border-statfy-purple-500/30 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
                      title={formattedGenre}
                    >
                      {truncatedGenre}
                    </span>
                  );
                })}
              {artist.genres.length > 2 && (
                <span className="px-2 md:px-3 py-1 bg-white/20 text-white/70 text-xs font-medium rounded-full border border-white/20 backdrop-blur-sm whitespace-nowrap flex-shrink-0">
                  +{artist.genres.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Play Button - Top right on hover */}
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

export default Artist;
