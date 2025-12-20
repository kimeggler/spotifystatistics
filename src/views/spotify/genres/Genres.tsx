import { Card, CardBody, Switch } from '@heroui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { calcTopGenres, calcTopGenresIncludingArtists } from '../../../helper/genrehelper';
import { useSpotify } from '../../../hooks/useSpotify';
import { SpotifyArtist } from '../../../types/spotify';
import { DefaultErrorMessage, TimeRangeSelector } from '../../common';
import Genre from '../../common/genre/Genre';
import { RangeOption } from '../../common/top-track/range-options';

interface GenreData {
  name: string;
  count?: number;
}

const Genres: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [includeArtistRating, setIncludeArtistRating] = useState<boolean>(false);
  const [artists, setArtists] = useState<SpotifyArtist[] | null>(null);
  const [topGenres, setTopGenres] = useState<GenreData[]>([]);

  const { isLoading, error, getArtists } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const result = await getArtists(timerange);
      if (result) setArtists(result);
    };

    loadData();
  }, [timerange, getArtists]);

  useEffect(() => {
    if (artists) {
      const genres = includeArtistRating
        ? calcTopGenresIncludingArtists(artists)
        : calcTopGenres(artists);
      setTopGenres(genres);
    }
  }, [artists, includeArtistRating]);

  if (error) return <DefaultErrorMessage />;
  if (!artists || artists.length === 0 || isLoading) return null; // Global loader will handle loading state

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05,
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
      <motion.div variants={itemVariants} className="text-center flex justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
          Your favourite{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            genres
          </span>
        </h1>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div variants={itemVariants} className="w-full max-w-7xl mx-auto mb-8">
        <TimeRangeSelector
          timerange={timerange}
          onTimerangeChange={setTimerange}
          isLoading={isLoading}
          className="max-w-none mx-0"
        />
      </motion.div>

      {/* Artist Ranking Toggle */}
      <motion.div variants={itemVariants} className="w-full max-w-7xl mx-auto mb-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-grow">
              <p className="text-white/70 text-sm">Weight genres by your top artists' positions</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-white/60 text-xs font-medium whitespace-nowrap">
                Simple count
              </span>
              <Switch
                isSelected={includeArtistRating}
                onValueChange={setIncludeArtistRating}
                size="sm"
                classNames={{
                  wrapper: 'bg-white/10 group-data-[selected=true]:bg-white/30',
                  thumb: 'bg-white',
                }}
              />
              <span className="text-white/60 text-xs font-medium whitespace-nowrap">Weighted</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Container - Full width with max-width constraint */}
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Genres Grid */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {topGenres.map((genre, index) => (
              <Genre key={`${genre.name}-${index}`} genre={genre} index={index} />
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
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p className="text-white/80 text-center font-medium">
                  Showing your top {topGenres.length} genres{' '}
                  {includeArtistRating ? 'weighted by artist ranking' : 'by track count'}
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Genres;
