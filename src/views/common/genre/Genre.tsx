import { Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface GenreData {
  name: string;
  count?: number;
}

interface GenreProps {
  genre: GenreData;
  index: number;
}

const Genre: React.FC<GenreProps> = ({ genre, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
      whileHover={{ scale: 1.02, x: 10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-statfy-purple-500/20 transition-all duration-500 group rounded-2xl shadow-lg hover:shadow-statfy-purple-500/10">
        <CardBody className="p-6">
          <div className="flex items-center space-x-6">
            {/* Rank */}
            <div className="flex-shrink-0">
              <Chip
                size="lg"
                className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold min-w-[56px] h-12 rounded-2xl shadow-lg"
              >
                <span className="text-lg">#{index + 1}</span>
              </Chip>
            </div>

            {/* Genre Info */}
            <div className="flex-grow space-y-1">
              <h3 className="text-white font-bold text-lg capitalize group-hover:text-statfy-purple-300 transition-colors duration-300">
                {genre.name.replace(/-/g, ' ')}
              </h3>
              {genre.count && (
                <div className="flex items-center gap-2">
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
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                  <p className="text-white/70 text-sm font-medium">{genre.count} tracks</p>
                </div>
              )}
            </div>

            {/* Genre Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-statfy-purple-500/20 to-statfy-purple-400/20 rounded-2xl flex items-center justify-center border border-statfy-purple-500/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-statfy-purple-400"
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
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default Genre;
