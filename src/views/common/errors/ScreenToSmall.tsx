import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';

const ScreenToSmall: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900"
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-md w-full">
        <CardBody className="text-center p-8">
          <div className="text-6xl mb-6">📱</div>
          <h2 className="text-white text-2xl font-bold mb-4">Mobile Version Coming Soon</h2>
          <p className="text-white/70 leading-relaxed">
            We're currently working on a mobile version of this application. For the best
            experience, please visit us on a desktop or tablet.
          </p>
          <div className="mt-6 text-statfy-purple-300 text-sm">
            A mobile app is planned for Q2 2026 📅
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ScreenToSmall;
