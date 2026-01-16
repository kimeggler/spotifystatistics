import { Card, CardBody, Chip, Image } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { SpotifyArtist } from '../../../types/spotify';

interface SuggestionProps {
  suggestion: SpotifyArtist;
  index: number;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestion, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, y: -12 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="w-full max-w-xs"
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-statfy-purple-500/20 transition-all duration-500 group rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-statfy-purple-500/10">
        <CardBody className="p-0">
          {/* Artist Image with Overlay */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <Image
              src={suggestion.images[0]?.url}
              alt={suggestion.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              fallbackSrc="/api/placeholder/300/200"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Rank Badge */}
            <div className="absolute top-4 left-4">
              <Chip
                size="lg"
                className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold shadow-lg rounded-full px-3 py-1"
              >
                #{index + 1}
              </Chip>
            </div>

            {/* Suggestion Badge */}
            <div className="absolute top-4 right-4">
              <Chip
                size="sm"
                className="bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm rounded-full px-2 py-1"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Suggested
              </Chip>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-statfy-purple-500/80"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Artist Info */}
          <div className="p-6 text-center">
            <h3 className="text-white font-bold text-lg mb-2 truncate group-hover:text-statfy-purple-300 transition-colors duration-300">
              {suggestion.name}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 text-statfy-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-white/70 text-sm font-medium">
                {suggestion.followers?.total
                  ? `${(suggestion.followers.total / 1000000).toFixed(1)}M followers`
                  : 'Discover new music'}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default Suggestion;
