import React, { useEffect, useState } from 'react';
import { Card, CardBody, Switch } from '@heroui/react';
import { motion } from 'framer-motion';

import { calcTopGenres, calcTopGenresIncludingArtists } from '../../../helper/genrehelper';
import useDataHook from '../../../hooks/useDataHook';
import { fetchArtists } from '../../../services/spotifyservice';
import { DefaultErrorMessage, Spinner, TimeRangeSelector } from '../../common';
import Genre from '../../common/genre/Genre';
import { RangeOption } from '../../common/top-track/range-options';
import { SpotifyArtist } from '../../../types/spotify';

interface GenreData {
  name: string;
  count?: number;
}

const Genres: React.FC = () => {
  const [timerange, setTimerange] = useState<RangeOption['value']>('medium_term');
  const [includeArtistRating, setIncludeArtistRating] = useState<boolean>(false);
  const [artistsRequest, setArtistsRequest] = useState(() => () => fetchArtists(timerange));
  const { data: artists, isLoading, hasError } = useDataHook<SpotifyArtist[]>(artistsRequest);
  const [topGenres, setTopGenres] = useState<GenreData[]>([]);

  useEffect(() => {
    setArtistsRequest(() => () => fetchArtists(timerange));
  }, [timerange]);

  useEffect(() => {
    if (artists) {
      const genres = includeArtistRating 
        ? calcTopGenresIncludingArtists(artists) 
        : calcTopGenres(artists);
      setTopGenres(genres);
    }
  }, [artists, includeArtistRating]);

  if (hasError) return <DefaultErrorMessage />;
  if (!artists || artists.length === 0 || isLoading) return <Spinner className="" />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05
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
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-8"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
          Favourite{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            Genres
          </span>
        </h1>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div variants={itemVariants}>
        <TimeRangeSelector
          timerange={timerange}
          onTimerangeChange={setTimerange}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Artist Ranking Toggle */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/5 backdrop-blur-md border-white/10 rounded-2xl shadow-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-between space-x-6">
              <div className="text-white flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-statfy-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="font-semibold">Calculate based on artist ranking</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Weight genres by your top artists' positions
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Switch
                  isSelected={includeArtistRating}
                  onValueChange={setIncludeArtistRating}
                  color="secondary"
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-gradient-to-r group-data-[selected=true]:from-statfy-purple-500 group-data-[selected=true]:to-statfy-purple-400",
                  }}
                />
                <span className="text-white/70 text-xs font-medium">
                  {includeArtistRating ? 'Weighted' : 'Simple count'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Genres List */}
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-4xl space-y-3"
      >
        {topGenres.map((genre, index) => (
          <Genre key={`${genre.name}-${index}`} genre={genre} index={index} />
        ))}
      </motion.div>
      
      {/* Stats Footer */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border-white/10 rounded-2xl shadow-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-statfy-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <p className="text-white/80 text-center font-medium">
                Showing your top {topGenres.length} genres {includeArtistRating ? 'weighted by artist ranking' : 'by track count'}
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Genres;