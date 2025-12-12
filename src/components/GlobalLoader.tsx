import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface GlobalLoaderProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ 
  isLoading, 
  message = 'Loading your music...', 
  className = '' 
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-50 bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900 flex items-center justify-center ${className}`}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-statfy-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-statfy-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Loading Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent mb-2">
                STATFY
              </h1>
              <p className="text-statfy-purple-300 text-sm font-semibold tracking-widest uppercase">
                STATISTICS & FACTS
              </p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              {/* Spinning Rings */}
              <div className="relative w-16 h-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-transparent border-t-statfy-purple-400 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                  className="absolute inset-2 border-2 border-transparent border-t-statfy-purple-500 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1 }}
                  className="absolute inset-4 border-2 border-transparent border-t-statfy-purple-300 rounded-full"
                />
              </div>

              {/* Pulsing Center */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-gradient-to-r from-statfy-purple-400 to-statfy-purple-500 rounded-full" />
              </motion.div>
            </motion.div>

            {/* Loading Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-2"
            >
              <p className="text-white text-lg font-semibold">{message}</p>
              
              {/* Animated Dots */}
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
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
            </motion.div>

            {/* Loading Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center max-w-md"
            >
              <p className="text-white/60 text-sm leading-relaxed">
                We're fetching your music data from Spotify to create beautiful visualizations
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;