import { Spinner as HeroSpinner } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center min-h-[200px] ${className || ''}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <HeroSpinner
          size="lg"
          color="secondary"
          classNames={{
            circle1: 'border-b-statfy-purple-500',
            circle2: 'border-b-statfy-purple-400',
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-sm font-medium"
        >
          Loading your music...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Spinner;
