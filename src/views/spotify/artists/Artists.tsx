import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyArtist } from '../../../types/spotify';
import { Artist, DefaultErrorMessage, TimeRangeSelector } from '../../common';
import { RangeOption } from '../../common/top-track/range-options';

const Artists: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [artists, setArtists] = useState<SpotifyArtist[] | null>(null);
  
  const { isLoading, error, getArtists } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const result = await getArtists(timerange);
      if (result) setArtists(result);
    };

    loadData();
  }, [timerange, getArtists]);

  if (error) return <DefaultErrorMessage />;
  if (!artists || artists.length === 0 || isLoading) return null; // Global loader will handle loading state
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-4 md:px-6 lg:px-8 py-12 w-full"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="text-center mb-12 flex justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
          Your favourite{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            artists
          </span>
        </h1>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div variants={itemVariants} className="w-full max-w-7xl mx-auto mb-12">
        <TimeRangeSelector
          timerange={timerange}
          onTimerangeChange={setTimerange}
          isLoading={isLoading}
          className="max-w-none mx-0"
        />
      </motion.div>

      {/* Content Container - Full width with max-width constraint */}
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Artists Grid */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {artists.map((artist: SpotifyArtist, index: number) => (
              <Artist key={artist.id} artist={artist} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <Card className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border-white/10 rounded-2xl shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center justify-center gap-3">
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
                    d="M9 19V6l6 3-6 3V9m0 0l-3-3 3-3v6z"
                  />
                </svg>
                <p className="text-white/80 text-center font-medium">
                  Showing your top {artists.length} artists
                  {timerange === 'short_term' && ' from the last month'}
                  {timerange === 'medium_term' && ' from the last 6 months'}
                  {timerange === 'long_term' && ' of all time'}
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Artists;
