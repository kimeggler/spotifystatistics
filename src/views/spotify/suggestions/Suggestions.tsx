import { motion } from 'framer-motion';
import React from 'react';

const Suggestions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900 p-8"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white text-center bg-gradient-to-r from-statfy-purple-400 to-statfy-purple-300 bg-clip-text text-transparent mb-8"
      >
        Let us show you songs you might like!
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-white/70 max-w-2xl"
      >
        <p className="text-lg">
          This feature is currently under development. Soon, we'll be able to recommend personalized
          songs based on your listening habits and preferences!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Suggestions;
