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

  // Generate unique gradient based on genre name
  const getGenreGradient = (name: string): string => {
    const gradients = [
      'from-pink-500 via-purple-500 to-indigo-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-green-500 via-teal-500 to-blue-500',
      'from-yellow-500 via-orange-500 to-red-500',
      'from-purple-500 via-pink-500 to-red-500',
      'from-blue-500 via-purple-500 to-pink-500',
      'from-teal-500 via-cyan-500 to-blue-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-rose-500 via-fuchsia-500 to-purple-500',
      'from-lime-500 via-green-500 to-emerald-500',
      'from-amber-500 via-orange-500 to-rose-500',
      'from-cyan-500 via-blue-500 to-indigo-500',
    ];
    
    // Use genre name to consistently pick a gradient
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  // Generate geometric pattern based on index
  const getPattern = (): React.ReactElement => {
    const patterns = [
      // Circles
      <svg key="pattern" className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <circle cx="20" cy="20" r="15" fill="white" />
        <circle cx="80" cy="80" r="20" fill="white" />
        <circle cx="70" cy="30" r="12" fill="white" />
      </svg>,
      // Waves
      <svg key="pattern" className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
      </svg>,
      // Diagonal lines
      <svg key="pattern" className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="3" />
        <line x1="0" y1="50" x2="100" y2="150" stroke="white" strokeWidth="3" />
        <line x1="0" y1="-50" x2="100" y2="50" stroke="white" strokeWidth="3" />
      </svg>,
      // Dots
      <svg key="pattern" className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        {[...Array(25)].map((_, i) => (
          <circle
            key={i}
            cx={(i % 5) * 20 + 10}
            cy={Math.floor(i / 5) * 20 + 10}
            r="3"
            fill="white"
          />
        ))}
      </svg>,
    ];
    return patterns[index % patterns.length];
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      {/* Card style matching Track/Artist components */}
      <div className="relative backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group aspect-square md:h-[320px] md:aspect-auto">
        {/* Dynamic gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGenreGradient(genre.name)}`}></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {getPattern()}
        </div>
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-500" />

        {/* Content Overlay */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
          {/* Top section - Rank */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
              #{index + 1}
            </span>
            
            {/* Music note icon */}
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
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom section - Genre info */}
          <div className="space-y-3">
            {/* Genre Name */}
            <h3
              className="text-white font-black text-2xl md:text-3xl leading-tight capitalize group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
              title={genre.name}
            >
              {genre.name.replace(/-/g, ' ')}
            </h3>

            {/* Track count */}
            {genre.count && (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <p className="text-white text-sm font-bold">{genre.count} tracks</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default Genre;
