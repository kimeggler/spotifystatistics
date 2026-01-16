import { Spinner } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface ComponentSpinnerProps {
  className?: string;
}

const ComponentSpinner: React.FC<ComponentSpinnerProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center p-8 ${className || ''}`}
    >
      <Spinner
        size="md"
        color="secondary"
        classNames={{
          circle1: 'border-b-statfy-purple-500',
          circle2: 'border-b-statfy-purple-400',
        }}
      />
    </motion.div>
  );
};

export default ComponentSpinner;
