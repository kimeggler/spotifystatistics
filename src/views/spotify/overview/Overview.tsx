import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { DefaultErrorMessage, Spinner, TopArtist, TopTrack, TimeRangeSelector } from '../../common';
import useDataHook from '../../../hooks/useDataHook';
import { fetchMyTopArtist, fetchMyTopTrack } from '../../../services/spotifyservice';
import { RangeOption } from '../../common/top-track/range-options';
import { SpotifyArtist, SpotifyTrack } from '../../../types/spotify';

const Overview: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [artistRequest, setArtistRequest] = useState(() => () => fetchMyTopArtist(timerange));
  const [trackRequest, setTrackRequest] = useState(() => () => fetchMyTopTrack(timerange));
  
  const { data: topArtist, isLoading: artistIsLoading, hasError: artistError } = useDataHook<SpotifyArtist>(
    artistRequest,
  );
  const { data: topTrack, isLoading: trackIsLoading, hasError: trackError } = useDataHook<SpotifyTrack>(
    trackRequest,
  );

  const isLoading = Boolean(artistIsLoading || trackIsLoading);

  useEffect(() => {
    setArtistRequest(() => () => fetchMyTopArtist(timerange));
    setTrackRequest(() => () => fetchMyTopTrack(timerange));
  }, [timerange]);

  if (artistError || trackError) return <DefaultErrorMessage />;
  if (!topArtist || !topTrack || isLoading) return <Spinner className="" />;

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
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
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