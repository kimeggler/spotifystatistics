import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyArtist, SpotifyTrack } from '../../../types/spotify';
import { DefaultErrorMessage, TimeRangeSelector, TopArtist, TopTrack } from '../../common';
import { RangeOption } from '../../common/top-track/range-options';

const Overview: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [topArtist, setTopArtist] = useState<SpotifyArtist | null>(null);
  const [topTrack, setTopTrack] = useState<SpotifyTrack | null>(null);
  
  const { isLoading, error, getTopArtist, getTopTrack } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const [artist, track] = await Promise.all([
        getTopArtist(timerange),
        getTopTrack(timerange),
      ]);
      
      if (artist) setTopArtist(artist);
      if (track) setTopTrack(track);
    };

    loadData();
  }, [timerange, getTopArtist, getTopTrack]);

  if (error) return <DefaultErrorMessage />;
  if (!topArtist || !topTrack || isLoading) return null; // Global loader will handle loading state

  const background = (imgUrl: string): React.CSSProperties => {
    return {
      backgroundImage: `url(${imgUrl})`,
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
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
          Let's start with your{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            favourites
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
        {/* Top Artist */}
        <motion.div variants={itemVariants} className="w-full">
          <TopArtist
            background={background(topArtist.images[0]?.url || '')}
            topArtist={topArtist}
          />
        </motion.div>

        {/* Top Track */}
        <motion.div variants={itemVariants} className="w-full">
          <TopTrack
            background={background(topTrack.album.images[0]?.url || '')}
            topTrack={topTrack}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Overview;
