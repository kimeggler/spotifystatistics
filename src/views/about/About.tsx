import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
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
        stiffness: 80,
      },
    },
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 lg:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            About{' '}
            <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
              statfy
            </span>
          </h1>
          <p className="text-white/60 text-lg">Your music, analyzed beautifully</p>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/10 border border-white/20 rounded-lg p-8">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Statfy is a modern web application built with React 18 that provides detailed insights
              into your Spotify listening habits. Originally developed as an educational project, it
              has evolved into a comprehensive music analytics platform.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
              title: 'Privacy First',
              description:
                'No data from your Spotify profile is stored on our servers. Your privacy is our priority.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              title: 'Fast & Modern',
              description:
                'Built with modern React 18, Tailwind CSS, and HeroUI for optimal performance.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
              title: 'Rich Analytics',
              description:
                'Detailed insights into your listening habits with beautiful visualizations.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4"
                  />
                </svg>
              ),
              title: 'Beautiful Design',
              description:
                'Modern, responsive design with smooth animations and intuitive user experience.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/[0.15] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-white/80">{feature.icon}</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Warning Box */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Independent Project</p>
                <p className="text-amber-200/80 text-sm">
                  This application is not affiliated with or endorsed by Spotify AB.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/10 border border-white/20 rounded-lg p-6">
            <p className="text-white/80 text-center mb-4">
              Built with passion using modern technologies
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'HeroUI', 'Framer Motion', 'Vite'].map(
                (tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/70 text-sm"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
