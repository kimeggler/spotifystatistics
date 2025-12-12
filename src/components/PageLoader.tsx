import { Spinner as HeroSpinner } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  message = 'Loading...',
  className = '',
}) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-center min-h-[400px] ${className}`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Loading Animation */}
        <div className="relative">
          <HeroSpinner
            size="lg"
            color="secondary"
            classNames={{
              circle1: 'border-b-statfy-purple-500',
              circle2: 'border-b-statfy-purple-400',
            }}
          />
        </div>

        {/* Loading Message */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white text-lg font-semibold mb-1">{message}</p>
          <p className="text-white/60 text-sm">Please wait while we fetch your data</p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-statfy-purple-400"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
