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
      {/* Clean white aesthetic card */}
      <div className="relative backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group aspect-square md:h-[320px] md:aspect-auto">
        {/* Dark background */}
        <div className="absolute inset-0 bg-statfy-dark-950"></div>

        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url(${artist.images[0]?.url || '/api/placeholder/300/300'})`,
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-500" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
          {/* Top section - Rank */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
              #{index + 1}
            </span>

            {/* Music icon - clean white style */}
            <motion.div
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
              whileHover={{ scale: 1.1, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300 }}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom section - Artist info */}
          <div className="space-y-3">
            {/* Artist Info */}
            <div className="space-y-3 md:space-y-4">
              {/* Artist Name */}
              <h3
                className="text-white font-black text-xl md:text-2xl leading-tight truncate group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                title={artist.name}
              >
                {artist.name}
              </h3>

              {/* Followers */}
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

            {/* Genre Tags - Clean white style */}
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
                      className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30 whitespace-nowrap flex-shrink-0"
                      title={formattedGenre}
                    >
                      {truncatedGenre}
                    </span>
                  );
                })}
              {artist.genres.length > 2 && (
                <span className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30 whitespace-nowrap flex-shrink-0">
                  +{artist.genres.length - 2}
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

export default Artist;
