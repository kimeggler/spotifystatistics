import { Card, CardBody, Spinner } from '@heroui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stars } from '../../assets';
import { handleSignInCallback } from '../../helper/authenticationhelper';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async (): Promise<void> => {
      try {
        await handleSignInCallback();
        navigate('/overview');
      } catch (error) {
        console.error('Error during authentication:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900">
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-20 blur-sm"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-statfy-dark-950/90 via-transparent to-statfy-purple-900/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
        <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-md w-full">
          <CardBody className="text-center p-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="mb-6"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent">
                STATFY
              </h1>
            </motion.div>

            {/* Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <Spinner
                size="lg"
                color="secondary"
                classNames={{
                  circle1: 'border-b-statfy-purple-500',
                  circle2: 'border-b-statfy-purple-400',
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-white text-xl font-semibold mb-2">Logging you in...</h2>
              <p className="text-white/70">
                We're connecting to your Spotify account and preparing your music stats.
              </p>
            </motion.div>

            {/* Animated dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-1 mt-6"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
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
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default SpotifyCallback;
