import { Button, Card, CardBody, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stars } from '../../assets';

const About: React.FC = () => {
  const navigate = useNavigate();

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 py-12"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="mb-8">
              <Button
                variant="light"
                size="lg"
                className="text-4xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent"
                onClick={() => navigate('/')}
              >
                STATFY
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <p className="text-statfy-purple-300 text-sm font-semibold tracking-widest uppercase">
                STATISTICS & FACTS
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                <span className="text-white">ABOUT </span>
                <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
                  STATFY
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-12">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 rounded-3xl">
              <CardBody className="p-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Your Music, Analyzed Beautifully
                  </h2>
                  <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
                    Statfy is a modern web application built with React 18 that provides detailed
                    insights into your Spotify listening habits. Originally developed as an
                    educational project, it has evolved into a comprehensive music analytics
                    platform.
                  </p>
                </div>

                <Divider className="my-10 bg-white/20" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: (
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
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4"
                          />
                        </svg>
                      ),
                      title: 'Beautiful Design',
                      description:
                        'Modern, responsive design with smooth animations and intuitive user experience.',
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 bg-statfy-purple-500/10 rounded-xl">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-white/70 text-base leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Divider className="my-10 bg-white/20" />

                <div className="text-center">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <svg
                        className="w-5 h-5 text-amber-400"
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
                      <p className="text-amber-300 font-semibold">Independent Project</p>
                    </div>
                    <p className="text-amber-200/80 text-sm">
                      This application is not affiliated with or endorsed by Spotify AB.
                    </p>
                  </div>

                  <div className="text-white/60 space-y-3">
                    <p className="text-lg">Built with passion using modern technologies</p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                      {[
                        'React 18',
                        'TypeScript',
                        'Tailwind CSS',
                        'HeroUI',
                        'Framer Motion',
                        'Vite',
                      ].map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-white/10 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-statfy-purple-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              onClick={() => navigate('/')}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
