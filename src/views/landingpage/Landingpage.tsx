import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Landingpage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/overview');
    }
  }, [navigate, isAuthenticated]);

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

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-4 md:px-6 lg:px-8 py-12 w-full relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-statfy-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-statfy-purple-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-spotify-green/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="flex items-center justify-center h-full relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h3
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-6xl font-bold bg-gradient-to-r from-statfy-purple-300 via-statfy-purple-500 to-statfy-purple-300 bg-clip-text text-transparent text-center bg-[length:200%_auto]"
              style={{
                textShadow: '0 0 30px rgba(211, 0, 255, 0.3)',
              }}
            >
              STATFY
            </motion.h3>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase text-center">
              STATISTICS & FACTS
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={titleVariants} className="mb-8 flex justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-center">
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.3)',
                    '0 0 30px rgba(255, 255, 255, 0.5)',
                    '0 0 20px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-white"
              >
                FREE SPOTIFY{' '}
              </motion.span>
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="text-transparent bg-gradient-to-r from-statfy-purple-300 via-statfy-purple-500 to-statfy-purple-300 bg-clip-text bg-[length:200%_auto]"
              >
                STATISTICS & ANALYTICS
              </motion.span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-white/90 text-xl md:text-2xl font-semibold mb-4 text-center">
                Unlock Your Spotify Listening History
              </h2>
              <p className="text-white/70 text-lg leading-relaxed text-center mb-4">
                Get detailed analytics of your top artists, most played tracks, and favorite genres.
                Track your music taste over time with powerful insights and beautiful data
                visualizations — completely free.
              </p>
              <p className="text-white/60 text-base leading-relaxed text-center">
                Create custom playlists, analyze your listening habits, and discover patterns in
                your Spotify data like never before.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer border border-white/20 text-white/80 hover:text-white font-medium text-lg px-10 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
              onClick={async () => {
                try {
                  await signIn();
                } catch (error) {
                  console.error('Failed to initiate sign in:', error);
                }
              }}
            >
              <span>Connect with Spotify</span>
            </motion.button>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer border border-white/20 text-white/80 hover:text-white transition-all duration-300 rounded-xl px-6 py-3 backdrop-blur-sm"
                onClick={() => navigate('/roadmap')}
              >
                Development
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer border border-white/20 text-white/80 hover:text-white transition-all duration-300 rounded-xl px-6 py-3 backdrop-blur-sm"
                onClick={() => navigate('/about')}
              >
                Learn more
              </motion.button>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: 'Top Artists & Tracks Stats',
                desc: 'View your most listened artists and songs with detailed streaming analytics across different time periods',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7h16M10 11h4m-2 4h2m-6 4h10"
                    />
                  </svg>
                ),
                title: 'Genre Analysis & Insights',
                desc: 'Discover your music taste through genre breakdowns and listening pattern visualizations',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
                title: 'Personalized Playlists',
                desc: 'Generate custom playlists based on your listening history and music preferences',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-statfy-purple-500/30 transition-all duration-300 rounded-2xl group relative overflow-hidden"
              >
                {/* Animated gradient overlay on hover */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-statfy-purple-500/0 to-statfy-purple-300/0 transition-all duration-500" />

                <div className="text-center p-8 relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-statfy-purple-500/20 to-statfy-purple-300/20 rounded-xl transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-statfy-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works Section */}
          <motion.div variants={itemVariants} className="mt-24 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              How to View Your Spotify Statistics
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              Getting your Spotify analytics is simple and takes less than a minute
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Connect Your Account',
                  desc: 'Securely link your Spotify account using official OAuth authentication. Your login credentials are never stored.',
                },
                {
                  step: '2',
                  title: 'Explore Your Stats',
                  desc: 'View your top artists, favorite tracks, genre distribution, and listening habits across multiple time ranges.',
                },
                {
                  step: '3',
                  title: 'Create & Share',
                  desc: 'Generate personalized playlists from your data and discover new insights about your music taste.',
                },
              ].map((step, index) => (
                <motion.div key={index} whileHover={{ y: -5 }} className="relative">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-statfy-purple-500 to-statfy-purple-300 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-statfy-purple-500/50">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                    <p className="text-white/70 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Section */}
          <motion.div variants={itemVariants} className="mt-24 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Why Choose STATFY for Spotify Analytics?
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              The most comprehensive and user-friendly Spotify statistics tool available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: '100% Free',
                  desc: 'No subscriptions, no premium tiers, no hidden fees. All features are completely free for everyone.',
                },
                {
                  title: 'Real-Time Data',
                  desc: "Get up-to-date statistics directly from Spotify's official API. Your data is always current and accurate.",
                },
                {
                  title: 'Beautiful Visualizations',
                  desc: 'Enjoy stunning charts and graphs that make your music data easy to understand and fun to explore.',
                },
                {
                  title: 'Privacy Focused',
                  desc: "Your data stays between you and Spotify. We don't collect, sell or share your information with third parties.",
                },
                {
                  title: 'Multiple Time Ranges',
                  desc: 'Analyze your listening habits over the last 4 weeks, 6 months, or all time to see how your taste evolves.',
                },
                {
                  title: 'No Installation Required',
                  desc: 'Access your stats instantly from any web browser. Works perfectly on desktop, tablet, and mobile devices.',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-statfy-purple-500/30 transition-all duration-300 rounded-xl p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-statfy-purple-300 transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Info Section */}
          <motion.div variants={itemVariants} className="mt-24 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-statfy-purple-500/10 to-statfy-purple-300/10 backdrop-blur-md border border-statfy-purple-500/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                What Spotify Data Can You Analyze?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Top 50 most played artists by time period</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Top 50 most streamed tracks and songs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Comprehensive genre analysis and breakdown</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Listening history patterns and trends</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Audio features and track characteristics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Personalized music recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>Custom playlist generation tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-statfy-purple-300 text-xl">✓</span>
                    <span>User profile statistics and metrics</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm">
                  All data is pulled directly from Spotify's official Web API to ensure accuracy and
                  reliability
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Landingpage;
