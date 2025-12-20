import { Avatar, Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';
import { SpotifyUser } from '../../types/spotify';
import { DefaultErrorMessage } from '../common';

const User: React.FC = () => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const { isLoading, error, getProfile } = useSpotify();

  useEffect(() => {
    const loadData = async () => {
      const result = await getProfile();
      if (result) setUser(result);
    };

    loadData();
  }, [getProfile]);

  if (error) return <DefaultErrorMessage />;
  if (!user || isLoading) return null; // Global loader will handle loading state

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const pulseAnimation = {
    scale: [0.4, 2],
    opacity: [0.5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeOut' as const,
    },
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
          About{' '}
          <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
            You!
          </span>
        </h1>
      </motion.div>

      {/* User Profile Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-md w-full rounded-3xl shadow-2xl hover:shadow-statfy-purple-500/20 transition-all duration-500">
          <CardBody className="p-10 text-center">
            {/* Profile Image */}
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                className="relative"
              >
                <Avatar
                  src={user.images?.[0]?.url}
                  alt={user.display_name}
                  className="w-36 h-36 mx-auto ring-4 ring-statfy-purple-500/30 rounded-3xl shadow-2xl"
                  fallback={
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-statfy-purple-500 to-statfy-purple-600 text-white text-4xl font-bold rounded-3xl">
                      {user.display_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  }
                />

                {/* Gradient border animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-statfy-purple-500 via-statfy-purple-400 to-statfy-purple-300 p-1 -z-10 opacity-30 animate-pulse" />
              </motion.div>
            </div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-white">{user.display_name}</h2>

              <div className="flex items-center justify-center space-x-3">
                {/* Animated location indicator */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  {[0, 1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.4, opacity: 0.5 }}
                      animate={pulseAnimation}
                      transition={{ delay: i * 1 }}
                      className="absolute w-4 h-4 bg-green-500 rounded-full"
                    />
                  ))}
                  <div className="relative w-4 h-4 bg-green-500 rounded-full z-10" />
                </div>
                <span className="text-white/90 font-semibold text-lg">{user.country}</span>
              </div>

              {/* User Stats */}
              <div className="flex justify-center space-x-4 mt-6">
                <div className="text-center">
                  <Chip
                    size="lg"
                    className="bg-gradient-to-r from-statfy-purple-500/20 to-statfy-purple-400/20 text-statfy-purple-300 border border-statfy-purple-500/30 rounded-2xl px-4 py-2 font-medium"
                  >
                    {user.followers?.total ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {user.followers.total.toLocaleString()} followers
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Premium User
                      </span>
                    )}
                  </Chip>
                </div>
              </div>

              {/* Account Type */}
              <div className="mt-6">
                <Chip
                  size="lg"
                  className={`${
                    user.product === 'premium'
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30'
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30'
                  } rounded-2xl px-4 py-2 font-medium`}
                >
                  <span className="flex items-center gap-2">
                    {user.product === 'premium' ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Spotify Premium
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
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
                        Spotify Free
                      </>
                    )}
                  </span>
                </Chip>
              </div>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Account Details */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-md w-full rounded-2xl shadow-lg hover:shadow-statfy-purple-500/10 transition-all duration-300">
          <CardBody className="p-8">
            <div className="flex items-center gap-3 mb-6">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-white font-bold text-xl">Account Details</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="text-white/80 font-medium">Account Type:</span>
                </div>
                <span className="text-white font-semibold capitalize">{user.product}</span>
              </div>
              {user.email && (
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-white/80 font-medium">Email:</span>
                  </div>
                  <span className="text-white font-medium truncate ml-2 max-w-32">
                    {user.email}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-white/80 font-medium">Country:</span>
                </div>
                <span className="text-white font-semibold">{user.country}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default User;
